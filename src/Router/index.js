import React from 'react'
import Home from '../pages/Home'
import {Routes , Route} from 'react-router-dom'
import Adminlogin from '../Auth/Adminlogin'
import Users from '../pages/Users'

const Index = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Adminlogin />}/>
        <Route path='/Home' element={<Home />}/>
        <Route path='/Users' element={<Users />}/>
      </Routes>
    </div>
  )
}

export default Index
