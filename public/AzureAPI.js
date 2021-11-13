$("#analyze").click(function(){
    console.log('clicked')
    var userText = $('#userText').val()
    console.log(userText)
    getSentimentResult(userText)
    
})

function getSentimentResult(userText){

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
          'Ocp-Apim-Subscription-Key': 'API_KEY_HERE'
      },
      data: data
  }
  axios(config)
  .then(function (response) {
      var sentimentfromAPI = response.data.documents[0].sentiment;
      var result = $('#sentiment').text(sentimentfromAPI)
  })
  .catch(function (error) {
      console.log(error);
  });

}