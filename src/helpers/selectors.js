export function getAppointmentsForDay(state, day) {


  const whichDay = state.days.filter(dayInfo => dayInfo.name === `${day}`)[0];
  
  if (!day || !whichDay) {
    return [];
  }

  const AppointmentOfTheDay = whichDay.appointments.map(appointmentId => state.appointments[appointmentId])
  
  return AppointmentOfTheDay;

}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const interviewResult = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }

  return interviewResult;
}

export function getInterviewersForDay(state, day) {

  const whichDay = state.days.filter(dayInfo => dayInfo.name === `${day}`)[0];
  
  if (!day || !whichDay) {
    return [];
  }

  const InterviewersOfTheDay = whichDay.interviewers.map(interviewerId => state.interviewers[interviewerId])
  
  return InterviewersOfTheDay;
}