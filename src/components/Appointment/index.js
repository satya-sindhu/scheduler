/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
    console.log(props);
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    )
    console.log('mode', mode);
    return (
        <article className='appointment'>
            <Header time={props.time} />
            {/* {props.interview ? <Show /> : <Empty />} */}
            {mode === EMPTY &&
                <Empty onAdd={() => transition(CREATE)} />}
            {mode === CREATE && (
                <Form
                    interviewers={[]}
                    onCancel={() => back()} />
            )}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                />
            )}
        </article>

    );
}