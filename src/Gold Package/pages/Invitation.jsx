import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { Modal } from 'antd';
// import { BASE_URL } from '../Config/api'
import QRCode from "react-qr-code";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
// import '../index.css';
import '../../index.css'

import { Helmet } from 'react-helmet';
// import Footer from '../Component/Footer';
import Goldfooter from '../Component/Goldfooter';
import { Gold_BASE_URL } from '../../API/config';



const Invitation = () => {


    const [image, setimage] = useState([]);
    const [totalguest, setTotalguest] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpentwo, setIsModalOpentwo] = useState(false);
    const [isrejectedModalOpen, setIsRjectedModalOpen] = useState(false);
    const [invite, setInvite] = useState([])
    // const [value, setValue] = useState()
    const [values, setValues] = useState([])
    const [udata, setData] = useState([])
    const [demo, setDemo] = useState([])
    const [msgdata, setMsgdata] = useState([])
    const [change, changeData] = useState([]);
    const [footer, setFooter] = useState([]);
    const [changeone, setChangeone] = useState([]);
    const [smallcss, setSmallcss] = useState("small")
    // const [optiontwo, setOptiontwo] = useState('')
    // const [optionthree, setOptionthree] = useState('')
    // const [optionfour, setOptionfour] = useState('')
    // const [optionfive, setOptionfive] = useState('')

    // Reject Modal State
    // const handleOkreject = () => {
    //     setIsRjectedModalOpen(false);
    // };

    const handleCancelreject = () => {
        setIsRjectedModalOpen(false);
    };

    // Param
    const params = useParams();
    const id = params.id;
    const lang = params.lang;

    // whatsapp link
    // const url = `https://api.whatsapp.com/send/?phone=${footer.WhatsappnumberURL}&text&type=phone_number&app_absent=0whatsApp`

    // reject toast according to language 
    const reject = () => {
        toast.error("Invitation has been Rejected, You cannot change invitation status. Please contact inviter to modify your status")
    };

    const rejectarabic = () => {
        toast.error("تم رفض الدعوة ، لا يمكنك تغيير حالة الدعوة. يرجى الاتصال بالدعوة لتعديل حالتك")
    };


    const attendToast = () => {
        toast.error("Invitation has been attend you can not change the invitation status !")
    };

    const arabicattendToast = () => {
        toast.error("تم حضور الدعوة ولا يمكنك تغيير حالة الدعوة")
    };

    const showModal = async (type) => {
        // if (demo.attended > 0) {
        //     setIsModalOpen(false)
        //     setIsRjectedModalOpen(false)
        //     setIsModalOpentwo(false)
        //     if (params.lang === "ar") {
        //         arabicattendToast();
        //     }
        //     else {
        //         attendToast();
        //     }
        // }
        // else {
        let data = {
            InvitationId: demo.id,
            status: type,
            total_guest: totalguest,
        }

        if (totalguest < 2 && type === "Accepted" && demo.status === null) {

            setIsModalOpen(true);
            await axios.put(`${Gold_BASE_URL}invitationPage/update-status`, (data)).then((response) => {
                console.log(response)

            }).catch((err) => {
                console.log(err);
            })
        }
        else if (totalguest > 1 && type === "Accepted" && demo.status === null) {

            setIsModalOpentwo(true);

        } else if (demo.status === "Accepted") {

            setIsModalOpen(true);
        }

        else if (demo.status === "Rejected") {
            setIsModalOpen(false);
            if (params.lang === "ar") {
                rejectarabic();
            }
            else {
                reject();
            }
        }
        // }

    };
    const statusApi = async () => {

        let data = {
            InvitationId: demo.id,
            status: "Accepted",
            // total_guest: change,
            total_guest: changeone,
        }

        await axios.put(`${Gold_BASE_URL}invitationPage/update-status`, (data))
            .then((response) => {
                if (response.status === 200) {
                    setIsModalOpentwo(false);
                    setIsModalOpen(true);
                    InvitationApidata();
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    const showModalRejected = async () => {

        let reject = {
            InvitationId: demo.id,
            status: "Rejected",
            total_guest: change,
        }
        if (demo.attended > 0) {
            if (params.lang === "ar") {
                arabicattendToast();
            }
            else {
                attendToast();
            }
        }
        else {
            await axios.put(`${Gold_BASE_URL}invitationPage/update-status`, (reject))
                .then((response) => {
                    // console.log(response)
                    setIsRjectedModalOpen(true)
                    InvitationApidata()
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalOpentwo(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpentwo(false);

    };

    // invitation data api Integration
    const InvitationApidata = async () => {
        await axios.get(`${Gold_BASE_URL}invitationPage/invitation-page-details/${id}`)
            .then((res) => {
                setimage(res.data.CardData);
                setTotalguest(res.data.ContactData.totalGuest)
                const article = res.data.ContactData
                changeData(article.totalGuest)
                setChangeone(article.totalGuest)
                setData(res.data.ContactData)
                setMsgdata(res.data.MessageData)
                setValues(res.data.DesignData)
                setInvite(res.data.QRData)
                setDemo(res.data.invitationData)
                setFooter(res.data.InvitationPageData);
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
    }

    const generateArray = (change) => {
        return [...Array(change)].map(() => ("values"));
    }

    useEffect(() => {
        InvitationApidata();
    }, [])

    const qrcss = {
        position: 'absolute',
        margin: 'auto',
        top: values.QRH + "px",
        left: values.QRW + "px",
        display: 'block',
        alignItems: 'center',
    }

    const sncss = {
        position: 'absolute',
        top: values.SNH + "px",
        left: values.SNW + "px",
        color: values.textcolor,
    }
    const fonturls = values.fontUrl;
    const small = (i) => {
        setChangeone(i)
        setSmallcss("removesmall")
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Hayyacom Mobile</title>
                <style>
                    {`
                         @font-face {
                            font-family: ${values.fontfamily};
                            src: url(${fonturls});
                          }
                  `}
                </style>
            </Helmet>

            <ToastContainer
                autoClose={2000}
                position="top-right"
                className="toast-container"
                toastClassName="dark-toast"
                theme="colored"
                width='400px'
                toastStyle={{ backgroundColor: '#6F0A12' }}
            />

            <Wrapper>
                <div>
                    {image.media === "video" ?
                        <div>
                            <Video controls>
                                <source src={image.invitation} type="video/mp4" />
                                <source src={image.invitation} type="video/ogg" />
                            </Video>
                        </div>
                        :
                        <Image src={image.invitation} alt="/" />
                    }
                </div>
                {params.lang === "ar" ?
                    <WrapperButton>
                        <Button type="none" className='btn4' onClick={() => showModalRejected("Rejected")} >رفض</Button>
                        <Button type="none" className='btn3' onClick={() => showModal("Accepted")} >قبول</Button>
                    </WrapperButton>
                    :
                    <WrapperButton>
                        <Button type="none" className='btn1' onClick={() => showModal("Accepted")} >Accept</Button>
                        <Button type="none" className='btn2' onClick={() => showModalRejected("Rejected")} >Reject</Button>
                    </WrapperButton>
                }
                <Goldfooter lang={lang} footer={footer} />
            </Wrapper>

            {/* {/  select guest modal start /} */}
            {isModalOpentwo &&
                <Modal
                    open={isModalOpentwo}
                    onCancel={handleCancel}
                    footer={[]}
                    centered
                    onOk={handleOk}
                    closable={false}
                    className="newStylemodeltwo"
                >
                    <div>
                        <br />
                        {
                            params.lang === "ar" ?
                                <div>
                                    <p>فضلاً اختر عدد المدعوين القادمين</p>
                                    <div className='total_guest'>عدد القادمين&nbsp;&nbsp;</div>
                                    <div className="dropdown" tabIndex="1" >
                                        <div className="dropbtn" onClick={() => setSmallcss("small")}>
                                            {changeone}&nbsp;&nbsp;
                                            <img src="/dropdownicon.png" alt="/" width={10} height={10} />
                                        </div>
                                        <div className="dropdown-content">
                                            {generateArray(change).map((item, i) => {
                                                return (
                                                    <span className={smallcss} onClick={() => small(i + 1)} key={i}>{i + 1}</span>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>

                                :
                                <div>
                                    <p>Please select total guest coming !</p>
                                    <div className='total_guest'>Total Guest &nbsp;&nbsp;</div>
                                    <div className="dropdown" tabIndex="1" >
                                        <div className="dropbtn" onClick={() => setSmallcss("small")}>
                                            {changeone}&nbsp;&nbsp;
                                            <img src="/dropdownicon.png" alt="/" width={10} height={10} />
                                        </div>
                                        <div className="dropdown-content">
                                            {generateArray(change).map((item, i) => {
                                                return (
                                                    <span className={smallcss} onClick={() => small(i + 1)} key={i}>{i + 1}</span>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                        }
                        <br />
                        {params.lang === "ar" ?
                            <SelectButttonWrapper>
                                <Button className='btn5' type="none" onClick={statusApi}><p>حفظ</p></Button>
                            </SelectButttonWrapper>
                            :
                            <SelectButttonWrapper>
                                <Button className='btn5' type="none" onClick={statusApi}><p>Send</p></Button>
                            </SelectButttonWrapper>
                        }
                    </div>
                </Modal>
            }

            {/* {/  select guest modal end /} */}

            {/* {/  QR Code modal start /} */}
            {isModalOpen &&
                <Modal
                    centered
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={[]}
                    closable={false}
                    className="qrcodeModal"

                >
                    <div>
                        <CloseIconimg src="/closeicon1.png" alt="/" onClick={handleCancel} />
                    </div>

                    <CardMassage>
                        &nbsp;&nbsp;&nbsp;{msgdata.save_qr_message}&nbsp;&nbsp;&nbsp;
                    </CardMassage>

                    <div style={{ position: 'relative' }}>
                        <InviteImage src={image.entrance} />
                        <div
                            style={qrcss}
                        >
                            <QRCode
                                value={"" + invite.invitationId}
                                size={values.QRsize}
                                fgColor={values.QRcolor}
                                bgColor={values.bgcolorQR === null ? 'white' : values.bgcolorQR}
                            />
                        </div>
                        <div
                            style={sncss}
                        >
                            {demo.InvitationID}
                        </div>
                        <div
                            // style={textcss}
                            // className='hello'
                            style={{
                                color: values.textcolor,
                                position: 'absolute',
                                top: values.TextH + "px",
                                left: values.TextW + "px",
                                fontFamily: values.fontfamily,
                                fontWeight: values.fontweight,
                                fontSize: values.fontsize + "px",
                                textAlign: 'center',
                                width: '250px',
                            }}
                        >
                            <div>{msgdata.Guest_name_title}&nbsp;&nbsp;{udata.name}</div>
                            <div>{values.numberMessage}&nbsp;&nbsp;{udata.totalGuest}</div>
                            {
                                udata.totalChildren === 0 ?
                                    ""
                                    :
                                    params.lang === "ar" ?
                                        <div>عدد الأطفال&nbsp;&nbsp;{udata.totalChildren}</div>
                                        :
                                        <div>Total Children&nbsp;&nbsp;{udata.totalChildren}</div>
                            }
                        </div>
                    </div>
                </Modal>
            }

            {/* {/  QR Code modal end /} */}


            {/* {/  reject modal start /} */}
            {isrejectedModalOpen &&
                <Modal open={isrejectedModalOpen}
                    centered
                    // onOk={handleOkreject}
                    // onCancel={handleCancelreject}
                    closable={false}
                    footer={[]}
                    className="newStyle"

                >
                    <RejectCloseIconimg src="/closeicon.png" alt="/" onClick={() => setIsRjectedModalOpen(false)}
                    />
                    {params.lang === "ar" ?
                        <div>
                            <p>تم حفظ حالة الدعوة برفض</p>
                            <p>شكراً لردكم</p>
                            <br />
                            <br />
                        </div>
                        :
                        <div>
                            <p>Your status has been saved as Rejected !</p>
                            <p>Thank you for your response !    </p>
                            <br />
                            <br />
                        </div>}
                </Modal>
            }

            {/* {/  reject modal end /} */}

        </>
    )
}

export default Invitation

// css
const Wrapper = styled.div`
padding:50px 50px 0px 50px;
margin:0px;
max-width:100%;
@media only screen and (max-width: 480px) {
    max-height:1000px;
    min-height:450px;
    max-width:100%;
    padding:20px 20px 0px 20px;


  `
const Image = styled.img`
  display:block;
  width:100%;
  @media only screen and (max-width: 480px) {
  width:100%;
  margin:0px;
  min-height:50px;
  max-height:750px;
      }

  `
const Video = styled.video`
  display:block;
  width:100%;
  @media only screen and (max-width: 480px) {
  width:100%;
  margin:0px;
  min-height:350px;
  max-height:750px;
      }
`
const InviteImage = styled.img`
     max-width: 100%;
     max-height:100%;

`

const WrapperButton = styled.div`
display:flex;
margin:0px;
padding:30px 20px 20px 20px;

.btn1{
    margin:0px 10px 0px 0px; 
    color: white; 
    background-color: #145629; 
    width:50%;
    height:50px;
}
.btn2{
    margin: 0px 0px 0px 10px; 
    color: white; 
    background-color: #6f0a12; 
    width:50%;
    height:50px;
}
.btn3{
    margin: 0px 0px 0px 10px; 
    color: white; 
    background-color: #145629; 
    width:50%;
    height:50px;
}
.btn4{
    margin: 0px 10px 0px 0px; 
    color: white; 
    background-color: #6f0a12; 
    width:50%;
    height:50px;
}


@media only screen and (max-width: 480px) {
    padding:30px 20px 20px 20px;
    margin:0px;
}
@media only screen and (max-width: 480px) {
    display:flex;
    align-items: center;

    .btn1{
     width:50%;
     margin:0px 10px 0px 0px;
     height:40px;
     font-weight:bold;
    }
    .btn2{
        width:50%;
        height:40px;
        margin:0px 0px 0px 10px;
        font-weight:bold;
       }
       .btn3{
        width:50%;
        margin:0px 0px 0px 10px;
        height:40px;
        font-weight:bold;
       }
       .btn4{
           width:50%;
           height:40px;
           margin:0px 10px 0px 0px;
           font-weight:bold;

          }
   }
`
const SelectButttonWrapper = styled.div`
.btn5{
    width: 100%; 
    height: 50px ; 
    background-color: #6F0A12 ; 
    color: white ; 
    border-radius: 0px ; 
    font-weight: bold ;
    line-height:0px;
}
`
const CloseIconimg = styled.img`
width:20px;
height:20px;
margin: 6px;
margin-left: 8px; 
display: inline;
`
const RejectCloseIconimg = styled.img`
width:30px;
height:30px;
margin: 5px;
`
const CardMassage = styled.div`
font-size: 16px; 
margin-top: -14px; 
margin-bottom: 2px;
text-align: center;
`
