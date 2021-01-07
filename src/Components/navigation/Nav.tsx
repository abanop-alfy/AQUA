import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link,NavLink, useHistory } from "react-router-dom";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { Button } from "@material-ui/core";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 'auto',
    },
    title: {
      flexGrow: 1,
    }
  })
);

export default function Nav(props: any) {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  let history = useHistory();
  const token = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
    },
  };
  const userRole = localStorage.getItem("AQUA_UserType");
  function logOut() {
    axios
      .get(`http://127.0.0.1:8000/api/auth/${userRole}-logout`, token)
      .then((resp) => {
        history.push("/login/");
        localStorage.removeItem("AQUA_token");
        localStorage.removeItem("AQUA_UserType");
        // localStorage.removeItem("introDone");
      });
  }
  function getHelp() {
    localStorage.removeItem("introDone");
    history.push("/");
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Hidden mdUp>
          <IconButton edge="start" onClick={()=>setDrawerOpen(true)} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Drawer open={drawerOpen} className="drawerMenu" onClose={()=>setDrawerOpen(false)}>
        {userRole && userRole === "student" && (
                <Button
                color="primary"
                title={`go to home`}
              >
              <Link
                to="/"
                title={'you can go to all courses from here to make a survey or dowmload exams '}
              >
              <img src={"/images/logo.jpg"} width={"200px"} height={"40px"}  ></img>

              </Link>
              </Button>
            )}
            {userRole && userRole === "doctor" && (
                <Button
                color="primary"
                component={Link}
                to={`/`}
                title={`you can go to all courses you teached it `}
              >
             <img src={"/images/logo.jpg"} width={"200px"} height={"40px"}  ></img>

              </Button>
            )}
            {userRole && userRole === "doctor" && props.admin && (
              <>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/courses`}
                title={`you can see all courses information from here `}
              >
                  CoursesInfo
                </Button>
                <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/assistants`}
                title={`You can see all assistants information from here  `}
              >
                  Assistants
                </Button>
                <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/doctors`}
                title={` You can see all doctors information from here `}
              >
                  Doctors
                </Button>
                <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/program`}
                title={` You can see all programs information from here `}
              >
                  Programs
                </Button>
                <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/empty`}
                title={`you can go to upload empty forms from here`}
              >
                  Empty Forms
                </Button>
              </>
            )}
            {userRole && userRole === "assistant" && (
              <Button
              color="primary"
              component={Link}
              to={`/`}
              title={`you can go to all courses you teached it from here to see practiacal survey result or form 12 `}
            >
          <img src={"/images/logo.jpg"} width={"200px"} height={"40px"}  ></img>

              </Button>
            )}
          </Drawer>
        <Hidden smDown>
          <Typography className={classes.title}>
            {userRole && userRole === "student" && (
              <Link
                to="/"
                className="Home"
                title={`you can go to all courses from here to make a survey or dowmload exams  `}
              >
              <img src={"/images/logo.jpg"} width={"200px"} height={"40px"}  ></img>

              </Link>
            )}
            {userRole && userRole === "assistant" && (
              <NavLink
                to="/"
                className="Home"
                title={`you can go to all courses you teached it from here to see practiacal survey result or form 12`}
              >
              <img src={"/images/logo.jpg"} width={"200px"} height={"40px"}  ></img>

              </NavLink>
            )}
            {userRole && userRole === "doctor" && (
              
              <Link
                to="/"
                className="Home"
                title={`you can go to all courses you teached it `}
              >
              <img src={"/images/logo.jpg"} width={"200px"} height={"40px"}  ></img>
              
              </Link>
            )}
            {userRole && userRole === "doctor" && props.admin && (
              <>
                <NavLink
                  to="/courses"
                  className="Home"
                  title={`you can see all courses information from here `}
                  activeClassName="selected"
                >
                  CoursesInfo
                </NavLink>
                <NavLink
                  to="/assistants"
                  className="Home"
                  title={` You can see all assistants information from here  `}
                  activeClassName="selected"
                >
                  Assistants
                </NavLink>
                <NavLink
                  to="/doctors"
                  className="Home"
                  title={` You can see all doctors information from here `}
                  activeClassName="selected"
                >
                  Doctors
                </NavLink>
                <NavLink
                  to="/program"
                  className="Home"
                  title={` You can see all programs information from here `}
                  activeClassName="selected"
                >
                  Programs
                </NavLink>
                <NavLink
                  to="/empty"
                  className="Home"
                  title={`you can go to upload empty forms from here`}
                  activeClassName="selected"
                >
                  Empty Forms
                </NavLink>
              </>
            )}
            
          </Typography>
          </Hidden>
          <IconButton onClick={() => {
                getHelp();
              }} title={
                `you can reopen demo website from here to help you what you do `
               }>
            <LiveHelpIcon
              style={{ marginRight: "10" }}
            />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            title={
              `you can log out from here `
             }
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            {/* <MenuItem onClick={handleClose} title={
              `you can log in as admin from here `
             }>Admin</MenuItem> */}
            <MenuItem title={
              `you can log out from here `
             }
              onClick={() => {
                logOut();
              }}
            >
              log out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
