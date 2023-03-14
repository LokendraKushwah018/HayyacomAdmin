import React, { useEffect } from 'react'
import Container from '../../components/Container'
import { Button, Modal, Checkbox, Input } from 'antd'
import { useState } from 'react'
import { BASE_URL } from '../../API/config'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Field, Formik, Form } from 'formik'
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Receptionist = () => {
  const [receptionistdata, setReceptionistData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenid, setIsModalOpenId] = useState(false);
  const [receptionistvalues, setReceptionistValues] = useState({ receptionistName: '', phonenumber: '', city: '', password: '' })
  const [ID, setId] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [pwd, setPwd] = useState('')
  const [city, setCity] = useState('')
  const [error, setError] = useState('');
  const [isModaldel , setIsModeldel] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  const showModalid = () => {
    setIsModalOpenId(true);
  };
  const handleOkid = () => {
    setIsModalOpenId(false);
  };
  const handleCancelid = () => {
    setIsModalOpenId(false);
  };

  const showModaldelete = () => {
    setIsModeldel(true);
   }

   const handleCanceldel = () => {
    setIsModeldel(false)
   }

   const EventDeletetoast = () => {
    toast.success("User Event Deleted Successfully")
  };

  useEffect(() => {
    ReceptionistApi();
  }, [])

  const UserAddSchema = Yup.object().shape({
    name: Yup.string()
      .required('Please enter name'),
    city: Yup.string()
      .required('Please enter city'),
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

  const changevalues = (e) => {
    setReceptionistValues({ ...receptionistvalues, [e.target.name]: e.target.value });
  }

  const ReceptionistApi = async () => {
    await axios.get(`${BASE_URL}/all-receptionist`)
      .then((res) => {
        console.log(res);
        setReceptionistData(res.data.Data)
      }).catch((err) => {
        console.log(err);
      })
    }

  const receptionistid = async (id) => {
    await axios.get(`${BASE_URL}get-receptionist/${id}`)
      .then((res) => {
        //  setId(res.data.Data.id)
        console.log(ID)
        
        if (res.status === 200) {
          setIsModalOpenId(true);
        }
        console.log(res);
        const article = res.data.Data;
        setId(article.id);
        console.log(article);
        setName(article.receptionistName);
        setNumber(article.phonenumber);
        setPwd(article.password);
        setCity(article.city);

      }).catch((err) => {
        console.log(err);
      })
  }

  const UpdateReceptionistApi = async (event) => {
    event.preventDefault();
    console.log(ID)
    const editvalues = {
      id: ID,
      receptionistName: name,
      phonenumber: number,
      password: pwd,
      city: city
    }
    await axios.put(`${BASE_URL}edit-receptionist`, editvalues)
      .then((res) => {
        console.log(res);
        ReceptionistApi();
        setIsModalOpenId(false);
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hayyacom Receptionist</title>
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
                <h3>Receptionist</h3>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right mr-5">                 
                  <Button type="none" style={{ backgroundColor: '#6F0A12', color: 'white' }} size='large' onClick={showModal}><b> Add Receptionist + </b></Button>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <div class="col-12">
          <div class="card">
            <div class="card-body table-responsive p-0">
              <table class="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>User Id</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Password</th>
                    <th>City</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {receptionistdata.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.receptionistName}</td>
                        <td>{item.phonenumber}</td>
                        <td>{item.password}</td>
                        <td>{item.city}</td>
                        <td>
                          <i type="button" class="fas fa-edit ml-2" onClick={() => receptionistid(item.id)} />
                          <i type="button" class="fas fa-trash ml-2"  /* onClick={showModaldelete} */
                          onClick={async () => {
                            await axios.delete(`${BASE_URL}delete-receptionist`, {
                              data: {
                                id: item.id
                              }
                            })
                              .then((res) => {
                                if (res.status === 200) {
                                  ReceptionistApi();
                                  EventDeletetoast();
                                }
                              }).catch((err) => {
                                console.log(err);
                              })
                          }} 
                          />
                        </td>
                      </tr>
                    </tbody>
                  )
                })}

              </table>
            </div>
          </div>
        </div>
      </div>

       {/* Delete Model Start */}
       {/* <Modal title="Delete Confirmation" open={isModaldel} onCancel={handleCanceldel} footer={false}>
        <p>Are you sure you want to delete user event? </p>
        <button type="submit" data-bs-dismiss="modal" className="btn text-white" style={{backgroundColor:"#6F0A12"}}
           onClick={async () => {
            console.log(ID)
            await axios.delete(`${BASE_URL}delete-receptionist`, {
              data: {
                id: ID
              }
            })
              .then((res) => {
                if (res.status === 200) {
                  handleCanceldel()
                  ReceptionistApi();
                  EventDeletetoast();
                }
              }).catch((err) => {
                console.log(err);
              })
          }} 
        >Delete</button>

      </Modal> */}
      {/* Delete Model End */} 



       {/* Add Receptionist Model Start */}
      <Modal title=" Add Receptionist" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <div className="text-center" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{error}</div>
        <Formik
          initialValues={{
            name: '',
            number: '',
            city: '',
            password: '',
          }}
          validationSchema={UserAddSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values.number);
            axios({
              url: `${BASE_URL}create-receptionist`,
              method: 'POST',
              data: {
                receptionistName: values.name,
                phonenumber: values.number,
                city: values.city,
                password: values.password
              }

            }).then((Response) => {
              console.log(Response)
              if (Response.data.status === 200) {
                setIsModalOpen(false)
                resetForm({ values: '' });
                ReceptionistApi();
              }

            }).catch((error) => {
              setError(error.response.data.message)

            })
          }}
        >
          {({ errors, touched }) => (
            <Form noValidate>
              <label for="recipient-name" class="col-form-label" >Name</label>
              <div className="input-group mb-3">
                <Field name="name" type="name" className="form-control" placeholder="Name" />
              </div>
              {errors.name && touched.name ? (
                <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.name}</div>
              ) : null}
              <label for="recipient-name" class="col-form-label" >Phone Number</label>
              <div className="input-group mb-3">

                <Field name="number" type='number' className="form-control" placeholder="Phone number" />
                <div className="input-group-append ">
                </div>
              </div>
              {errors.number && touched.number ? (
                <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.number}</div>
              ) : null}
              <label for="recipient-name" class="col-form-label" >City</label>
              <div className="input-group mb-3">

                <Field name="city" className="form-control" placeholder="City" />
              </div>
              {errors.city && touched.city ? (
                <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.city}</div>
              ) : null}
              <label for="recipient-name" class="col-form-label" >Password</label>
              <div className="input-group mb-3">

                <Field name="password" className="form-control" placeholder="Password" />
              </div>
              {errors.password && touched.password ? (
                <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.password}</div>
              ) : null}


              <div className="social-auth-links text-center mb-3" >               
                <button className='btn btn-primary text-white ml-0' type="submit">Add</button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      {/* <Modal title=" Add Receptionist" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <form onSubmit={AddReceptionistApi}>
          <div class="mb-3">
            <label htmlFor="recipient-name" class="col-form-label" >Name</label>
            <input type="text" class="form-control" name='receptionistName' value={receptionistvalues.receptionistName} onChange={changevalues} />
          </div>
          <div class="mb-3">
            <label htmlFor="recipient-name" class="col-form-label">Phone Number</label>
            <input type="number" class="form-control" name='phonenumber' value={receptionistvalues.phonenumber} onChange={changevalues} />
          </div>
          <div class="mb-3">
            <label htmlFor="recipient-name" class="col-form-label">City</label>
            <input type="text" class="form-control" name='city' value={receptionistvalues.city} onChange={changevalues} />
          </div>
          <div class="mb-3">
            <label htmlFor="recipient-name" class="col-form-label">Password</label>
            <input type="password" class="form-control" name='password' value={receptionistvalues.password} onChange={changevalues} />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={handleCancel}>Close</button>
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </form>
      </Modal> */}
      <Modal title=" Update Receptionist" open={isModalOpenid} onOk={handleOkid} onCancel={handleCancelid} footer={false}>
        <form onSubmit={UpdateReceptionistApi}>
          <div class="mb-3">
            <label htmlFor="recipient-name" class="col-form-label" >Name</label>
            <input type="text" class="form-control" name='name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div class="mb-3">
            <label htmlFor="recipient-name" class="col-form-label">Phone Number</label>
            <input type="number" class="form-control" name='number' value={number} onChange={(e) => setNumber(e.target.value)} />
          </div>
          <div class="mb-3">
            <label htmlFor="recipient-name" class="col-form-label">City</label>
            <input type="text" class="form-control" name='city' value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div class="mb-3">
            <label htmlFor="recipient-name" class="col-form-label">Password</label>
            <input type="number" class="form-control" name='pwd' value={pwd} onChange={(e) => setPwd(e.target.value)} />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={handleCancelid}>Close</button>
            <button type="submit" class="btn btn-primary" >Update</button>
          </div>
        </form>
      </Modal>
    </Container>
  )
}

export default Receptionist
