import React from 'react'
import { useNavigate } from 'react-router-dom'

const Adminlogin = () => {
    const navigate = useNavigate()

const update = () => {
   navigate('/Home')
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
      <form action="../../index3.html" method="post">
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Email" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
    
      </form>
      <div className="social-auth-links text-center mb-3" >
   
        <button type="submit" className="btn btn-block text-white" onClick={update} style={{backgroundColor: "#6F0A12"}}> 
           Login 
        </button>
        
      </div>
      {/* /.social-auth-links */}
      <p className="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p>
   
    </div>
    {/* /.login-card-body */}
  </div>
</div>
</div>
    
  )
}

export default Adminlogin
