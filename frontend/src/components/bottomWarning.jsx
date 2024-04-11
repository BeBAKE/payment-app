import {Link} from 'react-router-dom'

export default function BottomWarning({url,urlLabel,label}){
  return <div className='pt-4 text-center'>
    <p>{label}
      <span className='underline active:text-indigo-700'>
        <Link to={url}>{urlLabel}</Link>
      </span>
    </p>
  </div>
}