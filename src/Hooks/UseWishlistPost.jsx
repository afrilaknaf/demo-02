import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

const url = import.meta.env.VITE_URL

export default function useWishpost() {

    const queryclient =useQueryClient()

    return useMutation({
        mutationKey: "wishlist_add",
        mutationFn: async (data) => {
            const res = await fetch(`${url}wishlist/post`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            })
            return res.json()
        },
        onSuccess: (data) => {
            toast.success(data.msg)
            queryclient.invalidateQueries(["get_wishlist"])
        },

        onError: () => {
            toast.error("Something went wrong")
        }
    })

}
