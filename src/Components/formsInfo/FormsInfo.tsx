import React, { useEffect, useState } from "react";
import axios from "axios";
import toastr from "toastr";
import { useParams, useHistory } from "react-router-dom";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

import {
  Card,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";
interface iInfo {
  [key: string]: string;
}
export default function Form12() {
  let params: any = useParams();
  let history = useHistory();
  const [info, setInfo] = useState<iInfo>({});
  const programForms = [
    "Form12",
    "Answer",
    "Exam",
    "Form16",
    "Form11a",
    "ILOs",
  ];
  useEffect(() => {
    const token = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/Admin/getMissingFile/${params.id}`, token)
      .then((resp) => {
        setInfo(resp.data);
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
  const token = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
    },
  };
  const examClick = (form: string) => {
    axios({
      url: `http://127.0.0.1:8000/api/Admin/download${form}File/${params.id}`,
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
                backgroundColor: `${
                  info[a] && info[a] === "true" ? "#d84315" : "#26a69a"
                }`,
                borderRadius: "30px",
              }}
            >
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "white" }}>
                  <FileCopyIcon
                    style={{
                      color: `${
                        info[a] && info[a] === "true" ? "#d84315" : "#26a69a"
                      }`,
                    }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>{a}</ListItemText>
              <ListItemText>
                {info[a] && info[a] === "true"
                  ? "not uploaded yet"
                  : "uploaded"}
              </ListItemText>
              <ListItemSecondaryAction>
                {info[a] && info[a] === "false" && (
                  <Button
                    // variant="contained"
                    style={{
                      margin: "theme.spacing(1)",
                      backgroundColor: `${
                        info[a] && info[a] === "false" ? "#26a69a" : "#d84315"
                      }`,
                      color: "#fff",
                    }}
                    startIcon={<CloudDownloadIcon />}
                    onClick={() => {
                      examClick(a);
                    }}
                  >
                    Download
                  </Button>
                )}
              </ListItemSecondaryAction>
            </ListItem>
           
          ))}
        </List>
      </Card>
    </div>
  );
}
