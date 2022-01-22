import React from "react";
import  "./DayListItem.scss";
import DayListItem from "./DayListItem";

export default function DayList(props){
return(
  <ul>
      {props.days.map(obj => 
     <DayListItem 
          key={obj.id}
          name={obj.name} 
          spots={obj.spots} 
          selected={obj.name === props.value}
          setDay={props.onChange}  
        />
)
      }   
    
  </ul>
)
}

