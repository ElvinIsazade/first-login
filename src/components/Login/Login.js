import React, { useContext, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state,action) => {
  if(action.type === "USER_INPUT"){
    return {value : action.val,isValid : action.val.includes("@")}
  }
  if(action.type === "INPUT_BLUR"){
    return {value : state.value, isValid : state.value.includes("@")}
  }
  return {value : "", isValid : false}
}
const passwordReducer = (state,action) => {
  if(action.type === "USER_INPUT"){
    return {value: action.val,isValid : action.val.trim().length > 6}
  }
  if(action.type === "INPUT_BLUR"){
    return {value : state.value,isValid : state.value.trim().length > 6}
  }
  return {value:"",isValid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail] = useReducer(emailReducer,{value : "", isValid : null});
  const [passwordState,dispatchPassword] = useReducer(passwordReducer,{value:"",isValid:null})
  const authCtx = useContext(AuthContext)

  useEffect(()=>{
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    },1000)
    return () => {
      clearTimeout(identifier)
    }

  },[emailState.isValid,passwordState.isValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type : "USER_INPUT",val : event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type : "USER_INPUT", val : event.target.value})

  };

  const validateEmailHandler = () => {
    dispatchEmail({type : "INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type : "INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          label= {"E-Mail"}
          id={"email"}
          onChange={emailChangeHandler}
          onBlur = {validateEmailHandler}
          value = {emailState.value}
          isValid = {emailState.isValid}
        />
        <Input
          label= {"Password"}
          id={"password"}
          onChange={passwordChangeHandler}
          onBlur = {validatePasswordHandler}
          value = {passwordState.value}
          isValid = {passwordState.isValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
