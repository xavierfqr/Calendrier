import React , {Component} from 'react';
import Week from './Week';
import './App.css';
// import moment from './momentjs/moment.min.js'

class App extends Component {
  state = {
    min_date:'2019-06-24',
    max_date:'2019-06-30',
    weekActivities: [],
    data:[],
    loaded: false
  }

  async loadState (dataOffer) {
    let weekActivities = [[],[],[],[],[],[],[]]

    //set activities for each day
    for (let i = 0; i < dataOffer.length; i++){
        const day = new Date(dataOffer[i].date_start).getDay()
        
        //find the right coach name
        const coach = await fetch('https://back.staging.bsport.io/api/v1/coach/?company=6&id__in=' + dataOffer[i].coach)
        const dataCoach = await coach.json()
        let coachName = dataCoach.results[0].user.name

        const activity = {
          activity: dataOffer[i].activity,
          date_start: dataOffer[i].date_start,
          coach: coachName
        }
        weekActivities[day].push(activity)
      }

      this.setState({weekActivities : weekActivities})
  }

  async componentDidMount() {
      const response = await fetch('https://back.staging.bsport.io/api/v1/offer/?min_date=' + this.state.min_date + '&max_date=' + this.state.max_date + '&company=6')
      const data = await response.json()
      this.loadState(data.results)
      this.state.loaded = true;
  }

  async componentDidUpdate(prevProps, prevState){
    if (prevState.min_date !== this.state.min_date)
    {
      const response = await fetch('https://back.staging.bsport.io/api/v1/offer/?min_date=' + this.state.min_date + '&max_date=' + this.state.max_date + '&company=6')
      const data = await response.json()
      this.loadState(data.results)
      this.state.loaded = true;
    }
  }

  previousWeek = () => {
    if (this.state.min_date !== '2019-06-17')
      this.setState({min_date: '2019-06-17', max_date: '2019-06-24', loaded:false})
  }

  nextWeek = () => {
    if (this.state.min_date !== '2019-06-24')
      this.setState({min_date: '2019-06-24', max_date: '2019-06-30', loaded:false})
  }

  render()
  {
    if(this.state.loaded === false)
      return (
        <div className="App">
        <h1 style={{backgroundColor:'lightgreen', margin:'auto'}}> Calendrier </h1>
        <hr style={{margin:'auto'}}></hr>
        <div>Loading...</div>
        </div>
      )

    const activities = []
    for (let i  = 1; i < this.state.weekActivities.length; i++){
      activities.push(this.state.weekActivities[i])
    }
    activities.push(this.state.weekActivities[0])
    
    return (
      <div className="App">
        <h1 style={{backgroundColor:'lightgreen', margin:'auto'}}> Calendrier </h1>
        <hr style={{margin:'auto'}}></hr>
        <Week activities={activities} min_date={this.state.min_date} max_date={this.state.max_date} previousWeek={this.previousWeek} nextWeek={this.nextWeek} ></Week>
      </div>
    );
  }
}
export default App;