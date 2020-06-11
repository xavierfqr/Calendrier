import React , {Component} from 'react';
import Week from './Week';
import './App.css';
// import moment from './momentjs/moment.min.js'

class App extends Component {
  
  state = {
    min_date:'2019-06-24',
    max_date:'2019-06-30'
  }

  previousWeek = () => {
    this.setState({min_date: '2019-06-17', max_date: '2019-06-24'})
  }

  nextWeek = () => {
    this.setState({min_date: '2019-06-24', max_date: '2019-06-30'})
  }

  render()
  {
    return (
      <div className="App">
        <h1 style={{backgroundColor:'lightgreen', margin:'auto'}}> Calendrier </h1>
        <hr style={{margin:'auto'}}></hr>
        <Week min_date={this.state.min_date} max_date={this.state.max_date} previousWeek={this.previousWeek} nextWeek={this.nextWeek}></Week>
      </div>
    );
  }
}

export default App;