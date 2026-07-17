import useGets from "../Hooks/UseGet"
import Loading from "../Compoents/Loading"
import { useNavigate } from "react-router-dom"
import useWishpost from "../Hooks/UseWishlistPost"
import Cookies from "js-cookie"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import Wishlist_get from "../Hooks/Wishlist_get"
import Cart_Post from "../Hooks/Cart_Post"

export default function HomeProducts() {

    const navigate = useNavigate()
    const [wishlist, setWishlist] = useState({})
    const mutation = useWishpost()
    const mutations = Cart_Post()
    const { data, isLoading, isError } = useGets('products/get', "products")
    const { userid, normal, premium } = Wishlist_get()

    if (isLoading) return <Loading />

    if (isError) return <h1>Something Wents Wrong</h1>


    let slice_data = data.data.slice(0, 4)



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
            const productModel = product.productModel
            const payload = { userId: userid, productId: productid, producttype: Producttype, productModel: productModel }
            mutation.mutate(payload)
        }
        else {
            toast.error("User is no login")
        }
    }

    function handlecart(item) {
        const userid = Cookies.get("User_Details_id")

        const payload = {
            userId: userid,
            productId: item._id,
            productModel: item.productModel,
            producttype: item.wacthes
        }
        mutations.mutate(payload)
    }
    


    return (
        <>
            <div className="w-full h-auto flex justify-center items-center flex-col mt-5">
                <h1 className="text-3xl font-bold text-center m-5">New Arrivals</h1>
                <p className="w-full md:w-[800px] p-3 text-center text-lg text-[#8c8c8c]">Our new arrivals bring together innovation and sophistication in every detail. Crafted for those who value both fashion and function, these watches are made to leave a lasting impression.</p>
            </div>

            {
                isLoading ? <Loading /> : <>
                    <div className="w-full  h-auto p-4 flex flex-wrap justify-center items-center gap-5">
                        {
                            slice_data.map((item, index) => {
                                const normalids = normal?.some((wish) => {
                                    return wish.productId?._id === item._id
                                })

                                return (
                                    <div data-aos="fade-up"
                                        data-aos-duration="1000" key={index} className="w-[280px] md:w-[315px]  h-auto p-3 hover:border hover:border-black/30 rounded-lg hover:shadow-lg relative top-0 group">
                                        <img src={item.images} loading="lazy" className="w-full h-auto object-cover" alt="" />
                                        <h1 className="font-bold">{item.title}</h1>
                                        <h1 className="font-bold text-[#C91F28]">${item.price}</h1>
                                        <button onClick={() => handlwishlist(item)} className="w-9 h-9 hidden group-hover:block text-xl rounded-full border absolute top-0 mt-5 ml-2">
                                            <i
                                                className={
                                                    wishlist[item._id] || normalids
                                                        ? "ri-heart-fill text-red-500"
                                                        : "ri-heart-line text-black"
                                                }
                                            ></i>
                                        </button>
                                        <button onClick={() => {
                                            navigate(`/quick/products/${item._id}`)
                                        }} className="w-9 h-9 text-xl block lg:hidden rounded-full border absolute top-45 end-0 mr-5"><i class="ri-eye-line"></i></button>
                                        <button onClick={() => {
                                            handlecart(item)
                                        }} className="w-9 h-9 text-xl block lg:hidden bg-[#C91F28] text-white rounded-full border absolute top-55 mt-3 end-0 mr-5"><i class="ri-shopping-cart-2-line"></i></button>
                                        <div className="w-full h-full  bg-black lg:group-hover:bg-black/10">
                                            <button onClick={() => {
                                                navigate(`/quick/products/${item._id}`)
                                            }} className="w-[100px] h-[30px] opacity-0 lg:group-hover:opacity-100 transition-all duration-300 border bg-white text-black rounded-2xl absolute top-36 left-28">
                                                Quick View
                                            </button>
                                            <button onClick={()=>{
                                                handlecart(item)
                                            }} className="w-[100px] h-[30px] opacity-0 lg:group-hover:opacity-100 duration-300 bg-[#C91F28] text-white border rounded-2xl absolute top-45 start-28">Quick Add</button>
                                        </div>
                                    </div>)

                            })
                        }
                    </div>
                </>
            }

            <div className="flex justify-center items-center m-5"><button onClick={() => navigate("/products")} className="text-center w-[150px] h-[40px] bg-black text-white rounded-lg">More Products</button></div>

            <ToastContainer />

        </>
    )
}