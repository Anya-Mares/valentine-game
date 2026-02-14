"use client"
import {useEffect} from "react"


type Props = {
  onStart: () => void
}

function playBeep(freq: number, duration: number, volume = 0.1) {
  const ctx = new AudioContext()

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "square"
  osc.frequency.value = freq

  gain.gain.value = volume

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start()

  setTimeout(() => {
    osc.stop()
    ctx.close()
  }, duration)
}

export default function RulesScreen({ onStart }: Props) {
    useEffect(() => {
    // Insert coin
    playBeep(800, 120)
    setTimeout(() => playBeep(1200, 80), 150)
  }, [])

  const handleStart = () => {
    // Start
    playBeep(1000, 150)

    setTimeout(() => {
      onStart()
    }, 200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="relative border-4 border-gray-500 p-8 max-w-xl w-full text-center space-y-6 bg-black shadow-[0_0_25px_rgba(255,255,255,0.15)] font-mono">

        {/* Stickers */}
        <div className="absolute -top-4 -left-4 text-2xl">
          🐶
        </div>

        <div className="absolute -top-4 -right-4 text-2xl">
          🐱
        </div>

        <div className="absolute -bottom-4 -left-4 text-2xl">
          ❤️
        </div>

        <div className="absolute -bottom-4 -right-4 text-2xl">
          🎮
        </div>

        {/* Título */}
        <h2 className="text-xl text-gray-100 tracking-widest">
          ▶▶ MISION SAN VALENTIN ◀◀
        </h2>

        {/* Descripción */}
        <div className="text-sm text-gray-300 space-y-4 leading-relaxed">

          <p>
            BIENVENIDO, JUGADOR.
          </p>

          <p>
            PARA DEMOSTRAR QUE MERECES
            SER MI SAN VALENTIN,
            DEBES COMPLETAR ESTA MISION.
          </p>

          <p className="text-gray-100">
            OBJETIVO FINAL:
            100 PUNTOS ❤️
          </p>

          {/* Controles */}
          <div className="pt-2 border-t border-gray-600">

            <p className="text-gray-400 pt-2">
              CONTROLES:
            </p>

            <p>◀ A / ←  : IZQUIERDA</p>
            <p>▶ D / →  : DERECHA</p>
            <p>⬆ ESPACIO : SALTAR</p>

          </div>

          {/* Puntos */}
          <div className="pt-2 border-t border-gray-600">

            <p className="text-gray-400 pt-2">
              SISTEMA DE PUNTOS:
            </p>

            <p>🐱 GATO = +5</p>
            <p>👾 ENEMIGO = BONUS</p>
            <p>💥 GOLPE = -15</p>

          </div>

        </div>

        {/* Advertencia */}
        <p className="text-xs text-gray-500 tracking-wider">
          SIN CONTINUES · SIN TRUCOS · SOLO AMOR 😏
        </p>

        {/* Botón */}
        <button
          onClick={onStart}
          className="mt-4 px-8 py-3 border-2 border-gray-300 hover:bg-gray-800 hover:text-white transition animate-pulse"
        >
          ▶ START GAME
        </button>

      </div>
    </div>
  )
}
