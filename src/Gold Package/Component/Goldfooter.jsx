import React from 'react'
import styled from 'styled-components'


const Goldfooter = ({ lang, footer }) => {
  // console.log(lang);
  console.log(footer);
  const url = `https://api.whatsapp.com/send/?phone=${footer.WhatsappnumberURL}&text&type=phone_number&app_absent=0whatsApp`
  return (
    <>
      {lang === "ar" ?
        <FooterBar>
          <div>
            لمزيد من المعلومات ، يرجى الاتصال عبر  <a href={url}>WhatsApp</a>
            <p>{footer.FooterAR} </p>
          </div>
        </FooterBar>
        :
        <FooterBar>
          <div>
            For more information, please contact via <a href={url}>WhatsApp</a>
            <p>{footer.FooterEN} </p>
          </div>
        </FooterBar>
      }
    </>
  )
}

export default Goldfooter
const FooterBar = styled.footer`

  font-size:14px;
  color:rgba(0,0,0,.85);
  text-align:center;

  @media only screen and (max-width: 480px) {
    width:100%;
    font-size:11px;
   }
   a{
      color:#1890ff;
      text-decoration: none;
   }
   p{
     margin:5px 0px;
   }
   `