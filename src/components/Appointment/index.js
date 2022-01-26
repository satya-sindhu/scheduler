/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, Fragment } from 'react'
import "./styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = 'SAVING';

export default function Appointment(props) {
    console.log(props);
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );
    console.log('mode', mode);

    useEffect(() => {
        if (props.interview === null && mode === SHOW) {
            transition(EMPTY);
        }
        if (props.interview && mode === EMPTY) {
            transition(SHOW);
        }
    }, [mode, transition, props.interview]);

    const save = (name, interviewer) => {
        const newInterview = {
            student: name,
            interviewer,
        };
        transition(SAVING)
        props.bookInterview(props.id, newInterview);
        transition(SHOW);
    };

    console.log('props.interviewers', props.interviewers);
    return (
        <article className='appointment'>
            <Header time={props.time} />
            {/* {props.interview ? <Show /> : <Empty />} */}
            {mode === EMPTY &&
                <Empty onAdd={() => transition(CREATE)} />}
            {mode === CREATE && (
                <Form
                    interviewers={props.interviewers}
                    onCancel={() => back()}
                    onSave={save}
                />
            )}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    interviewers={props.interviewers}
                />
            )}
            {mode === SAVING && <Status message="SAVING ..." />}

        </article>

    );
}