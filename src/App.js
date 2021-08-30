import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import { Container, AppBar, Toolbar } from '@material-ui/core';
import { IconButton, Button, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core';
import EventCard from './Components/EventCard';
import FormDialog from './Components/EventDialogForm';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  listRoot: {
    width : "80%",
    marginLeft : "10%"
  }
}));



function App() {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') ? localStorage.getItem('userName') : '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') ? localStorage.getItem('userId') : '');
  const [allEvents, setAllEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
      const value = !refresh;
      setAllEvents([]);
      setRefresh(value);
  }

  const logoutHandler = () => {
    axios.get('https://agile-citadel-61684.herokuapp.com/api/auth/logout')
    .then(res => {
      alert("logged Out :)");
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      history.push('/login');
    })
    .catch(err => {
      alert("failed to log out :(");
    })
  }

  const classes = useStyles();

  let history = useHistory();
  useEffect(() => {
    console.log(token, userName, userId);
    if(token) {
      const url = 'https://agile-citadel-61684.herokuapp.com/api/event/allEvents/' + userId;
      axios.get(
        url,
        {
          headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${token}`
            }  
        }
      )
      .then(res => {
        console.log("res",res);
        if(res.status !== 200) {
          history.push('/login');
        } else {
          const data = res.data.data.allEvents;
          setAllEvents(data);
          console.log(allEvents);
        }
      })
      .catch(err => {
        history.push('/login');
        console.log("err",err);
      })
    } else {
      history.push('/login');
    }
    
  },[refresh]);

  const dummyData = [
    {
      name : "event1",
      description : "this is description",
      venue : "online"
    },
    {
      name : "event2",
      description : "this is description",
      venue : "online"
    },
    {
      name : "event3",
      description : "this is description",
      venue : "online"
    },
    {
      name : "event3",
      description : "this is def",
      venue : "offline"
    }
  ]

  return (
    <Container maxWidth="md">
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Events
          </Typography>
          <Button color="inherit" onClick = {logoutHandler}>Logout</Button>
        </Toolbar>
      </AppBar>
      <FormDialog handler = {handleRefresh} userId = {userId} token = {token}/>
      <List className = {classes.listRoot}>
        {
          allEvents.map(event => {
              return (<EventCard event = {event} userId = {userId} token = {token} handler = {handleRefresh}/>)
          })
        }
      </List>
    </Container>
  );
}

export default App;
