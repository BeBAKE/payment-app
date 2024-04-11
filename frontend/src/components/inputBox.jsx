export default function InputBox({label, placeholder ,type ,onChange}){
  return <div className="form-group">
    <div 
      className="my-2 block font-bold">{label}</div>
    <input
      className="block w-full p-2 mb-6 box-border border-2 border-grey-500 focus:outline-none rounded-md text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    >
    </input>
  </div>
}