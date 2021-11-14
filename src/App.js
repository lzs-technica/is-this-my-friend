import './App.css';
import React, { Component } from 'react';
import axios from 'axios'

require('dotenv').config();

class App extends Component{

  constructor(props){
    super(props)
  }
  render() {
      return (
        <div className="App">
        
        <input type="text" id="userText"/>
            <button id="analyze" onClick={()=> this.getSentimentResult("this is an example")}> Analyze </button>
            <p> The sentiment is: <span id="sentiment">???</span></p>
        </div>
      );

    }

  getSentimentResult(userText){
  console.log( process.env.REACT_APP_AZURE_API_KEY)
      var data = JSON.stringify({
      "documents": [
          {
          "id": "1",
          "language": "en",
          "text": userText
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
  
}

export default App;
