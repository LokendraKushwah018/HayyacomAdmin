import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  <a  className="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <small className="brand-text font-weight-light">Admin Hayyacom</small>
  </a>
  <div className="sidebar">
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="/hayyacomLogo.png" className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <a className="d-block" >Hayyacom</a>
      </div>
    </div>
    <div className="form-inline">
      {/* <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div> */}
    </div>
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li className="nav-item ">
          <Link to="/Dashboard" className="nav-link ">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p> Dashboard </p>
          </Link>       
        </li>     
        <li className="nav-item">
          <Link to='/Users' className="nav-link">
            <i className="nav-icon fas fa-users" />
            <p> Users </p>
          </Link>       
        </li>     
        <li className="nav-item">
          <Link to='/Event' className="nav-link">
            <i className="nav-icon fas fa-edit" />
            <p>  Events </p>
          </Link>      
        </li>
   
        <li className="nav-item">
          <Link to='/Receptionist' className="nav-link">
            <i className="nav-icon fas fa-table" />
            <p>Receptionists </p>
          </Link>       
        </li>        
        {/* <li className="nav-item">
          <a  className="nav-link">
            <i className="nav-icon far fa-calendar-alt" />
            <p>Calendar </p>
          </a>
        </li>
        <li className="nav-item">
          <a  className="nav-link">
            <i className="nav-icon far fa-image" />
            <p> Gallery </p>
          </a>
        </li>
        <li className="nav-item">
          <a  className="nav-link">
            <i className="nav-icon fas fa-search" />
            <p> Search</p>
          </a>       
        </li>        */}
      </ul>
    </nav>
  </div>
      <aside class="control-sidebar control-sidebar-dark">
      </aside>
    </aside>


  )
}

export default Sidebar
