import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../API/config'
import Container from '../components/Container'
import { Modal ,Button, Select } from 'antd';
import {Helmet} from "react-helmet"

const ViewDetails = () => {
  const [edit, setEdit] = useState([])
  const [Id,setId] = useState([]) 
   const [allowed,setAllowed] = useState('')
   const [data,setData] = useState({userid: '' , eventID: '', Guest: ''})
    const [get,setGet] = useState([])
   const [isModalOpen, setIsModalOpen] = useState(false);

   const showModal = () => {
    setIsModalOpen(true);
  };
 
 
 const handleCancel = () => {
   setIsModalOpen(false);
 };

  const view = useParams();

  const views = view.ViewDetails

  const viewUser = async() => {
     await axios({
      url: `${BASE_URL}/view-user-events/${views}`,
      method: 'get'
     }).then((response) => {
      console.log(response.data.Events);
      setEdit(response.data.Events)
      // setUniqueId(response.data.Events.UniqueId)


     }).catch((error) => {
      console.log(error);
     })
  }

const geteventUpdate = async(UniqueId,e) => {
  //  e.preventDefault()
  await axios({
    url: `${BASE_URL}/get-user-event/${UniqueId}`,
    method: 'GET',
    
  }).then((response) => {
    console.log(response.data);
      
      const getEvent = response.data.userEventData
      setAllowed(getEvent.totalGuestAllowed)      
      setGet(getEvent.id)
  }).catch((error) => {
    console.log(error);
  })
}


const notAssign = async() => {
   await axios({
    url: `${BASE_URL}/not-assign-event/1`,
    method: 'GET'
   }).then((response)=> {
    console.log(response.data.Events)
    setId(response.data.Events)
    console.log(response);
  //  console.log(Id);

   }).catch((error) => {
    console.log(error);
   })
}

const display = (e) => {
  setData({...data,[e.target.value]: e.target.name})
}

const AddEvent = async() => {
  await axios({
    url: `${BASE_URL}/add-new-event-in-user`,
    method: 'POST',
    data:{
      userId: data.userid,
      eventId: data.eventID,
      totalGuestAllowed: data.Guest
    }
    
  })

}


const eventUpdate = async (e) => {
  e.preventDefault();
  const data = {
    UniqueId: get,
    totalGuestAllowed: allowed
  }
  await axios.put(`${BASE_URL}edit-user-event`, data)
    .then((res) => {
      console.log(res);
     
      viewUser();
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    viewUser()

  },[])
  return (
    <Container>
      <Helmet>

<meta charSet="utf-8" />
<title>Event Details</title>
</Helmet>
<div className='content-wrapper'>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h3>View User Events</h3>
          </div>    
   
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right mr-5"> 
            <p type="button" onClick={notAssign}>          
              <button className="btn text-white" style={{backgroundColor:"#6F0A12"}}  onClick={showModal}>Add Event
               <i className='fas fa-plus'/></button></p>
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
              <th>Event ID</th>
              <th>Phone Number</th>
              <th>Date</th>
              <th>Title</th>
              <th>URL</th>
              <th>Notes</th>
              <th>Package Type</th>
              <th>Paper Attendence</th>
              <th>Partyhall ID</th>
              <th>Guest Allowed</th>
              <th>Total Receptionist</th>
              <th>Type</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          {edit.map((data,index)=>{
            return(
                <tbody key={index}>
                <tr>
                  <td>{index+1}</td>
                  <td>{data.UserId}</td>
                  <td>{data.WEventId}</td>
                  <td>{data.eventContact}</td>
                  <td>{data.eventDate}</td>
                  <td>{data.eventtitle}</td>
                  <td>{data.locationurl}</td>
                  <td>{data.notes}</td>
                  <td>{data.packagetype}</td>
                  <td>{data.paperAttendence}</td>
                  <td>{data.partyhallId}</td>
                  <td>{data.totalGuestAllowed}</td>
                  <td>{data.total_receptionist}</td>
                  <td>{data.type}</td>                
                  <td ><i type="button" class="fas fa-edit ml-2" data-toggle="modal" data-target="#exampleModal"  onClick={()=> geteventUpdate(data.UniqueId)}  />
                  <i type="button" class="fas fa-trash ml-3"  onClick={ async()=> {
                     let res = await axios.delete(`${BASE_URL}/delete-user-event`,{data:{
                      UniqueId:data.UniqueId
                      }})
                      console.log(res);
                      viewUser();

                  }}/> 
                  </td>
                     
                </tr>                     
              </tbody>
            )            
          })}      
        </table>
       {/* Update Event Model Start */}
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <form   >
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="mb-3 m-2">
            <label for="recipient-name" class="col-form-label">Total Guest</label>
            <input type="number" class="form-control"  name='number' value={allowed}  onChange={(e)=> setAllowed(e.target.value)}/>
          </div>
        
        
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-dismiss="modal" onClick={eventUpdate}> Update Event</button>
      </div>
    </div>
    </form>
  </div>
</div>
       {/* Update Event Model End */}


       {/* Update user Data Start */}

<Modal title="Add Event" open={isModalOpen} onCancel={handleCancel} footer={null}>
<form /* onSubmit={UpdateData} */>
          {/* <div class="mb-3">
            <label for="recipient-name" class="col-form-label" >User ID:</label>
            <input type="text" class="form-control"  />
          </div> */}
          <div class="mb-3">
          <label for="recipient-name" class="col-form-label">Event ID : </label><br/>
         
          <select class="col-form-label"  name='ptype' >
            <option disabled>Choose ID : </option>
               {Id.map((udata,index) => {
            return(    
    <option value={udata.id}>{udata.id}</option>              
            )
          })} </select>
        </div> 
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Total Attendence</label>
            <input type="number" class="form-control" />
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

export default ViewDetails
