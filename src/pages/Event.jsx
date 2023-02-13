import { logDOM } from '@testing-library/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../API/config'
import Container from '../components/Container'
import { Modal  } from 'antd';
import { Link } from 'react-router-dom'

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
    const showModal = () => { 
      setIsModalOpen(true);
    };   
   
   const handleCancel = () => {
     setIsModalOpen(false);
   };

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
          <div className='content-wrapper'>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h3>User Event </h3>
          </div>  
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right mr-5"> 
            <p type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">          
              <button className="btn text-white" style={{backgroundColor:"#6F0A12"}}>Add Event  <i className='fas fa-plus'/></button></p>
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
          <thead className="bg-dark text-white">
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
                  <td><Link to={event.locationurl}/></td>
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


        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          {/* <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Package Type</label>
            <input type="text" class="form-control" value={createData.ptype} onChange={display} name='ptype'/>
          </div> */}
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
          {/* <div class="mb-3">
            <label for="recipient-name" class="col-form-label" >Paper Attendence</label>
            <input type="text" class="form-control"  value={createData.hallID} onChange={display} name='hallID'/>
          </div> */}
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
        </div>

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
