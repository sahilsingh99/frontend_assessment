import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useState from 'react';
import axios from 'axios';
import moment from 'moment';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  content: {
    margin : "0%",
    paddingBottom : "5px"
  },
//   title: {
//     fontSize: 14,
//   },
  pos: {
    marginBottom: 4,
  },
});

export default function EeventCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const event = props.event;

  var deleteHandle = (e) => {
    e.preventDefault();
    const url = 'https://agile-citadel-61684.herokuapp.com/api/event/delete/' + event._id + '/' + props.userId;
    axios.delete( url, {
        headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${props.token}`
          }  
    })
    .then(res => {
      if(res.status === 200) {
        alert("event successfully deleted");
        props.handler();
      } else {
        alert(" error in deleting event ");
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.content}>
        <Typography color="Primary" variant = "h3">
          {event.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {bull} {event.description}
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          venue : {event.venue}
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          Start Time : {moment(event.startTime).format("YYYY-MM-DD HH:mm")}  
        </Typography>
        <Typography className={classes.pos} color="Secondary" variant="h5">
          End Tme : {moment(event.endTime).format("YYYY-MM-DD HH:mm")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color = "primary" onClick = {deleteHandle}>Delete Event</Button>
      </CardActions>
    </Card>
  );
}
