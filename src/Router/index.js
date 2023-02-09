import React from 'react'
import Home from '../pages/Home'
import {Routes , Route} from 'react-router-dom'

const Index = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
    </div>
  )
}

export default Index
