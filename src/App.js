import './App.css';
import React, { Component } from 'react';
import axios from 'axios'

require('dotenv').config();

class App extends Component{

  constructor(props){
    super(props)
    this.state = { username:'' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    const { username } = this.state
    event.preventDefault()
    getSubmissionFromUserName(username);
  }

  handleChange(event){
      this.setState({
        [event.target.name] : event.target.value
      })
    }

  getSubmissionFromUserName = (usernameInput) =>{
    const snoowrap = require('snoowrap');

    const r = new snoowrap({
      userAgent: 'any',
      clientId: 'vOaviBN-8ZB54TZQqoks2g',
      clientSecret: 'UYdq4zNNoxk0Lb1REuuNa5UKLRK1vw',
      refresh_token: '1009166006410-trhKOHTxb10Pya93xhEtvQTrmKR6_A',
    });

    const submissions = r.getUser(usernameInput).getSubmissions();
    submissions.then(console.log);
    const first = submissions[0].selftext;
    getSentimentResult(first);
  }

  getSentimentResult = (submission) => {
  console.log( process.env.REACT_APP_AZURE_API_KEY)
      var data = JSON.stringify({
      "documents": [
          {
          "id": "1",
          "language": "en",
          "text": submission
          }
      ]
      });
      
      var config={
          url :'https://isthismyfriend.cognitiveservices.azure.com/text/analytics/v3.1/sentiment',
          method: 'post',
          headers:{
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key':   process.env.REACT_APP_AZURE_API_KEY
          },
          data: data
      }
      axios(config)
      .then(function (response) {
          var sentimentfromAPI = response.data.documents[0].sentiment;
          console.log(sentimentfromAPI)
          
      })
      .catch(function (error) {
          console.log(error);
      });
    }


  render() {
      return (
        <div className="App">
            <form onSubmit={this.handleSubmit}>

            <label htmlFor="username">
              <input
                  type="text"
                  name="username"
                  value = {this.state.username}
                  onChange={this.handleChange}
              />
          </label>
              <button className="analyze" onClick = {this.handleSubmit}>Analyze</button>
          </form>
          <p> The sentiment is: <span id="sentiment">???</span></p>
        </div>

      );

  }
  
}

export default App;
