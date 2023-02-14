import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { BASE_URL } from '../API/config';
import {Helmet} from "react-helmet"


const Adminlogin = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password")

  const togglePassword = () => {
    if(passwordType === "password"){
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  };
  const SignupSchema = Yup.object().shape({
    number: Yup.string()
      .min(10, 'mobile number should be 10 digit')
      .max(15, 'max 15 digit mobile number')
      .required('Please enter mobile number'),
    password: Yup.string()
      .min(3, 'password should be minimum 3 character')
      .max(6, 'password must be max 6 characters')
      .required('Please enter password'),
    // email: Yup.string().email('Invalid email').required('Required'),
  });

  const adminlogintoast = () => {
    toast.success("Login Successfully !")
  };
  const adminlogintoasterror = () => {
    toast.error("Invalid number/password !")
  };


  return (
    <>
    <Helmet>

    <meta charSet="utf-8" />
    <title>Admin Login</title>
    </Helmet>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        hideProgressBar
        className="toast-container"
        toastClassName="dark-toast"
        theme="colored"
        toastStyle={{ backgroundColor: '#6F0A12' }}
      />
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <img src="/hayyacomLogo.png" className="img-circle elevation-2" alt="User Image" />
           
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Admin Login</p>
              <Formik
                initialValues={{
                  number: '',
                  password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                  // same shape as initial values
                  console.log(values.number);
                  axios({
                    url: `${BASE_URL}/Admin/Login`,
                    method: 'POST',
                    data: {
                      phoneNumber: values.number,
                      password: values.password,
                    }

                  }).then((Response) => {
                    adminlogintoast();
                    console.log(Response)
                    setTimeout(() => {
                      navigate('/Dashboard')
                    }, 2000)
                  }).catch((error) => {
                    console.log(error)
                    adminlogintoasterror();
                  })
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="input-group mb-3">
                      <Field name="number" className="form-control" placeholder="Mobile number" />
                      <div className="input-group-append ">
                        <div className="input-group-text">
                          <span className="fas fa-mobile" style={{ color: '#6F0A12' }}  />
                        </div>
                      </div>
                    </div>
                    {errors.number && touched.number ? (
                      <div className="" style={{ color: '#9D0305',fontSize:'14px',marginBottom:'10px',marginTop:'-15px' }}>{errors.number}</div>
                    ) : null}
                    <div className="input-group mb-3">
                      <Field name="password" className="form-control" type={passwordType==="password" ? "password" : "text"} placeholder="Password" />
                      <div className="input-group-append">
                        <div className="input-group-text" onMouseDown={togglePassword}>
                          
                          {passwordType==="password" ? <i className="fas fa-eye-slash" style={{ color: '#6F0A12' }} /> :<i className="fas fa-eye" style={{ color: '#6F0A12' }} />}
                        </div>
                      </div>
                    </div>
                    {errors.password && touched.password ? (
                      <div className=""  style={{ color: '#9D0305',fontSize:'14px',marginBottom:'10px',marginTop:'-15px' }}>{errors.password}</div>
                    ) : null}
                   
                    
                    <div className="social-auth-links text-center mb-3" >
                      <button className='btn btn-block text-white' style={{ backgroundColor: "#6F0A12" }} type="submit">Login</button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Adminlogin
