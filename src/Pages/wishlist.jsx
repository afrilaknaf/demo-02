import { useNavigate } from "react-router-dom"
import Loading from "../Compoents/Loading"
import useGets from "../Hooks/UseGet"
import Cookies from "js-cookie"
import wishlist from "../assets/wishlist.png"
import Wishlist_get from "../Hooks/Wishlist_get"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast, ToastContainer } from "react-toastify"

export default function Wishlist() {

  const navigate = useNavigate()
  const url = import.meta.env.VITE_URL
  const queryclient = useQueryClient()

  const mutates = useMutation({
    mutationKey:"Wishlist_delete",
    mutationFn:async(item)=>{
      const data =await fetch(`${url}wishlist/delete/${item}`,{
        method:"DELETE",
        headers:{"Content-type":"Application/json"},
      })
      return await data.json()
    },
    onSuccess:(data)=>{
      toast.success(data.msg)
      queryclient.invalidateQueries("wishlist_gets")
    },
    onError:()=>{
      toast.error("Somthing Wents Wrong")
    }
  })

  const { userid, isLoading, isError, normal, premium } = Wishlist_get()

  if (isLoading) return <Loading />
  if (isError) return <h1>Something wrong</h1>

  function handledelete(item) {
    console.log(item)
    mutates.mutate(item)
  }

  return (
    <>
      <h1 className="px-4 py-5 text-2xl font-bold">Normal</h1>
      <div className="w-full h-auto flex justify-center items-center flex-wrap gap-5 m-5">
        {
          normal?.length === 0 ? <>
            <div className="w-full h-auto  p-5 flex flex-col justify-center items-center">
              <img src={wishlist} className="w-[300px] md:w-[200px] h-auto" alt="" />
              <h1 className="text-2xl font-bold text-[#C91F28]">Empty Wishlist </h1>
            </div>
          </> : <>
            {normal?.map((item, index) => (
              <div
                key={index}
                className="w-[300px] group h-[400px] p-4 shadow-2xl transition-all duration-300 border border-gray-200 hover:border-black relative top-0 rounded-2xl mt-3 flex flex-col justify-center items-center"
              >
                <img className="w-auto h-auto" src={item.productId.images} alt={item.productId.title} />

                <h1 className="line-clamp-1 font-bold">
                  {item.productId.title}
                </h1>

                <button onClick={() => {
                  navigate(`/quick/products/${item.productId._id}`)
                }} className="w-9 h-9 text-xl rounded-full border absolute top-10 start-5 mr-5"><i class="ri-eye-line"></i></button>


                <button onClick={() => {
                  handledelete(item._id)
                }} className="w-9 h-9 text-xl rounded-full border absolute top-25 start-5 mr-5"><i class="ri-delete-bin-line"></i></button>

                <h1 className="text-[#C91F28] font-bold">₹{item.productId.price}</h1>

                <button className="w-full h-[40px] bg-[#C91F28] hidden group-hover:block text-white rounded mt-3">
                  Add to Cart
                </button>
              </div>
            ))}
          </>
        }

      </div>

      <h1 className="px-4 py-5 text-2xl font-bold">Premium</h1>


      <div className="w-full h-auto flex justify-center items-center flex-wrap gap-5 m-5 ">
        {
          premium?.length === 0 ? <>
            <div className="w-full h-auto  p-5 flex flex-col justify-center items-center">
              <img src={wishlist} className="w-[300px] md:w-[200px] h-auto" alt="" />
              <h1 className="text-2xl font-bold text-[#C91F28]">Empty Wishlist </h1>
            </div>
          </> : <>
            {premium?.map((item, index) => (
              <div
                key={index}
                className="w-[300px] group h-[430px] p-4 shadow-2xl relative top-0 transition-all duration-300 border border-gray-200 hover:border-black rounded-2xl mt-3 justify-center items-center flex flex-col"
              >
                <img className="w-[200px] h-[300px]" src={item.productId.thumbnail} alt={item.productId.title} />

                <h1 className="line-clamp-1 font-bold">
                  {item.productId.title}
                </h1>

                <button onClick={() => navigate(`/quick/${item.productId._id}`)} className="w-9 h-9 text-xl rounded-full border absolute top-10 start-5 mr-5"><i class="ri-eye-line"></i></button>

                <button onClick={() => {
                  handledelete(item._id)
                }} className="w-9 h-9 text-xl rounded-full border absolute top-25 start-5 mr-5"><i class="ri-delete-bin-line"></i></button>

                <h1 className="text-[#C91F28] font-bold">₹{item.productId.price}</h1>

                <button className="w-full h-[40px] bg-[#C91F28] hidden group-hover:block text-white rounded mt-3">
                  Add to Cart
                </button>
              </div>
            ))}
          </>
        }
      </div>

        <ToastContainer/>

    </>
  )
}