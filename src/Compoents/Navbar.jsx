import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../Compoents/Loading"
import useGets from "../Hooks/UseGet"
import Cookies from "js-cookie"

export default function Navbar() {

    const navigate = useNavigate()
    let [nav, setNav] = useState(false)

    const { data, isLoading, isError } = useGets("wishlist/get","getwishlist")


    const userid = Cookies.get("User_Details_id")

    if (!userid) {
         console.error("Please Login user")
    }

    if (isLoading) {
        return console.warn("Please Wait")
    }

    if (isError) return console.log("Something wents Wrong")

    const array = data.data

    const User_Details_id = array?.filter((item) => {
        return userid === item.userId
    })


    return (
        <>

            <div className="w-full h-12 max-sm:h-22 max-sm:flex-col max-md:h-22 max-md:flex-col max-lg:h-22 max-lg:flex-col  bg-[#293341] text-white flex justify-between max-sm:justify-center max-md:justify-center max-lg:justify-center items-center px-4">

                <ul className="flex gap-4 block max-sm:hidden max-md:hidden max-lg:hidden  z-10">
                    <li><i class="ri-phone-line"></i>&nbsp;<a className="hover:text-[#C91F28] transition-all" href="telno:+9188888912567">+9188888912567</a></li>
                    <li><i class="ri-mail-line"></i>&nbsp;<a className="hover:text-[#C91F28] transition-all" href="mailto:kalleson@gmail.com">kalleson@gmail.com</a></li>
                </ul>

                <h1>Summer Sales discount off 50%! <a className="hover:text-[#C91F28] transition-all" href="">Shop Now</a></h1>

                <ul className="flex gap-4">
                    <li><i class="ri-map-pin-user-line"></i>Location</li>
                    <li>USD</li>
                    <li>English</li>
                </ul>

            </div>

            <div className="relative top-0">
                <div className="w-full h-14 flex justify-between items-center px-15 max-sm:px-5 max-md:px-5 max-lg:px-5">

                    <h1 onClick={() => {
                        setNav(!nav)
                    }} className="text-2xl hidden max-sm:block max-md:block max-lg:block z-15"><i class="ri-menu-2-line"></i></h1>

                    <h1 className="text-3xl font-extrabold">Kalles</h1>

                    <ul className="flex gap-5 mt-4 block max-sm:hidden max-md:hidden max-lg:hidden">
                        <li onClick={() => navigate("/")} className="text-[18px] font-normal hover:text-[#C91F28] transition-all">Home</li>
                        <li onClick={() => navigate("/products")} className="text-[18px] font-normal hover:text-[#C91F28] transition-all">Products</li>
                        <li className="text-[18px] font-normal hover:text-[#C91F28] transition-all">Sale</li>
                        <li onClick={() => navigate("/blog")} className="text-[18px] font-normal hover:text-[#C91F28] transition-all">Blog</li>
                        <li className="text-[18px] font-normal hover:text-[#C91F28] transition-all">Contact</li>
                    </ul>

                    <ul className="flex gap-5">
                        <li className="text-[25px] hover:text-[#C91F28] transition-all"><i class="ri-search-line"></i></li>
                        <li onClick={() => {
                            navigate("/login")
                        }} className="text-[25px] hover:text-[#C91F28] transition-all block max-sm:hidden max-md:hidden"><i class="ri-user-line"></i></li>
                        <li onClick={() => {
                            navigate("/wishlist")
                        }} className="text-[25px] hover:text-[#C91F28] transition-all block max-sm:hidden max-md:hidden relative top-0"><i class="ri-heart-line"></i><span className="w-[20px] h-[20px] absolute top-[-3px] end-[-10px] bg-black text-white rounded-full text-center text-sm">{User_Details_id.length}</span></li>
                        <li className="text-[25px] hover:text-[#C91F28] transition-all relative top-0"><i class="ri-shopping-cart-2-line"></i><span className="w-[20px] h-[20px] absolute top-[-3px] end-[-10px] bg-black text-white rounded-full text-center text-sm">0</span></li>
                    </ul>

                </div>
            </div>


            {
                nav && <div onClick={() => {
                    setNav(!nav)
                }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]">
                </div>
            }


            <div className={`w-[70%] h-[100vh] absolute z-[110] top-0 shadow-[0px_0px_20px_black] bg-white transition-all duration-300 ease-in-out ${nav ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>

                <div className="flex">
                    <button className="w-[80%] h-[60px] bg-[#2222221A]">Menu</button>
                    <button onClick={() => {
                        setNav(!nav)
                    }} className="w-[20%] text-[20px] h-[60px] bg-[#C91F28]"><i class="ri-close-line"></i></button>
                </div>


                <ul className="flex flex-col gap-3 ">
                    <li className="text-black p-3 hover:text-[#C91F28] border-b border-[#C91F28]">Home</li>
                    <li className="text-black p-3 hover:text-[#C91F28] border-b border-[#C91F28]">Products</li>
                    <li className="text-black p-3 hover:text-[#C91F28] border-b border-[#C91F28]">Sale</li>
                    <li className="text-black p-3 hover:text-[#C91F28] border-b border-[#C91F28]">Blog</li>
                    <li className="text-black p-3 hover:text-[#C91F28] border-b border-[#C91F28]">Contact</li>
                    <li className="text-black p-3 hover:text-[#C91F28] border-b border-[#C91F28]"><span className="text-[20px]"><i class="ri-heart-line"></i></span> WishLink</li>
                    <li className="text-black p-3 hover:text-[#C91F28] border-b border-[#C91F28]"><span className="text-[20px]"><i class="ri-user-line"></i></span> Account</li>
                    <li className="text-black p-3 hover:text-[#C91F28] border-b border-[#C91F28]">

                        <div className="flex flex-col">
                            <span className="mb-2">Need Help ?</span>
                            <p>Email: <span className="font-bold">info@fashionshop.com</span></p>
                            <p>Phone: <span className="font-bold">(212) 555-1234</span></p>
                        </div>

                    </li>
                </ul>

                <div>

                </div>
            </div>
        </>
    )
}