import React, { Component } from 'react';
// import logo from '../Images/logo.svg';
import '../Stylesheets/App.css';
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'

class App extends Component {
  state = {
    optionsData: [],
    isLoading: false,
  }

 
  clickHandler = () => {
    this.setState({
      isLoading: true
    })
    this.fetchData();
    
  }

  fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
      this.setState({optionsData: json, isLoading: false},
        console.log(json)
      
      );
    });
  }
 
  render() {
    const {optionsData} = this.state;
  
    const options = optionsData.map(elem => {
      return <option key={elem.id}>{elem.name}</option>;
    }); 
    console.log("options", options);
    return (
      <div>
        
        <select value="Smt" onClick={this.clickHandler}>
          (this.state.loading) ?
           <option value="" selected disabled hidden>Loading...</option>
           <Loader size={10}/>
           
          :
          {options}
        </select>
      </div>
    );
  }
}

export default App;

