import { useParams } from "react-router-dom"
import useGets from "../Hooks/UseGet"
import Loading from "./Loading"

export default function ProductsQuickview(){

    const datas = useParams()
    let id = datas.id

    let {data,isLoading,isError} = useGets(`products/quick/${id}`,'Products_quick')

    if(isLoading) return <Loading/>

    if(isError) return <h1>Something Wents Wrong</h1>

    console.log(data.data)

    const msg = data.data

    return(
        <>
        <div className="w-full h-auto p-3 flex flex-col md:flex-row justify-center items-center ">
            <div className="w-[400px] h-[400px] flex justify-center items-center">
                <img  className="w-[400px] h-[400px] object-cover" src={msg.images[0]} alt="" />
            </div>

            <div className="w-[50%] h-auto  ">
                <h1>{msg.title}</h1>
            </div>
        </div>
        </>
    )
}