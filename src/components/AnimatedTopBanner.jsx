import { useEffect, useRef } from 'react'

export function SoldierBattlefield() {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const soldiersRef = useRef([])
    const shotsRef = useRef([])
    const poofsRef = useRef([])
    const projectilesRef = useRef([])

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
                    fireCooldown: 0.5 + Math.random() * 0.8,
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
                    fireCooldown: 0.5 + Math.random() * 0.8,
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
            projectilesRef.current = []
        }

        resize()
        window.addEventListener('resize', resize)

        const maxShotLife = 0.25
        const maxPoofLife = 0.35

        const spawnProjectileFromSoldier = (s) => {
            const radius = s.radius
            const gunLength = radius * 1.8
            const bulletSpeed = 220 + Math.random() * 40

            if (s.side === 'red') {
                // tip of the gun on the right
                const x = s.x + radius + gunLength
                const y = s.y
                projectilesRef.current.push({
                    x,
                    y,
                    vx: bulletSpeed,
                    side: 'red',
                })
            } else {
                // tip of the gun on the left
                const x = s.x - radius - gunLength
                const y = s.y
                projectilesRef.current.push({
                    x,
                    y,
                    vx: -bulletSpeed,
                    side: 'blue',
                })
            }
        }

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

        const drawProjectile = (p) => {
            ctx.beginPath()
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
            ctx.fillStyle = p.side === 'red' ? '#fbbf24' : '#a5b4fc'
            ctx.fill()

            // tiny trail
            ctx.beginPath()
            const trail = 8
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p.x - Math.sign(p.vx) * trail, p.y)
            ctx.strokeStyle = 'rgba(248,250,252,0.8)'
            ctx.lineWidth = 1
            ctx.stroke()
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
            const pixelRatio = window.devicePixelRatio || 1
            const logicalWidth = width / pixelRatio

            // Update + draw soldiers
            for (const s of soldiers) {
                // Movement
                s.x += s.speed * dt

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

                // Firing logic
                s.fireCooldown -= dt
                if (s.fireCooldown <= 0) {
                    spawnProjectileFromSoldier(s)
                    s.fireCooldown = 0.7 + Math.random() * 0.7
                }

                drawSoldier(s)
            }

            // Update + draw projectiles
            projectilesRef.current = projectilesRef.current.filter((p) => {
                p.x += p.vx * dt

                // remove if off-screen
                if (p.x < -40 || p.x > logicalWidth + 40) {
                    return false
                }

                // check collision with enemy soldiers
                const enemySide = p.side === 'red' ? 'blue' : 'red'
                for (const s of soldiers) {
                    if (s.side !== enemySide) continue
                    if (s.hiddenFor > 0) continue

                    const dx = p.x - s.x
                    const dy = p.y - s.y
                    const distSq = dx * dx + dy * dy
                    const hitRadius = s.radius * 1.4

                    if (distSq <= hitRadius * hitRadius) {
                        s.hiddenFor = 0.4
                        poofsRef.current.push({ x: s.x, y: s.y, life: 0 })
                        return false // remove projectile
                    }
                }

                drawProjectile(p)
                return true
            })

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
        <section className="relative isolate mx-auto mt-4 min-h-[520px] max-w-7xl overflow-hidden rounded-3xl bg-slate-950 text-white sm:min-h-[560px]">
            <img
                src="/images/aviation-software-banner.webp"
                alt="Software workstations blending into an aircraft hangar and maintenance equipment"
                className="absolute inset-0 h-full w-full object-cover object-center"
                fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
            <div className="relative flex min-h-[520px] flex-col justify-between px-6 py-10 sm:min-h-[560px] sm:px-10 sm:py-12 lg:px-16">
                <div className="max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">Chris Buzza · Software & aviation</p>
                    <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        Building where software meets aviation.
                    </h1>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-200 sm:text-lg">
                        I create practical tools for learning and work, drawing on software development, game systems and a growing focus on aviation.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="#featured" className="rounded-lg bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Explore my work</a>
                        <a href="#contact" className="rounded-lg border border-white/60 bg-slate-950/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get in touch</a>
                    </div>
                </div>
                <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">Aviation <span className="mx-2 text-sky-300">/</span> Software <span className="mx-2 text-sky-300">/</span> Video games</p>
            </div>
        </section>
    )
}
