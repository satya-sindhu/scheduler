import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "helpers/selectors";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
const appointment = { id: 1, interview: null, time: "sunday" };
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  const dailyAppointments = getAppointmentsForDay(state, state.day);


  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  const setDays = (days) => {
    setState((prev) => ({ ...prev, days }));

  }


  useEffect(() => {
    axios.get(`/api/days`).then((response) => {
      setDays(response.data);
      const baseURL = "http://localhost:8001"
      const daysURL = axios.get(`${baseURL}/api/days`)
      const appointmentURL = axios.get(`${baseURL}/api/appointments`)
      const interviewersURL = axios.get(`${baseURL}/api/interviewers`)
      Promise.all([daysURL, appointmentURL, interviewersURL])
        .then(response => {
          setState(prev => ({
            ...prev,
            days: response[0].data,
            appointments: response[1].data,
            interviewers: response[2].data
          }));
        });
    }, []);
  })


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => (
          <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={appointment.interview}
          />
        ))}
        < Appointment key='last' time='5pm' />
      </section>
    </main>
  )
}
