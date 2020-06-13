import React, {Component} from 'react';
import Activity from './Activity'

class Week extends Component {

    state = {
        day: '-1',
    }

    daysToDisplay = (activity, index, days) => {
        if(this.state.day === '-1' || this.state.day === index.toString())
        {
            return (
            <div key={index}>
                <p style={{backgroundColor: '#FACD5D', width:'240px', padding:'10px', margin : 'auto', borderRadius:'5px', border: 'solid 1px black'}}>{days[index]}</p>
                {
                activity.map((elem, index) => {
                    return (<div key={index}> <Activity date_start={elem.date_start} coach={elem.coach} activity={elem.activity}/> </div>)
                })}
            </div>)
        }
    }

    changeDay = (event) => {
        this.setState({day: event.target.value})
    }
    
    render(){
        const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
        return (
            <>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <button onClick={this.props.previousWeek}> previous week </button>
                <div> Semaine du {this.props.min_date}</div>
                <button onClick={this.props.nextWeek}> next Week </button>
            </div>

            <div style={{display:'flex'}}>
                <select style={{height:'50px', alignItems:'center', backgroundColor: 'orange', borderRadius:'5px'}} onChange={this.changeDay} value={this.state.day}>
                    <option value='-1'>Tous</option>
                    <option value='0'>Lundi</option>
                    <option value='1'>Mardi</option>
                    <option value='2'>Mercredi</option>
                    <option value='3'>Jeudi</option>
                    <option value='4'>Vendredi</option>
                    <option value='5'>Samedi</option>
                    <option value='6'>Dimanche</option>
                </select>
                {
                this.props.activities.map((activity, index) => {
                    return this.daysToDisplay(activity, index, days)}
                    )
                }
            </div>
            </>
        )
    }
}

export default Week