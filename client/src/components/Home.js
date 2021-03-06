/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import React from 'react';
import axios from 'axios';
import StopAreaForm from './StopAreaForm';
import AppBar from './AppBar';
import {Grid} from '@material-ui/core';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/bus-stops',
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: [],
      lat: 0,
      lon: 0,
      err: '',
    };
  }

  componentDidMount() {
    axios.get('https://ipapi.co/json/')
        .then((res) => {
          this.setState({
            lat: res.data.latitude,
            lon: res.data.longitude,
          });
        })
        .catch((err) => this.setState({err: err}));

    instance
        .get('/areas')
        .then((res) => {
          this.setState({
            areas: res.data,
          });
        })
        .catch((err) => {
          this.setState({
            err: err,
          });
        });
  }

  render() {
    const {areas, lat, lon} = this.state;
    return (
      <div>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={6}
        >
          <Grid item xs>
            <AppBar />
          </Grid>
          <Grid item xs>
            {
            areas == [] || lat == 0 || lon == 0 ? <p>Loading data...</p> :
            <StopAreaForm areas={areas} lat={lat} lon={lon}/>
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}
