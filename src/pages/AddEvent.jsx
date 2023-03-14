import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../API/config'
import Container from '../components/Container'

const AddEvent = () => {
  const [Id,setId] = useState([])
 const [data,setData] = useState({userid: '' , eventID: '', Guest: ''})
  const view = useParams();

  const navigate = useNavigate()

  const views = view.id
  console.log(views)
  const notAssign = async () => {
    await axios({
      url: `${BASE_URL}not-assign-event/${views}`,
      method: 'GET'
    }).then((response) => {
      console.log(response.data.Events)
       setId(response.data.Events)
      console.log(response);
      //  console.log(Id);

    }).catch((error) => {
      console.log(error);
    })
  }

  const display = (e) => {
    setData({...data,[e.target.name]: e.target.value})
  }
  
  const addEvent = async(e) => {
    e.preventDefault()
    await axios({
      url: `${BASE_URL}add-new-event-in-user`,
      method: 'POST',
      data:{
        userId: views,
        eventId: data.eventID,
        totalGuestAllowed: data.Guest
      }
      
    }).then((response) => {
      console.log(response);
      // navigate('/users')
      navigate(`/${views}`)
     
    }).catch((error) => {
     console.log(error);
    })
  
  }

   useEffect(() => {
    notAssign()
   },[])
  return (
    <Container>

      <div className='content-wrapper'>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h3 style={{color: '#6F0A12'}}>Add Event</h3>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right mr-5">
                  
                  {/* <p type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">          
              <button className="btn text-white" style={{backgroundColor:"#6F0A12"}}>Add User   <i className='fas fa-plus'/></button></p> */}
                </ol>
              </div>

              <form onSubmit={addEvent} >
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label" >User ID :</label>
                  <input type="text" className="form-control" value={views} /* onChange={display} */  name='views' />
                </div>           
               
                <div class="mb-3">
          <label for="recipient-name" class="col-form-label">Event ID : </label><br/>         
          <select class="col-form-label"  name='eventID' onChange={display} value={data.eventID}>
         
            <option >Choose Event ID : </option>
               {Id.map((udata,index) => {
            return(    
    <option value={udata.id} >{udata.id}</option>              
            )
          })} </select>
        </div>
        <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">Total Attendence :</label>
                  <input type="number" className="form-control"  value={data.Guest} onChange={display} name='Guest' />
                </div>

                <div className="social-auth-links text-center  mt-5" >
                  <button className='btn btn-lg btn-block text-white' style={{ backgroundColor: "#6F0A12" }} type="submit" >Submit</button>

                  {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add</button> */}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Container>
  )
}

export default AddEvent
