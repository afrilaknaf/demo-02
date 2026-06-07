import { useRef } from "react"
import { toast, ToastContainer } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie";

export default function Login() {

    const queryclient = useQueryClient()
    const email = useRef("")
    const password = useRef("")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    const url = import.meta.env.VITE_URL
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn:async(payload)=>{
            let res =await fetch(`${url}api/login`,{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(payload)
            })
            return await res.json()
        },
        onSuccess:(data)=>{
            queryclient.invalidateQueries(["get_wishlist"])
            toast.success(data.msg)
            Cookies.set("User_Token",data.token,{expires:1})
            sessionStorage.setItem("Reload",true)
            email.current.value=""
            password.current.value=""
            setTimeout(()=>{
                navigate("/")
            },6000)
        },
        onError:(error)=>{
            toast.error(error)
            console.log(error)
        }
    })


    function handlesubmit(e) {
        e.preventDefault()
        if (!(emailRegex.test(email.current.value))) {
            toast.error("Invalid Email Format")
            return
        }
        if (!(passwordRegex.test(password.current.value))) {
            toast.error("Invalid Password Format")
            return
        }

        let payload = {
            Email:email.current.value,
            Password:password.current.value
        }

        mutation.mutate(payload)
    }

    return (
        <>
            <div className="w-full h-[100vh] realtive">

                <img src="https://media.rolex.com/rolexcom/094398bf1f99/media/wallpapers/yacht-master-ii/m126680-0001_3840x2160.jpg?imformat=generic" alt="" className="w-full h-full object-cover absolute" />

                <div className="w-full h-[100%]  flex justify-center items-center">

                    <form className="absolute z-1 w-[80%] h-[50%] lg:w-[30%] lg:h-[50%] bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl flex flex-col justify-center items-center gap-6 p-5" onSubmit={handlesubmit}>
                        <h1 className="text-3xl font-extrabold">Login</h1>
                        <input required type="email" placeholder="Email" className="w-full border border-black p-2 rounded-lg text-white" ref={email} />
                        <input required type="password" placeholder="Password" className="w-full border border-black p-2 rounded-lg text-white" ref={password} />
                        <input type="submit" disabled={mutation.isPending} value={mutation.isPending?"Please Wait":"Login"} className="w-full bg-[#C91F28] font-bold text-white hover:border-white border border-black p-2 rounded-lg transition-all hover:scale-[1.1]" />
                        <div className="self-start">
                            <input type="checkbox" className="w-10 accent-[#C91F28]" id="ch" />
                            <label htmlFor="ch">Remember Me</label>
                        </div>
                        <a href="#">Don't have an Account <a href="/signup"  className="text-[#C91F28] underline font-bold">Signup</a></a>
                    </form>

                </div>
            </div>
            <ToastContainer />
        </>
    )
}