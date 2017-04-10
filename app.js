var application = require('express')();
var http = require('http').Server(application);
var socketIo = require('socket.io')(http);
var twitter = require('twit');

application.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var config = {
    consumer_key: 'eeMNrQl5ttn5M9PFN3p4T8WZ8',
    consumer_secret: 'BjqNjwgO4gKBygdjDcshG83d2sh8Mb3FteWsC30WQwBGZFzE6j',
    access_token: '846118586091556864-ZeAlkVV5UrMfOGKXNrvUIEW2g88IUGS',
    access_token_secret: 'dPtJgfTLLkMwfx8PmBB5yrCaPhlBTJ36b8qV3mYYjdugl'
};

var twitter = new twitter(config);

var filters = ['#LeerNoDaAlzheimer'];

var stream = twitter.stream('statuses/filter', {
    track: filters
});

socketIo.on('connection', function(socket) {
    stream.on('tweet', function(tweet) {
        socketIo.emit('msg', tweet);
    });

    stream.on('error', function(error) {
        console.log(error);
    });
});

http.listen(3000, '0.0.0.0', function() {
    console.log('listening on :  ' + 3000);
   
});
