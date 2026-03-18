// src/components/ui/spiral-animation.jsx
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// Vector Utility Class
class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    static random(min, max) {
        return min + Math.random() * (max - min)
    }
}

class Vector3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    static random(min, max) {
        return min + Math.random() * (max - min)
    }
}

// Animation Controller
class AnimationController {
    time = 0
    stars = []
    
    // Constants
    changeEventTime = 0.32
    cameraZ = -400
    cameraTravelDistance = 3400
    startDotYOffset = 28
    viewZoom = 100
    numberOfStars = 5000
    trailLength = 80
    
    constructor(canvas, ctx, dpr, dimensions) {
        this.canvas = canvas
        this.ctx = ctx
        this.dpr = dpr
        this.dimensions = dimensions
        this.timeline = gsap.timeline({ repeat: -1 })
        
        // Initialization
        this.setupRandomGenerator()
        this.createStars()
        this.setupTimeline()
    }
    
    // Setup seeded random generator for consistency
    setupRandomGenerator() {
        const originalRandom = Math.random
        const customRandom = () => {
            let seed = 1234
            return () => {
                seed = (seed * 9301 + 49297) % 233280
                return seed / 233280
            }
        }
        
        Math.random = customRandom()
        this.createStars()
        Math.random = originalRandom
    }
    
    // Create stars
    createStars() {
        this.stars = []
        for (let i = 0; i < this.numberOfStars; i++) {
            this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance, this))
        }
    }
    
    // Setup animation timeline
    setupTimeline() {
        this.timeline
            .to(this, {
                time: 1,
                duration: 15,
                repeat: -1,
                ease: "none",
                onUpdate: () => this.render()
            })
    }
    
    // Easing functions
    ease(p, g) {
        if (p < 0.5) 
            return 0.5 * Math.pow(2 * p, g)
        else
            return 1 - 0.5 * Math.pow(2 * (1 - p), g)
    }
    
    // Elastic easing
    easeOutElastic(x) {
        const c4 = (2 * Math.PI) / 4.5
        if (x <= 0) return 0
        if (x >= 1) return 1
        return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1
    }
    
    // Map utility
    map(value, start1, stop1, start2, stop2) {
        return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
    }
    
    // Constrain utility
    constrain(value, min, max) {
        return Math.min(Math.max(value, min), max)
    }
    
    // Linear Interpolation
    lerp(start, end, t) {
        return start * (1 - t) + end * t
    }
    
    // Spiral Path Calculation
    spiralPath(p) {
        p = this.constrain(1.2 * p, 0, 1)
        p = this.ease(p, 1.8)
        const numberOfSpiralTurns = 6
        const theta = 2 * Math.PI * numberOfSpiralTurns * Math.sqrt(p)
        const r = 170 * Math.sqrt(p)
        
        return new Vector2D(
            r * Math.cos(theta),
            r * Math.sin(theta) + this.startDotYOffset
        )
    }
    
    // Rotation Transformation
    rotate(v1, v2, p, orientation) {
        const middle = new Vector2D(
            (v1.x + v2.x) / 2,
            (v1.y + v2.y) / 2
        )
        
        const dx = v1.x - middle.x
        const dy = v1.y - middle.y
        const angle = Math.atan2(dy, dx)
        const o = orientation ? -1 : 1
        const r = Math.sqrt(dx * dx + dy * dy)
        
        // Elastic effect
        const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p)
        
        return new Vector2D(
            middle.x + r * (1 + bounce) * Math.cos(angle + o * Math.PI * this.easeOutElastic(p)),
            middle.y + r * (1 + bounce) * Math.sin(angle + o * Math.PI * this.easeOutElastic(p))
        )
    }
    
    // Project 3D point to 2D canvas
    showProjectedDot(position, sizeFactor) {
        const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)
        const newCameraZ = this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance
        
        if (position.z > newCameraZ) {
            const dotDepthFromCamera = position.z - newCameraZ
            
            // 3D -> 2D Projection
            const x = this.viewZoom * position.x / dotDepthFromCamera
            const y = this.viewZoom * position.y / dotDepthFromCamera
            const sw = 400 * sizeFactor / dotDepthFromCamera
            const r = 0.5 // Preserving the original fixed tiny dot size
            this.ctx.moveTo(x + r, y)
            this.ctx.arc(x, y, r, 0, Math.PI * 2)
        }
    }
    
    // Draw Start Dot
    drawStartDot() {
        if (this.time > this.changeEventTime) {
            const dy = this.cameraZ * this.startDotYOffset / this.viewZoom
            const position = new Vector3D(0, dy, this.cameraTravelDistance)
            this.showProjectedDot(position, 2.5)
        }
    }
    
    // Main Render Function
    render() {
        const ctx = this.ctx
        if (!ctx) return
        
        ctx.fillStyle = '#080808'
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height)
        
        ctx.save()
        ctx.translate(this.dimensions.width / 2, this.dimensions.height / 2)
        
        // Time parameters
        const t1 = this.constrain(this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1), 0, 1)
        const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)
        
        // Rotate Camera
        ctx.rotate(-Math.PI * this.ease(t2, 2.7))
        
        // Draw Trail
        this.drawTrail(t1)
        
        // Draw Stars
        ctx.fillStyle = 'white'
        ctx.beginPath()
        for (const star of this.stars) {
            star.render(t1, this)
        }
        ctx.fill()
        
        // Draw Start Dot
        ctx.beginPath()
        this.drawStartDot()
        ctx.fill()
        
        ctx.restore()
    }
    
    // Draw Trail
    drawTrail(t1) {
        this.ctx.fillStyle = 'white'
        this.ctx.beginPath()
        for (let i = 0; i < this.trailLength; i++) {
            const f = this.map(i, 0, this.trailLength, 1.1, 0.1)
            const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f
            
            const pathTime = t1 - 0.00015 * i
            const position = this.spiralPath(pathTime)
            
            // Add Rotation Effect
            const basePos = position
            const offset = new Vector2D(position.x + 5, position.y + 5)
            const rotated = this.rotate(
                basePos, 
                offset, 
                Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5, 
                i % 2 === 0
            )
            
            const r = sw / 2
            this.ctx.moveTo(rotated.x + r, rotated.y)
            this.ctx.arc(rotated.x, rotated.y, r, 0, Math.PI * 2)
        }
        this.ctx.fill()
    }
    
    // Controls
    pause() {
        this.timeline.pause()
    }
    
    resume() {
        this.timeline.play()
    }
    
    destroy() {
        this.timeline.kill()
    }

    scatter() {
        // Explode stars outward
        this.stars.forEach(star => {
            const angle = Math.atan2(star.dy, star.dx);
            const force = 1000 + Math.random() * 3000;
            gsap.to(star, {
                dx: star.dx + Math.cos(angle) * force,
                dy: star.dy + Math.sin(angle) * force,
                z: star.z - (2000 + Math.random() * 2000), // pull them towards camera
                duration: 1.2,
                ease: "power2.in"
            });
        });
        
        // Fade out trail and overall canvas slightly to smooth transition
        gsap.to(this, {
            trailLength: 0,
            duration: 0.5
        });
    }
}

