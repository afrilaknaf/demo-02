import Cart_get from "../Hooks/Cart_get";
import { useQuery } from "@tanstack/react-query"
import Loading from "../Compoents/Loading"
import useGets from "../Hooks/UseGet"
import Cookies from "js-cookie"

export default function Cart() {
    console.log("Welcome")
    const { data, isLoading, isError } = useGets(`cart/get_data`, "cart_data")

    const user_id = Cookies.get("User_Details_id")

    if (isLoading) return <Loading />

    if (isError) return console.error("api error")

    console.log(data.data)

    const data_cart = data.data.filter((item)=>{
       return item.userId === user_id
    })
    console.log(data_cart)

   

   const normalProducts = data_cart.filter(
    item => item.producttype === "normal"
)

const premiumProducts = data_cart.filter(
    item => item.producttype === "premium"
)

    console.log(normalProducts.length)
    console.log(premiumProducts.length)
    
    return (
        <>
            <h1>{normalProducts.length}</h1>
            <h1>{premiumProducts.length}</h1>
        </>
    )
}