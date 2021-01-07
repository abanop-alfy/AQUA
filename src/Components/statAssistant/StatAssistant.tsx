import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import toastr from "toastr";
// @ts-ignore
import { Steps } from "intro.js-react";

interface iSurvey {
  Doctor_name: string;
  Doctor_id: number;
  Activated_course_id: number;
  course_code: string;
  semester: string;
  year: number;
  course_name: string;
  theoritical_hours: number;
}

export default function StatAssistant() {
  let history = useHistory();
  const [courses, setCourses] = useState<iSurvey[] | undefined>();
  const introDone = localStorage.getItem("introDone");

  function goToSurvey(id: Number) {
    history.push("/statistics/" + id);
  }

  useEffect(() => {
    const token = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/Assistant/all_practical_course/`, token)
      .then((values) => {
        console.log(values);
        const data = [...values.data.data];
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
  const onStepExit = () => {
    localStorage.setItem("introDone", "true");
  };
  let steps: any[] = [];

  steps = [
    {
      element: ".MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters",
      intro: "you can navigate from here and logout from icon on that corner ",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element: ".MuiButtonBase-root.MuiCardActionArea-root",
      intro: "this card for show the practical evaluation result of this course",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element:
      ".MuiButtonBase-root.MuiButton-root.MuiButton-contained.ab.MuiButton-containedPrimary",
      intro: "this Button for show the practical evaluation result of this course",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element:
        ".MuiButtonBase-root.MuiButton-root.MuiButton-contained.a.MuiButton-containedPrimary",
      intro: "this button for show form12 that contain the description of the course",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element:
        ".MuiButtonBase-root.MuiIconButton-root",
      intro: "you can reopen demo website from here to help you what you do",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element:
        ".MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeEnd",
      intro: "and finally you can log out from here",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Steps
              enabled={!introDone}
              steps={steps}
              initialStep={0}
              onExit={onStepExit}
            />
      {courses &&
        courses.map((subject: iSurvey, index: number) => (
          <Card className="card" key={index}>
            {
              <CardActionArea
                onClick={() => {
                  goToSurvey(subject.Activated_course_id);
                }}
              >
                <SurveyCard survey={subject} />
              </CardActionArea>
            }

            <CardActions>
              <Button
                style={{ width: "100%", height: "30px" }}
                variant="contained"
                color="primary"
                component={Link}
                className="ab"
                to={`/statistics/${subject.Activated_course_id}`}
                title={`you can see the practical survey result from this button`}
              >
                Reports
              </Button>
              <Button
                style={{ width: "100%", height: "30px" }}
                variant="contained"
                color="primary"
                component={Link}
                className="a"
                to={`/form12/${subject.Activated_course_id}`}
                title={`you can see the course description from this button `}
              >
                Form 12
              </Button>
            </CardActions>
            
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
    mat: "images/math.jpg",
    phy: "images/physics.jpg",
    sta: "images/stat.jpg",
    che: "images/chemistry.jpg",
    zoo: "images/zoology.jpg",
  };
  return (
    <CardContent>
      <CardMedia
        className="Media"
        image={images[survey.course_code.slice(0, 3)]}
        title={survey.course_name}
      />
      <Typography gutterBottom variant="h5" component="h2">
        <label>{survey.Doctor_name}</label>
        <br />
      </Typography>

      <label>Subject Name : <span style={{color:"blue"}}>{survey.course_name}</span></label>
      <br />
      <label>Course Code : <span style={{color:"blue"}}>{survey.course_code}</span></label>
      <br />
      <label>Year : <span style={{color:"blue"}}>{survey.year}</span></label>
      <br />
      <label>Semester : <span style={{color:"blue"}}>{survey.semester}</span></label>
    </CardContent>
  );
}
