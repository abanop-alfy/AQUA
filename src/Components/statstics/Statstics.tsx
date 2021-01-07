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
  isCoordinator: string;
}

export default function Statistics() {
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
      .get(`http://127.0.0.1:8000/api/Doctor/all_theoritical_course`, token)
      .then((values) => {
        const data = [...values.data.data];
        setCourses((data as unknown) as iSurvey[]);
        toastr.clear();
        toastr.success(`you successfully logged in as Doctor`);
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
      intro: "this card for show the evaluation result of this course",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element:
        ".MuiButtonBase-root.MuiButton-root.MuiButton-contained.ab.MuiButton-containedPrimary.MuiButton-containedSizeSmall.MuiButton-sizeSmall",
      intro: "this Button for show the evaluation result of this cours",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element:
        ".MuiButtonBase-root.MuiButton-root.MuiButton-contained.a.MuiButton-containedPrimary.MuiButton-containedSizeSmall.MuiButton-sizeSmall",
      intro: "this Button for upload all forms for this course",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element:
        ".MuiButtonBase-root.MuiButton-root.MuiButton-contained.b.MuiButton-containedPrimary.MuiButton-containedSizeSmall.MuiButton-sizeSmall",
      intro: "this Button for download all forms for this course",
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
                size="small"
                color="primary"
                className="ab"
                style={{ width: "90%" }}
                variant="contained"
                component={Link}
                to={`/statistics/${subject.Activated_course_id}`}
                title={'you can see the survey result from this button'}
              >
                Reports
              </Button>
              {subject.isCoordinator === "true" &&
              <Button
                size="small"
                color="primary"
                className="a"
                style={{ width: "90%" }}
                variant="contained"
               
                component={Link}
                to={`/forms/${subject.Activated_course_id}`}
                title={'you can upload all forms after complete it from this button'}
              >
                Forms
              </Button>}
              <Button
                size="small"
                color="primary"
                className="b"
                style={{
                  width: "100%",
                  color: "white",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
                variant="contained"
                component={Link}
                to="/getForms"
                title={'you can download all forms to complete it from this button'}
              >
                get Forms
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
        <label >{survey.course_name}</label>
        <br />
      </Typography>
      <label>Course Code : <span style={{color:"blue"}}>{survey.course_code}</span></label>
      <br />
      <label>Year : <span style={{color:"blue"}}>{survey.year}</span></label>
      <br />
      <label>Semester : <span style={{color:"blue"}}>{survey.semester}</span></label>
    </CardContent>
  );
}
