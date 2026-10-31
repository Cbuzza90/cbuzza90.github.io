import { useEffect, useRef, useState } from 'react'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function drawCloud(ctx, x, y, scale, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.ellipse(x - 20 * scale, y + 4 * scale, 21 * scale, 12 * scale, 0, 0, Math.PI * 2)
    ctx.ellipse(x, y - 5 * scale, 25 * scale, 17 * scale, 0, 0, Math.PI * 2)
    ctx.ellipse(x + 22 * scale, y + 4 * scale, 22 * scale, 12 * scale, 0, 0, Math.PI * 2)
    ctx.fill()
}

function drawPlane(ctx, x, y, tilt, flashing) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(tilt)
    ctx.globalAlpha = flashing ? 0.45 : 1
    ctx.shadowColor = '#0f172a'
    ctx.shadowBlur = 12
    ctx.shadowOffsetY = 5

    ctx.fillStyle = '#e2e8f0'
    ctx.beginPath()
    ctx.moveTo(-25, -5)
    ctx.lineTo(15, -6)
    ctx.quadraticCurveTo(30, -2, 31, 0)
    ctx.quadraticCurveTo(30, 3, 15, 6)
    ctx.lineTo(-25, 5)
    ctx.closePath()
    ctx.fill()

    ctx.shadowBlur = 0
    ctx.fillStyle = '#f8fafc'
    ctx.beginPath()
    ctx.moveTo(-5, 1)
    ctx.lineTo(8, 1)
    ctx.lineTo(-8, 22)
    ctx.lineTo(-19, 22)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(-22, -2)
    ctx.lineTo(-26, -17)
    ctx.lineTo(-17, -17)
    ctx.lineTo(-10, -2)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = '#38bdf8'
    ctx.beginPath()
    ctx.ellipse(6, -3, 8, 3, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#fb923c'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(-20, 5)
    ctx.lineTo(13, 5)
    ctx.stroke()
    ctx.strokeStyle = '#cbd5e1'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(33, -12)
    ctx.lineTo(33, 12)
    ctx.stroke()
    ctx.restore()
}

function drawScene(ctx, width, height, game) {
    const sky = ctx.createLinearGradient(0, 0, 0, height)
    sky.addColorStop(0, '#082f49')
    sky.addColorStop(0.55, '#075985')
    sky.addColorStop(1, '#38bdf8')
    ctx.fillStyle = sky
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = 'rgba(253, 186, 116, 0.7)'
    ctx.beginPath()
    ctx.arc(width * 0.82, height * 0.24, 30, 0, Math.PI * 2)
    ctx.fill()

    for (let index = 0; index < 6; index += 1) {
        const travel = (game.time * 18 + index * 185) % (width + 260)
        drawCloud(ctx, width + 120 - travel, 40 + (index % 3) * 62, 0.8 + (index % 2) * 0.25, 'rgba(226, 245, 255, 0.18)')
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'
    ctx.fillRect(0, height - 28, width, 28)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.setLineDash([12, 16])
    ctx.beginPath()
    ctx.moveTo(0, height - 28)
    ctx.lineTo(width, height - 28)
    ctx.stroke()
    ctx.setLineDash([])

    for (const item of game.items) {
        if (item.type === 'ring') {
            ctx.save()
            ctx.shadowColor = '#fbbf24'
            ctx.shadowBlur = 18
            ctx.strokeStyle = '#fbbf24'
            ctx.lineWidth = 6
            ctx.beginPath()
            ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2)
            ctx.stroke()
            ctx.restore()
        } else {
            drawCloud(ctx, item.x, item.y, 1.05, '#334155')
            ctx.strokeStyle = '#facc15'
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.moveTo(item.x + 3, item.y + 12)
            ctx.lineTo(item.x - 5, item.y + 28)
            ctx.lineTo(item.x + 4, item.y + 25)
            ctx.lineTo(item.x - 3, item.y + 39)
            ctx.stroke()
        }
    }

    const planeX = Math.max(70, width * 0.23)
    const tilt = clamp((game.targetY - game.planeY) * 0.003, -0.22, 0.22)
    drawPlane(ctx, planeX, game.planeY, tilt, game.invulnerable > 0 && Math.floor(game.time * 12) % 2 === 0)
}

