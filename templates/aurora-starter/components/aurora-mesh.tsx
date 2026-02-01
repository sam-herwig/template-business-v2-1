'use client'

import { useRef, useEffect } from 'react'

interface GradientPoint {
  x: number
  y: number
  vx: number
  vy: number
  color: string
}

export function AuroraMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationId: number
    let time = 0
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    const gradientPoints: GradientPoint[] = [
      { x: 0.2, y: 0.3, vx: 0.0004, vy: 0.0003, color: '#6366f1' },
      { x: 0.8, y: 0.2, vx: -0.0003, vy: 0.0004, color: '#8b5cf6' },
      { x: 0.5, y: 0.7, vx: 0.0003, vy: -0.0003, color: '#c026d3' },
      { x: 0.3, y: 0.8, vx: 0.0002, vy: -0.0002, color: '#ec4899' },
      { x: 0.7, y: 0.5, vx: -0.0004, vy: 0.0002, color: '#06b6d4' },
      { x: 0.1, y: 0.1, vx: 0.0003, vy: 0.0003, color: '#8b5cf6' },
    ]
    
    const animate = () => {
      time += 1
      
      gradientPoints.forEach(point => {
        point.x += point.vx + Math.sin(time * 0.01) * 0.0001
        point.y += point.vy + Math.cos(time * 0.01) * 0.0001
        
        if (point.x < 0 || point.x > 1) point.vx *= -1
        if (point.y < 0 || point.y > 1) point.vy *= -1
        
        point.x = Math.max(0, Math.min(1, point.x))
        point.y = Math.max(0, Math.min(1, point.y))
      })
      
      ctx.fillStyle = '#030014'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      gradientPoints.forEach(point => {
        const gradient = ctx.createRadialGradient(
          point.x * canvas.width,
          point.y * canvas.height,
          0,
          point.x * canvas.width,
          point.y * canvas.height,
          canvas.width * 0.5
        )
        
        gradient.addColorStop(0, point.color + '70')
        gradient.addColorStop(0.4, point.color + '30')
        gradient.addColorStop(1, 'transparent')
        
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />
}
