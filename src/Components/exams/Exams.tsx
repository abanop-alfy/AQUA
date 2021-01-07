import React, { useEffect, useState } from "react";

import Button from '@material-ui/core/Button';
import {   Card, CardContent } from "@material-ui/core";
import axios from "axios"; 

import Alert from '@material-ui/lab/Alert';
import { useParams, useHistory } from "react-router-dom";
interface iExams {
  semester: string;
  year: number;
  id: number;
  course_code: string;
  coordinator_id: number;
}
export default function Exams() {
  let history = useHistory();

const [exams, setExams] = useState<iExams[]>([]);
 let params:any= useParams();
 console.log(params);
 
    useEffect(() => {
      const token = {
        headers: { 
          Authorization: `Bearer `+ localStorage.getItem("AQUA_token"),Accept:"application/pdf"
         }
      }
          axios.get(`http://127.0.0.1:8000/api/Student/getAllCode/${params.id}`,token)
       
          .then(resp => {
            console.log(resp.data);
            setExams(resp.data);
          })
          .catch(err => {
            if(err.message === 'Request failed with status code 401') {
              localStorage.removeItem('AQUA_token');
              localStorage.removeItem('AQUA_UserType');
              toastr.clear();
              toastr.error(`you're not authorized please login again with the right role`);
              history.push('/login');
            }
          });
      }, [history]);
  
  const examClick = (id: number)=>{
    const token = {
      headers: { 
        Authorization: `Bearer `+ localStorage.getItem("AQUA_token"),Accept:"application/pdf"
       }
    }
    axios({
      url: `http://127.0.0.1:8000/api/Student/downloadExamFile/${id}`,
      method: 'GET',
      responseType: 'blob', // important
      headers: token.headers
    })
    .then(resp => {
      console.log(resp);
      var blob= new Blob([resp.data], {type: resp.headers['content-type']});
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'exam'+ id;
      // This is compatible with Firefox browser
      document.body.appendChild(link);
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", false, false);
      link.dispatchEvent(evt);
      document.body.removeChild(link);
    })
    .catch(err => {
      if(err.message === 'Request failed with status code 401') {
        localStorage.removeItem('AQUA_token');
        localStorage.removeItem('AQUA_UserType');
        toastr.clear();
        toastr.error(`you're not authorized please login again with the right role`);
        history.push('/login');
      }
    });  }
  
  
  return (
   
    <Card style={{maxWidth: '500px', margin: '0 auto',display:'flex' , flexDirection:'column'}}>
    	<Alert severity="success">الامتحانات </Alert>

    <CardContent> 
    {exams.map(a=>(<Button style={{width:"100%"}}
        variant="contained"
        color="primary"
        key={a.id}
        onClick={() => {examClick(a.id)}}
      >
       {a.year}
      </Button>))}

    </CardContent>
    
    </Card>
     
    
  );
}