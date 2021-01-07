import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import Alert from '@material-ui/lab/Alert';
import { useHistory, Link } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import toastr from "toastr";

type FormData = {
  email: string;
  newpassword: string;
  newpassword_confirmation:string;
  name:string;
  code:string;
};
type RadioButtonsGroupProps = {
  value: string;
  valueChange: Function;
}
function RadioButtonsGroup(props: RadioButtonsGroupProps) {
  const {value, valueChange} = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    valueChange((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="gender" style={{display:'flex',flexDirection:'row'}} name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="student" control={<Radio />} label="Student" />
        <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
        <FormControlLabel value="assistant" control={<Radio />} label="Assistant" />
      </RadioGroup>
    </FormControl>
  );
}
export default function ForgetPassword() {
  const { handleSubmit, register, errors, watch } = useForm<FormData>();
  const [hasErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('student');
  const history = useHistory();

  const registerSubmit = (data: FormData) => {
    setLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.set('code', data.code);
    bodyFormData.set('email', data.email);
    bodyFormData.set('newpassword', data.newpassword);
    bodyFormData.set('newpassword_confirmation', data.newpassword_confirmation );
    // bodyFormData.set('name', data.name);


    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/api/auth/${value}/rest-password`,
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
    .then(response => {
      setLoading(false);
      history.push("/login");
      toastr.clear();
      toastr.success(`you successfully reset password`);
    })
    .catch(err => {
      setLoading(false);
      toastr.clear();
          toastr.error(
            `you're not authorized please enter again with the right role`
          );
    });
  };
  const typeChange = (val: string)=>{
    setValue(val);
  }
  return (
    <div className="login-page">
      <div className="materialContainer">
        <h3>resset password</h3>
        <form noValidate onSubmit={handleSubmit(registerSubmit)}>
        {hasErrors && <Alert severity="error">credentials you've entered is wrong</Alert>}
        <div className="input">
        <RadioButtonsGroup value={value} valueChange={typeChange}/>
            <TextField
              label="User code"
              name="code"
              inputRef={register({
                required: true,
              })}
              autoComplete="none"
              fullWidth
              helperText={errors.code && "please enter a valid code"}
              error={errors.code && true}
            />
          </div>
          {/* <div className="input">
            <TextField
              label="User name"
              name="name"
              inputRef={register({
                required: true,
                
              })}
              fullWidth
              helperText={errors.name && "please enter a valid name"}
              error={errors.name && true}
            />
          </div> */}
          <div className="input">
            <TextField
              label="User email"
              name="email"
              inputRef={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
              })}
              fullWidth
              helperText={errors.email && "please enter a valid email"}
              error={errors.email && true}
            />
          </div>
          <div className="input">
            <TextField
              id="standard-password-input"
              label="new Password"
              name="newpassword"
              type="password"
              autoComplete="new-password"
              inputRef={register({ required: true,
                pattern: /^[A-Za-z0-9._%+-]{8,}$/i
               })}
              fullWidth
              error={errors.newpassword && true}
              helperText={errors.newpassword && "please enter a new password with at least 8 chars"}
            />
          </div>
          <div className="input">
            <TextField
              id="standard-password-input"
              label="Confirm new password"
              name="newpassword_confirmation"
              type="password"
              autoComplete="off"
              inputRef={register({ required: true ,
                validate: (value) => value === watch('newpassword')
              })}
              fullWidth
              error={errors.newpassword_confirmation
                && true}
              helperText={errors.newpassword_confirmation
                && "confirm new password doesn't match password"}
            />
          </div>
          <div className="button login">
            <Button
            style={{width:"100%"}}
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              endIcon={<Icon>send</Icon>}
            >
              {loading ? '...confirm' : 'confirm'}
            </Button>
            <Link
            to="/Login"
            className="pass-forgot"
            style={{ color: "black" }}
          >
            Sign In 
          </Link>
          </div>
          
        </form>
      </div>
    </div>
  );
}
