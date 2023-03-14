import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import axios from 'axios'
import { BASE_URL } from '../API/config'
import { Modal ,Button } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet'

const Users = () => {
 const [user,setUser] = useState([])
 const [data,SetData] = useState({name: '', number:'', password: ''})
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [device, setDevice] = useState(false)
 const [Name,setName] = useState('')
 const [Password,setPassword] = useState('')
 const [Number,setNumber] = useState('')
 const [ID,setId] = useState('')
 const [isModalOpenadd, setIsModalOpenadd] = useState(false);
 const [IsModeldel ,setIsModeldel] = useState(false)
 

//  const [isModalVisible, setIsModalVisible] = useState(false);
 const navigate = useNavigate();

 const addModal = () => {
  setIsModalOpenadd(true);
};

 const handleOkadd = () => {
  setIsModalOpenadd(false);
};
const handleCanceladd = () => {
  setIsModalOpenadd(false);
};

const showModaldelete = () => {
  setIsModeldel(true);
 }

 const handleCanceldel = () => {
  setIsModeldel(false)
 }




 const UserAddSchema = Yup.object().shape({
  name: Yup.string()   
    .required('Please enter Name'),
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

 const showModal = () => {
   setIsModalOpen(true);
 };


const handleCancel = () => {
  setIsModalOpen(false);
};

const userUpdatetoast = () => {
  toast.success("User Data Updated Successfully !")
};

const userAddtoast = () => {
  toast.success("User Added Successfully !")
};

const userDeletetoast = () => {
  toast.error("User Data Deleted Successfully")
};
 
    const table = async() => {
       await axios({
            url: `${BASE_URL}all-user`,
            method: "GET"
        }).then((Response)=> {
            console.log(Response.data.Data)            
            setUser(Response.data.Data) 
            // console.log(Response.data.Data.EventFind)        
        }).catch((error)=> {
            console.log(error)
        })
    }

  //   const display = (e) =>{
  //       SetData({...data, [e.target.name]: e.target.value})
  //   }
  //  const Createuser = async(e) => {
    
  //   e.preventDefault()
  //  await axios({
  //       url: `${BASE_URL}create-user`,
  //       method: 'POST',
  //       data: {
  //           name: data.name,
  //           phoneNumber: data.number,
  //           password: data.password
  //       }        
  //   }).then((response)=> {
  //       console.log(response)
  //     if(response.data.status===200){
  //       userAddtoast()
  //     }
  //       SetData({name: '', number:'', password: ''})
  //       table()
  //   }).catch((error)=> {
  //       console.log(error)
  //   })
  //  }


   const getUpdateData = async(id,e) => {
    // e.preventDefault()
    await axios({
        url: `${BASE_URL}get-user/${id}`,
        method: 'GET'
    }).then((response) => {
        console.log(response.data.Data)
        setDevice(response.data.Data)
        const article = response.data.Data
        setName(article.name)
        setNumber(article.phoneNumber)
        setPassword(article.password)
        setId(article.id)

    }).catch((error)=> {
        console.log(error);
    })
   }

   const UpdateData = async(e) => {
    e.preventDefault()
    console.log(ID,Name,Number,Password)
    const updateSubmit ={        
      name: Name,
      phoneNumber: Number,
      password: Password,
      id: ID
    }
    console.log(updateSubmit)
    const SubmitUpdate = await axios.put(`${BASE_URL}edit-user`, updateSubmit)
    console.log(SubmitUpdate)  
      if(SubmitUpdate.data.status===200){
        userUpdatetoast();
        console.log("update toast")
      }
    table()
      }


     const viewDetails = (param) => {
      console.log(param)     
      // navigate('/viewDetails')
      navigate(`/${param}`)
      }

      const AddEvent = (id) => {
        navigate(`/AddEvent/${id}`)
      }

      useEffect(()=>{
        table()
       
    },[])

  return (
    <Container>
      <Helmet>
       <meta charSet="utf-8" />
       <title>Users</title>
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
 
    <div className='content-wrapper'>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h3 style={{color: '#6F0A12'}}>Users Data</h3>
          </div>    
   
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right mr-5"> 
            <p type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">          
              <button className="btn text-white" style={{backgroundColor:"#6F0A12"}} onClick={addModal}>Add User   <i className='fas fa-plus'/></button></p>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="container-fluid">
   <div className="row">
  <div className="col-12">
    <div className="card">
    
      {/* /.card-header */}
      <div className="card-body table-responsive p-0">
        <table className="table table-hover text-nowrap">
          <thead>
            <tr>
              <th>S.No</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Password</th>
              <th>Login From</th>
              <th>Action</th>
            </tr>
          </thead>
          {user.map((data,index)=>{
            return(
                <tbody key={index}>
                <tr>
                  <td>{index+1}</td>
                  <td><span className='ml-3'>{data.id}</span></td>
                  <td>{data.name}</td>
                  <td>{data.phoneNumber}</td>
                  <td><span className='ml-3'>{data.password}</span></td>
                  <td><span className='ml-2'>{data.device_type==="android" || data.device_type==="ios" ? data.device_type : "Not Login" }</span>
                  </td>
                  {/* <td>{data.device_type}</td> */}
                  <td onClick={() => getUpdateData(data.id)}><i type="button" class="fas fa-edit ml-2"  onClick={showModal}/>
                  <i type="button" /* onClick={() => { setIsModalVisible(true); }}  */  
                  class="fas fa-trash ml-3"  onClick={showModaldelete}
                  // onClick={async() =>
                  // {let res = await axios.delete(`${BASE_URL}delete-user`,{data:{
                  //   id:data.id}}
                  //    )               
                  //    console.log(res);
                  //    if(res.data.status===200){
                  //     userDeletetoast()
                  //    }
                  //    table()
                  //     }                        
                  //          }  
                           />
                           {data.EventFind === true ? 
                       <button className='btn ml-4 text-white' onClick={()=> viewDetails(data.id)} style={{backgroundColor: '#6F0A12'}}> View Event</button>  :
                       <button className='btn ml-4 text-white' style={{backgroundColor: '#6F0A12'}}
                       /* onClick={()=> viewDetails(data.id)}     */                   
                        onClick={()=>AddEvent(data.id)}>Add Event</button>
                          }                        
                           </td>                     
                </tr>                     
              </tbody>
            )            
          })}      
        </table>        
     
     {/* Delete Model Start */}
     <Modal title="Delete Confirmation" open={IsModeldel} /* onOk={handleOk} */ onCancel={handleCanceldel} footer={false}>
        <p>Are you sure you want to delete user event? </p>
        <button type="info" data-bs-dismiss="modal" className="btn text-white" style={{backgroundColor:"#6F0A12"}}
             onClick={async() =>
                  {let res = await axios.delete(`${BASE_URL}delete-user`,{data:{
                    id:ID}}
                     )               
                     console.log(res);
                     handleCanceldel()
                     if(res.data.status===200){
                      userDeletetoast()
                     }
                     table()
                      }                        
                           } 
        >Delete</button>

      </Modal>
      {/* Delete Model End */} 

{/* Add User Start */}
{/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <Formik
                initialValues={{
                  name: '',
                  number: '',
                  password: '',
                }}
                validationSchema={UserAddSchema}
                onSubmit={(values, {resetForm}) => {
                  console.log(values.number);
                  resetForm({values: ''});           

                  axios({
                    url: `${BASE_URL}create-user`,
                    method: 'POST',
                    data: {
                      name: values.name,
                      phoneNumber: values.number,
                      password: values.password
                    }

                  }).then((Response) => {
                    console.log(Response)                    

                    table()
                    if(Response.data.status===200){
                             userAddtoast()
                          }
                  
                  }).catch((error) => {
                    console.log(error)
                    
                  })
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                     <div className="input-group mb-3">
                      <Field name="name" className="form-control" placeholder="Name" />
                    
                    </div>
                    {errors.name && touched.name ? (
                      <div className="" style={{ color: '#9D0305',fontSize:'14px',marginBottom:'10px',marginTop:'-15px' }}>{errors.name}</div>
                    ) : null}
                    <div className="input-group mb-3">
                      <Field name="number" className="form-control" placeholder="Mobile number" />
                      <div className="input-group-append ">
                      
                      </div>
                    </div>
                    {errors.number && touched.number ? (
                      <div className="" style={{ color: '#9D0305',fontSize:'14px',marginBottom:'10px',marginTop:'-15px' }}>{errors.number}</div>
                    ) : null}
                    <div className="input-group mb-3">
                      <Field name="password" className="form-control"  placeholder="Password" />
                    </div>
                    {errors.password && touched.password ? (
                      <div className=""  style={{ color: '#9D0305',fontSize:'14px',marginBottom:'10px',marginTop:'-15px' }}>{errors.password}</div>
                    ) : null}
                   
                    
                   <div className="social-auth-links text-center mb-3" >
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>                 
                      <button className='btn btn-primary text-white ml-4' type="submit" data-bs-dismiss="modal"  >Add</button>
                    </div>
                  </Form>
                )}
              </Formik>
      

      </div>     
    </div>
  </div>
</div> */}


<Modal title=" Add User" open={isModalOpenadd} onOk={handleOkadd} onCancel={handleCanceladd} footer={false}>
                      <Formik
                        initialValues={{
                          name: '',
                          number: '',
                          password: '',
                        }}
                        validationSchema={UserAddSchema}
                        onSubmit={(values, { resetForm }) => {
                          console.log(values.number);
                          axios({
                            url: `${BASE_URL}create-user`,
                            method: 'POST',
                            data: {
                              name: values.name,
                              phoneNumber: values.number,
                              password: values.password
                            }

                          }).then((Response) => {
                            console.log(Response)
                            setIsModalOpenadd(false)
                            table()
                            if (Response.data.status === 200) {
                              userAddtoast();
                              resetForm({ values: '' });

                            }

                          }).catch((error) => {
                            console.log(error.response.data.message)
                            toast.error(error.response.data.message)

                          })
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form noValidate >
                            <label for="recipient-name" class="col-form-label" >Name</label>
                            <div className="input-group mb-3">
                              <Field name="name" type="name" className="form-control" placeholder="Name" />
                            </div>
                            {errors.name && touched.name ? (
                              <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.name}</div>
                            ) : null}
                            <label for="recipient-name" class="col-form-label" >Mobile number</label>
                            <div className="input-group mb-3">
                              <Field name="number" type='number' className="form-control" placeholder="Mobile number" />
                              <div className="input-group-append ">
                              </div>
                            </div>
                            {errors.number && touched.number ? (
                              <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.number}</div>
                            ) : null}
                            <label for="recipient-name" class="col-form-label" >Password</label>
                            <div className="input-group mb-3">
                              <Field name="password" className="form-control" placeholder="Password" />
                            </div>
                            {errors.password && touched.password ? (
                              <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.password}</div>
                            ) : null}
                            <div className="social-auth-links text-center mb-3" >
                              <button type="button" class="btn btn-secondary" onClick={handleCanceladd} >Close</button>
                              <button className='btn btn-primary text-white ml-4' type="submit">Add</button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </ Modal>



{/* Add User End */}


{/* Update user Data Start */}

<Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
<form onSubmit={UpdateData}>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label" >Name:</label>
            <input type="text" class="form-control" value={Name} name='name' onChange={(e) => setName(e.target.value)} />
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Phone Number</label>
            <input type="number" class="form-control" value={Number} name='number' onChange={(e)=> setNumber(e.target.value)}/>
          </div> 
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Password</label>
            <input type="password" class="form-control" value={Password} password='password' onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancel}>Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal"  onClick={handleCancel}>Update</button>
      </div>
        </form>
        </Modal>
              {/* Update user Data End */}
      </div>     
    </div>   
  </div>
</div>   
    </div>
    </section>
    </div>
   
    </Container>
  )
}

export default Users
