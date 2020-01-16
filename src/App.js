import React, {useState, useEffect} from 'react';
import 'rbx/index.css';
import { Message, Button, Container, Title } from 'rbx';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import CourseList from "./components/CourseList";
import { timeParts } from "./components/utils";
import db from "./components/Firebase";

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: Object.values(schedule.courses).map(addCourseTimes)
});

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

const Banner = props => (
  <React.Fragment>
    { props.user ? <Welcome user={ props.user } /> : <SignIn /> }
  <Title> {props.title || '[loading..]'} </Title> 
  </React.Fragment>
);

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const App = () => {
  const [schedule, setSchedule] = useState({title:'',courses:[]});
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setSchedule(addScheduleTimes(snap.val()));
    };
    db.on('value', handleData,error => alert(error));
    return () => { db.off('value',handleData); };
  },[]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
   <Container>
     <Banner title = { schedule.title} user = {user}/>
     <CourseList courses = { schedule.courses} />
   </Container>
  )
};
export default App;