export default function PlaneGame() {
    const canvasRef = useRef(null)
    const gameRef = useRef({
        phase: 'ready', planeY: 130, targetY: 130, items: [], keys: new Set(),
        spawnIn: 0.8, score: 0, lives: 3, invulnerable: 0, time: 0,
    })
    const [phase, setPhase] = useState('ready')
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(3)
    const [best, setBest] = useState(() => Number(localStorage.getItem('plane-game-best') || 0))
    const bestRef = useRef(best)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return undefined
        let frameId
        let lastTime = performance.now()

        const resize = () => {
            const bounds = canvas.getBoundingClientRect()
            const ratio = window.devicePixelRatio || 1
            canvas.width = Math.round(bounds.width * ratio)
            canvas.height = Math.round(bounds.height * ratio)
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
            const game = gameRef.current
            game.planeY = clamp(game.planeY, 35, bounds.height - 40)
            game.targetY = clamp(game.targetY, 35, bounds.height - 40)
        }
        const observer = new ResizeObserver(resize)
        observer.observe(canvas)
        resize()

        const tick = (now) => {
            const dt = Math.min((now - lastTime) / 1000, 0.04)
            lastTime = now
            const width = canvas.clientWidth
            const height = canvas.clientHeight
            const game = gameRef.current
            game.time += dt

            if (game.phase === 'running') {
                if (game.keys.has('ArrowUp') || game.keys.has('w')) game.targetY -= 250 * dt
                if (game.keys.has('ArrowDown') || game.keys.has('s')) game.targetY += 250 * dt
                game.targetY = clamp(game.targetY, 35, height - 40)
                game.planeY += (game.targetY - game.planeY) * Math.min(1, dt * 12)
                game.invulnerable = Math.max(0, game.invulnerable - dt)
                game.spawnIn -= dt

                if (game.spawnIn <= 0) {
                    const type = Math.random() < 0.65 ? 'ring' : 'storm'
                    game.items.push({ type, x: width + 60, y: 52 + Math.random() * (height - 115), radius: type === 'ring' ? 19 : 30 })
                    game.spawnIn = 0.85 + Math.random() * 0.55
                }

                const planeX = Math.max(70, width * 0.23)
                for (const item of game.items) {
                    item.x -= (150 + game.score * 5) * dt
                    if (Math.hypot(item.x - planeX, item.y - game.planeY) > item.radius + 15) continue
                    item.hit = true
                    if (item.type === 'ring') {
                        game.score += 1
                        setScore(game.score)
                        if (game.score > bestRef.current) {
                            bestRef.current = game.score
                            setBest(game.score)
                            localStorage.setItem('plane-game-best', String(game.score))
                        }
                    } else if (game.invulnerable === 0) {
                        game.lives -= 1
                        setLives(game.lives)
                        game.invulnerable = 1.2
                        if (game.lives === 0) {
                            game.phase = 'ended'
                            setPhase('ended')
                        }
                    }
                }
                game.items = game.items.filter((item) => !item.hit && item.x > -80)
            }

            drawScene(ctx, width, height, game)
            frameId = requestAnimationFrame(tick)
        }

        frameId = requestAnimationFrame(tick)
        return () => {
            cancelAnimationFrame(frameId)
            observer.disconnect()
        }
    }, [])

    const startFlight = () => {
        const game = gameRef.current
        const height = canvasRef.current?.clientHeight || 260
        Object.assign(game, {
            phase: 'running', planeY: height / 2, targetY: height / 2,
            items: [], spawnIn: 0.8, score: 0, lives: 3, invulnerable: 0, time: 0,
        })
        game.keys.clear()
        setScore(0)
        setLives(3)
        setPhase('running')
        canvasRef.current?.focus()
    }

    const aimPlane = (event) => {
        if (gameRef.current.phase !== 'running') return
        if (event.type === 'pointermove' && event.pointerType !== 'mouse' && event.buttons === 0) return
        const bounds = event.currentTarget.getBoundingClientRect()
        gameRef.current.targetY = clamp(event.clientY - bounds.top, 35, bounds.height - 40)
    }

    const handleKey = (event, pressed) => {
        const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
        if (!['ArrowUp', 'ArrowDown', 'w', 's'].includes(key)) return
        event.preventDefault()
        if (pressed) gameRef.current.keys.add(key)
        else gameRef.current.keys.delete(key)
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-sky-900 bg-slate-950 text-white">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] sm:px-6">
                <span className="text-sky-300">Sky Run</span>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-slate-200">
                    <span>Rings <strong className="text-white">{score}</strong></span>
                    <span>Best <strong className="text-white">{best}</strong></span>
                    <span>Lives <strong className="text-rose-300">{lives}</strong></span>
                </div>
            </div>
            <div className="relative h-64 sm:h-80">
                <canvas
                    ref={canvasRef}
                    tabIndex={0}
                    aria-label="Plane game. Fly through gold rings and avoid storm clouds. Use the up and down arrow keys, W and S, or move your pointer."
                    className="h-full w-full touch-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
                    onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); aimPlane(event) }}
                    onPointerMove={aimPlane}
                    onKeyDown={(event) => handleKey(event, true)}
                    onKeyUp={(event) => handleKey(event, false)}
                    onBlur={() => gameRef.current.keys.clear()}
                />
                {phase !== 'running' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 p-4 text-center">
                        <div className="max-w-sm rounded-2xl border border-white/20 bg-slate-950/85 p-5 shadow-xl sm:p-6">
                            <p className="text-xl font-semibold">{phase === 'ready' ? 'Ready for takeoff?' : 'Flight complete'}</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-200">
                                {phase === 'ready' ? 'Fly through gold rings and dodge storm clouds. Drag the plane, move your mouse, or use ↑ ↓ / W S.' : `You collected ${score} ${score === 1 ? 'ring' : 'rings'}. Ready for another flight?`}
                            </p>
                            <button type="button" onClick={startFlight} className="mt-4 rounded-lg bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                                {phase === 'ready' ? 'Start flight' : 'Fly again'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
