import { useEffect, useState } from 'react'
import '../CSS/UserDoctorInfo.css'

function DoctorInfo() {
  const [docData,setDocData]=useState([]);
  useEffect(()=>{
    const DoctorData = async () => {
      try{
        const response=fetch("https://heart-predection.onrender.com/UserAccess/DoctorInfo",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({requestType:"getDoctors"})
        });
        if(response.ok){
          const data=await response.json();
          console.log(data)
          setDocData(data);
        }else{
          console.error("Failed to fetch doctors:", response.statusText);
        }
      }catch(err){
        console.error("Error while fetching doctors:", err);
      }
    };
    DoctorData();
  },[])
  return (
    <div className='UserDoctorDiv'>
      <div className='UserDoctor'></div>
    </div>
  )
}

export default DoctorInfo