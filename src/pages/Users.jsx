import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import axios from 'axios'
import { BASE_URL } from '../API/config'

const Users = () => {
 const [user,setUser] = useState([])
 const [data,SetData] = useState({name: '', number:'', password: ''})

    const table = async() => {
       await axios({
            url: `${BASE_URL}all-user`,
            method: "GET"
        }).then((Response)=> {
            console.log(Response.data.Data)
            setUser(Response.data.Data)
        }).catch((error)=> {
            console.log(error)
        })
    }

    const display = (e) =>{
        SetData({...data, [e.target.name]: e.target.value})
    }
   const Createuser = async(e) => {
    
    e.preventDefault()
   await axios({
        url: `${BASE_URL}create-user`,
        method: 'POST',
        data: {
            name: data.name,
            phoneNumber: data.number,
            password: data.password
        }        
    }).then((response)=> {
        console.log(response)
        table()
    }).catch((error)=> {
        console.log(error)
    })
   }


//    const UserDelete = async() => {
//        await axios({
//         url: `${BASE_URL}delete-user`,
//         method: "DELETE",
//         data: {
//             id: data.id
//         }
//        })
//    }


    useEffect(()=>{
        table()
       
    },[])
  return (
    <Container>
    <div className='content-wrapper'>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h3>Users Data</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right mr-5"> 
            <p type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">          
              <button className="btn btn-primary">Add User   <i className='fas fa-plus'/></button></p>
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
              <th>ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Password</th>
              {/* <th>Device Type</th> */}
              <th>Edit/Delete</th>
            </tr>
          </thead>
          {user.map((data,index)=>{
            return(
                <tbody key={index}>
                <tr>
                  <td>{index+1}</td>
                  <td>{data.name}</td>
                  <td>{data.phoneNumber}</td>
                  <td>{data.password}</td>
                  {/* <td>{data.device_type}</td> */}
                  <td><i type="button" class="fas fa-edit ml-2"/>
                  <i type="button" class="fas fa-trash ml-3" onClick={async() =>
                  {let res = await axios.delete(`${BASE_URL}delete-user`,{data:{
                    id:data.id}}
                     )               
                     console.log(res);
                     table()
                      }                        
                           }  /></td>
                </tr>                     
              </tbody>
            )            
          })}      
        </table>
        


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form onSubmit={Createuser}>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label" >Name:</label>
            <input type="text" class="form-control" value={data.name} onChange={display} name='name'/>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Phone Number</label>
            <input type="number" class="form-control" value={data.number} onChange={display} name='number'/>
          </div> 
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Password</label>
            <input type="password" class="form-control" value={data.password} onChange={display} name='password'/>
          </div>
          <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add</button>
      </div>
        </form>
      </div>     
    </div>
  </div>
</div>
      </div>
      {/* /.card-body */}
    </div>
    {/* /.card */}
  </div>
</div>

   
    </div>
    </section>
    </div>
    </Container>
  )
}

export default Users
