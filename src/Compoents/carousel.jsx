import { useEffect, useState } from "react"

export default function Carousel(images) {

    const data = images.images

    const [current,setCurrent]=useState(0)

    useEffect(()=>{

        const interval = setInterval(()=>{
            setCurrent((prev)=>{
              return  prev === data.length-1 ? 0 : prev +1
            })
            
        },5000)

        return ()=> clearInterval(interval)

    },[])




    return (
        <>
            <div className="w-full h-[100vh] realtive ">
                <img src={data[current]} className="w-full h-[100vh] object-cover transition-opacity duration-700 absolute " alt="Wacthe" />
            </div>
        </>
    )
}