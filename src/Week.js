import React, {Component} from 'react';
import Activity from './Activity'

class Week extends Component {

    state = {
        mondayActivity: [],
        tuesdayActivity: [],
        wednesdayActivity: [],
        thursdayActivity: [],
        fridayActivity: [],
        saturdayActivity: [],
        sundayActivity: [],
        day: '-1',
        data: [],
        dataCoach: []
    }

    filterData = (data) => {
        let minDate = new Date(this.props.min_date)
        let maxDate = new Date(this.props.max_date)
        return data.results
        .filter(offer => offer.company === 6)
        .filter(function(offer) { 
            let date = new Date(offer.date_start.substring(0, 10))
            return date >= minDate && date < maxDate;
        })
    }

    loadState = (dataOffer, dataCoach_) => {

        const dataCoach = dataCoach_.results

        let mondayActivity = []
        let tuesdayActivity = []
        let wednesdayActivity = []
        let thursdayActivity = []
        let fridayActivity = []
        let saturdayActivity = []
        let sundayActivity = []

        //set activities for each day
        for (let i = 0; i < dataOffer.length; i++){
            const day = new Date(dataOffer[i].date_start).getDay()
            console.log(day)
            let coachName = ""
            //find the right coach name
            for (let j = 0; j < dataCoach.length; j++){
                if (dataCoach[j].id === dataOffer[i].coach)
                    coachName = dataCoach[j].user.name
            }
            
            const activity = {
                activity: dataOffer[i].activity,
                date_start: dataOffer[i].date_start,
                coach: coachName
            }
            console.log(activity.coach)
            switch(day){
                case 0:
                    sundayActivity.push(activity)
                    break
                case 1:
                    mondayActivity.push(activity)
                    break
                case 2:
                    tuesdayActivity.push(activity)
                    break
                case 3:
                    wednesdayActivity.push(activity)
                    break
                case 4:
                    thursdayActivity.push(activity)
                    break
                case 5:
                    fridayActivity.push(activity)
                    break
                case 6:
                    saturdayActivity.push(activity)
                    break
                default:
                    console.log("shouldn't happen")  
            }
        }
        this.setState({mondayActivity: mondayActivity,
            tuesdayActivity: tuesdayActivity,
            wednesdayActivity: wednesdayActivity,
            thursdayActivity: thursdayActivity,
            fridayActivity: fridayActivity,
            saturdayActivity: saturdayActivity,
            sundayActivity: sundayActivity})
    }

    async componentDidMount() {
        const response = await fetch('https://back.staging.bsport.io/api/v1/offer')
        const data = await response.json()
        const coach = await fetch('https://back.staging.bsport.io/api/v1/coach/?page_size=500')
        const dataCoach = await coach.json()
        
        this.setState({data: data, dataCoach: dataCoach})
        let dataOffer = this.filterData(data)
        this.loadState(dataOffer, dataCoach)
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props)
        {
            let dataOffer = this.filterData(this.state.data)
            this.loadState(dataOffer, this.state.dataCoach)
        }
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
        const activities = [this.state.mondayActivity, this.state.tuesdayActivity, this.state.wednesdayActivity, this.state.thursdayActivity,
            this.state.fridayActivity, this.state.saturdayActivity, this.state.sundayActivity]
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
                activities.map((activity, index) => {
                    return this.daysToDisplay(activity, index, days)}
                    )
                }
            </div>
            </>
        )
    }
}

export default Week