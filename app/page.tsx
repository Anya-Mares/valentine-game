"use client"

import { useState } from "react"

import IntroValentine from "@/src/components/IntroValentine"
import Game from "@/src/components/Game"
import CartaFinal from "@/src/components/CartaFinal"
import Reglas from "@/src/components/Reglas"

type Stage = "intro" | "reglas" | "game" | "final"

export default function Home() {

  const [stage, setStage] = useState<Stage>("intro")
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Cambiar de pantalla con transición
  const goToStage = (nextStage: Stage) => {
    setIsTransitioning(true)

    setTimeout(() => {
      setStage(nextStage)
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <main
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        bg-black
        text-white
        overflow-hidden
      "
    >

      {/* INTRO */}
      {stage === "intro" && (
        <div className={isTransitioning ? "fade-out" : ""}>
          <IntroValentine setStage={() => goToStage("reglas")} />
        </div>
      )}

      {/* REGLAS */}
      {stage === "reglas" && (
        <div className={isTransitioning ? "fade-out" : ""}>
          <Reglas onStart={() => goToStage("game")} />
        </div>
      )}

      {/* JUEGO */}
      {stage === "game" && (
        <div className={isTransitioning ? "fade-out" : ""}>
          <Game onGameEnd={() => goToStage("final")} />
        </div>
      )}

      {/* FINAL */}
      {stage === "final" && (
        <div className={isTransitioning ? "fade-out" : ""}>
          <CartaFinal />
        </div>
      )}

    </main>
  )
}
