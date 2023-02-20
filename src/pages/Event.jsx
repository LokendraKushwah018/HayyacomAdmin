import { logDOM } from '@testing-library/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../API/config'
import Container from '../components/Container'
import { Modal  } from 'antd';
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Event = () => {
    const [get,SetGet] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createData, SetcreateData] = useState({id: '' , url: "" , types: '', ptype: '' , date: '' , title: '' , notes: '' , hallID: '' , totalrecep: '' , number: ""})
    const [ID,setID] = useState('')
    const [URL,setURL] = useState('')
    const [TYPES,setTYPES] = useState('')
    const [DATE,setDATE] = useState('')
    const [TITLE, setTITLE] = useState('')
    const [PTYPE,setPTYPE] = useState('')
    const [NOTES, setNOTES] = useState('')
    const [HALLID, setHALLID] = useState('')
    const [NUMBER, setNUMBER] = useState('')
    const [TRECEPT, setTRECEPT] = useState('')
    const [isModalOpenadd, setIsModalOpenadd] = useState(false);


    const showModaladd = () => {
      setIsModalOpenadd(true);
    };
  
    const handleCanceladd = () => {
      setIsModalOpenadd(false);
    };


    const showModal = () => { 
      setIsModalOpen(true);
    };   
   
   const handleCancel = () => {
     setIsModalOpen(false);
   };


   const UserAddSchema = Yup.object().shape({
    id: Yup.string()
      .required('Please enter id'),
    locationurl: Yup.string()
      .required('Please enter location url'),
    type: Yup.string()
      .required('Please enter type'),
    packagetype: Yup.string()
      .required('Please enter package type'),
    eventDate: Yup.string()
      .required('Please enter date'),
    eventtitle: Yup.string()
      .required('Please enter title'),
    notes: Yup.string()
      .required('Please enter notes'),
    // partyhallId: Yup.string()
    //   .required('Please enter partyhallId'),
    total_receptionist: Yup.string()
  
      .required('Please enter total receptionist'),
    eventContact: Yup.string()
      .required('Please enter event Contact'),
      partyhallId: Yup.string()
      .required('Please enter party hall id'),
    // email: Yup.string().email('Invalid email').required('Required'),
  });



    const getEvent = async() => {
       await axios({
        url: `${BASE_URL}/all-event`,
        method: 'GET'
       }).then((res)=> {
        console.log(res.data.Data);
        SetGet(res.data.Data)
       }).catch((err) => {
        console.log(err);
       })
    }

    const display = (e) => {
      SetcreateData({...createData, [e.target.name]: e.target.value})
      
    }
  
  const addEvent = async(e,types,notes) => {
    e.preventDefault();
    console.log(types,notes);
    await axios({
      url: `${BASE_URL}/create-event`,
      method: 'POST',
      data:{
        id: createData.id,
        locationurl: createData.url,
        type: createData.types,
        packagetype: createData.ptype,
        eventDate: createData.date,
        eventtitle: createData.title,
        notes: createData.notes,
        partyhallId: createData.hallID,
        total_receptionist: createData.totalrecep,
        eventContact: createData.number
      }
    }).then((response) => {
      console.log(response);
      SetcreateData({id: '' , url: "" , types: '', ptype: '' , date: '' , title: '' , notes: '' , hallID: '' , totalrecep: '' , number: ""})

    }).catch((error) => {
      console.log(error)
    })
    getEvent();
  }

  const getupdateuserEvents = async(id) => {
      await axios({
        url: `${BASE_URL}/get-event/${id}`,
        method: 'get'
      }).then((response)=> {
        console.log(response.data.Data);
      const getupdate = response.data.Data
      setID(getupdate.id )
      setURL(getupdate.locationurl)
      setTYPES(getupdate.type)
      setPTYPE(getupdate.packagetype)
      setDATE(getupdate.eventDate)
      setTITLE(getupdate.eventtitle)
      setNOTES(getupdate.notes)
      setHALLID(getupdate.partyhallId)
      setTRECEPT (getupdate.total_receptionist)
      // setPATTEND(getupdate.paperAttendence)
      setNUMBER(getupdate.eventContact)   
      
      }).catch((error) => {
        console.log(error);
      })
  }


  const updateData = async(e) => {
    e.preventDefault()

    const updateSubmit  = {
      id : ID,
      locationurl:URL,
      type: TYPES,
      packagetype: PTYPE,
      eventDate: DATE,
      eventtitle: TITLE,
      notes: NOTES,
      partyhallId: HALLID,      
      total_receptionist: TRECEPT,
      eventContact: NUMBER
    }

    const submitAPI = await axios.put(`${BASE_URL}/edit-event`,updateSubmit)
      console.log(submitAPI)
      getEvent();
      
     
  }

    useEffect(()=> {
         getEvent();
    },[])

  return (
    <Container>
      <Helmet>

<meta charSet="utf-8" />
<title>Event</title>
</Helmet>
          <div className='content-wrapper'>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h3 style={{color: '#6F0A12'}}>User Event </h3>
          </div>  
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right mr-5"> 
            <p type="button"  /* data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" */>          
              <button className="btn text-white" style={{backgroundColor:"#6F0A12"}} onClick={showModaladd}>Add Event  <i className='fas fa-plus'/></button></p>
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
      <div className="card-body table-responsive p-0">
        <table className="table table-hover text-nowrap">
          <thead >
            <tr>
              <th>S.No</th>
              <th>Event ID</th>
              <th>Date</th>
              <th >Title</th>
              <th>Notes</th>
              <th>PackageType</th>
              <th>Contact No.</th>
              <th>Paper Attendence</th>
              <th>URL</th>
              <th>Type</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          {get.map((event,index) => {
            return(
                <tbody key={index}>
                <tr>
                  <td>{index+1}</td>
                  <td ><span className='ml-3'>{event.id}</span></td>
                  <td>{event.eventDate}</td>                 
                  <td>{event.eventtitle} </td>
                  <td>{event.notes}</td>
                  <td>{event.packagetype}</td>
                  <td>{event.eventContact}</td>
                  <td ><span className='ml-5'>{event.paperAttendence}</span></td>
                  <td> {event.locationurl}</td>
                  <td>{event.type}</td>
                  <td onClick={()=> getupdateuserEvents(event.id)}><i type="button" class="fas fa-edit ml-3"  onClick={showModal}/>
                  <i type="button" class="fas fa-trash ml-3"  onClick={ async()=> {
                     let res = await axios.delete(`${BASE_URL}/delete-event`,{data:{
                        id:event.id
                      }})
                      console.log(res);
                      getEvent();

                  }}/>
                  
                 
                  </td>
                </tr>             
              </tbody>
            )
          })}
         
        </table>

        {/* Add user Event Model Start*/}

        <Modal title=" Add Event" open={isModalOpenadd} onCancel={handleCanceladd} footer={false}>
                    
                      <Formik
                        initialValues={{
                          id: '',
                          locationurl: '',
                          type: '',
                          packagetype: '',
                          eventDate: '',
                          eventtitle: '',
                          notes: '',
                          partyhallId: '',
                          total_receptionist: '',
                          eventContact: '',
                        }}
                        validationSchema={UserAddSchema}
                        onSubmit={(values, { resetForm }) => {
                          console.log(values.number);
                          console.log(HALLID)
                          axios({
                            url: `${BASE_URL}create-event`,
                            method: 'POST',
                            data: {
                              id: values.id,
                              locationurl: values.locationurl,
                              type: values.type,
                              packagetype: values.packagetype,
                              eventDate: values.eventDate,
                              eventtitle: values.eventtitle,
                              notes: values.notes,
                              partyhallId: values.partyhallId,
                              total_receptionist: values.total_receptionist,
                              eventContact: values.eventContact
                            }
                          }).then((Response) => {
                            console.log(Response)
                            if (Response.data.status === 200) {
                              // setIsModalOpen(false)
                              resetForm({ values: '' });
                              // ReceptionistApi();
                            }

                          }).catch((error) => {
                            console.log(error.response.data.message)

                          })
                        }}
                      >
                        {({ values, errors, touched }) => (
                          <Form noValidate>
                            <label htmlFor="recipient-name" class="col-form-label" >ID</label>
                            <div className="input-group mb-3">
                              <Field name="id" type="number" className="form-control" placeholder="Id" />
                            </div>
                            {errors.id && touched.id ? (
                              <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.id}</div>
                            ) : null}
                            <label htmlFor="recipient-name" class="col-form-label" >Location Url</label>
                            <div className="input-group mb-3">
                              <Field name="locationurl" className="form-control" placeholder="Location Url" />
                            </div>
                            {errors.locationurl && touched.locationurl ? (
                              <div className="input-group mb-3" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.locationurl}</div>
                            ) : null}
                            <label htmlFor="recipient-name" class="col-form-label" >Type</label>
                            <div className="input-group mb-3">
                              <Field name="type" className="form-control" placeholder="type" />
                            </div>
                            {errors.type && touched.type ? (
                              <div className="input-group mb-3" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.type}</div>
                            ) : null}
                            <label htmlFor="recipient-name" class="col-form-label">Package Type</label>
                            <div className="input-group mb-3">
                              <Field as="select" name="packagetype">
                                <option value="Gold">Gold</option>
                                <option value="Diamond">Diamond</option>
                                <option value="Regular">Regular</option>
                                <option value="Discount">Discount</option>
                              </Field>
                           
                            </div>
                            {errors.packagetype && touched.packagetype ? (
                              <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.packagetype}</div>
                            ) : null}
                            <label htmlFor="recipient-name" class="col-form-label" >Date</label>
                            <div className="input-group mb-3">
                              <Field name="eventDate" type='date' className="form-control" placeholder="Date" />
                              <div className="input-group-append ">
                              </div>
                            </div>
                            {errors.eventDate && touched.eventDate ? (
                              <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.eventDate}</div>
                            ) : null}

                            <label htmlFor="recipient-name" class="col-form-label" >Title</label>
                            <div className="input-group mb-3">
                              <Field name="eventtitle" className="form-control" placeholder="Title" />
                            </div>
                            {errors.eventtitle && touched.eventtitle ? (
                              <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.eventtitle}</div>
                            ) : null}
                            <label htmlFor="recipient-name" class="col-form-label" >Notes</label>
                            <div className="input-group mb-3">
                              <Field name="notes" className="form-control" placeholder="notes" />
                            </div>
                            {errors.notes && touched.notes ? (
                              <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.notes}</div>
                            ) : null}
                            <label htmlFor="recipient-name" class="col-form-label" >Phone Number</label>
                            <div className="input-group mb-3">
                              <Field name="eventContact" className="form-control" placeholder="Contact no" />
                            </div>
                            {errors.eventContact && touched.eventContact ? (
                              <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.eventContact}</div>
                            ) : null}
                            <label htmlFor="recipient-name" class="col-form-label" >Party Hall Id</label>
                            <div className="input-group mb-3">
                              <Field name="partyhallId" className="form-control" placeholder="Party Hall Id" />
                            </div>
                            {errors.partyhallId && touched.partyhallId ? (
                              <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.total_receptionist}</div>
                            ) : null}
                            <label htmlFor="recipient-name" class="col-form-label" >Total Receptionist</label>
                            <div className="input-group mb-3">
                              <Field name="total_receptionist" className="form-control" placeholder="Total Receptionist" />
                            </div>
                            {errors.total_receptionist && touched.total_receptionist ? (
                              <div className="" style={{ color: '#9D0305', fontSize: '14px', marginBottom: '10px', marginTop: '-15px' }}>{errors.total_receptionist}</div>
                            ) : null}

                            <div className="social-auth-links text-center mb-3" >
                             
                              <button className='btn btn-primary text-white ml-0' type="submit">Add</button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </Modal>





        {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Events</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form  onSubmit={addEvent}>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label" >ID</label>
            <input type="text" class="form-control" value={createData.id} onChange={display} name='id'/>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Location Url</label>
            <input type="text" class="form-control" value={createData.url} onChange={display} name='url' />
          </div> 
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Type</label>
            <input type="text" class="form-control"  value={createData.types} onChange={display} name='types'/>
          </div> 
          <div class="mb-3">
          <label for="recipient-name" class="col-form-label">Package Type : </label><br/>
  <select class="col-form-label" value={createData.ptype} onChange={display} name='ptype'>
     <option value="">Choose Package</option> 
    <option value="Gold">Gold</option>
    <option value="Diamond">Diamond</option>
    <option value="Regular">Regular</option>
    <option value="Discount">Discount</option>
  </select>
  </div>
        
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label" > Event Date</label>
            <input type="date" id="Date" class="form-control"  value={createData.date} onChange={display} name='date'/>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label" >Title</label>
            <input type="text" class="form-control" value={createData.title} onChange={display} name='title' />
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label" >Notes</label>
            <input type="text" class="form-control" value={createData.notes} onChange={display} name='notes' />
          </div>
       
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label" >Phone Number</label>
            <input type="text" class="form-control" value={createData.number} onChange={display} name='number' />
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label" >Total Receptionist</label>
            <input type="text" class="form-control" value={createData.totalrecep} onChange={display} name='totalrecep' />
          </div>
          <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" >Add</button>
      </div>
        </form>
        </div>
        </div>
        </div>
        </div> */}

        {/* Add User Event Model End */}

        {/* Udate User Event Model Start */}

        <Modal title="Update User Events" open={isModalOpen} onCancel={handleCancel} footer={null}>
