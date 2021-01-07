import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

type FormData = {
  email: string;
  password: string;
};
type RadioButtonsGroupProps = {
  value: string;
  valueChange: Function;
};
function RadioButtonsGroup(props: RadioButtonsGroupProps) {
  const { value, valueChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    valueChange((event.target as HTMLInputElement).value);
  };

  return (
    <RadioGroup
      aria-label="gender"
      style={{ display: "flex", flexDirection: "row" }}
      name="gender1"
      value={value}
      onChange={handleChange}
    >
      <FormControlLabel value="student" control={<Radio />} label="Student" />
      <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
      <FormControlLabel
        value="assistant"
        control={<Radio />}
        label="Assistant"
      />
    </RadioGroup>
  );
}
export default function Login() {
  const { handleSubmit, register, errors } = useForm<FormData>();
  const [hasErrors, setHasErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("student");
  const history = useHistory();

  const login = (data: FormData) => {
    setLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.set("email", data.email);
    bodyFormData.set("password", data.password);

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/api/auth/${value}-login`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        setLoading(false);
        if(response.data.access_token){
          localStorage.setItem("AQUA_token", response.data.access_token);
          localStorage.setItem("AQUA_UserType", value);
          history.push("/");
        }
        else {
          setHasErrors(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setHasErrors(true);
      });
  };
  const typeChange = (val: string) => {
    setValue(val);
  };
  return (
    <div className="login-page">
      <div className="materialContainer">
        <h1>Login</h1>
        <form noValidate onSubmit={handleSubmit(login)}>
          {hasErrors && (
            <Alert severity="error">credentials you've entered is wrong</Alert>
          )}
          <RadioButtonsGroup value={value} valueChange={typeChange} />
          <div className="input">
            <TextField
              label="User email"
              name="email"
              inputRef={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
              fullWidth
              helperText={errors.email && "please enter a valid email"}
              error={errors.email && true}
            />
          </div>
          <div className="input">
            <TextField
              id="standard-password-input"
              label="Password"
              name="password"
              type="password"
              inputRef={register({ required: true })}
              fullWidth
              error={errors.password && true}
              helperText={errors.password && "please enter your password"}
            />
          </div>
          <div className="button login">
            <Button
              style={{ width: "100%" }}
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              endIcon={<Icon>send</Icon>}
            >
              {loading ? "...loading" : "Login"}
            </Button>
          </div>

          <Link
            to="/forgetPassword"
            className="pass-forgot"
            style={{ color: "black" }}
          >
            Forgot your password?
          </Link>
          <Link
            to="/register"
            className="pass-forgot"
            style={{ color: "black" }}
          >
            Register now
          </Link>
          <div style={{display:"flex",margin:"0 auto", alignContent:"center"}}>
          <Link
            to="/contact"
            className="pass-forgot"
            style={{ color: "black",display:"inline",alignContent:"center",margin:"auto",marginTop:"1rem"}}
          >
           Contact Us
          </Link>
          <Link
            to="/about"
            className="pass-forgot"
            style={{ color: "black" ,display:"inline",margin:" auto",marginTop:"1rem"}}
          >
           About Us
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
