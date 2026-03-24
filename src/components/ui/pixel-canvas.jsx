import * as React from "react"

class Pixel {
  constructor(x, y, color, speed, delay) {
    this.x = x
    this.y = y
    this.color = color
    this.speed = (Math.random() * 0.8 + 0.1) * speed
    this.size = 0
    this.sizeStep = Math.random() * 0.4
    this.minSize = 0.4
    this.maxSizeInteger = 2
    this.maxSize = Math.random() * (this.maxSizeInteger - this.minSize) + this.minSize
    this.delay = delay
    this.counter = 0
    this.counterStep = Math.random() * 4 + 2
    this.isIdle = false
    this.isReverse = false
    this.isShimmer = false
  }

  draw(ctx) {
    const offset = this.maxSizeInteger * 0.5 - this.size * 0.5
    ctx.fillStyle = this.color
    ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size)
  }

  appear(ctx) {
    this.isIdle = false
    if (this.counter <= this.delay) {
      this.counter += this.counterStep
      return
    }
    if (this.size >= this.maxSize) this.isShimmer = true
    if (this.isShimmer) {
      this.shimmer()
    } else {
      this.size += this.sizeStep
    }
    this.draw(ctx)
  }

  disappear(ctx) {
    this.isShimmer = false
    this.counter = 0
    if (this.size <= 0) {
      this.isIdle = true
      return
    }
    this.size -= 0.1
    this.draw(ctx)
  }

  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true
    else if (this.size <= this.minSize) this.isReverse = false
    this.size += this.isReverse ? -this.speed : this.speed
  }
}

export const PixelCanvas = React.memo(({ gap = 10, speed = 35, colors = ["#f8fafc", "#f1f5f9", "#cbd5e1"], variant = "default", className, style }) => {
  const canvasRef = React.useRef(null)
  const pixelsRef = React.useRef([])
  const animRef = React.useRef(null)
  const prevTimeRef = React.useRef(performance.now())
  const animModeRef = React.useRef(null)
  const lastW = React.useRef(0)
  const lastH = React.useRef(0)

  const clampedGap = Math.max(4, Math.min(50, gap))
  const clampedSpeed = Math.max(0, Math.min(100, speed)) * 0.001

  const createPixels = (w, h) => {
    const arr = []
    for (let x = 0; x < w; x += clampedGap) {
      for (let y = 0; y < h; y += clampedGap) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        let delay
        if (variant === "icon") {
          const dx = x - w / 2, dy = y - h / 2
          delay = Math.sqrt(dx * dx + dy * dy) * 0.1
        } else {
          const dx = x, dy = h - y
          delay = Math.sqrt(dx * dx + dy * dy) * 0.1
        }
        arr.push(new Pixel(x, y, color, clampedSpeed, delay))
      }
    }
    return arr
  }

  const syncSize = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Use the canvas element's own rendered size (CSS makes it 100% of parent)
    const rect = canvas.getBoundingClientRect()
    const w = Math.floor(rect.width)
    const h = Math.floor(rect.height)
    if (w === 0 || h === 0) return
    if (w === lastW.current && h === lastH.current) return

    lastW.current = w
    lastH.current = h

    const dpr = window.devicePixelRatio || 1
    canvas.width = w * dpr
    canvas.height = h * dpr

    const ctx = canvas.getContext("2d")
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    pixelsRef.current = createPixels(w, h)
  }

  const runAnimation = (mode) => {
    animModeRef.current = mode
    if (animRef.current) return

    const tick = () => {
      animRef.current = requestAnimationFrame(tick)
      const now = performance.now()
      if (now - prevTimeRef.current < 16.67) return
      prevTimeRef.current = now

      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      const dpr = window.devicePixelRatio || 1
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      let allIdle = true
      const currentMode = animModeRef.current
      for (const p of pixelsRef.current) {
        if (currentMode === "appear") p.appear(ctx)
        else p.disappear(ctx)
        if (!p.isIdle) allIdle = false
      }

      if (allIdle) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
    }
    tick()
  }

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    // Measure after layout settles — try multiple times to catch late content
    const doSync = () => syncSize()
    doSync()
    requestAnimationFrame(doSync)
    const t1 = setTimeout(doSync, 100)
    const t2 = setTimeout(doSync, 500)

    // Watch for any resize changes
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(doSync)
    })
    ro.observe(parent)

    const onEnter = () => {
      syncSize() // re-check size on every hover in case layout shifted
      runAnimation("appear")
    }
    const onLeave = () => runAnimation("disappear")

    parent.addEventListener("mouseenter", onEnter)
    parent.addEventListener("mouseleave", onLeave)

    return () => {
      ro.disconnect()
      clearTimeout(t1)
      clearTimeout(t2)
      parent.removeEventListener("mouseenter", onEnter)
      parent.removeEventListener("mouseleave", onLeave)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    />
  )
})

PixelCanvas.displayName = "PixelCanvas"
