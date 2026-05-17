import Loading from "../Compoents/Loading"
import useGets from "../Hooks/UseGet"
import Cookies from "js-cookie"

export default function Wishlist(){

    const {data,isLoading,isError}=useGets("wishlist/get","get_wishlist")

    if(isLoading) return <Loading/>
    
    if(isError) return <h1>Something wents Wrong</h1>

    const array = data.data

    const userid = Cookies.get("User_Details_id")
    
    const User_Details_id = array?.filter((item)=>{
      return  userid === item.userId
    })

    console.log(User_Details_id)

    return(
        <>
        <h1>Wishlist</h1>
        </>
    )
}