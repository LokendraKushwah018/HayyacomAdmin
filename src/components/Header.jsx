import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const Navigate = useNavigate()

  const logout = () => {
    Navigate('/Admin')
  }
  return (
  
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
    </li>
   
  </ul>
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <a className="nav-link" data-widget="navbar-search" href="#" role="button">
        <i className="fas fa-search" />
      </a>
      <div className="navbar-search-block">
        <form className="form-inline">
          <div className="input-group input-group-sm">
            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
              <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </li>
    <li className="nav-item dropdown">
      <a className="nav-link" data-toggle="dropdown" href="#">
        <i className="fas fa-user mr-2" />
        {/* <span className="badge badge-warning navbar-badge">15</span> */}
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        {/* <span className="dropdown-item dropdown-header">15 Notifications</span> */}
        {/* <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-envelope mr-2" /> 4 new messages
          <span className="float-right text-muted text-sm">3 mins</span>
        </a> */}
        {/* <div className="dropdown-divider" /> */} 
        <a href="#" className="dropdown-item"></a>
        <div class="media">
              <img src="/hayyacomLogo.png" alt="User Avatar" class="img-size-50 mr-3 img-circle"/>
              <div class="media-body">
                <h3 class="dropdown-item-title">
                Hayyacom                 
                </h3>
               
                <p class="text-sm text-muted">View Profile</p>
              </div>
            </div>
        {/* <a href="#" className="dropdown-item">
        <img src="/hayyacomLogo.png" className="img-circle elevation-2 mr-2" alt="User Image" width={25} height={25}/>
         
          Hayyacom
          <span className="float-right text-muted text-sm">View Profile</span>
        </a> */}
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item " onClick={logout}>
          <h6 >
          <i className="fas fa-sign-out-alt mr-4" />LogOut</h6> 
          {/* <span className="float-right text-muted text-sm">2 days</span> */}
        </a>
        {/* <div className="dropdown-divider" />
        <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a> */}
      </div>
    </li>
    <li className="nav-item">
      <a className="nav-link" data-widget="fullscreen" href="#" role="button">
        <i className="fas fa-expand-arrows-alt" />
      </a>
    </li>
    {/* <li className="nav-item">
      <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
        <i className="fas fa-th-large" />
      </a>
    </li> */}
  </ul>
</nav>

   
  )
}

export default Header
