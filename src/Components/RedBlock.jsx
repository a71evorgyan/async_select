import React, { Component } from 'react';
import '../../resources/main.css';
import { dropDowns } from '../../resources/constants';
import {ClipLoader} from 'react-spinners';

export default class RedBlock extends Component {
   state = {
     isEditable: true,
     driver: 'N/A',
     trailerId: 'N/A',
     loading: false, //for spinner
     isLoading: false,
     optionsData: [], //fetched data
    
   }
   
   fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
      this.setState({
        optionsData: json,
        isLoading: false,
        loading: false
      },
        // console.log("json",json)
      
      );
    });
  }


   edit() {
    this.setState((prevState) => ({
      loading: true, 
    
    }));
   }

   save(name, value) {
    this.setState((prevState) => ({
      isEditable: false,
      [name]: value
    }));
  
   }
   
   clickHandler = (event) => {   
      this.edit();
      this.setState((prev) => ({
        isEditable: !prev.isEditable
      }))
  
   }

   changeHandler = (event) => {
      this.setState({    
        [event.target.name]: event.target.value,
        loading: false
      });
      this.save(event.target.name, event.target.value);
  }

  OnSelectClick = () => {
    this.setState({
      isLoading: true,
    })
    this.fetchData();
  }
  
  render() {
    console.log("loading", this.state.loading);
    const anchor = (data) => { 
      return <div><a href="#">{data}</a></div> 
    };

  // const setOptions = (data) => {
  //   let options = data.map((elem, index) => {
  //     return (<option value={elem} key={index}>{elem}</option>);
  //   });
  //   return options;
  // }
//-------------
  const {optionsData} = this.state;
  
  const options = optionsData.map(elem => {
    return <option key={elem.id}>{elem.name}</option>;
  }); 
  console.log("options", options);

//-----------------
  console.log("trailerid", this.state.trailerId);
  const {drivers, trailerIds } = dropDowns; 
    
  const { id, driver, deadhead, location, updatedDate } = this.props;
   
    return (
      <div className='redBlock'>

        <div className="content">

            <div className="driver" >
              <div className="label">Associated Driver</div>
              {!(this.state.isEditable) ?

              <div className="selectLoader">
                <div className="selectBoard">
                  <select 
                      value={this.state.driver}
                      name="driver"
                      onChange={this.changeHandler}
                      onClick={this.OnSelectClick}
                      >

                    {/* {this.state.loading} ? 
                        <option value="" selected disabled hidden>Loading</option>
                        : */}
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
                 
                 
                 
                 : anchor(this.state.driver) }
            </div>

            <div className="deadhead">
              <div className="label">Deadhead</div>
              <div className="value">{deadhead} Mi</div>
            </div>

            <div className="trailer">
              <div className="label">Trailer ID</div>
              {/* {(this.state.isEditable) ? <select value={this.state.trailerId} name="trailerId" onChange={this.changeHandler}> {setOptions(trailerIds)} </select> : anchor(this.state.trailerId) } */}
            </div>

            <div className="location">
              <div className="label">Last Location</div>
              <div className="value">{location}</div>
            </div>

            <div className="updatedDate">
              <div className="label">Last Updated At</div>
              <div className="value">{updatedDate}</div>
            </div>

          </div>

          <div className="edit"> 
            <button onClick={this.clickHandler}>{this.state.isEditable ? "Edit" : "Save" }</button> 
          </div>

      </div>
      )
  }
}
// {(this.state.mode) ? "Save" : "Edit"}
