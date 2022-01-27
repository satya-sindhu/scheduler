/* eslint-disable no-sequences */

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React, { useState } from 'react';


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("")
    setInterviewer("")
    props.onCancel();
  }

  const submit = () => {
    props.onSave(student, interviewer);
  }

  function validate() {
    if (student) {
      setError("");
    } else {
      setError("Student name cannot be blank");
      return;
    }
    props.onSave(student, interviewer);
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"

          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={(props.interviewers)}
          value={interviewer}
          onChange={setInterviewer}
        />

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>Cancel</Button>
          {/* <Button confirm onClick={props.onSave}>Save</Button> */}
          {/* <Button confirm onClick={submit}>Save</Button> */}
          <Button onClick={validate} confirm>
            Save
          </Button>

        </section>
      </section>
    </main>

  )
}
