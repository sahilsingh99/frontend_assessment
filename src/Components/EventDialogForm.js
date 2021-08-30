import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function PostFormDialog(props) {
  const [open, setOpen] = useState(false);
  const [venue, setVenue] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVenue = (e) => {
    setVenue(e.target.value);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
  }
  
  const handleStartTime = (e) => {
      console.log(Date.now());
      console.log(e.target.value);
      setStartTime(e.target.value);
  }

  const handleEndTime = (e) => {
    console.log(e.target.value);
    setEndTime(e.target.value);
  }


  const handleSubmit = (e) => {
      e.preventDefault();
      if(name === '' || description === '' || venue === '') {
          alert('enter all require fields');
          return;
      }
      let isValid = moment(startTime).isAfter(Date.now());
      let compared = moment(endTime).isAfter(startTime);
      if(isValid === false) {
          alert('enter a date in future');
          return;
      } 
      if(compared === false) {
          alert('end time must be in future to start time');
          return;
      }
      const url = 'https://agile-citadel-61684.herokuapp.com/api/event/create/' + props.userId;
        axios.post( url, {
        name : name,
        description : description,
        venue : venue,
        startTime : startTime,
        endTime : endTime
    },{
        headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${props.token}`
          }  
    })
    .then(res => {
      if(res.status === 200) {
        alert("post successfully added");
        props.handler();
      } else {
        alert(" error in adding post ");
      }
    })
    .catch(err => {
      console.log(err);
    })
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Post.
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill all details to add Post.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            input = {name}
            onChange = {handleName}
            fullWidth
            required
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Content"
            type="text"
            input = {content}
            onChange = {handleContent}
            fullWidth
          /> */}
            {/* <TextEditor handleContent = {handleContent}/> */}
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            input = {description}
            onChange = {handleDescription}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="venue"
            label="Venue"
            type="text"
            input = {venue}
            onChange = {handleVenue}
            fullWidth
            required
          />
          <TextField
            id="datetime-local"
            label="Start Date"
            type="datetime-local"
            input = {startTime}
            InputLabelProps={{
            shrink: true,
            }}
            required
            onChange = {handleStartTime}
          />
           <TextField
            id="datetime-local"
            label="End Date"
            type="datetime-local"
            input = {endTime}
            InputLabelProps={{
            shrink: true,
            }}
            required
            onChange = {handleEndTime}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}