import React, { Component } from 'react';
// import logo from '../Images/logo.svg';
import '../Stylesheets/App.css';
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css';
import {ClipLoader} from 'react-spinners';
import { css } from 'emotion'
// import Loader from 'react-loader-spinner'


const className = css`
  color: hotpink;
`

class App extends Component {
  state = {
    optionsData: [],
    isLoading: false,
    loading: true,
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
      this.setState({optionsData: json, isLoading: false, loading: false},
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
      <div className="root">

        <div className="selectbox">
          <select value="Smt" onClick={this.clickHandler}>
            (this.state.loading) ?
            <option value="" selected disabled hidden>Loading</option> 
            :
            {options}
          </select>
        </div>

        <div className="loader">
          <ClipLoader
            color={'black'} 
            loading={this.state.loading} 
            size="15"
          />
        </div>

      </div>
    );
  }
}

export default App;