<form onSubmit={updateData} >
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label" >ID:</label>
            <input type="text" class="form-control"  name='id' value={ID} onChange={(e) => setID(e.target.value)}/>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Date</label>
            <input type="date" class="form-control" name='date' value={DATE} onChange={(e) => setDATE(e.target.value)}/>
          </div> 
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Title</label>
            <input type="text" class="form-control" value={TITLE} name='title' onChange={(e) => setTITLE(e.target.value)}/>
          </div>

          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Notes</label>
            <input type="text" class="form-control" value={NOTES} onChange={(e) => setNOTES(e.target.value)}  name="notes" />
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Type</label>
            <input type="text" class="form-control"  value={TYPES} name='types' onChange={(e) => setTYPES(e.target.value)}/>
          </div>
              <div class="mb-3">
          <label for="recipient-name" class="col-form-label">Package Type : </label><br/>
  <select class="col-form-label"  name='ptype' value={PTYPE} onChange={(e) => setPTYPE(e.target.value)}  >
     {/* <option value="">Choose Package</option>  */}
    <option value="Gold">Gold</option>
    <option value="Diamond">Diamond</option>
    <option value="Regular">Regular</option>
    <option value="Discount">Discount</option>
  </select>
  </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Contact No.</label>
            <input type="text" class="form-control" value={NUMBER} name='number' onChange={(e) => setNUMBER(e.target.value)} />
          </div>
          {/* <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Paper Attendence</label>
            <input type="text" class="form-control" value={HALLID} name="" onChange={(e) => setHALLID(e.target.value)}  />
          </div> */}
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Total Receptionist</label>
            <input type="text" class="form-control" name='trecept' value={TRECEPT} onChange={(e)=> setTRECEPT(e.target.value)} />
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">URL</label>
            <input type="text" class="form-control" value={URL} name='url' onChange={(e) => setURL(e.target.value)} />
          </div>
          <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancel}>Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleCancel} >Update</button>
      </div>
        </form>
        </Modal>


        {/* Update User Event Model End */}
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

export default Event
