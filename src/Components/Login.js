import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();


  let history = useHistory();

    const emailRef = useRef();
    const passRef = useRef();

    var handleSubmit = (e) => {
        e.preventDefault();
        console.log('clicked')
        axios.post('https://agile-citadel-61684.herokuapp.com/api/auth/login', {
          email : emailRef.current.value,
          password : passRef.current.value
        })
        .then(res => {
          if(res.status === 202) {
            alert("logged in successfully");
            console.log(res.data.data);
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('userId',res.data.data.userId);
            localStorage.setItem('usename', res.data.data.usename);
            history.push('/');
          }
        })
        .catch(err => {
            emailRef.current.value = '';
            passRef.current.value = '';
            let message = err.response.data.custom_message;
            let email_message = "";
            let username_message = "";
            if(err.response.data.message.errors){
                email_message = err.response.data.message.errors.email ? "enter valid email" : '';
                username_message = err.response.data.message.errors.username ? "enter valid username" : '';
            }
            message = message + "\n" + email_message + "\n" + username_message;
            alert(message);
            console.log(err.response);
        })
      }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef = {emailRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef = {passRef}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
