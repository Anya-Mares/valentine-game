"use client"

import {useState} from "react"
type Props ={
    onHover:() =>void
    scale?:number
}

export default function BottonNo({onHover, scale}:Props){
    const [position, setPosition] = useState({top:0,left:0})
     const moveBotton =()=>{
        const randomTop = Math.random() *60 - 30
        const randomLeft = Math.random() *60 -30
        setPosition({top:randomTop,left:randomLeft})

        onHover()
    }

    return(
         <button
                onMouseEnter={moveBotton}
                style={{
                    transform:`translate(${position.left}px, ${position.top}px) scale(${scale ?? 1})`
                }}
                className="px-6 py-2 bg-gray-700 rounded-xl hover:bg-gray-600 transition-all duration-200">
                    No 
                </button>
    )
}