import React, { useState } from 'react'
import './QRcode.css';
const QRCode = () => {
    const [img, setImg]=useState("")
    const[load, setLoad]=useState(false)
    const[qrdata, setQrdata]= useState("https://www.youtube.com/")
    const[size,setSize]=useState("200")

    async function generateQR()
    {
        setLoad(true)
        try{
            const url=`http://api.qrserver.com/v1/create-qr-code/?data=${qrdata}!&size=${size}x${size}`
            setImg(url)

        }
        catch (error){
              console.log("Enter the error generating QR code", error)
        }
        finally{
            setLoad(false)
        }
    }
    function downloadQR()
    {
        fetch(img).then((respose)=>(respose.blob())).then((blob)=>{
            const link = document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="qr.code.png"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error)=>{console.log("Downloading the QR code",error)})

    }
  return (
    <>
       <div className='container'> 
        <div>
          <div>QR CODE Generator</div>
          {load&&<p>Please wait...</p>}
          {img &&<img src={img}  className='qr-code-image'/>}
        
          <div>
            <label htmlFor='dataInput' className='input-label' placeholder="Enter a Data Inputs">Data for QR code </label>
            <input type="text" id='dataInput' value={qrdata} onChange={(e)=>setQrdata(e.target.value)}/>
            <label htmlFor='sizeInput' className='input-label' placeholder="image with size100">Image size</label>
            <input type="text" id='sizeInput' value={size} onChange={(e)=>setSize(e.target.value)} />
            <button onClick={generateQR} disable={load}>Generate QR code</button>
            <button onClick={downloadQR}>Download QR code</button>
          </div>
        </div>

       </div>
  
  </>
  )
}

export default QRCode
