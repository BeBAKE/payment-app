export default function Logo({name,color,textColor,h,w,textSize}){

  if(name){
    name = name.toUpperCase()
  }

  return (
  <div className={`flex flex-row justify-center ${color} rounded-full ${h} ${w} ${textSize} ${textColor}`}>
    <p className="self-center">
    {name}
    </p>
  </div>
  )
}