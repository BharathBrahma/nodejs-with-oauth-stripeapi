const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const Linkedin = require('node-linkedin')(keys.linkedin_client_id, keys.linkedin_client_secret, 'http://localhost:5000/auth/linkedin/callback');

router.route('/signin/linkedin/')
.get((req,res)=>{
    var scope = ['r_basicprofile'];
    var authUrl = Linkedin.auth.authorize(scope, 'DCEeFWf45A53sdfKef424');
    console.log('redirect-url', authUrl);
    res.redirect(authUrl);
    //res.json('linked in sign in');
});

//The first call back
router.route('/linkedin/callback')
.get((req, res) => {
    //get the auth code from LinkedIn
    let code = req.query.code;
    let state = req.query.state;

    //res.send('Response send to client::' + req.query.code);
    Linkedin.auth.getAccessToken(res, req.query.code, 'DCEeFWf45A53sdfKef424', (err, results) => {
        if (err)
            return console.error(err);

        console.log(results);

        var linkedInInstance = Linkedin.init(results.access_token);
        linkedInInstance.people.me(function (err, $in) {
            // Loads the profile by id.
            console.log($in.firstName);
            res.render('index', {
                user: $in.firstName,
                formattedName: $in.formattedName
            });
        });

    });
});

module.exports = router;