// Star Class
class Star {
    strokeWeightFactor
    z
    angle
    distance
    rotationDirection
    expansionRate
    finalScale
    dx
    dy
    spiralLocation
    spiralPos
    
    constructor(cameraZ, cameraTravelDistance, controller) {
        this.angle = Math.random() * Math.PI * 2
        this.distance = 30 * Math.random() + 15
        this.rotationDirection = Math.random() > 0.5 ? 1 : -1
        this.expansionRate = 1.2 + Math.random() * 0.8 
        this.finalScale = 0.7 + Math.random() * 0.6 
        
        this.dx = this.distance * Math.cos(this.angle)
        this.dy = this.distance * Math.sin(this.angle)
        
        this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3
        // Cache the spiral calculations directly so we don't calculate on 5000 stars every frame
        this.spiralPos = controller.spiralPath(this.spiralLocation)
        
        this.z = Vector2D.random(0.5 * cameraZ, cameraTravelDistance + cameraZ)
        
        const lerp = (start, end, t) => start * (1 - t) + end * t
        this.z = lerp(this.z, cameraTravelDistance / 2, 0.3 * this.spiralLocation)
        this.strokeWeightFactor = Math.pow(Math.random(), 2.0)
    }
    
    render(p, controller) {
        const spiralPos = this.spiralPos
        const q = p - this.spiralLocation
        
        if (q > 0) {
            const displacementProgress = controller.constrain(4 * q, 0, 1)
            
            // Mix easing functions
            const linearEasing = displacementProgress;
            const elasticEasing = controller.easeOutElastic(displacementProgress);
            const powerEasing = Math.pow(displacementProgress, 2);
            
            let easing;
            if (displacementProgress < 0.3) {
                easing = controller.lerp(linearEasing, powerEasing, displacementProgress / 0.3);
            } else if (displacementProgress < 0.7) {
                const t = (displacementProgress - 0.3) / 0.4;
                easing = controller.lerp(powerEasing, elasticEasing, t);
            } else {
                easing = elasticEasing;
            }
            
            // Calculate screen positions
            let screenX, screenY;
            
            if (displacementProgress < 0.3) {
                // Initial linear movement
                screenX = controller.lerp(spiralPos.x, spiralPos.x + this.dx * 0.3, easing / 0.3);
                screenY = controller.lerp(spiralPos.y, spiralPos.y + this.dy * 0.3, easing / 0.3);
            } else if (displacementProgress < 0.7) {
                // Curved movement
                const midProgress = (displacementProgress - 0.3) / 0.4;
                const curveStrength = Math.sin(midProgress * Math.PI) * this.rotationDirection * 1.5;
                
                const baseX = spiralPos.x + this.dx * 0.3;
                const baseY = spiralPos.y + this.dy * 0.3;
                
                const targetX = spiralPos.x + this.dx * 0.7;
                const targetY = spiralPos.y + this.dy * 0.7;
                
                const perpX = -this.dy * 0.4 * curveStrength;
                const perpY = this.dx * 0.4 * curveStrength;
                
                screenX = controller.lerp(baseX, targetX, midProgress) + perpX * midProgress;
                screenY = controller.lerp(baseY, targetY, midProgress) + perpY * midProgress;
            } else {
                // Final spiral expansion
                const finalProgress = (displacementProgress - 0.7) / 0.3;
                
                const baseX = spiralPos.x + this.dx * 0.7;
                const baseY = spiralPos.y + this.dy * 0.7;
                
                const targetDistance = this.distance * this.expansionRate * 1.5;
                const spiralTurns = 1.2 * this.rotationDirection;
                const spiralAngle = this.angle + spiralTurns * finalProgress * Math.PI;
                
                const targetX = spiralPos.x + targetDistance * Math.cos(spiralAngle);
                const targetY = spiralPos.y + targetDistance * Math.sin(spiralAngle);
                
                screenX = controller.lerp(baseX, targetX, finalProgress);
                screenY = controller.lerp(baseY, targetY, finalProgress);
            }
            
            // 3D Projection
            const vx = (this.z - controller.cameraZ) * screenX / controller.viewZoom;
            const vy = (this.z - controller.cameraZ) * screenY / controller.viewZoom;
            
            const position = new Vector3D(vx, vy, this.z);
            
            // Size Animation
            let sizeMultiplier = 1.0;
            if (displacementProgress < 0.6) {
                sizeMultiplier = 1.0 + displacementProgress * 0.2;
            } else {
                const t = (displacementProgress - 0.6) / 0.4;
                sizeMultiplier = 1.2 * (1.0 - t) + this.finalScale * t;
            }
            
            const dotSize = 8.5 * this.strokeWeightFactor * sizeMultiplier;
            
            controller.showProjectedDot(position, dotSize);
        }
    }
}

export function SpiralAnimation({ isExiting }) {
    const canvasRef = useRef(null)
    const animationRef = useRef(null)
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight })
    
    useEffect(() => {
        let timeoutId;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }, 150);
        };
        
        // Initial setup
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
        
        window.addEventListener('resize', handleResize)
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        
        const dpr = window.devicePixelRatio || 1
        
        canvas.width = dimensions.width * dpr
        canvas.height = dimensions.height * dpr
        
        canvas.style.width = `${dimensions.width}px`
        canvas.style.height = `${dimensions.height}px`
        
        ctx.scale(dpr, dpr)
        
        // Cleanup old animation if exists
        if (animationRef.current) {
             animationRef.current.destroy()
        }

        animationRef.current = new AnimationController(canvas, ctx, dpr, dimensions)
        
        return () => {
             if (animationRef.current) {
                animationRef.current.destroy()
                animationRef.current = null
            }
        }
    }, [dimensions])
    
    // Trigger scatter effect when exiting
    useEffect(() => {
        if (isExiting && animationRef.current) {
            animationRef.current.scatter()
        }
    }, [isExiting])

    return (
        <div className="relative w-full h-full">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    )
}
