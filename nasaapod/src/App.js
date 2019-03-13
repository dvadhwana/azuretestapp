import React, { Component } from 'react';
import logo from './nasa.png';
import './App.css';
import {Dimmer, Loader, Segment} from 'semantic-ui-react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/Input';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      API_URL: "",
      isLoaded: true,
      apodDate: "2018-11-21",
    }
  }

  componentWillMount(){
    fetch("/config",{ async: true})
      .then(res => res.json())
      .then(data => {
        this.setState({API_URL: data.API_URL});
      })
      .catch(function () {
        this.setState({ isLoaded: true });
        this.setState({API_URL: "http://localhost:53905/"});
        console.log("Cant reach server");
      }.bind(this));
  }
  componentDidMount(){
    // fetch(this.state.API_URL + "api/APOD",{ async: true})
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({items: data, isLoaded:true});
    //   })
    //   .catch(function () {
    //     this.setState({ isLoaded: false });
    //     console.log("Can't reach server");
    //   }.bind(this));
  }

  onGetAPODRequest = () => {
    debugger;
    var uri=this.state.API_URL + "api/APOD/GetAPODByDate?APODDate=" + this.state.apodDate;
    fetch(uri ,{ async: true})
      .then(res => res.json())
      .then(data => {
        debugger;
        this.setState({items: data, isLoaded:true});
      })
      .catch(function () {
        debugger;
        this.setState({ isLoaded: false });
        console.log("Can't reach server");
      }.bind(this));
      
  }
  onGetAllAPODRequest = () => {
    debugger;
    var uri=this.state.API_URL + "api/APOD";
    fetch(uri ,{ async: true})
      .then(res => res.json())
      .then(data => {
        debugger;
        this.setState({items: data, isLoaded:true});
      })
      .catch(function () {
        debugger;
        this.setState({ isLoaded: false });
        console.log("Can't reach server");
      }.bind(this));
      
  }  
  updateapodDate = (event) => {
    this.setState({apodDate : event.currentTarget.value});
    }
    

  render() {
    var {isLoaded, items} = this.state;

    if(!isLoaded) {
      return (
        <div className="App">
          <div className="Loading">
            <header className="App-header">
              {/* <i className="App-title"> <img src={loading} alt="Nasa" style={{ marginBottom: "5px" }} /></i> */}
              <Segment>
                <Dimmer active>
                  <Loader size='massive'>Loading</Loader>
                </Dimmer>
              </Segment>            
            </header>
          </div>
          <div style={{display: 'flex', alignContent:'center'}}>            
              <table style={{width: '100%'}}>
                <tr>
                  <td align="left">                  
                    <TextField
                      id="mydate"
                      style={{margin: '15px', marginLeft:'25px'}}
                      type="text" 
                      label="Disabled"
                      placeholder="YYYY-MM-DD"                    
                      onChange={this.updateapodDate}
                      value={this.state.apodDate}
                      />  
                      <Button size="small" color="default" onClick={this.onGetAPODRequest}>
                      Get Astrology Photo from Nasa
                      </Button>         
                    </td>
                    <td aligh="right">
                      <Button size="small" color="default" onClick={this.onGetAllAPODRequest}>
                      Show All Available Records in DB
                      </Button>          
                    </td>
                  </tr>
                </table>
            </div> 
          </div>       
      );
    }
    else
    {
      return (
        <div className="App">
          <header className="App-header">
            <i className="App-title" > <img src={logo} alt="Nasa" style={{ marginBottom: "5px" }} /> Astrology Photo Of The Day</i>
          </header>
          <div style={{display: 'flex', alignContent:'center'}}>            
            <table style={{width: '100%'}}>
              <tr>
                <td align="left">                  
                  <TextField
                    id="mydate"
                    style={{margin: '15px', marginLeft:'25px'}}
                    type="text" 
                    label="Disabled"
                    placeholder="YYYY-MM-DD"                    
                    onChange={this.updateapodDate}
                    value={this.state.apodDate}
                    />  
                    <Button size="small" color="default" onClick={this.onGetAPODRequest}>
                    Get Astrology Photo from Nasa
                    </Button>         
                  </td>
                  <td aligh="right">
                    <Button size="small" color="default" onClick={this.onGetAllAPODRequest}>
                    Show All
                    {/* Show All Available Records in DB */}
                    </Button>          
                  </td>
                </tr>
              </table>
          </div>
          <div style={{marginTop: '15px', display: 'flex', flexWrap:'wrap', justifyContent: 'space-around', overflow: 'hidden'}}>
                
                {items.map(item => (
                  <div style={{margin: '15px'}} key={item.id}>
                    <Card style={{maxWidth: 500}} onClick={() => { window.open(item.url, '_blank');}} >
                      <CardActionArea>
                        <CardMedia
                          style={{height:150}}
                          image={item.url}
                          title={item.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                          {item.date} - {item.title}
                          </Typography>
                          <Typography component="p">
                            {item.explanation}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary" onClick={() => { window.open(item.hdurl, '_blank');}}>
                          Download HD Image (Copyright to {item.copyright})
                        </Button>
                      </CardActions>
                    </Card>  
                  </div>                
                ))}        
          </div>
        </div>
      );
    }
  }
}

export default App;
