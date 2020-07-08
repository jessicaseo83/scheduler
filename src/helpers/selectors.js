export function getAppointmentsForDay(state, day) {


  const whichDay = state.days.filter(dayInfo => dayInfo.name === `${day}`)[0];
  
  if (!day || !whichDay) {
    return [];
  }

  const AppointmentOfTheDay = whichDay.appointments.map(appointmentId => state.appointments[appointmentId])
  
  return AppointmentOfTheDay

}