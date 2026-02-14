"use client"

type Props ={
    onClick:()=>void
    grow?:number
}

export default function BottonSi({onClick,grow=1}:Props){
    return(
      <button
            onClick={onClick}
            style={{
                transform:`scale(${grow})`,
             }}
                className={`px-6 py-2 bg-red-500 rounded-xl hover:bg-red-600 transition-all duration-200 ${grow < 1.3 ? "pulseLove" : ""}`}>
                    Sí
      </button>
    )
}
