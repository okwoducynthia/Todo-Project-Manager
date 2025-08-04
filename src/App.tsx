import { Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from './Pages/RegisterTaskPage/RegisterPage'
import FetchTaskPage from './Pages/FetchAllTaskPage/FetchTaskPage'
import UpdateTaskPage from './Pages/UpdateTaskPage/UpdateTaskPage'
import Home from './Components/Home/Home'
import SignUpPage from './Pages/SignUpPage/SignUpPage'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-up' element={<SignUpPage/>}/>
        <Route path='/taskregister' element={<RegisterPage/>}/>
        <Route path='/allprojects' element={<FetchTaskPage/>}/>
        <Route path='/update-task/:id' element={<UpdateTaskPage/>}/>
      </Routes>
    </>
  )
}

export default App
