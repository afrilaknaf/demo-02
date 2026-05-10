import { useParams } from "react-router-dom"
import useGets from "../Hooks/UseGet"
import Loading from "./Loading"
import Carousel from "./carousel"
import { lazy } from "react"

export default function QuickView() {

    const { id } = useParams()

    let { data, isLoading, isError } = useGets(`premium/getid/${id}`, "Premium_products_one")

    if (isLoading) return <Loading />

    if (isError) return <h1>Something Wents Wrong</h1>

    console.log(data)

    const datas = data.data

    return (
        <>
            {
                <div className="w-full h-[100vh] relative top-0">
                    {
                        datas.video === "https://your-video-url.webm" ? <>
                            <img src={datas.images[1]} className="w-full h-[100%] obect-cover absolute top-0" alt="Wacthes images" />
                        </> : <>
                            <video src={datas.video} loop muted autoplay className="w-full h-[100%] object-cover absolute top-0"></video>
                        </>
                    }
                    <div className="absolute bottom-30 ml-5">
                        <h1 className="text-4xl font-bold text-white">{datas.model}</h1>
                    </div>
                </div>
            }


            <div className="w-full h-[400px] p-4 flex flex-col justify-center items-center">
                <h1 className="text-4xl text-[#8C7A66]">{datas.category}</h1>
                <p className=" w-full h-auto md:w-[50%] mt-4 text-center text-[#8c8c8c] text-lg">{datas.description}</p>
            </div>

            <Carousel images={datas.images} />

            <h1 className="text-center text-xl m-5 font-medium">Products View</h1>

            <div className="m-5">
                <div className="w-full h-auto p-5 border border-black rounded-xl">
                    <div className="w-full h-auto flex flex-col gap-5 lg:flex-row justify-center lg:justify-start items-center">
                        <img src={datas.preview} className="w-[100%] h-[500px] lg:w-[50%] lg:h-[800px] object-cover rounded-xl border border-black " alt="" />

                        <div className="w-full h-auto md:h-auto mt-5 flex flex-col gap-3">
                            <h1 className="text-xl text-[#8c8c8c]">{datas.brand}</h1>
                            <h1 className="text-2xl lg:text-3xl">{datas.title}</h1>
                            <h1 className="text-sm text-[#8c8c8c]">Category : {datas.category}</h1>
                            <h1 className="text-[gold] flex gap-1"><i class="ri-star-line"></i><i class="ri-star-line"></i><i class="ri-star-line"></i><i class="ri-star-line"></i><span className="text-black font-bold">{datas.ratings}</span><span className="text-xs text-black mt-1">(1,249 reviews)</span></h1>
                            <h1><span className="me-2 text-2xl lg:text-3xl">₹{datas.discountPrice}</span><del>₹{datas.price}</del><span className="ms-2 bg-[gold]/50 p-1 text-xs     rounded-xl">-5 off %</span></h1>
                            <h1 className="text-[#8c8c8c] text-sm leading-6">{datas.story}</h1>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {datas.highlights.map((item, index) => (
                                    <span className="border p-2 rounded-xl border-black/50 hover:border-black/100 text-xs font-bold" key={index}>{item}</span>
                                ))}
                            </div>
                            <hr className="text-[#8c8c8c]" />
                            <div className="flex justify-start gap-5 md:justify-between px-0 md:px-5 items-start">
                                <div>
                                    <div className="flex flex-col flex-wrap gap-5 justify-start lg:justify-between p-0 lg:p-5 mt-2">
                                        <h1 className="text-sm"><span className="font-light">Movement</span> <br /><span className="font-bold">{datas.features.movement}</span></h1>
                                        <h1 className="text-sm"><span className="font-light">CaseMaterial</span><br />
                                            <span className="font-bold">{datas.features.caseMaterial}</span></h1>
                                    </div>

                                    <div className="flex flex-col flex-wrap gap-5 justify-start lg:justify-between p-0 lg:p-5">
                                        <h1 className="text-sm"><span className="font-light">Strap</span> <br /><span className="font-bold">{datas.features.strap}</span></h1>
                                        <h1 className="text-sm"><span className="font-light">WaterResistance</span><br />
                                            <span className="font-bold">{datas.features.waterResistance}</span></h1>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-col flex-wrap gap-5 justify-start lg:justify-between p-0 lg:p-5">
                                        <h1 className="text-sm"><span className="font-light">Glass</span> <br /><span className="font-bold">{datas.features.glass}</span></h1>
                                        <h1 className="text-sm"><span className="font-light">DialColor</span><br />
                                            <span className="font-bold">{datas.features.dialColor}</span></h1>
                                    </div>

                                    <div className="flex flex-col flex-wrap gap-5 justify-start lg:justify-between p-0 lg:p-5">
                                        <h1 className="text-sm"><span className="font-light">PowerReserve</span> <br /><span className="font-bold">{datas.features.powerReserve}</span></h1>

                                    </div>
                                </div>
                            </div>

                            <hr className="text-[#8c8c8c]" />

                            <div>
                                <div className="flex flex-wrap gap-5 justify-start lg:justify-between p-0 lg:p-5">
                                    <h1 className="text-sm"><span className="font-light">CaseSize</span> <br /><span className="font-bold">{datas.dimensions.caseSize}</span></h1>
                                    <h1 className="text-sm"><span className="font-light">Thickness</span><br />
                                        <span className="font-bold">{datas.dimensions.thickness}</span></h1>
                                    <h1 className="text-sm"><span className="font-light">Weight</span> <br /><span className="font-bold">{datas.dimensions.weight}</span></h1>
                                </div>
                            </div>

                            <hr className="text-[#8c8c8c]" />
                            <h1 className="text-[green] text-sm">Only {datas.stock} left in stock</h1>

                            <h1 className="text-sm"><span className="me-2"><i class="ri-shield-flash-line"></i></span>{datas.features.warranty}</h1>

                            <div>
                                <button className="w-[150px] py-2 rounded-xl border bg-[black] text-white me-2 md:me-5">Add to Cart</button>
                                <button className="w-[150px] py-2 rounded-xl border bg-[black] text-white">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}