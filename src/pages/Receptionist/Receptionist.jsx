import React, { useEffect } from 'react'
import Container from '../../components/Container'
import { Button, Modal, Checkbox, Form, Input } from 'antd'
import { useState } from 'react'
import { BASE_URL } from '../../API/config'
import axios from 'axios'
import { Helmet } from 'react-helmet'

const Receptionist = () => {
  const [receptionistdata, setReceptionistData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenid, setIsModalOpenId] = useState(false);
  const [receptionistvalues, setReceptionistValues] = useState({ receptionistName: '', phonenumber: '', city: '', password: '' })
  const [receptionistvaluesid, setReceptionistValuesId] = useState([]);
  const [ID, setId] = useState('')

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

  useEffect(() => {
    ReceptionistApi();
  }, [])

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

  const AddReceptionistApi = async (e) => {
    e.preventDefault();
    const values = {
      receptionistName: receptionistvalues.receptionistName,
      phonenumber: receptionistvalues.phonenumber,
      password: receptionistvalues.password,
      city: receptionistvalues.city
    }
    await axios.post(`${BASE_URL}/create-receptionist`, values)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          setReceptionistValues({ receptionistName: '', phonenumber: '', city: '', password: '' })
          ReceptionistApi();
          setIsModalOpen(false);
        }
      }).catch((err) => {
        console.log(err);
      })
  }

  const receptionistid = async (id) => {
    await axios.get(`${BASE_URL}get-receptionist/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setIsModalOpenId(true);
        }
        setReceptionistValuesId(res.data.Data);
        const article = res.data.Data
        setId(article.id)
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
  }

  const UpdateReceptionistApi = (event,ID) => {
    event.preventDefault();
    console.log(ID)
  }

  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hayyacom Receptionist</title>
      </Helmet>
      <div className='content-wrapper'>
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h3 style={{color: '#6F0A12'}}>Receptionist </h3>
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
                    <th>Edit / Delete</th>
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
                          <i type="button" class="fas fa-trash ml-2" onClick={async () => {
                            await axios.delete(`${BASE_URL}delete-receptionist`, {
                              data: {
                                id: item.id
                              }
                            })
                              .then((res) => {
                                if (res.status === 200) {
                                  ReceptionistApi();
                                }
                              }).catch((err) => {
                                console.log(err);
                              })
                          }} />
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
      {/* {/ Add Receptionist Model /} */}
      <Modal title=" Add Receptionist" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <form onSubmit={AddReceptionistApi}>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label" >Name</label>
            <input type="text" class="form-control" name='receptionistName' value={receptionistvalues.receptionistName} onChange={changevalues} />
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Phone Number</label>
            <input type="number" class="form-control" name='phonenumber' value={receptionistvalues.phonenumber} onChange={changevalues} />
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">City</label>
            <input type="text" class="form-control" name='city' value={receptionistvalues.city} onChange={changevalues} />
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Password</label>
            <input type="password" class="form-control" name='password' value={receptionistvalues.password} onChange={changevalues} />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={handleCancel}>Close</button>
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </form>
      </Modal>
      <Modal title=" Update Receptionist" open={isModalOpenid} onOk={handleOkid} onCancel={handleCancelid} footer={false}>
        <form onSubmit={UpdateReceptionistApi}>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label" >Name</label>
            <input type="text" class="form-control" name='receptionistName' value={receptionistvaluesid.receptionistName} onChange={(e) => setReceptionistValuesId(e.target.value)} />
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Phone Number</label>
            <input type="number" class="form-control" name='phonenumber' value={receptionistvaluesid.phonenumber} onChange={(e) => setReceptionistValuesId(e.target.value)} />
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">City</label>
            <input type="text" class="form-control" name='city' value={receptionistvaluesid.city} onChange={(e) => setReceptionistValuesId(e.target.value)} />
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Password</label>
            <input type="number" class="form-control" name='password' value={receptionistvaluesid.password} onChange={(e) => setReceptionistValuesId(e.target.value)} />
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
