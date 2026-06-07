import {   useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Cart_Post(){

    const queryclient = useQueryClient()

    const url = import.meta.env.VITE_URL
    return useMutation({
        mutationKey:"Cart_post",
        mutationFn:async(item)=>{
            const data = await fetch(`${url}cart/post`,{
                method:"POST",
                headers:{ "Content-type": "application/json" },
                body:JSON.stringify(item)
            })
            return await data.json()
        },
        onSuccess:(data)=>{
            toast.success(data.msg)
            queryclient.invalidateQueries("cart_data")
        },
        onError:()=>{
            toast.error("Something Wents Wrong")
        }
    })


}