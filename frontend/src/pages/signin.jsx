import { useState ,useCallback } from "react"

import Heading from "../components/Heading"
import SubHeading from "../components/subHeading"
import InputBox from "../components/inputBox"
import ButtonComponent from "../components/buttonComponent"
import BottomWarning from "../components/bottomWarning"

import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signin(){
  const [form , setForm] = useState({})
  const navigate = useNavigate()

  const submit = useCallback(async()=>{
    try {
      const res = await axios({
      method : 'post',
      url : 'http://localhost:5500/api/v1/user/signin',
      data : form
      })
    
      if(res.data.token){
        console.log(res)
        sessionStorage.setItem('token',res.data.token)
        navigate("/dashboard")
      }
    } catch (error) {
      if(error.response.data.message.match(/Error while logging in/i)){
        alert("Error while logging in")
      }
    }
    
  },[])

  return <div className="bg-slate-300 h-screen flex justify-center items-center">
    <div className="w-96 h-max bg-white rounded p-6">
    <Heading label="Sign In" />

    <SubHeading 
      label="Enter your credentials to access your account"/>

    <InputBox 
      onChange={e => form.username = e.target.value}
      label={"Email"} placeholder={"someone@onother.com"}/>
    <InputBox 
      onChange={e => form.password = e.target.value}
      label={"Password"} placeholder={"password"}/>

    <ButtonComponent 
      onClick={submit}
      width='w-full' label="Sign In"/>

    <BottomWarning 
      label="Don't have an account?"
      url="/signup"
      urlLabel="Sign Up"/>

  </div>
  </div>
}