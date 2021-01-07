import React, { useState, useEffect } from "react";
import toastr from "toastr";
import DeleteIcon from "@material-ui/icons/Delete";

import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
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
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { DropzoneDialog } from "material-ui-dropzone";
import { useHistory, useParams } from "react-router-dom";

import FileCopyIcon from "@material-ui/icons/FileCopy";
interface iExams {
  id: number;
  original_filename: string;
}
export default function EmptyFiles() {
  let history = useHistory();
  const [opendialog, setOpendialog] = useState(false);
  const [openedDialog, setOpenedDialog] = useState<string | null>();

  const token = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
    },
  };

  const handleOpen = () => {
    setOpendialog(true);
    setOpenedDialog(null);
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
    axios
      .post(`http://127.0.0.1:8000/api/Admin/uploadEmptyFile`, data, headers)
      .then((resp) => {
        console.log(resp);
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  let params: any = useParams();
  const [forms, setForms] = useState<iExams[]>([]);

  useEffect(() => {
    const token = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/Admin/getAllEmptyFile`, token)
      .then((resp) => {
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
  }, []);
  const examClick = (id: number, name: string) => {
    axios({
      url: `http://127.0.0.1:8000/api/Admin/downloadEmptyFile/${id}`,
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
  const deleteClick = (id: number) => {
    axios({
      url: `http://127.0.0.1:8000/api/Admin/deleteEmptyFile/${id}`,
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

  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Card style={{ height: "100%", width: "500px", margin: "20px auto" }}>
        <List dense={true}>
          <ListItem
            style={{
              margin: "10px 0",
              color: "white",
              backgroundColor: "#3f51b5",
              borderRadius: "30px",
            }}
          >
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: "white" }}>
                <FileCopyIcon style={{ color: "rgb(63, 81, 181)" }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`File`} />
            <ListItemSecondaryAction>
              <Button
                style={{
                  margin: "theme.spacing(1)",
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                }}
                startIcon={<CloudUploadIcon />}
                onClick={() => {
                  handleOpen();
                }}
              >
                Upload
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
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
          maxFileSize={5000000}
          onClose={handleClose}
        />
      </Card>
      {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <Card style={{ height: "100%", width: "600px", margin: "auto" }}>
        <List>
          {forms.map((a) => (
            <ListItem
              key={a.id}
              style={{
                margin: "10px 0",
                color: "white",
                backgroundColor: "#1565c0",
                borderRadius: "30px",
              }}
            >
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "white" }}>
                  <FileCopyIcon style={{ color: "#1565c0" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${a.original_filename} File`} />
              <ListItemSecondaryAction>
                <Button
                  style={{
                    margin: "theme.spacing(1)",
                    backgroundColor: "#1565c0",
                    color: "#fff",
                  }}
                  startIcon={<CloudDownloadIcon />}
                  onClick={() => {
                    examClick(a.id, a.original_filename);
                  }}
                >
                  Download
                </Button>
                <Button
                  style={{
                    backgroundColor: "#1565c0",
                    color: "#fff",
                    marginLeft: "1em",
                    width: "100px",
                  }}
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    deleteClick(a.id);
                    toastr.success("delete successfuly");
                  }}
                >
                  Delete
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
}
