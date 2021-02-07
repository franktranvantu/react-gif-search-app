import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    }
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = (query = 'cats') => {
    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=IyFBAXhcEZX69jImQX9hy5ZUx8iL5iAf&q=${query}&limit=24`)
      .then(response => {
        this.setState({
          gifs: response.data.data,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.handleSearch}/>
          </div>   
        </div>    
        <div className="main-content">
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <GifList data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}
