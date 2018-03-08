var request = require('request');
request('http://numbersapi.com/3/7/date?json', function (error, response, body) {
    //Check for error
    if(error){
        return console.log('Error:', error);
    }

    //Check for right status code
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    }
//	console.log(body);
    //All is good. Print the body
    body = JSON.parse(body);
	var text = body.response.text;
	var i;
	for(i=0;i<text.length;i++)
	{
		console.log(text[i].name);
	}
	
});