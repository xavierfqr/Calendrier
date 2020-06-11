import React from 'react'
import './style.css'

const Activity = (props) => {
    let date = new Date(props.date_start)
    return (
        <div style={{backgroundColor: '#78D8F7', width:'240px', padding:'10px', margin : 'auto', border: 'solid 1px black'}}>
            <div> heure: {date.getHours()}h{date.getMinutes()} </div>
            <div style={{display:'inlineBlock'}}> coach : {props.coach} </div>
            <div> activité : {props.activity} </div>
        </div>
    )
}

export default Activity