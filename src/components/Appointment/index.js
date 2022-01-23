import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";

export default function Appointment(props) {
    return (
        <article className="appointment">{props.time  ? `Appointment at ${props.time}`: 'No Appointments'}</article>
    )
}