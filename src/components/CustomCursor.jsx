import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const followerRef = useRef(null)
    const mousePos = useRef({ x: 0, y: 0 })
    const followerPos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        // Custom cursor movement
        const handleMouseMove = (e) => {
            if (window.innerWidth < 1024) return

            mousePos.current = { x: e.clientX, y: e.clientY }
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`
            }
        }

        // Smooth follower animation
        let animationId
        const animateFollower = () => {
            followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.15
            followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.15

            if (followerRef.current) {
                followerRef.current.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px)`
            }
            animationId = requestAnimationFrame(animateFollower)
        }

        document.addEventListener('mousemove', handleMouseMove)
        animateFollower()

        // Cursor grow on link hover - Delegate to document based on selectors
        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, .cursor-pointer')) {
                if (cursorRef.current) {
                    cursorRef.current.style.width = '30px'
                    cursorRef.current.style.height = '30px'
                }
            } else {
                if (cursorRef.current) {
                    cursorRef.current.style.width = '20px'
                    cursorRef.current.style.height = '20px'
                }
            }
        }

        document.addEventListener('mouseover', handleMouseOver)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseover', handleMouseOver)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <>
            <div ref={cursorRef} className="cursor"></div>
            <div ref={followerRef} className="cursor-follower"></div>
        </>
    );
};

export default CustomCursor;
