import { useCallback, useEffect, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

import InputBox from '../components/inputBox'
import TopBar from '../components/topBar'
import UserBalance from '../components/userBalance'
import User from '../components/user'

import axios, { all } from 'axios'
import { jwtDecode } from 'jwt-decode'


export default function Dashboard(){
  const [userBalance , setUserBalance] = useState(0)
  const [userName , setUserName] = useState("")
  const [senderId , setSenderId] = useState("")
  const [userList ,setUserList ] = useState([])
  const [token , setToken] = useState("")
  const [bulk ,setBulk] = useState([])

  const navigate = useNavigate()
  
  useEffect(()=>{
    const token = sessionStorage.getItem("token")
    setToken(token)
    const getbalance = async ()=>{
      try {
        const balance = await axios({
        method : 'get',
        url : 'http://localhost:5500/api/v1/account/balance',
        headers : {
          Authorization : `Bearer ${token}`
          }
        })
        setUserBalance(balance.data.balance)
        setUserName(jwtDecode(token).firstName)
        setSenderId(jwtDecode(token).userId)
      } catch (error) {
        //! if there is token and it is invalid 
        if(error.response.data.message.match(/invalid authorization/i)){
          alert("invalid authorization")
          navigate("/signin")
        }
      }
    }

    getbalance()

  },[])

  useEffect(()=>{
    const getAllUsers = async()=>{
      try {
        const allUsers = await axios({
          method : 'get',
          url : 'http://localhost:5500/api/v1/user/bulk',
          headers : {
            Authorization : `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        setUserList(allUsers.data)
        setBulk(allUsers.data)
      } catch (error) {
        // console.log(error.response.data.message)
      }
    }

    getAllUsers()
  },[])


  const getUser = useCallback(async(e)=>{
    const filter = e.target.value.trim() 
    if(filter){
      const user = await axios({
        method : 'get',
        url : `http://localhost:5500/api/v1/user/bulk?filter=${e.target.value}`,
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      setUserList(user.data.user)
    }
    else{
      setUserList(bulk)
    }
  },[token,bulk])

  if(!token){
    return <div className='flex flex-col justify-center items-center h-screen gap-8'>
      <div
        className='font-extrabold text-4xl'>
        Invalid Authorization
      </div>
      <div className='text-xl'>
        <Link to={"/signin"}>Sign In</Link> / <Link to={"/signup"}>Sign Up</Link>
      </div>

    </div>
  }


  return <div>
    <TopBar userName={userName} userIcon={userName[0]}/>

    <div className='mx-4'>

      <UserBalance balance={userBalance}/>

      <InputBox 
        label="User" 
        id="users" 
        onChange={getUser}
        placeholder="Search users..." />

      {userList.map((user,index)=>{
        if(user._id === senderId){
          return
        }
        return <User 
          key={index} 
          userId={user._id} 
          userName={`${user.firstName} ${user.lastName}`} 
          userIcon={user.firstName[0]}/>
      })}

    </div>


  </div>
}