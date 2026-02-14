"use client"

import { useEffect, useRef } from "react"
import { initGame } from "../game/initGame"

type GameProps = {
  onGameEnd: () => void
}

export default function Game({ onGameEnd }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const cleanup = initGame(canvasRef.current, onGameEnd)

    return cleanup
  }, [onGameEnd])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ display: "block", margin: "0 auto" }}
    />
  )
}

