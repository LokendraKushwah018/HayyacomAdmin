import React from 'react'
import Home from '../pages/Home'
import {Routes , Route} from 'react-router-dom'
import Adminlogin from '../Auth/Adminlogin'
import Users from '../pages/Users'
import Event from '../pages/Event'
import ViewDetails from '../pages/ViewDetails'
import Invitation from '../Gold Package/pages/Invitation'
import Receptionist from '../pages/Receptionist/Receptionist'

const Index = () => {
  return (
    <div>
      <Routes>
      <Route path='/invitation/:id/:lang' element={<Invitation />}/>
        <Route path='/Admin' element={<Adminlogin />}/>
        <Route path='/Dashboard' element={<Home />}/>
        <Route path='/Users' element={<Users />}/>
        <Route path='/Event' element={<Event />}/>
        <Route path='/:ViewDetails' element={<ViewDetails />}/>
        <Route path='/Receptionist' element={<Receptionist />} />
      </Routes>
    </div>
  )
}

export default Index
