import { useEffect, useRef } from 'react'

function SoldierBattlefield() {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const soldiersRef = useRef([])
    const shotsRef = useRef([])
    const poofsRef = useRef([])

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext('2d')
        let animationFrameId
        let lastTime = performance.now()

        const createSoldiers = () => {
            const soldiers = []
            const { width, height } = canvas
            const perSide = 7
            const marginY = 24
            const usableHeight = Math.max(40, height - marginY * 2)

            for (let i = 0; i < perSide; i++) {
                const y =
                    marginY +
                    (usableHeight / (perSide - 1 || 1)) * i

                const baseSpeed = 40 + Math.random() * 40
                const radius = 10

                // Red soldiers (left → right)
                soldiers.push({
                    id: `r-${i}`,
                    side: 'red',
                    x: -Math.random() * width,
                    y,
                    radius,
                    speed: baseSpeed,
                    hiddenFor: 0,
                })

                // Blue soldiers (right → left)
                soldiers.push({
                    id: `b-${i}`,
                    side: 'blue',
                    x: width + Math.random() * width,
                    y,
                    radius,
                    speed: -baseSpeed,
                    hiddenFor: 0,
                })
            }

            return soldiers
        }

        const resize = () => {
            const rect = container.getBoundingClientRect()
            const pixelRatio = window.devicePixelRatio || 1

            canvas.width = rect.width * pixelRatio
            canvas.height = rect.height * pixelRatio

            // Draw in CSS pixels, not device pixels
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

            soldiersRef.current = createSoldiers()
        }

        resize()
        window.addEventListener('resize', resize)

        const maxShotLife = 0.25
        const maxPoofLife = 0.35

        const drawSoldier = (s) => {
            const { x, y, radius, side } = s

            // Body
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI * 2)
            ctx.fillStyle = side === 'red' ? '#ef4444' : '#3b82f6'
            ctx.fill()

            // Helmet-ish outline
            ctx.beginPath()
            ctx.arc(x, y - radius * 0.4, radius * 0.7, 0, Math.PI * 2)
            ctx.strokeStyle = '#0b1120'
            ctx.lineWidth = 1.5
            ctx.stroke()

            // Gun
            const gunLength = radius * 1.8
            const gunThickness = radius * 0.5

            if (side === 'red') {
                const gx = x + radius
                const gy = y - gunThickness / 2
                ctx.fillStyle = '#111827'
                ctx.fillRect(gx, gy, gunLength, gunThickness)

                // occasional muzzle flash to the right
                if (Math.random() < 0.015) {
                    ctx.beginPath()
                    ctx.moveTo(gx + gunLength, y)
                    ctx.lineTo(gx + gunLength + 10, y - 4)
                    ctx.lineTo(gx + gunLength + 10, y + 4)
                    ctx.closePath()
                    ctx.fillStyle = 'rgba(248,250,252,0.8)'
                    ctx.fill()
                }
            } else {
                const gx = x - radius - gunLength
                const gy = y - gunThickness / 2
                ctx.fillStyle = '#020617'
                ctx.fillRect(gx, gy, gunLength, gunThickness)

                // occasional muzzle flash to the left
                if (Math.random() < 0.015) {
                    ctx.beginPath()
                    ctx.moveTo(gx, y)
                    ctx.lineTo(gx - 10, y - 4)
                    ctx.lineTo(gx - 10, y + 4)
                    ctx.closePath()
                    ctx.fillStyle = 'rgba(248,250,252,0.8)'
                    ctx.fill()
                }
            }
        }

        const render = (time) => {
            const dt = Math.min((time - lastTime) / 1000, 0.05)
            lastTime = time

            const { width, height } = canvas
            // Clear whole canvas (ignore current transform)
            ctx.save()
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.clearRect(0, 0, width, height)
            ctx.restore()

            // Subtle dark background wash
            ctx.fillStyle = '#020617'
            ctx.globalAlpha = 0.9
            ctx.fillRect(0, 0, width, height)
            ctx.globalAlpha = 1

            const soldiers = soldiersRef.current

            // Update + draw soldiers
            for (const s of soldiers) {
                // Movement
                s.x += s.speed * dt

                const logicalWidth = width / (window.devicePixelRatio || 1)

                // Wrap around screen
                if (s.speed > 0 && s.x - s.radius > logicalWidth + 40) {
                    s.x = -40
                } else if (s.speed < 0 && s.x + s.radius < -40) {
                    s.x = logicalWidth + 40
                }

                // Handle hit hiding
                if (s.hiddenFor > 0) {
                    s.hiddenFor -= dt
                    continue
                }

                drawSoldier(s)
            }

            // Update + draw shot ring(s)
            shotsRef.current = shotsRef.current.filter((shot) => {
                shot.life += dt
                if (shot.life > maxShotLife) return false

                const t = shot.life / maxShotLife
                const radius = 8 + 40 * t
                ctx.beginPath()
                ctx.arc(shot.x, shot.y, radius, 0, Math.PI * 2)
                ctx.strokeStyle = `rgba(248,250,252,${1 - t})`
                ctx.lineWidth = 2
                ctx.stroke()

                // center dot
                ctx.beginPath()
                ctx.arc(shot.x, shot.y, 2, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(248,250,252,0.9)'
                ctx.fill()

                return true
            })

            // Update + draw poofs
            poofsRef.current = poofsRef.current.filter((poof) => {
                poof.life += dt
                if (poof.life > maxPoofLife) return false

                const t = poof.life / maxPoofLife
                const rays = 8
                const maxLen = 22

                ctx.strokeStyle = `rgba(248,250,252,${1 - t})`
                ctx.lineWidth = 1.5

                for (let i = 0; i < rays; i++) {
                    const angle = (Math.PI * 2 * i) / rays
                    const len = 6 + maxLen * t
                    const x2 = poof.x + Math.cos(angle) * len
                    const y2 = poof.y + Math.sin(angle) * len

                    ctx.beginPath()
                    ctx.moveTo(poof.x, poof.y)
                    ctx.lineTo(x2, y2)
                    ctx.stroke()
                }

                return true
            })

            animationFrameId = requestAnimationFrame(render)
        }

        animationFrameId = requestAnimationFrame(render)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    const handleShoot = (event) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const pixelRatio = window.devicePixelRatio || 1

        let clientX
        let clientY

        if ('touches' in event && event.touches.length > 0) {
            clientX = event.touches[0].clientX
            clientY = event.touches[0].clientY
        } else if ('clientX' in event) {
            clientX = event.clientX
            clientY = event.clientY
        } else if ('nativeEvent' in event && event.nativeEvent) {
            clientX = event.nativeEvent.clientX
            clientY = event.nativeEvent.clientY
        } else {
            return
        }

        const scaleX = (canvas.width / pixelRatio) / rect.width
        const scaleY = (canvas.height / pixelRatio) / rect.height

        const x = (clientX - rect.left) * scaleX
        const y = (clientY - rect.top) * scaleY

        // Add shot effect
        shotsRef.current.push({ x, y, life: 0 })

        // Check for hits
        const soldiers = soldiersRef.current
        for (const s of soldiers) {
            if (s.hiddenFor > 0) continue

            const dx = x - s.x
            const dy = y - s.y
            const distSq = dx * dx + dy * dy
            const hitRadius = s.radius * 1.7

            if (distSq <= hitRadius * hitRadius) {
                s.hiddenFor = 0.3
                poofsRef.current.push({ x: s.x, y: s.y, life: 0 })
                break // only pop one per shot
            }
        }
    }

    const handleTouchStart = (event) => {
        event.preventDefault()
        handleShoot(event)
    }

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full cursor-crosshair select-none touch-none"
            onClick={handleShoot}
            onTouchStart={handleTouchStart}
        >
            <canvas
                ref={canvasRef}
                className="h-full w-full"
            />
            {/* Arcade helper text */}
            <div className="pointer-events-none absolute left-1/2 bottom-2 -translate-x-1/2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/90 drop-shadow-[0_0_6px_rgba(0,0,0,0.9)] animate-pulse">
                Tap or Click to shoot!
            </div>
        </div>
    )
}

