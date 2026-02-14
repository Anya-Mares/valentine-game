"use client"

import Img from "next/image"
import { useEffect, useState } from "react"
import BottonSi from "./BottonSi"
import BottonNo from "./BottonNo"

type Props = {
  setStage: (stage: "intro" | "game" | "final") => void
}

type Heart = {
  id: number
  left: string
  delay: string
}

export default function IntroValentine({ setStage }: Props) {

  const [hearts, setHearts] = useState<Heart[]>([])
  const [noCount, setNoCount] = useState(0)

  const getMessage = () => {
    if (noCount < 3) return "Daniel… ¿Quieres ser mi San Valentín? ❤️"
    if (noCount < 6) return "¿Estás seguro que no? 🥺"
    if (noCount < 9) return "Yo que tú me lo pensaba bien 😏"
    if (noCount < 12) return "Vamos… di que sí 💖"
    return "Definitivamente estamos destinados a estar juntos ✨"
  }

  const handleNoHover = () => {
    setNoCount((prev) => prev + 1)
  }

  const yesGrow = 1 + Math.min(noCount * 0.05, 0.4)
  const noScale = 1 - Math.min(noCount * 0.03, 0.4)

  useEffect(() => {
    const generateHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }))

    setHearts(generateHearts)
  }, [])

  return (
    <>
      {/* Corazones flotando */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {hearts.map((heart) => (
          <Img
            key={heart.id}
            src="/hearts/heart.png"
            alt="heart"
            width={60}
            height={60}
            className="heart absolute animate-bounce opacity-70"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
            }}
          />
        ))}

      </div>

      {/* Contenido */}
      <div className="text-center space-y-6 px-4">

        <h1 className="
          text-3xl sm:text-4xl
          text-gray-100
          font-semibold
          tracking-wide
          drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]
        ">
          {getMessage()}
        </h1>

        <div className="flex justify-center gap-5 pt-2">

          <BottonSi
            onClick={() => setStage("game")}
            grow={yesGrow}
          />

          <BottonNo
            onHover={handleNoHover}
            scale={noScale}
          />

        </div>

      </div>
    </>
  )
}
