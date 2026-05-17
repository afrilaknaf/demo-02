import useGets from "../Hooks/UseGet"
import Loading from "../Compoents/Loading"
import { useNavigate } from "react-router-dom"
import useWishpost from "../Hooks/UseWishlistPost"
import Cookies from "js-cookie"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"

export default function Products() {

    const navigate = useNavigate()
    const [wishlist, setWishlist] = useState({})

    const mutation = useWishpost()

    const { isLoading, isError, data } = useGets(`products/get`, "products")

    if (isLoading) return <Loading />

    if (isError) return <h1>Something Wents Wrong</h1>

    let watches = data.data.filter((item) => (item.category === "watch"));

    function handlwishlist(product) {
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
            <div className="w-full  h-auto p-4 flex flex-wrap justify-center items-center gap-5">
                {
                    watches.map((item, index) => (
                        <div data-aos="fade-up"
                            data-aos-duration="1000" key={index} className="w-[full] md:w-[315px]  h-auto p-3 hover:border hover:border-black/30 rounded-lg hover:shadow-lg relative top-0 group">
                            <img src={item.images} loading="lazy" className="w-full h-auto object-cover" alt="" />
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
                            <button onClick={() => {
                                navigate(`/quick/products/${item._id}`)
                            }} className="w-9 h-9 text-xl block lg:hidden rounded-full border absolute top-60 end-0 mr-5"><i class="ri-eye-line"></i></button>
                            <button className="w-9 h-9 text-xl block lg:hidden bg-[#C91F28] text-white rounded-full border absolute top-70 mt-3 end-0 mr-5"><i class="ri-shopping-cart-2-line"></i></button>
                            <div className="w-full h-full  bg-black lg:group-hover:bg-black/10">
                                <button onClick={() => {
                                    navigate(`/quick/products/${item._id}`)
                                }} className="w-[100px] h-[30px] opacity-0 lg:group-hover:opacity-100 transition-all duration-300 border bg-white text-black rounded-2xl absolute top-36 left-28">
                                    Quick View
                                </button>
                                <button className="w-[100px] h-[30px] opacity-0 lg:group-hover:opacity-100 duration-300 bg-[#C91F28] text-white border rounded-2xl absolute top-45 start-28">Quick Add</button>
                            </div>
                        </div>

                    ))
                }
            </div>
            <ToastContainer />
        </>
    )
}