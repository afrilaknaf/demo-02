import { useEffect, useState } from "react"
import Videos from "../assets/Wacth.webm"
import banner from "../assets/Rolex.jpg"
import Cookies from "js-cookie"
import CryptoJs from "crypto-js"
import { useNavigate } from "react-router-dom"
import HomeProducts from "../Compoents/HomeProducts"
import Preimum from '../Compoents/Preimum_Home'
import Car from "../assets/Car.svg"
import Gift from "../assets/Gift.svg"
import Diamond from "../assets/Diamond.svg"
import { toast } from "react-toastify"
import Blog from "../Compoents/Blog"





export default function Home() {



    const navigate = useNavigate()
    let obj = [{ name: "vi", srcs: Videos }, { name: "im", srcs: banner }]
    let [change, setChange] = useState(obj[0])




    const url = import.meta.env.VITE_URL
    const token = Cookies.get("User_Token")
    const secr = import.meta.env.VITE_SECRETKEY
    const blog = [
        {
            image: "https://kalles-5-3.myshopify.com/cdn/shop/articles/pexels-pixabay-51396.webp?v=1765955180&width=1920",
            title: "Vintage Pocket Watches Hanging on Chains",
            date: "By admin on December 9, 2025",
            para1: "Hanging chain watches combine timeless craftsmanship with a bold sense of style, making them a standout accessory for those who appreciate classic elegance. Inspired by vintage pocket watches, these timepieces are designed to be worn as a statement—either draped across the neck or styled with layered chains. Their intricate dials, polished cases, and detailed engravings reflect a heritage of precision, while modern designs bring a fresh edge to this iconic look",
            para2: "What sets hanging chain watches apart is their versatility. They effortlessly transition from formal occasions to casual outfits, adding a touch of sophistication without feeling outdated. Whether paired with tailored attire or streetwear, these watches elevate your overall appearance. Many designs also feature premium materials such as stainless steel, gold plating, and sapphire glass, ensuring durability along with refined aesthetics.",
            para3: "Beyond fashion, hanging chain watches symbolize individuality and personal expression. They are more than just timekeeping devices—they tell a story of tradition, luxury, and confidence. Perfect as a gift or a personal investment, these watches appeal to collectors and style enthusiasts alike. With their unique charm and enduring appeal, hanging chain watches continue to redefine how we wear and experience time."
        },
        {
            image: "https://kalles-5-3.myshopify.com/cdn/shop/articles/pexels-ferarcosn-190819.webp?v=1766021685&width=1920",
            title: "Elegant Metal Watch with Classic Design and Multi-functional Dial",
            date: "By admin on December 9, 2025",
            para1: "Analog watches represent the essence of traditional timekeeping, combining heritage design with refined craftsmanship. Characterized by their classic hour and minute hands, these watches often feature beautifully detailed dials, Roman numerals, or minimalist markers that highlight elegance and simplicity. From luxury dress pieces to everyday wear, analog watches carry a timeless appeal that never goes out of style, making them a staple for those who value sophistication.",
            para2: "One of the biggest strengths of analog watches is their versatility and aesthetic charm. They complement both formal and casual outfits, effortlessly enhancing your overall look. Crafted with premium materials such as stainless steel, leather straps, and sapphire crystal, many analog watches are built to last while maintaining their polished appearance. Their mechanical or quartz movements also reflect the intricate engineering behind each piece, adding to their appeal for watch enthusiasts.",
            para3: "Beyond functionality, analog watches symbolize tradition, precision, and personal style. They are often seen as more than just accessories—they are expressions of taste and identity. Whether passed down through generations or chosen as a statement piece, analog watches continue to hold emotional and cultural value. With their enduring design and classic feel, they remain a preferred choice for those who appreciate timeless elegance."
        }
        , {
            image: "https://kalles-5-3.myshopify.com/cdn/shop/articles/blog-3.webp?v=1765858804&width=1200",
            title: "SPRING – SUMMER TRENDING 2026",
            date: "By admin on December 9, 2025",
            para1: "Digital watches bring a modern approach to timekeeping, focusing on functionality, accuracy, and convenience. Featuring electronic displays that show time in numeric format, these watches are designed for clarity and ease of use. Many digital watches go beyond basic timekeeping, offering features like alarms, stopwatches, backlighting, and even fitness tracking, making them highly practical for everyday life.",
            para2: "What makes digital watches stand out is their performance-driven design. They are often lightweight, durable, and built for active lifestyles, making them ideal for sports, outdoor activities, and daily wear. With materials like resin, rubber, and shock-resistant builds, digital watches are designed to withstand tough conditions while maintaining reliable performance. Their straightforward interface also makes them user-friendly for people of all ages.",
            para3: "In addition to practicality, digital watches represent innovation and modern style. They appeal to those who prioritize functionality without compromising on design, as many models now feature sleek, futuristic aesthetics. Whether used for workouts, travel, or daily routines, digital watches offer a perfect blend of technology and convenience. With their advanced features and contemporary look, they continue to evolve as essential accessories in today’s fast-paced world."
        }
    ]


    useEffect(() => {

        if (!token) {
            toast.error("Please Login!")
            return
        }

        fetch(`${url}api/profile`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}`, "Content-type": "application/json" }
        }).then((res) => res.json()).then((res) => {
            let name = CryptoJs.AES.encrypt(res.exist.Name, secr).toString()
            let email = CryptoJs.AES.encrypt(res.exist.Email, secr).toString()
            let password = CryptoJs.AES.encrypt(res.exist.Password, secr).toString()
            let id = res.exist._id
            Cookies.set("User_Details_Name", name, { expires: 5 / 24 })
            Cookies.set("User_Details_Email", email, { expires: 5 / 24 })
            Cookies.set("User_Details_Password", password, { expires: 5 / 24 })
            Cookies.set("User_Details_Role", res.exist.Role, { expires: 5 / 24 })
            Cookies.set("User_Details_id", id, { expires: 5 / 24 })
        }).catch((err) => console.log(err))
    }, [])



  



    return (
        <>
            <div className="w-[100%] h-[65vh] md:h-[80vh] lg:h-[90vh] relative top-0 overflow-x-hidden">
                {
                    change.name === "vi" ? <>
                        <video src={Videos} className="w-[100%] overflow-x-hidden h-[65vh] md:h-[80vh] lg:h-[90vh] object-cover absolute top-0" autoPlay muted loop></video>
                    </> : <>
                        <img src={banner} className="w-[100%] h-[65vh] md:h-[80vh] lg:h-[90vh] object-cover" alt="" />
                        <div className="absolute top-0 w-[100%] h-[auto] flex flex-col justity-center items-start mt-[200px] md:mt-[600px] lg:mt-[250px] gap-5 px-5 md:px-20 lg:px-40">
                            <h1 className="text-2xl font-mediumn md:text-4xl">Modern Design</h1>
                            <h1 className="text-3xl md:text-5xl font-bold">Zuo Pure Collection <br /> Sale Off 50%</h1>
                            <button className="bg-[#1d2939] p-2 px-4 text-white rounded-full" onClick={() => setChange(obj[1])}>Shop Now <span><i class="ri-arrow-right-long-line"></i></span></button>
                        </div>
                    </>
                }
                <div className="flex gap-3 absolute end-0 bottom-0 p-4">
                    <button onClick={() => setChange(obj[0])} className="p-3 px-4 bg-[#1d2939] text-white text-xl rounded-[50%] w-auto h-auto active:bg-[#C91F28]"><i class="ri-arrow-left-s-line"></i></button>
                    <button onClick={() => setChange(obj[1])} className="p-3 px-4 bg-[#1d2939] text-white text-xl rounded-[50%] w-auto h-auto active:bg-[#C91F28]"><i class="ri-arrow-right-s-line"></i></button>
                </div>
            </div>


            <div className="flex justify-center items-center">
                <div className="w-full lg:w-[70%] h-auto flex flex-col text-center justify-center items-center px-3">
                    <h1 className="text-3xl font-medium text-[#293341] my-7">Welcome to Kalles Wacth</h1>
                    <p className="text-base/7">I feel so proud of my website now! I want everyone to see it and find myself sharing the link anywhere I can. I feel so relieved
                        that this foundational part of my business is finally 'done' and the best part</p>
                    <img src="https://kalles-5-3.myshopify.com/cdn/shop/files/signature.png?v=1765269463&width=360" alt="" />
                </div>
            </div>


            <div className="w-full h-auto px-2 flex flex-col md:flex-row gap-3 justify-center items-center " >

                <div data-aos="fade-up"
                    data-aos-duration="1000" className="w-full lg:w-[50%] overflow-hidden">

                    <a href="/products">
                        <div className="relative top-0" >
                            {/* <img src="https://kalles-5-3.myshopify.com/cdn/shop/files/women-collection.jpg?v=1765269463&width=600" alt="" className="w-full lg:w-[100%] h-[250px] md:h-[615px] object-cover hover:scale-[1.1] transition-all duration-500" /> */}
                            <video src="https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/266930-source/pp-5373p-001-screen-8-9-product-loop" className="w-full lg:w-[100%] h-[250px] md:h-[615px] object-cover hover:scale-[1.1] transition-all duration-500" autoPlay muted loop></video>
                            <h1 onClick={() => navigate("/products")} className="absolute bottom-0 w-auto h-auto p-3 m-2 bg-white text-black hover:bg-black hover:text-white transition-all start-[40%] lg:start-[43%]">GetItems</h1>
                        </div>
                    </a>

                </div>

                <div data-aos="fade-up" data-aos-duration="1000" className="flex gap-5 justify-evenly items-center w-[100%] lg:w-[50%] lg:h-[615px] ">

                    <div className="flex flex-col gap-3 w-full lg:w-[220px] h-full overflow-hidden">

                        <a href="/products">
                            <div className="relative top-0">
                                <img src="https://kalles-5-3.myshopify.com/cdn/shop/files/Withings-vert.jpg?v=1765269463" alt="" className="w-full h-[250px] md:h-[300px] object-cover hover:scale-[1.1] transition-all duration-500" />
                                <h1 onClick={() => navigate("/products")} className="absolute bottom-0 w-auto h-auto p-3 m-2 bg-white text-black hover:bg-black hover:text-white transition-all start-[28%]">GetItems</h1>
                            </div>
                        </a>

                        <a href="/products">
                            <div className="relative top-0">
                                <img src="https://kalles-5-3.myshopify.com/cdn/shop/files/i2.jpg?v=1765269463" alt="" className="w-full h-[250px] md:h-[300px] object-cover hover:scale-[1.1] transition-all duration-500" />
                                <h1 onClick={() => navigate("/products")} className="absolute bottom-0 w-auto h-auto p-2 m-2 bg-white text-black  hover:bg-black hover:text-white transition-all start-[28%] ">GetItems</h1>
                            </div>
                        </a>
                    </div>

                    <div className="w-full lg:w-[310px] lg:h-[615px] overflow-hidden">
                        <a href="/products">
                            <div className="relative top-0">
                                <img src="https://kalles-5-3.myshopify.com/cdn/shop/files/accessori.jpg?v=1765269463" alt="" className="w-full h-[515px] md:h-[615px] object-cover hover:scale-[1.1] transition-all duration-500 z-1 " />
                                <h1 onClick={() => navigate("/products")} className="absolute bottom-0 start-[28%] lg:start-[34%] w-auto h-auto p-2 m-2 bg-white text-black  hover:bg-black hover:text-white transition-all">GetItems</h1>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <HomeProducts />

            <div>
                <img src="https://patek-res.cloudinary.com/dfsmedia/0906caea301d42b3b8bd23bd656d1711/6212-51883" alt="" className="w-full h-[600px] object-cover" />
            </div>

            
            <Preimum/>



            <div className="w-full h-auto md:h-[300px]  bg-[#f8f8f8] flex flex-col md:flex-row justify-center items-center gap-5 md:gap-2">
                <div className="w-full h-auto flex flex-col justify-center items-center">
                    <img src={Car} className="w-[70px] h-[70px]" alt="" />
                    <h1 className="font-bold">FREE SHIPPING</h1>
                    <p className="text-[#8c8c8c] px-5 text-center">Whether it's a sofa delivery's on the house.</p>
                </div>

                <div className="w-full h-auto flex flex-col justify-center items-center">
                    <img src={Gift} className="w-[70px] h-[70px]" alt="" />
                    <h1 className="font-bold">PREMIUM DESIGN</h1>
                    <p className="text-[#8c8c8c] px-5 text-center">Shop zillions of finds, with new arrivals added daily.</p>
                </div>

                <div className="w-full h-auto flex flex-col justify-center items-center">
                    <img src={Diamond} className="w-[50px] h-[50px]" alt="" />
                    <h1 className="font-bold">BEAUTIFUL GIFT WRAPPING</h1>
                    <p className="text-[#8c8c8c] px-5 text-center">Use the Credit Card to save on your order over $50.</p>
                </div>
            </div>

            <div className="w-full h-auto flex justify-center items-center flex-col">
                <h1 className="text-3xl font-bold">Latest From Our Blog</h1>
                <p className="text-lg text-[#8c8c8c] my-5">The freshest and most exciting news</p>

                <Blog/>
            </div>
        </>
    )
}