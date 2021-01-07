import React, { useState, useEffect } from "react";
import { Card, CardContent, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

interface iExams {
  id: number;
  original_filename: string;
}

export default function GetForms() {
  let history = useHistory();

  const [forms, setForms] = useState<iExams[]>([]);
  let params: any = useParams();
  console.log(params);

  useEffect(() => {
    const token = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/Doctor/getAllEmptyFile`, token)

      .then((resp) => {
        console.log(resp.data);
        setForms(resp.data);
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
  }, [history]);

  const examClick = (id: number, name: string) => {
    const token = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
      },
    };
    axios({
      url: `http://127.0.0.1:8000/api/Doctor/downloadEmptyFile/${id}`,
      method: "GET",
      responseType: "blob", // important
      headers: token.headers,
    })
      .then((resp) => {
        console.log(resp);
        var blob = new Blob([resp.data], {
          type: resp.headers["content-type"],
        });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);

        link.download = name;
        // This is compatible with Firefox browser
        document.body.appendChild(link);
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", false, false);
        link.dispatchEvent(evt);
        document.body.removeChild(link);
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
  };

  return (
    <Card
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Alert severity="success">Forms </Alert>

      <CardContent>
        {forms.map((a) => (
          <Button
            style={{ width: "100%", margin: "10px 10px" }}
            variant="contained"
            color="primary"
            key={a.id}
            onClick={() => {
              examClick(a.id, a.original_filename);
            }}
          >
            {a.original_filename}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
