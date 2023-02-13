import React from 'react'
import Home from '../pages/Home'
import {Routes , Route} from 'react-router-dom'
import Adminlogin from '../Auth/Adminlogin'
import Users from '../pages/Users'
import Event from '../pages/Event'
import ViewDetails from '../pages/ViewDetails'

const Index = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Adminlogin />}/>
        <Route path='/Home' element={<Home />}/>
        <Route path='/Users' element={<Users />}/>
        <Route path='/Event' element={<Event />}/>
        <Route path='/Users/:ViewDetails' element={<ViewDetails />}/>
      </Routes>
    </div>
  )
}

export default Index
