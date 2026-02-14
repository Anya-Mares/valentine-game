"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function CartaFinal() {

  const fullText = `
>> RESULTADO: PERFECTO ✔

DANIEL...
SUPERASTE LA MISION.

--------------------------------

OFICIALMENTE DEMOSTRASTE
QUE MERECES SER
MI SAN VALENTIN ❤️

--------------------------------

RECOMPENSA DESBLOQUEADA:
MI CORAZON.

--------------------------------

SI LLEGASTE HASTA AQUI,
ES PORQUE SI ME QUIERES…
O PORQUE NO ENCONTRASTE
EL BOTON DE SALIR 😅

--------------------------------

GRACIAS POR SER
MI PERSONA FAVORITA,
POR REFUGIARME,
POR REIR CONMIGO,
Y POR ESTAR CONMIGO
TODOS LOS DIAS.

--------------------------------

SE QUE TE ENCANTA JUGAR,
POR ESO HICE TODO ESTO
DE UNA FORMA MUY PERSONAL,
REPRESENTANDO
QUIEN SOY CONTIGO
Y CUANTO TE AMO.

--------------------------------

ESTA CARTA,
ESTE JUEGO,
Y CADA DETALLE,
LOS HICE PENSANDO EN TI.

--------------------------------

TE AMO MAS
DE LO QUE ESTE CODIGO
Y TODAS LAS HORAS
HACIENDOLO
PUEDEN EXPRESAR 💕
  `

  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {

      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index])
        setIndex((prev) => prev + 1)
      }, 32)

      return () => clearTimeout(timeout)
    }
  }, [index, fullText])

  const handleRestart = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="
        relative
        border-4 border-gray-500
        p-6
        max-w-lg
        w-full
        text-center
        space-y-4
        bg-black
        shadow-[0_0_20px_rgba(255,255,255,0.15)]
        font-mono
      ">

        {/* Stickers */}
        <div className="absolute -top-3 -left-3 text-xl">🐶</div>
        <div className="absolute -top-3 -right-3 text-xl">🐱</div>
        <div className="absolute -bottom-3 -left-3 text-xl">❤️</div>
        <div className="absolute -bottom-3 -right-3 text-xl">🏆</div>

        {/* Título */}
        <h2 className="text-lg text-gray-100 tracking-widest">
          ▶▶ MISION COMPLETADA ◀◀
        </h2>

        {/* Imagen */}
        <div className="flex justify-center">
          <Image
            src="/assets/dya.png"
            alt="Daniel y yo"
            width={180}
            height={180}
            className="border-2 border-gray-600"
            priority
          />
        </div>

        {/* Texto */}
        <pre
          className="
            text-xs
            text-gray-300
            whitespace-pre-wrap
            leading-relaxed
            text-left
            border-t
            border-gray-600
            pt-3
            max-h-[260px]
            overflow-y-auto
          "
        >
          {displayedText}
          <span className="animate-pulse">▋</span>
        </pre>

        {/* Cierre */}
        {index >= fullText.length && (
          <>
            <p className="text-sm text-indigo-300 tracking-wide pt-2 animate-pulse">
              ¿QUIERES SEGUIR SIENDO
              MI SAN VALENTIN
              HOY Y SIEMPRE? 🐶🐱❤️
            </p>

            <button
              onClick={handleRestart}
              className="
                mt-3
                px-6
                py-2
                border-2
                border-gray-400
                text-gray-200
                hover:bg-gray-800
                hover:text-white
                transition
                animate-pulse
              "
            >
              🔄 PLAY AGAIN
            </button>
          </>
        )}

      </div>
    </div>
  )
}

