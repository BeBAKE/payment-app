import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Heading from "../components/Heading"
import InputBox from "../components/inputBox"
import Logo from "../components/logo"

import {useRecoilValue} from "recoil"
import { recieverInfoAtom } from "../store/atom/recieverInfo"

import axios from "axios"

export default function Send(){
  const userInfo = useRecoilValue(recieverInfoAtom) // userInfo = { name , id }
  const [token , setToken] = useState("")
  const [amount ,setAmount] = useState('')
  const [isSuccess ,setIsSuccess] = useState(false)

  useEffect(()=>{
    const token = sessionStorage.getItem("token")
    setToken(token)
  },[])

  const submit = useCallback(async (e)=>{
    setIsSuccess(prev => false)
    try {
      const response = await axios({
        method : 'post',
        url : "http://localhost:5500/api/v1/account/transfer",
        headers : {
          Authorization : `Bearer ${token}`
        },
        data : {
          to : userInfo.id,
          amount : amount
        }
      })
      if(response.status === 200 ){
        setIsSuccess(prev => prev=true)
      }
    } catch (error) {
      const msg = error.response.data.message
      if(msg.match(/invalid/i) || msg.match(/insufficient/i)){
        alert(msg)
      }
    }
  },[token,amount])

  const inputChange = useCallback((e)=>{
    setAmount(e.target.value)
  },[])

  if(!token){
    return <div className="flex flex-col gap-8 justify-center items-center h-screen">
      <div 
      className="text-4xl font-extrabold">
        Not Authorized
      </div>
      <div 
      className="text-xl font-md">
        <Link to={"/signin"}>Sign In</Link> / <Link to={"/signup"}>Sign Up</Link>
      </div>
    </div>
  }

  if(userInfo.name === "" || userInfo.id === ""){
    return <div className="flex justify-center items-center h-screen bg-slate-300">
      <div >
        Something went wrong , try again <br/>
        (P.S - do not refresh this window)
      </div>
    </div>
  }

  return(
    <div className="flex justify-center items-center bg-slate-100 h-screen">

      <div className="w-96 h-max bg-white p-8 shadow-md rounded">

        <div className="mb-6">
          <Heading label="Send Money"/>
        </div>

        <div className="flex flex-row gap-2">
          <Logo name={userInfo.name[0]} color="bg-green-500" h="h-12" w="w-12" textSize="text-2xl" textColor="text-white" />

          <div className="self-center font-bold text-3xl">
            {userInfo.name}
            </div>
        </div>

        <InputBox id="amount" label="Amount (in Rs)" placeholder="Enter amount" type="number" onChange={inputChange}/>

        <button
          onClick={submit}
          className={`w-full px-3 py-2 text-xs font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-700`}>Initiate Transfer</button>
        <div
          className={isSuccess ? 
            "flex justify-center items-center mt-8 text-green-500" 
              : 
            "hidden"}
        >Transfer Successfull</div>

      </div>
    </div>
  )
}