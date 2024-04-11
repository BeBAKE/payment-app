import { useCallback, useMemo ,useState} from "react"
import { Link, useNavigate } from "react-router-dom"

import Heading from "../components/Heading"
import SubHeading from '../components/subHeading'
import InputBox from "../components/inputBox"
import ButtonComponent from "../components/buttonComponent"
import BottomWarning from "../components/bottomWarning"

import axios from "axios"

export default function Signup(){

  const [form ,setForm] = useState({})
  const navigate = useNavigate()


  const submit = useCallback(async()=>{
    try {
      const res = await axios({
      method : 'post',
      url : 'http://localhost:5500/api/v1/user/signup',
      data : form
    })

    if(res.data.token){
      sessionStorage.setItem("token" , res.data.token)
      navigate("/dashboard")
    }
    } catch (error) {
      alert(error.response.data.message)
    }
  },[])
  


  return <div className="bg-slate-300 h-screen flex justify-center items-center">

    <div className="p-6 w-96 bg-white h-max rounded">

    <Heading label="Sign Up"/>

    <SubHeading 
      label="Enter your information to create an account"/>

    <InputBox 
      onChange={e => form.firstName = e.target.value}
      label={"First Name"} placeholder={"John"}/>
    <InputBox 
      onChange={e => form.lastName = e.target.value}
      label={"Last Name"} placeholder={"Doe"}/>
    <InputBox 
      onChange={e => form.username = e.target.value}
      label={"Email"} placeholder={"someone@onother.com"}/>
    <InputBox 
      onChange={e => form.password = e.target.value}
      label={"Password"} placeholder={"password"}/>

    <ButtonComponent width="w-full" label="Sign Up" onClick={submit}/>

    <BottomWarning 
      label="Already have an account?"
      url="/signin"
      urlLabel="Login"
    />

    {/* <button onClick={()=>console.log(sessionStorage.getItem("token"))}>click</button> */}

  </div>
  </div>


  // return <div className="mx-auto w-6/12 h-screen">
  //   <Heading label="Sign Up"/>

  //   <SubHeading 
  //     label="Enter your information to create an account"/>

  //   {input.map((e)=>{
  //     return <InputBox key={e.id} label={e.label} placeholder={e.placeholder}/>
  //   })}

  //   <ButtonComponent width="w-full" label="Sign Up"/>

  //   <BottomWarning 
  //     label="Already have an account?"
  //     url="/signin"
  //     urlLabel="Login"/>
  // </div>
}




// const InputBoxs = ()=>{
//   return <>
//     <form>
//       <div className="form-group">
//         <label htmlFor="firstName">First Name</label>
//         <input
//           type="text"
//           id="firstName"
//           placeholder="John"/>
//       </div>
//       <div className="form-group">
//         <label htmlFor="lastName">Last Name</label>
//         <input
//           type="text"
//           id="lastName"
//           placeholder="Doe"/>
//       </div>
//       <div className="form-group">
//         <label htmlFor="email">Email</label>
//         <input
//           type="text"
//           id="email"
//           placeholder="someone@other.com"/>
//       </div>
//       <div className="form-group">
//         <label htmlFor="password">Password</label>
//         <input
//           type="text"
//           id="password"
//           placeholder="someComplexPassword"/>
//       </div>
//     </form>
//   </>
// }

