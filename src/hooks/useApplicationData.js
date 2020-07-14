import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
 

  const remainingSpots = (id, increaseBy) => {
    for (let day of state.days)
      if (day.appointments.includes(id)) {
        day.spots += increaseBy;
      }
  };

 function bookInterview (id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   
    remainingSpots(id, -1);
  
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => setState({...state, appointments}))
    
  
  }

  function cancelInterview(id) { 
 
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    remainingSpots(id, +1);
  
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({...state, appointments}))
      
     
  }

  
  useEffect(() => {
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    }).catch(error => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    })

  },[])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
  
}