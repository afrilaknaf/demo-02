import useGets from "../Hooks/UseGet"
import Cookies from "js-cookie"

export default function Wishlist_get() {
    const { data } = useGets(`wishlist/getdata`,"wishlist_gets")

    const userids = Cookies.get("User_Details_id")

    const userid = data?.data?.filter((item) => {
        return item.userId === userids && item.productId !== null
    })

    const normal = userid?.filter((item) => {
        return item.productId.wacthes === "normal"
    })

    const premium = userid?.filter((item) => {
        return item.productId.wacthes === "premium"
    })

    return { userid, normal, premium };
}