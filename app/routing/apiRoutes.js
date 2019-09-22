var friends = require('../data/friends.js');

// Routing the apiRoutes with the app.get and app.post functions
module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {
        // loop through all options
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        var userData = req.body;
        var userScores = userData.scores;
        // To take the results of the user's name and photo, other than the survey questions, to post and parse it
        var userName = userData.name;
        var userPhoto = userData.photo;

        // The variable used to calculate the difference b/n the user's socres and the scores of each user
        var totalDifference = 0;

        //loop through the friends data array of objects to get each friends scores
        for (var i = 0; i < friends.length - 1; i++) {
            console.log(friends[i].name);
            totalDifference = 0;


            for (var j = 0; j < 10; j++) {
                // We calculate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                // If sum of differences less then differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    // Reset
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        friends.push(userData);

        res.json(bestMatch);
    });
};