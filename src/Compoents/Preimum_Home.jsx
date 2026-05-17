import Loading from "./Loading"
import useGets from "../Hooks/UseGet"
import { useNavigate } from "react-router-dom"
import useWishpost from "../Hooks/UseWishlistPost"
import Cookies from "js-cookie"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"



export default function Preimum() {

    const navigate = useNavigate()
    const [wishlist, setWishlist] = useState({})


    const mutation = useWishpost()
    const { data, isLoading, isError } = useGets(`premium/get`, "premium_products")

    if (isLoading) return <Loading />

    if (isError) return <h1>Something Wents Wrong !</h1>

    const wacthes = data.data.slice(0, 4)

    function handlwishlist(product) {
        console.log(product)
        const token = Cookies.get("User_Token")
        if (token) {
            setWishlist({
                ...wishlist,
                [product._id]: !wishlist[product._id]
            })
            const userid = Cookies.get("User_Details_id")
            const productid = product._id
            const Producttype = product.wacthes
            const payload = { userId: userid, productId: productid, producttype: Producttype }
            mutation.mutate(payload)
        }
        else {
            toast.error("User is no login")
        }
    }


    return (
        <>
            <div className="w-full h-auto flex justify-center items-center flex-col mt-5">
                <h1 className="text-3xl font-bold text-center m-5">Preimum Wacthes </h1>
                <p className="w-full md:w-[800px] p-3 text-center text-lg text-[#8c8c8c]">Crafted with precision and timeless elegance, this premium watch reflects the legacy of fine watchmaking. Designed for those who appreciate luxury in every second.Elevate your everyday style with a watch that speaks of class, power, and timeless sophistication.</p>
            </div>

            {
                isLoading ? <Loading /> : <>
                    <div className="w-full  h-auto p-4 flex flex-wrap justify-center items-center gap-5">
                        {
                            wacthes.map((item, index) => (
                                <div data-aos="fade-up"
                                    data-aos-duration="1000" key={index} className="w-[280px] md:w-[315px]  h-auto p-3 hover:border hover:border-black/30 rounded-lg hover:shadow-lg relative top-0 group">
                                    <img src={item.thumbnail} loading="lazy" className="w-full h-[250px] object-contain" alt="" />
                                    <h1 className="font-bold">{item.title}</h1>
                                    <h1 className="font-bold text-[#C91F28]">${item.price}</h1>
                                    <button onClick={() => handlwishlist(item)} className="w-9 h-9 hidden group-hover:block text-xl rounded-full border absolute top-0 mt-5 ml-2">
                                        <i
                                            className={
                                                wishlist[item._id]
                                                    ? "ri-heart-fill text-red-500"
                                                    : "ri-heart-line text-black"
                                            }
                                        ></i>
                                    </button>
                                    <button onClick={() => navigate(`/quick/${item._id}`)} className="w-9 h-9 text-xl block lg:hidden rounded-full border absolute top-45 end-0 mr-5"><i class="ri-eye-line"></i></button>
                                    <button className="w-9 h-9 text-xl block lg:hidden bg-[#C91F28] text-white rounded-full border absolute top-55 mt-3 end-0 mr-5"><i class="ri-shopping-cart-2-line"></i></button>
                                    <div className="w-full h-full flex flex-col gap-3 hidden lg:block">
                                        <button onClick={() => navigate(`/quick/${item._id}`)} className="w-full h-[30px] opacity-0 lg:group-hover:opacity-100 transition-all duration-300 border bg-white text-black rounded-2xl font-bold">
                                            Quick View
                                        </button>
                                        <button className="w-full h-[30px] opacity-0 lg:group-hover:opacity-100 duration-300 bg-[#C91F28] text-white border rounded-2xl mt-2 font-bold">Quick Add</button>
                                    </div>
                                </div>

                            ))
                        }
                    </div>

                    <div className="flex justify-center items-center m-5"><button onClick={() => navigate("/preimum")} className="text-center w-[150px] h-[40px] bg-black text-white rounded-lg">More Products</button></div>

                </>
            }
            <ToastContainer />

        </>
    )
}