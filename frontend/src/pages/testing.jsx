import {useState} from "react"
export default function Testing(){
  const [form ,setForm] = useState({
 
  })

  // console.log(form)

  // const something = (e)=>{
  //   console.log(e.target.value)
  // }

  const debounce = ()=>{
    
  }

  const add = ()=>{
    console.log(form)
  }

  return <div className="flex flex-col gap-9 h-screen justify-center items-center">

    <input
      className="border-2 border-slate-500 h-min"
      type="text" 
      placeholder="Testing 1"
      onChange={(e)=>{
        form.a = e.target.value
      }}
      />
    <input
      className="border-2 border-slate-500 h-min"
      type="text" 
      placeholder="Testing 2"
      onChange={(e)=>{
        form.b = e.target.value
      }}
      />
    <input
      className="border-2 border-slate-500 h-min"
      type="text" 
      placeholder="Testing 3"
      onChange={(e)=>{
        form.c = e.target.value
      }}
      />
    <input
      className="border-2 border-slate-500 h-min"
      type="text" 
      placeholder="Testing 4"
      onChange={(e)=>{
        form.d = e.target.value
      }}
      />
      <button
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={add}>
          Press
      </button>
  </div>
}