import Loading from "../Compoents/Loading"
import useGets from "../Hooks/UseGet"
import Cookies from "js-cookie"

export default function Wishlist() {

  const { data, isLoading, isError } = useGets(`wishlist/getdata`)

  if (isLoading) return <Loading />

  if (isError) return <h1>Something went Wrong</h1>

  const userids = Cookies.get("User_Details_id")

  const userid = data.data.filter((item) => {
    return item.userId === userids && item.productId !== null
  })

  const normal = userid.filter((item) => {
    return item.productId.wacthes === "normal"
  })

  const premium = userid.filter((item) => {
    return item.productId.wacthes === "premium"
  })

  console.log("userid", userid)
  console.log("normal", normal)
  console.log("premium", premium)

  return (
    <>
      <h1>Wishlist</h1>

      {userid.map((item) => (
        <div key={item._id}>
          <h2>{item.productId.title}</h2>
          <p>{item.productId.price}</p>
          <img src={item.productId.images?.[0]} width="150" />
        </div>
      ))}
    </>
  )
}