export default function AnimatedTopBanner() {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 dark:border-zinc-800">
            <div className="relative z-10 grid gap-8 p-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:p-10">
                {/* 
                  ⬇️ Keep / paste your existing text content here.
                  Headline, subheading, pills, buttons, whatever you already had.
                */}
                <div className="space-y-3">
                    {/* Example structure — replace with your actual existing content */}
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-400">
                        Designer • Developer • Game Tinkerer
                    </p>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-zinc-50">
                        Building playful, tactical web experiences.
                    </h1>
                    <p className="text-sm md:text-base text-zinc-400">
                        From inventory tools for vet hospitals to post-apocalyptic
                        strategy games — I like mixing clean UI with systems that
                        feel alive.
                    </p>
                    {/* Drop your CTA buttons back in here if you had them */}
                </div>

                {/* New interactive background battlefield */}
                <div className="relative h-48 md:h-56 lg:h-64">
                    <div className="absolute inset-0 rounded-2xl border border-zinc-800/60 bg-gradient-to-b from-slate-900 via-slate-950 to-black shadow-[0_18px_45px_rgba(0,0,0,0.75)]">
                        <SoldierBattlefield />
                    </div>
                </div>
            </div>

            {/* Soft vignette / glow, no lightning or flash anymore */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.09),transparent_65%)]" />
        </section>
    )
}
