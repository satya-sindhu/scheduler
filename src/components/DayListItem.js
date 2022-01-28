import React from "react";
import "./DayListItem.scss";

export default function DayListItem(props) {
    function formatSpots(spots) {
        if (spots === 0) {
            return "no spots remaining";
        }
        else if (spots === 1) {
            return "1 spot remaining";

        }
        else {
            return `${spots} spots remaining`;
        }


    }
    let dayClass = "day-list__item";
    if (props.selected) {
        dayClass += " day-list__item--selected";
    }
    if (props.spots === 0) {
        dayClass += " day-list__item--full";
    }
    return (
        <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)} selected={props.selected}>
            <h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{formatSpots(props.spots)}</h3>
        </li>
    );
}