
import './App.css'
import DashBoard from './Component/DashBoard'
import Home from './Component/Home'
import Login from './Component/Login'
import Registration from './Component/Registration'
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {


  return (

    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path='/' >
          <Route element={<Login />} path="/login" />
          <Route element={<Registration />} path="/register" />
          </Route>

          <Route element={<DashBoard/>} path='/dashboard'/>
        </Routes>
      </BrowserRouter>

    </div>

  )
}

export default App
