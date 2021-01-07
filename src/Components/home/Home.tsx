import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import axios from "axios";
import toastr from "toastr";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
// @ts-ignore
import { Steps } from "intro.js-react";
import Alert from "@material-ui/lab/Alert";
interface iSurvey {
  Activated_course_id: number;
  course_code: string;
  semester: string;
  year: number;
  attendence: number;
  course_name: string;
  hours: number;
  Doctor_name?: string;
  Doctor_id?: number;
  assistant_name?: string;
  assistant_id?: number;
  done_practical?: number;
  done_theoritical?: number;
}

export default function Home() {
  let history = useHistory();
  const [courses, setCourses] = useState<iSurvey[] | undefined>();
  const introDone = localStorage.getItem("introDone");

  function goToSurvey(id: Number, type: string, dr: number) {
    console.log(type);
    history.push(`/survey/${id}?type=${type}&id=${dr}`);
  }
  useEffect(() => {
    const token = localStorage.getItem("AQUA_token");
    toastr.clear();
    toastr.success(`you successfully logged in as student`);
    Promise.all([
      axios.get(`http://127.0.0.1:8000/api/Student/all_practical_course`, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }),
      axios.get(`http://127.0.0.1:8000/api/Student/all_theoritical_course`, {
        headers: { Authorization: `Bearer ` + token },
      }),
    ])
      .then((values) => {
        console.log(values);
        const data = [...values[0].data.data, ...values[1].data.data];
        setCourses((data as unknown) as iSurvey[]);
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
  let steps: any[] = [
    {
      element: ".MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters",
      intro:
        "you can go to home page from here and logout from icon on that corner ",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element:
        ".MuiPaper-root.MuiCard-root.card.card-practical.MuiPaper-elevation1.MuiPaper-rounded",
      intro: "this card for practical survey ",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element:
        ".MuiPaper-root.MuiCard-root.card.card-theoritical.MuiPaper-elevation1.MuiPaper-rounded",
      intro: "this card for theoritical survey ",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element:
        ".MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary",
      intro: "this button to enter to survey page",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element:
        ".MuiButtonBase-root.MuiButton-root.MuiButton-contained.exams.MuiButton-containedPrimary",
      intro: "this button to enter to latest exams for last years",
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
      intro: "you can log out from here",
      position: "bottom",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    }
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
          <Card
            style={{ height: "100%" }}
            // id={"1"}
            className={
              subject.Doctor_id
                ? "card card-theoritical"
                : "card card-practical"
            }
            key={index}
          >

            {subject.attendence >= 60 ? (
              <>
                {!subject.done_practical && !subject.done_theoritical ? (
                  <CardActionArea
                    onClick={() => {
                      goToSurvey(
                        subject.Activated_course_id,
                        subject.Doctor_name ? "theoritical" : "practical",
                        (subject.assistant_id
                          ? subject.assistant_id
                          : subject.Doctor_id) as number
                      );
                    }}
                  >
                    <SurveyCard survey={subject} />
                  </CardActionArea>
                ) : (
                  <>
                    <CheckCircleOutlineIcon
                      style={{ color: "green", marginLeft: "250px" }}
                    />
                    <SurveyCard survey={subject} />
                  </>
                )}
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    style={{ width: "100%", height: "30px" }}
                    variant="contained"
                    onClick={() => {
                      goToSurvey(
                        subject.Activated_course_id,
                        subject.Doctor_name ? "theoritical" : "practical",
                        (subject.assistant_id
                          ? subject.assistant_id
                          : subject.Doctor_id) as number
                      );
                    }}
                    disabled={
                      !subject.done_practical && !subject.done_theoritical
                        ? false
                        : true
                    }
                    title={`You can go to the survey filling page `}
                  >
                    go to survey
                  </Button>
                  <Button className="exams"
                    style={{ width: "100%", height: "30px" }}
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/exams/${subject.Activated_course_id}`}
                    title={`you can download exams from this button `}
                  >
                    Exams
                  </Button>
                </CardActions>
              </>
            ) : (
              <>
                <div>
                  <Alert severity="warning">
                    This is a warning — you can't survey <span style={{color:"blue"}}>Course: {subject.course_name}</span> because
                    your attendance is less than 60%!
                  </Alert>
                  <Button
                    style={{ width: "100%", height: "30px" }}
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/exams/${subject.Activated_course_id}`}
                    title={`you can download exams from here `}
                  >
                    Exams
                  </Button>
                </div>
              </>
            )}
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
    <CardContent
      title={
        survey.Doctor_name
          ? "You can go to the  theoritical survey filling page"
          : "You can go to the practical survey filling page"
      }
    >
      <CardMedia
        className="Media"
        image={images[survey.course_code.slice(0, 3)]}
      />
      <Typography gutterBottom variant="h5" component="h2">
        <label>{survey.Doctor_name || survey.assistant_name}</label>
        <br />
      </Typography>

      <label title={survey.course_name} >Subject Name : <span style={{color:"blue"}}>{survey.course_name}</span></label>
      <br />
      <label title={survey.course_code}>Course Code : <span style={{color:"blue"}}>{survey.course_code}</span></label>
      <br />
      <label title={survey.year.toString()}>Year : <span style={{color:"blue"}}> {survey.year}</span></label>
      <br />
      <label>Semester : <span style={{color:"blue"}}> {survey.semester}</span></label>
      <br />
    </CardContent>
  );
}
