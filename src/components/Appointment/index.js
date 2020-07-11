import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

import "components/Appointment/styles.scss";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    setTimeout(() => {
      transition(SHOW);
    }, 1000)
    
  };

  function deleteAppointment() {
    transition(DELETING);
    props.cancelInterview(props.id)
    setTimeout(() => {
      transition(EMPTY);
    }, 1000)
    console.log("delete")
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (<Status message="Saving"/>)}
      {mode === DELETING && (<Status message="Deleting"/>)}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={deleteAppointment}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

    </article>
  )

}