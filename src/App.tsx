// import React from 'react';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
import Nav from "./Components/navigation/Nav";
import { Container, AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import Home from "./Components/home/Home";
import Survey from "./Components/survey/Survey";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

import Login from "./Components/login/Login";
import Statstics from "./Components/statstics/Statstics";
import Report from "./Components/report/Repoprt";
import Forms from "./Components/Forms/Forms";

import CoursesInfo from "./Components/courses info/CoursesInfo";
import Assistant from "./Components/assistant/Assistant";
import Doctors from "./Components/doctors/Doctors";
import Register from "./Components/register/Register";
import axios from "axios";
import toastr from "toastr";
import StatAssistant from "./Components/statAssistant/StatAssistant";
import RepAssistant from "./Components/repAssistant/RepAssistant";
import Exams from "./Components/exams/Exams";
import ForgetPassword from "./Components/forgetPassword/ForgetPassword";
import GetForms from "./Components/getForms/GetForms";
import Form12 from "./Components/form12/form12";
import Program from "./Components/programs/Program";
import AllForms from "./Components/allForms/AllForms";
import FormsInfo from "./Components/formsInfo/FormsInfo";
import Footer from "./Components/footer/Footer";
import ContactUs from "./Components/contactUs/ContactUs";
import AboutUs from "./Components/aboutUs/AboutUs";
import AboutLogin from "./Components/aboutLogin/AboutLogin";
import ContactLogin from "./Components/contactLogin/ContactLogin";
import CourseReport from "./Components/courseReport/CourseReport";
import EmptyFiles from "./Components/emptyForm/EmptyForm";


function AppWrapper() {
  // const introDone = localStorage.getItem("introDone");
  const userRole = localStorage.getItem("AQUA_UserType");
  const [admin, setadmin] = useState(false);
  useEffect(() => {
    const token = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
      },
    };
    if (userRole && userRole === "doctor") {
      axios
        .get(`http://127.0.0.1:8000/api/Doctor/check_admin`, token)
        .then((resp) => {
          setadmin(resp.data.isAdmin);
          toastr.clear();
          toastr.success(`you successfully logged in as admin`);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Nav admin={admin} />
      <Container
        style={{ backgroundColor: "#f5f5f5", minHeight: "calc(100vh - 64px)" }}
      >
        <Switch>
          {userRole && userRole === "student" && (
            <>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/exams/:id">
                <Exams />
              </Route>
              <Route path="/survey/:id" exact>
                <Survey />
              </Route>
              <Route path="/contact-us">
                <ContactUs />
              </Route>
              <Route path="/About-us">
                <AboutUs />
              </Route>
            </>
          )}
          {userRole && userRole === "doctor" && (
            <>
              <Route path="/" exact>
                <Statstics />
              </Route>
              <Route path="/forms/:id/" exact>
                <Forms />
              </Route>
              <Route path="/getForms/">
                <GetForms />
              </Route>
              <Route path="/statistics/:id/">
                <Report />
              </Route>
              <Route path="/contact-us">
                <ContactUs />
              </Route>
              <Route path="/About-us">
                <AboutUs />
              </Route>
              {admin && (
                <>
                  <Route path="/assistants/">
                    <Assistant />
                  </Route>
                  <Route path="/doctors/">
                    <Doctors />
                  </Route>
                  <Route path="/courses" exact>
                    <CoursesInfo />
                  </Route>
                  <Route path="/CourseReport/:idDoctor/:id/" >
                    <CourseReport />
                  </Route>
                  <Route path="/FormsInfo/:id/">
                    <FormsInfo />
                  </Route>
                  <Route path="/program" exact>
                    <Program />
                  </Route>
                  <Route path="/program/:id/">
                    <AllForms />
                  </Route>
                  <Route path="/empty">
                    <EmptyFiles />
                  </Route>
                </>
              )}
            </>
          )}
          {userRole && userRole === "assistant" && (
            <>
              <Route path="/" exact>
                <StatAssistant />
              </Route>
              <Route path="/statistics/:id/">
                <RepAssistant />
              </Route>
              <Route path="/form12/:id/" exact>
                <Form12 />
              </Route>
              <Route path="/contact-us">
                <ContactUs />
              </Route>
              <Route path="/About-us">
                <AboutUs />
              </Route>
            </>
          )}
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

function App() {
  const loggedIn = localStorage.getItem("AQUA_token");

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/forgetPassword">
          <ForgetPassword />
        </Route>
        <Route path="/about">
        <AboutLogin />
        </Route>
        <Route path="/contact">
        <ContactLogin />
        </Route>
        <Route path="/">
          <AppWrapper />
        </Route>
        <Route path="*">
        <ContactLogin />
        </Route>
      </Switch>
      {loggedIn ? <Route path="*" /> : <Redirect to="/login" />}

    </Router>

  );
}

export default App;
