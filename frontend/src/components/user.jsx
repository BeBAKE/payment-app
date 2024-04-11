//? Logo.jsx + div(username) = User .jsx
import { useState } from "react"

import ButtonComponent from "./buttonComponent"
import Logo from "./logo"

import {recieverInfoAtom} from "../store/atom/recieverInfo"
import { useSetRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"

export default function User({userName , userIcon , userId}){
  const setRecieverInfo = useSetRecoilState(recieverInfoAtom) 
  const navigate = useNavigate()

  return(

  <div className="flex flex-row justify-between my-3" id={userId}>

    <div className="flex flex-row gap-4 text-black">
      <Logo 
      name={userIcon} color="bg-slate-100" h="h-8" w="w-8" textColor="text-black"
      />
      <h3 className="font-bold self-center">{userName}</h3>   
    </div>

    <ButtonComponent 
      onClick={(e)=>{
        setRecieverInfo({
          id : userId,
          name : userName,
        })
        navigate("/send")
      }}
      label="Send Money" />
  </div>
  )
}