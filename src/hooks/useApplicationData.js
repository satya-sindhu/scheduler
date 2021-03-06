import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
    const [state, setState] = useState({
        day: 'Monday',
        days: [],
        appointments: {},
        interviewers: {},
    });

    const setDay = (day) => setState((prev) => ({ ...prev, day }));

    useEffect(() => {
        const baseURL = "http://localhost:8001"
        const daysURL = axios.get(`${baseURL}/api/days`)
        const appointmentURL = axios.get(`${baseURL}/api/appointments`)
        const interviewersURL = axios.get(`${baseURL}/api/interviewers`)
        Promise.all([daysURL, appointmentURL, interviewersURL])
            .then(resArr => {
                setState(prev => ({
                    ...prev,
                    days: resArr[0].data,
                    appointments: resArr[1].data,
                    interviewers: resArr[2].data
                }));
            });
    }, []);

    const bookInterview = (id, interview) => {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview },
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment,
        };
        updateSpots(state, appointments, id);

        return axios
            .put(`/api/appointments/${id}`, appointment)
            .then((res) => {
                setState({ ...state, appointments });
            })
    };

    const cancelInterview = (id) => {
        const appointment = {
            ...state.appointments[id],
            interview: null,
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };
        updateSpots(state, appointments);
        return axios
            .delete(`/api/appointments/${id}`)
            .then((res) => {
                setState({ ...state, appointments });

            })

    }

    function updateSpots(state, appointments) {
        let totalSpots = 0;
        for (let currentday of state.days) {
            if (currentday.name === state.day) {
                for (let currentappt of currentday.appointments) {
                    const matchedAppt = appointments[currentappt];
                    if (matchedAppt.interview === null) ++totalSpots;
                }
                currentday.spots = totalSpots;
            }
        }
    }
    return {
        state,
        setDay,
        bookInterview,
        cancelInterview,
    };
}

export default useApplicationData;