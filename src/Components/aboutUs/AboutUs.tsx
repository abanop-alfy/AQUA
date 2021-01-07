import React, { useEffect } from "react";
import Hidden from "@material-ui/core/Hidden";
import HomeIcon from '@material-ui/icons/Home';
import { Grid } from "@material-ui/core";

export default function AboutUs() {
  useEffect(() => {
    const header = document.getElementById("stickyHeader") as HTMLElement;
    const sticky = header.offsetTop + header.clientHeight;
    const scrollCallBack = () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", scrollCallBack);
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <div>
      <section className="et-hero-tabs">
      <img src="images/aqua.jpg"  width="460px" height="350px" />
        <div className="et-hero-tabs-container" id="stickyHeader">
        <Hidden mdUp>

        <a className="et-hero-tab" href="/">
        <HomeIcon/> 
          </a>
          </Hidden>
          <Hidden smDown>
            <a className="et-hero-tab" href="#a">
              Supervisors
            </a>
            <a className="et-hero-tab" href="#b">
              Coded By
            </a>
            <a className="et-hero-tab" href="#c">
              Project Objectives
            </a>
            <a className="et-hero-tab" href="#d">
              Project Outcomes
            </a>
            <span className="et-hero-tab-slider"></span>
          </Hidden>
        </div>
      </section>
      <main className="et-main content">
      <section className="et-slide" id="a">
          <h1>Supervisors</h1>
          <br></br>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img src="images/drazza.jpeg"  width="140px" height="140px" title="Dr: Azza Abd-Elrahman"/> 
          </Grid>
          <Grid item xs={6}>
          <img src="images/drnaglaa.jpeg"  width="140px" height="140px"  title="Dr: Naglaa Mohamed"/>
          </Grid>
          <Grid item xs={6}>
          <h3 style={{display:"inline"}}>Dr: Azza Abd-Elrahman</h3>
          </Grid>
          <Grid item xs={6}>
          <h3 style={{display:"inline"}}>Dr: Naglaa Mohamed</h3>
          </Grid>
          </Grid>
    
        </section>
        <section className="et-slide" id="b">
          <h1>Coded By</h1>
          <br></br>
          <Grid container spacing={2}>
          <Grid item xs={4}>
          <img src="images/abanob.jpg"  width="140px" height="140px"  title="Abanob Alfy"/>
          </Grid>
          <Grid item xs={4}>
          <img src="images/kirolos.jpg"  width="140px" height="140px"  title="Kirolos Sabry"/>
          </Grid>
          <Grid item xs={4}>
          <img src="images/gorge.jpg"  width="140px" height="140px"  title="Gorge Antwan"/>
          </Grid>
          <Grid item xs={4}>
          <h3 style={{display:"inline"}}>Abanob Alfy </h3>
          </Grid>
          <Grid item xs={4}>
          <h3 style={{display:"inline"}}>Kirolos Sabry</h3>
          </Grid>
          <Grid item xs={4}>
          <h3 style={{display:"inline"}}>Gorge Antwan</h3>
          </Grid>
          </Grid>

          </section>
        <section className="et-slide" id="c" >
          <h1>Project Objectives</h1>
          <div style={{textAlign:'left'}}>
          <h3>Our project aims to:</h3>
          <ul>
            <li>
              Develop a website for QAU members to accomplish the above duties
              adequately and easily.
            </li>
            <li>
              Convert from manual to electronic system in order to reduce the
              costs.
            </li>
            <li>
              Reduce the time taken by students to evaluate their courses and
              instructors and acknowledge doctors and assistances about their
              evaluation in a faster.
            </li>
            <li>Reduce manual errors.</li>
            <li>
              Manage time (means not wasting time of the lectures to do
              evaluation).
            </li>
            <li>
              Enable students to do the assessments in a comfortable way without
              any effect on their opinion.
            </li>
            <li>
              Enable doctors to complete the reports in a relaxed asnd secured
              way, electronically and remotely.
            </li>
          </ul>
          </div>
        </section>
        <section className="et-slide" id="d">
        
          <h1>Project Outcomes</h1>
          <div style={{textAlign:'left'}}>
          <h3>Our project enables coordinators to</h3>
          <ul>
            <li>Fill the following forms (leader only): </li>
            <ul>
              <li>
                Form 11b: which is a mapping between the courses of the program
                and the intended learning outcomes (ILO) of the program.
              </li>
              <li>Form 13: which contains the description of each program.</li>
              <li>
                Form 15: which is the program report, which has the number of
                students passed the program, the number of students got A, A, B,
                B+, etc. Also, it contains the doctor suggestion for
                improvements.
              </li>
            </ul>
            <li>
              Check if doctor or assistant is working or not (leader only).
            </li>
            <li>Upload description of each course.</li>
            <li>Check if there is missing form in the file.</li>
            <li>Check if some courses is active or not.</li>
            <li>Check the duties of each doctor.</li>
            <li>Check the teaching hours of each doctor.</li>
          </ul>
        </div>
         
        </section>
        <section className="et-slide" id="f">
        <div style={{textAlign:'left'}}>
        <h3>  Our project enables doctors to:</h3> 
        <ul>
      	<li>View files of his current assigned courses.</li>
	      <li>Get stats and rates on every course they taught.</li>
	      <li>Say their suggestions of improvements about any course.</li>
	     <li>Upload their exams and its answers.</li>
	     <li>Represent what the exam of each course has achieved from quality standards.</li>
	     <li>Fill the following forms: 
         <ul> 
            <li>Form 11a: which the mapping between each course’s content and the Intended learning outcomes (ILO) of the course.</li>
            <li>Form 12:  which the description of each course.</li>
            <li>Form 16: the course report which contains course information, report, indicates the number of students passed the course with its percentage, the number of students got A+, A, B, B+, etc. Also, it contains suggestions for improvements which each doctor should fill.</li>
      </ul></li>
    </ul> 
    <h3> Our project enables students to:</h3>
            <ul>
            <li>Give their opinion about the courses that have been studied and the doctors that have been taught these courses, electronically.</li>
            <li>Answer the questions about the theoretical part of each doctor, independently.</li>
            <li>Get the exams of each course of the last years.</li>
            <li>Evaluate the assistants of practical courses, separately.</li>
         </ul>
         <h3> Our project enables assistants to:</h3> 
             <ul>
            <li>View Form 12 of his current assigned courses </li>
            <li>Get rates of each practical course he taught.</li>
            </ul></div>
       </section>
      </main>
    </div>
  );
}
