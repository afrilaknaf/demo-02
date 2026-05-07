import { useParams,useNavigate } from "react-router-dom"
import useGets from "../Hooks/UseGet"
import Loading from "../Compoents/Loading"


export default function Blog() {

    const navigate = useNavigate()

    const { isLoading, data, isError } = useGets(`blog/get`, "blog")
    console.log(data)

    if (isLoading) return <Loading />
    if (isError) return <h1>SomeThing Wents Wrong</h1>

    return (
        <>
            <div className="w-full h-auto flex flex-col md:flex-row justify-center items-center my-5">
                    {
                        data.data.map((item, index) => (
                            <div key={index} className="w-[full] md:w-[300px] lg:w-[450px] px-3 h-[500px] md:h-[350px] lg:h-[400px] flex flex-col gap-3">
                                <div className="w-full h-[300px] md:h-[180px] lg:w-[400px] lg:h-[235px] overflow-hidden ">
                                    <a onClick={() => navigate(`/blog/${item._id}/${item.slug}`)}>
                                        <img src={item.image} className="w-full h-[300px] md:h-[180px] lg:w-[400px] lg:h-[235px] object-cover transition-all hover:scale-[1.2] hover:cursor-pointer" alt="" />
                                    </a>
                                </div>
                                <h1 className="font-bold text-lg">{item.title}</h1>
                                <span className="">{item.date}</span>
                                <p className="line-clamp-3 md:line-clamp-2 lg:line-clamp-2 text-justify">{item.para[0]}</p>
                            </div>
                        ))
                    }
                </div>
        </>
    )
}