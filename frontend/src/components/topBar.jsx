import Logo from "./logo";

export default function TopBar({userName , userIcon}){
  return <div 
  className="grid grid-cols-12 border-b-2 px-3 h-12 content-center">
    <h1 
      className='font-extrabold col-span-9 text-2xl'>
    Payments App
    </h1>

    <div 
    className="flex flex-row content-center col-span-3 justify-self-end gap-2 items-center">
      <p
        className="col-start-3 font-bold text-2xs"
      >Hello, {userName}
      </p>
      <Logo 
        name={userIcon} color="col-start-3 bg-slate-100" h="h-8" w="w-8" textColor="text-black"
      />
    </div>

    
  </div>
}

