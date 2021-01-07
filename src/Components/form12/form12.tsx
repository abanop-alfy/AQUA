import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {  Card } from "@material-ui/core";
import axios from "axios";
import toastr from "toastr";

interface desc{
  description: string;
}

export default function Form12() {

 let params:any= useParams();
 const [data, setData] = useState<desc>();
 let history = useHistory();
 
  useEffect(() => {
    const token = {
      headers: { 
        Authorization: `Bearer `+ localStorage.getItem("AQUA_token")
       }
    }
      axios.get(`http://127.0.0.1:8000/api/Assistant/getDescription/${params.id}`,token)
      .then(resp => {
        setData(resp.data.description);
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 401") {
          localStorage.removeItem("AQUA_token");
          localStorage.removeItem("AQUA_UserType");
          toastr.clear();
          toastr.error(
            `you're not authorized please login again with the right role`
          );
          history.push("/login"); 
        }
      });
  }, [history,params.id]);
  return (
    <Card style={{maxWidth: '500px', margin: '20px auto' }}>
        <div>
        {data}
        </div>
    </Card>
  );
}