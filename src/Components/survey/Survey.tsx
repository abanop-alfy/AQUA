import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import Mcq from "./MCQ";
import { Button, Grid, Card, CardContent, CardActions, TextField } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from "axios";


export interface iQuestion {
  id: number;
  content: string;
  type?: string;
}
export interface iAnswered {
  questionId: number;
  answerId: string;
}
export default function Survey() {
  // let  { idCourse,idDoctor } = useParams();
  const params = useParams<{ id: string }>();

  const [questions, setQuestions] = useState<iQuestion[]>([]);

  const type = useLocation().search.split('&')[0].split('=')[1];
  const prof = useLocation().search.split('&')[1].split('=')[1];
  // let history = useHistory();

  useEffect(() => {
    console.log(type)
    const token = {
      headers: { 
        Authorization: `Bearer `+ localStorage.getItem("AQUA_token")
       }
    }
    console.log(type);

    // Promise.all([
      axios.get(`http://127.0.0.1:8000/api/getQuestion_${type}`,token)
      // axios.post(`makeEvluation_theoritical/${idCourse}/${idDoctor}`,token)
    // ])
      .then(resp => {
        console.log(resp);
        const data = [...resp.data];
        setQuestions((data as unknown) as iQuestion[]);
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

  const [survey, setSurvey] = React.useState<iAnswered[]>([]);
  const [index, setIndex] = React.useState<number>(0);
  const [comment, setComment] = React.useState<string>("");

  function userAnswer(answer: string, questionId: number) {
    let answered: iAnswered[] = [...survey];
    if (getAnswered(questionId) === -1) {
      answered.push({
        questionId: questionId,
        answerId: answer
      });
    } else {
      answered[getAnswered(questionId)].answerId =answer;
    }
    console.log(answered);
    setSurvey(answered);
  }
  function getAnswered(questionId: number) {
    return survey.findIndex(s => s.questionId === questionId);
  }
  let history = useHistory();

  function handleSubmit() {
    console.log(survey.map(a => ({[`"Answer_${a.questionId}"`]:a.answerId})));
   
    let george:any = {};
    survey.forEach((a)=>{
      george[`Answer_${a.questionId}`] = a.answerId;
    });
    george.comment=comment;
    
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/api/makeEvluation_${type}/${params.id}/${prof}`,
      data: george,
      headers: {Authorization: `Bearer `+ localStorage.getItem("AQUA_token")}
      })
    .then(response => {
      console.log(response);
    history.push(`/`);

      toastr.clear();
        toastr.success(`success thanks you for evaluate`);
    })
    .catch(err => {
      if(err.message === 'Request failed with status code 401') {
        localStorage.removeItem('AQUA_token');
        localStorage.removeItem('AQUA_UserType');
        toastr.clear();
        toastr.error(`you're not authorized please login again with the right role`);
        history.push('login');
      }
    });
  }
   
  
  function commentChange(e:any) {
    setComment(e.target.value);
  }
 
  return (
    <div>{ questions.length ? <> <br></br>
    <LinearProgress variant="determinate" value={(index *100) / questions.length} style={{height:20 ,margin:"0 auto", maxWidth:800}}/>
    <Card className="surveylogo" style={{maxWidth: '500px', margin: '20px auto'}}>
    <CardContent>
      { (index < questions.length) &&
        <div>
          <h3>{questions[index].content}</h3>
          <Mcq id={questions[index].id} choosed={survey[getAnswered(questions[index].id)]} handleChange={userAnswer} />
        </div>
      } {
        (index === questions.length) &&
        <TextField
        style={{width: '100%', margin: '20px auto'}}
              id="outlined-multiline-static"
              label="سجل اقتراحاتك التي تتعلق بجوانب اخري تري ايضا انها مهمه غير مدرجه"
              multiline
              rows="4"
              variant="outlined"
              onChange={commentChange}
            />
      }
    </CardContent>
    <CardActions>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Button variant="contained" color="default" disabled={index < 1}  onClick={()=> setIndex(index-1)}>
          Previous
        </Button>
        {
					index === (questions.length) && 
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        }
				{
          index < (questions.length) && 
          <Button variant="contained" color="primary" disabled={getAnswered(questions[index].id) === -1} onClick={()=> setIndex(index+1)}>
            Next
          </Button>
        }
      </Grid>
    </CardActions>
    </Card>
    </> : <p className="font-weight-bolder" style={{color:'#3f51b5',fontWeight:'bold',fontSize:'18px'}}><br></br>
      Loading to the survey filling page...
    
      </p>}
      </div>
  );
}