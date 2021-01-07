import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import axios from "axios";
import toastr from "toastr";


interface iSurvey {
  id: number;
  name: string;
  category: string;
  hours: number;
  activated:number;
}

export default function Program() {
  let history = useHistory();
  const [courses, setCourses] = useState<iSurvey[] | undefined>();
  function goToSurvey(id: Number) {
    history.push("/program/" + id);
  }

  useEffect(() => {
    const token = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/Admin/showAllProgram`, token)
      .then((values) => {
        console.log(values);
        const data = [...values.data];
        setCourses((data as unknown) as iSurvey[]);
        toastr.clear();
        toastr.success(`you successfully logged in as assistant`);
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
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {courses &&
        courses.map((subject: iSurvey, index: number) => (
          <Card className="card" key={index}>
            {
              <CardActionArea
                onClick={() => {
                  goToSurvey(subject.id);
                }}
              >
                <SurveyCard survey={subject} />
              </CardActionArea>
            }

          </Card>
        ))}
    </div>
  );
}
interface iSurveyProps {
  survey: iSurvey;
}
function SurveyCard(props: iSurveyProps) {
  const { survey } = props;
  const images: any = {
    com: "images/cs.jpg",
    bio: "images/biology.jpg",
    Mat: "images/math.jpg",
    Phy: "images/physics.jpg",
    sta: "images/stat.jpg",
    che: "images/chemistry.jpg",
    zoo: "images/zoology.jpg",
  };
  return (
    <CardContent>
      <CardMedia
        className="Media"
        image={images[survey.category.slice(0, 3)]}
        title={survey.category}
      />
      <Typography gutterBottom variant="h5" component="h2">
        <label>{survey.name}</label>
        <br />
      </Typography>

      <label>category:{survey.category}</label>
      <br />
      <label>number of hours graduated:{survey.hours}</label>
      <br />
      <label>activated:{survey.activated ? "yes" : "no"}</label>
    </CardContent>
  );
}
