import React, { useState, useEffect } from "react";
import toastr from "toastr";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { DropzoneDialog } from "material-ui-dropzone";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useParams, useHistory } from "react-router-dom";

interface iInfo {
  [key: string]: string
}
export default function Forms() {
  let history = useHistory();
  let params: any = useParams();
  const programForms = [
    "Form12",
    "Answer",
    "Exam",
    "Form16",
    "Form11a",
    "ILOs",
  ];
  const program = ["Form15", "Form11b", "Form13"];
  const [opendialog, setOpendialog] = useState(false);
  const [openedDialog, setOpenedDialog] = useState<string | null>();
  const [info, setInfo] = useState<iInfo>({});
  const [infoProgram, setInfoProgram] = useState<iInfo>({});

  const token = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
    },
  };
  useEffect(() => {
    const token = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/Doctor/getMissingFile/${params.id}`, token)
      .then((resp) => {
        setInfo(resp.data);
        console.log(resp.data);
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
      axios
      .get(`http://127.0.0.1:8000/api/Doctor/getMissingFileProgram/${params.id}`, token)
      .then((response) => {
        setInfoProgram(response.data);
        console.log(response.data)
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
  },[]);
  const examClick = (form: string) => {
    axios({
      url: `http://127.0.0.1:8000/api/Doctor/download${form}File/${params.id}`,
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
        link.download = form +"-"+params.id;
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
          history.push("login");
        }
      });
  };
  const deleteClick = (form: string) => {
    axios({
      url: `http://127.0.0.1:8000/api/Doctor/delete${form}File/${params.id}`,
      method: "GET",
      responseType: "blob", // important
      headers: token.headers,
    })
      .then((resp) => {
        window.location.reload(true);
        toastr.success("delete successfully");

      })
      .catch((err) => {
        if (err.message === "Request failed with status code 401") {
          localStorage.removeItem("AQUA_token");
          localStorage.removeItem("AQUA_UserType");
          toastr.clear();
          toastr.error(
            `you're not authorized please login again with the right role`
          );
          history.push("login");
        }
      });
  };
  const handleOpen = (a: string) => {
    setOpendialog(true);
    setOpenedDialog(a);
  };
  const handleClose = () => {
    setOpendialog(false);
    setOpenedDialog(null);

  };

  const handleSave = (files: any) => {
    console.log(files);
    let data = new FormData();
    data.append("file", files[0]);
    const headers = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
        "Content-Type": "multipart/form-data",
      },
    };
    axios.post(`http://127.0.0.1:8000/api/Doctor/store${openedDialog}File/${params.id}`,data,headers)
      .then((resp) => {
        toastr.success(resp.data.message);
        handleClose();
    window.location.reload(true);
        
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
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Card style={{ height: "100%", width: "600px", margin: "auto" }}>
        <List>
          {programForms.map((a: string) => (
            <ListItem
              key={a}
              style={{
                margin: "10px 0",
                color: "white",
                backgroundColor: "#3f51b5",
                borderRadius: "30px",
              }}
            >
              <ListItemAvatar>
              <Avatar style={{backgroundColor:"white"}}>
                  <FileCopyIcon style={{color:"#3f51b5"}}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${a} File`} />
              <ListItemSecondaryAction>
              {info[a] && info[a] === "true" &&
                  <Button
                  style={{
                    backgroundColor: "#3f51b5",
                    color: "#fff",

                    width:"100px"
                  }}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => handleOpen(a)}
                  >
                  upload
                  </Button>||
                   <><Button
                   style={{
                     backgroundColor: "#3f51b5",
                     color: "#fff",
                     marginLeft:"1em",
                     width:"100px"
                   }}
                   startIcon={<CloudDownloadIcon/>}
                   onClick={() => {
                     examClick(a);
                   }}
                 >
                   Download
                 </Button>
                 <Button
                  style={{
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                    marginLeft:"1em",
                    width:"100px"
                  }}
                  startIcon={<DeleteIcon/>}
                  onClick={() => {
                    deleteClick(a);
                    toastr.success("delete successfuly");
                    
                   }}
                >
                  Delete
                </Button></>
              }
                 
               
                
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <DropzoneDialog
          open={opendialog}
          onSave={handleSave}
          acceptedFiles={[
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ]}
          showPreviews={true}
          filesLimit={1}
          // dropzoneText="dummy"
          maxFileSize={5000000}
          onClose={handleClose}
        />
        <p style={{ textAlign: "center", color: "#1565c0" }}>
          Forms for programs
        </p>
        {/* ///////////////////////////////////////////////////////////////// */}
        <List dense={true}>
          {program.map((b) => (
            <ListItem
              key={b}
              style={{
                margin: "10px 0",
                color: "white",
                backgroundColor: "#1565c0",
                borderRadius: "30px",
              }}
            >
              <ListItemAvatar >
                <Avatar style={{backgroundColor:"white"}}>
                  <FileCopyIcon style={{color:"#1565c0"}}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${b} File`} />
              <ListItemSecondaryAction>
              {infoProgram[b] && infoProgram[b] === "false" &&
                <Button
                  // variant="contained"
                  style={{
                    margin: "theme.spacing(1)",
                    backgroundColor: "#1565c0",
                    color: "#fff",
                  }}
                  startIcon={<CloudDownloadIcon />}
                  onClick={() => {
                    examClick(b);
                  }}
                >
                  Download
                </Button>}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
}
