/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";

export default function useVisualMode(initial) {
    // const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    const mode = history[history.length - 1];
    function transition(newMode, replace = false) {
        // if (replace) {
        //     history.pop();
        // } else {
        //     history.push(mode);
        // }
        // setMode(newMode);
        setHistory((prev) => {
            const historyCopy = [...prev];
            if (replace === true) {
                historyCopy.pop();
            }
            historyCopy.push(newMode);
            return historyCopy;
        });
    }


    // function back() {
    //     const lastMode = history.pop();
    //     setMode(lastMode);
    // }

    const back = () => {
        if (history.length < 2) {
            return;
        }
        setHistory((prev) => {
            const historyCopy = [...prev];
            historyCopy.pop();
            return historyCopy;
        });
    };



    return { mode, transition, back };
}
