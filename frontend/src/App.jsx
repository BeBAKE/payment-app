import {React , Suspense , lazy, useEffect} from "react"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
const Dashboard = lazy(() => import ("./pages/dashboard.jsx") )
const Send = lazy( () => import('./pages/send.jsx') )
import Signin from "./pages/signin.jsx"
import Signup from "./pages/signup.jsx"

import Testing from "./pages/testing.jsx"


function App() {

  return (
    <div className="[&_*]:box-border">
      <Router>
        <Routes>

          <Route
            path="/dashboard" 
            element={
              <Suspense fallback="Loading....">
                <Dashboard/>
              </Suspense>
            }>
          </Route>

          <Route
            path="/send"
            element={
              <Suspense fallback="Loading....">
                <Send/>
              </Suspense>
            }>
          </Route>
          
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          
        </Routes>
      </Router>
    </div>
  )
}

// function AuthChecker({children}){

//   useEffect(()=>{
    
//   })

//   if(false){
//     return <div>{children}</div>
//   }
//   else{
//     return <div>haha</div>
//   }
// }

export default App
