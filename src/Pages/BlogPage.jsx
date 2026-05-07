import { useParams } from "react-router-dom"
import useGets from "../Hooks/UseGet"
import Loading from "../Compoents/Loading"

export default function BlogPage() {

    const { id } = useParams()

    const { data, isLoading, isError } = useGets(`blog/getid/${id}`, "getid_blog")

    if (isLoading) return <Loading />

    if (isError) return <h1>Something Went Wrong</h1>

    console.log(data.data)

    return (
        <>
            {
                <div className="w-full h-[250px] relative top-0">
                    <img src={data.data.image} alt="" className="w-full h-[250px] oberflow-hidden object-cover absolute top-0 " />
                    <div className="w-full  h-[250px] bg-black/60 flex justify-center items-center text-center absolute top-0 text-white">
                        <h1 className="font-bold text-xl lg:text-3xl">{data.data.title}</h1>
                    </div>
                </div>

            }

            {
                <div className="w-full lg:w-[100%] h-auto flex flex-col justify-center items-center  px-3 my-5">
                    <img className="w-full lg:w-[90%] h-[700px] object-cover" src={data.data.image} alt="" />
                    <p className="w-full lg:w-[90%] h-auto text-[#8c8c8c] text-lg my-5">{data.data.para[0]}</p>
                    <p className="w-full lg:w-[90%] h-auto text-[#8c8c8c] text-lg my-5">{data.data.para[1]}</p>
                    <p className="w-full lg:w-[90%] h-auto text-[#8c8c8c] text-lg my-5">{data.data.para[2]}</p>
                </div>
            }

            <div className="flex justify-center items-center gap-3 my-5">
                <button className="bg-[#222222] text-white rounded-full hover:bg-[blue] w-[44px] h-[44px]"><i class="ri-facebook-circle-fill text-[30px]"></i></button>
                <button className="bg-[#222222] text-white rounded-full w-[44px] h-[44px]"><i class="ri-twitter-x-line text-[30px]"></i></button>
                <button className="bg-[#222222] text-white rounded-full hover:bg-[red] w-[44px] h-[44px]"><i class="ri-pinterest-line text-[30px]"></i></button>
                <button className="bg-[#222222] text-white rounded-full hover:bg-[blue] w-[44px] h-[44px]"><i class="ri-telegram-2-fill text-[30px]"></i></button>
                <button className="bg-[#222222] text-white rounded-full hover:bg-[green] w-[44px] h-[44px]"><i class="ri-whatsapp-fill text-[30px]"></i></button>
                <button className="bg-[#222222] text-white rounded-full hover:bg-[red] w-[44px] h-[44px]"><i class="ri-mail-line text-[30px]"></i></button>
            </div>
        </>
    )
}