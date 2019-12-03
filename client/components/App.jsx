import React from 'react';
import Axios from 'axios';

class App extends React.Component{
  constructor(){
    super();
    this.getSongs = this.getSongs.bind(this);
  }

  componentDidMount(){
    this.getSongs();
  }

  getSongs(){
    Axios.get('/api/songs')
    .then((data) => {
      console.log(data.data);
    })
    .catch((err) => {
      console.log('error getting songs')
    })
  }

  render() {
    return (
    <div>
      <h1>hi</h1>
    </div>
    )
  }
}

export default App;