import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Adminlogin = () => {
  const [data, SetData] = useState({number: '' , password: ''})

 const display = (e) => {
  SetData({...data, [e.target.name] : e.target.value})
 }
    const navigate = useNavigate()

 const handleClick = (e)=> {
  e.preventDefault()
  axios({
    url: 'https://app.hayyacom.net:3009/Admin/Login',
    method: 'POST',
    // headers:{
    //     "Content-type": "JSON/Application"
    // },
    data : {
        phoneNumber: data.number,
        password: data.password
    }
 
  }).then((Response)=> {
    console.log(Response)
    if(Response.status == 200){
        navigate('/Home')
    }
  }).catch((error)=> {
    console.log(error)
  })
 }   



  return (
   <div class="hold-transition login-page">
  <div className="login-box">
  <div className="login-logo">
  <img src="/hayyacomLogo.png" className="img-circle elevation-2" alt="User Image" />
    {/* <a href="#">Admin<b>Hayyacom</b></a> */}
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Admin Login</p>
      <form >
        <div className="input-group mb-3">
          <input type="number" className="form-control" placeholder="Enter Valid Number" onChange={display} value={data.number} name='number' required/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-mobile" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" onChange={display} value={data.password} name='password' required/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>      
      <div className="social-auth-links text-center mb-3" >   
        <button type="submit" className="btn btn-block text-white"  style={{backgroundColor: "#6F0A12"}} onClick={handleClick}> 
           Login 
        </button>        
      </div>
      </form>
      {/* /.social-auth-links */}
      {/* <p className="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p> */}
   
    </div>
    {/* /.login-card-body */}
  </div>
</div>
</div>
    
  )
}

export default Adminlogin
