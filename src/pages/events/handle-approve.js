//Make Zoom API call
import React from "react";
import Axios from "axios";
import queryString from 'query-string';

class HandleApprove extends React.Component {

    constructor(props) {

        super(props);
        this.state={
            state: 1,
            response: "Begin",
            params: queryString.parse(this.props.location.search)
        };

        this.run = this.run.bind(this);

    }

    run() {
        if (this.state.params.code === undefined) {
            this.setState({response: "404 Not Found"});
        //} else if (this.state.params.state === undefined) {
         //   this.setState({response: "Event not specified."});
        } else {
            const urlTokenAuth = 'https://zoom.us/oauth/token'
            const urlCreateMeeting = 'https://api.zoom.us/v2/users/columbiavirtualcampus@gmail.com/meetings'
            const redir_uri = 'http://desktop-hnqifrq.local:3000/events/handle-approve'
            const requestUrl = 'http://localhost:5001/columbia-virtual-campus/us-central1/sendZoomRequest'

            const body = {
                grant_type: "authorization_code",
                code: this.state.params.code,
                redirect_uri: redir_uri
            }
            const requestTokenInfo = {
                url: urlTokenAuth,
                method: 'POST',
                send: body,
                qs: body,
                headers: {
                    "Authorization": "Basic T0Fwd2tXQ1RzYVYzQzRhZk1wSGhROnJKV0thY3dRajQ0bHNoTFRUbmdvSDNIMFRrRnk0ZXRI"
                },
                json: true
            }
            this.setState({response: "Processing..."})

            // First get token
            Axios.post(requestUrl, requestTokenInfo)
                .then(res => {
                    console.log(res.data.access_token);
                    console.log("sending create meeting request");
                    var options = {
                        method: 'POST',
                        url: urlCreateMeeting,
                        redirect_uri: redir_uri,
                        headers: {
                            'content-type': 'application/json',
                            authorization: 'Bearer ' + res.data.access_token
                        },
                        /*query: {
                            createMeetingForExistingEvent: true,
                            updateDatabase: true,
                            eventId: this.state.params.state
                        },*/
                        body: {
                            topic: 'test',
                            type: 2,
                            start_time: "2020-06-03T019:17:00",
                            duration: 1,
                            timezone: 'America/New_York',
                            password: 'test',
                            agenda: 'test agenda'
                        },
                        json: true
                    };

                    // Second create zoom meeting with API
                    Axios.post(requestUrl, options)
                        .then(res => {
                            console.log("Success: " + JSON.stringify(res));
                            this.setState({response: "Success. Created zoom meeting:\n" + res.data.join_url});
                        })
                        .catch(error => {
                            console.log("error: " + error);
                            this.setState({response: "Failure! Could not add meeting: " + error})
                        });
                })
                .catch(error => {
                    console.log("error: " + error);
                    this.setState({response: "Failure! Could not authenticate: " + error})
                });
        }

        this.setState({state: 2})

    }
    componentDidMount() {
        this.run();
    }
    render() {
        if (this.state.state === 1) {
            return (
                <div>
                    Contacting server...
                </div>
            );
        } else if (this.state.state === 2) {
            return (
                <div>
                    {this.state.response}
                </div>
            );
        }
    }
}

export default HandleApprove;