export default function ButtonComponent({label,width ,onClick}){
  return <div>
    <button
      className={`${width} px-3 py-2 text-xs font-medium text-center text-white bg-gray-950 rounded-lg hover:bg-gray-800`}
      onClick={onClick}
    >{label}</button>
  </div>
}
