//Make Zoom API call
import React from "react";
import {Fetch} from "react-request";
import Axios from "axios";
//var unirest = require('unirest');
const fetch = require('node-fetch');

var options = {
    method: "POST",
    uri: 'https://zoom.us/oauth/token',
    qs: {
        status: 'active' // -> uri + '?status=active'
    },
    auth: {
        //Provide your token here
        'bearer': 'basic L82U9kv6ew_fTLU0S5STUSjFX-54m0oXg'
    },
    headers: {
        'Authorization': "basic "
    },
    json: true // Automatically parses the JSON string in the response
};
/*

var options = {
  method: 'POST',
  url: 'https://api.zoom.us/oauth/token?grant_type=client_credentials',
  headers: {
    /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
    **/
/*Authorization: 'Basic abcdsdkjfesjfg'
}
};

request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
 */

class Test extends React.Component {

    constructor(props) {
        super(props);
        this.run = this.run.bind(this);
    }

    run() {
        const url = 'https://zoom.us/oauth/token'
        const body = {
            grant_type: "authorization_code",
            code: this.props.location.search.replace("?code=", ""),
            redirect_uri: "http://desktop-hnqifrq.local:3000/call"
        }
        const requestInfo = {
            url: 'https://zoom.us/oauth/token',
            method: 'POST',
            send: body,
            qs: body,
            headers: {
                "Authorization": "Basic T0Fwd2tXQ1RzYVYzQzRhZk1wSGhROnJKV0thY3dRajQ0bHNoTFRUbmdvSDNIMFRrRnk0ZXRI"
            },
            json: true
        }
        console.log("JSON: " + JSON.stringify(body));

        /*fetch('https://zoom.us/oauth/token', {
                method: 'POST',
                qs: body,
                headers: {
                    "mode" : "no-cors",
                    "Access-Control-Allow-Origin" : "*",
                    "Authorization" : "Basic " + Buffer.from('OApwkWCTsaV3C4afMpHhQ:rJWKacwQj44lshLTTngoH3H0TkFy4etH').toString('base64')}
            })
            .then(function (response) {
                //logic for your response
                response.setHeader('Access-Control-Allow-Origin', '*');
                console.log('User has', response);
            })
            .catch(function (err) {
                // API call failed...
                console.log('API call failed, reason ', err);
                console.log(JSON.stringify(body))
            });*/



        Axios.post("http://localhost:5001/columbia-virtual-campus/us-central1/getZoomToken2", requestInfo)
            .then(res => {
                console.log("Success: " + res);
            })
            .catch(error => {
                console.log("error: " + error);
            });
    }

    render() {
        return (
            <div>
                Test
                <button onClick={this.run}> Test </button>
            </div>
        );
    }
}

export default Test;