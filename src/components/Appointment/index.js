/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, Fragment } from 'react'
import "./styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Confirm from "components/Confirm.js";
import Status from "components/Appointment/Status.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = "EDIT";

export default function Appointment(props) {
    console.log(props);
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );
    console.log('mode', mode);

    useEffect(() => {
        if (props.interview === null && mode === SHOW) {
            console.log("****", props.interview);
            if (props.interview === null) {
                transition(EMPTY);
            }
            if (props.interview && mode === EMPTY) {
            } else if (props.interview) {
                transition(SHOW);
            }
        }
    }, [mode, transition, props.interview]);
    [props.interview];

    const save = (name, interviewer) => {
        console.log('name', name);
        console.log('interviewer', interviewer);
        const newInterview = {
            student: name,
            interviewer,
        };
        transition(SAVING)
        props.bookInterview(props.id, newInterview)
            .then(() => {
                transition(SHOW);

            })

    };

    const edit = () => {
        transition(EDIT);
    }


    const deleteAppointment = () => {
        transition(DELETING);
        props.cancelInterview(props.id)
            .then(() => {
                transition(EMPTY);

            })

    };
    console.log('props.interview', props.interview);

    return (
        <article className='appointment'>
            <Header time={props.time} />
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
                    onDelete={() => transition(CONFIRM)}
                    onEdit={() => edit()}
                />
            )}
            {mode === EDIT && (
                <Form
                    student={props.interview.student}
                    interviewer={props.interview.interviewer.id}
                    interviewers={props.interviewers}
                    onSave={(student, interviewer) => save(student, interviewer)}
                    onCancel={() => back(SHOW)}
                />
            )}

            {mode === SAVING && <Status message="SAVING" />}
            {mode === DELETING && <Status message="DELETING" />}
            {mode === CONFIRM && (
                <Confirm
                    message='Delete the appointment?'
                    // onCancel={back}
                    onConfirm={() => deleteAppointment()}
                />
            )}

        </article>

    );
}

