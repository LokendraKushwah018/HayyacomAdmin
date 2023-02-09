import React from 'react'
import Home from '../pages/Home'
import {Routes , Route} from 'react-router-dom'
import Adminlogin from '../Auth/Adminlogin'

const Index = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Adminlogin />}/>
        <Route path='/Home' element={<Home />}/>
      </Routes>
    </div>
  )
}

export default Index
