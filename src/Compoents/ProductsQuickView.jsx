import { useParams } from "react-router-dom"
import useGets from "../Hooks/UseGet"
import Loading from "./Loading"


export default function ProductsQuickview(){

    const datas = useParams()
    let id = datas.id

    let {data,isLoading,isError} = useGets(`products/quick/${id}`,'Products_quick')


    if(isLoading) return <Loading/>

    if(isError) return <h1>Something Wents Wrong</h1>
    const msg = data.data


    return(
        <>
        <div className="w-full h-auto p-3 flex flex-col md:flex-row justify-center items-center ">
            <div className="w-[400px] h-[400px] flex justify-center items-center">
                <img  className="w-[400px] h-[400px] object-cover" src={msg.images[0]} alt="" />
            </div>

            <div className="w-[100%] lg:w-[50%] p-3 flex gap-3 flex-col  h-auto ">
                <h1 className="text-lg font-bold">{msg.title}</h1>
                <h1 className="text-xl text-[#8c8c8c]">₹{msg.price}</h1>
                <h1 className="text-md text-[#8c8c8c] leading-6">{msg.story}</h1>

            <button className="mt-5 w-[150px] py-2 bg-black text-white rounded">Add to Cart</button>

            <div className="flex flex-wrap gap-4">
                <span className="font-bold border px-2 py-1 rounded-xl">Size Guide</span>
                <span className="font-bold border px-2 py-1 rounded-xl">Delivery & Return</span>
                <span className="font-bold border px-2 py-1 rounded-xl">Ask a Question</span>
            </div>

            <div className="flex flex-col gap-4">
                <span><span className="text-[#8c8c8c] me-1">Availability:</span>{msg.stock}</span>
                <span><span className="text-[#8c8c8c] me-1">SKU:</span> Watches 08</span>
                <span><span className="text-[#8c8c8c] me-1">Categories:</span> All Sale Watches</span>
            </div>

            <div className="flex gap-2">
                <span className="text-3xl"><i class="ri-pinterest-fill"></i></span>
                <span className="text-3xl"><i class="ri-youtube-fill"></i></span>
                <span className="text-3xl"><i class="ri-facebook-circle-fill"></i></span>
                <span className="text-3xl"><i class="ri-whatsapp-line"></i></span>
                <span className="text-3xl"><i class="ri-telegram-fill"></i></span>
                <span className="text-3xl"><i class="ri-twitter-x-line"></i></span>
                <span className="text-3xl"><i class="ri-tumblr-fill"></i></span>
                <span className="text-3xl"><i class="ri-mail-line"></i></span>
            </div>
            </div>

        </div>

        <div className="w-full h-auto mb-4 bg-[#F6F6F8] p-5 flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
                <h1 className="px-3 py-2 border rounded-full m-5 font-bold text-lg">Description</h1>
            </div>

            <div className="w-[100%] md:w-[80%] text-justify mb-3">
                <h1 className="text-md md:text-lg font-bold mb-3">Viverra a consectetur</h1>
                <span className="text-md md:text-lg text-[#8c8c8c] italic">Go sporty this summer with this vintage navy and white striped v-neck t-shirt from the Nike. Perfect for pairing with denim and white kicks for a stylish sporty vibe.</span>
            </div>

            <div className="w-[100%] md:w-[80%] text-justify mb-3">
                <h1 className="text-md md:text-lg font-bold mb-3">Facilisis scelerisque mi</h1>
                <span className="text-md md:text-lg text-[#8c8c8c]">Typography is the work of typesetters, compositors, typographers, graphic designers, art directors, manga artists, comic book artists, graffiti artists, and now—anyone who arranges words, letters, numbers, and symbols for publication, display, or distribution—from clerical workers and newsletter writers to anyone self-publishing materials.</span>
            </div>


            <div className="w-[100%] md:w-[80%] text-justify mb-3">
                <h1 className="text-md md:text-lg font-bold mb-3">Ullamcorper metus</h1>
                <span className="text-md md:text-lg text-[#8c8c8c]">As the capability to create typography has become ubiquitous, the application of principles and best practices developed over generations of skilled workers and professionals has diminished. Ironically, at a time when scientific techniques.</span>
            </div>

            <div className="w-[100%] md:w-[80%] text-justify mb-3">
                <h1 className="text-md md:text-lg font-bold mb-3">Dignissim a leo cum</h1>
                <span className="text-md md:text-lg text-[#8c8c8c]">Digitization opened up typography to new generations of previously unrelated designers and lay users, and David Jury, head of graphic design at Colchester Institute in England, states that “typography is now something everybody does. As the capability to create typography has become ubiquitous, the application of principles and best practices developed over generations of skilled workers and professionals has diminished. Ironically, at a time when scientific techniques.</span>
            </div>
        </div>
        </>
    )
}