import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import mp3 from "./Relax.mp3";

const songs = {name: "Relax",
        artist: "Rezz",
        src: {mp3}};

class PlayButton extends React.Component{
    constructor(props){
      super(props);

      this.songs = {name: "Relax",
              artist: "Rezz",
              src: ({mp3})};

      this.state = {playing:false};

      this.playSong = this.playSong.bind(this);
      this.audio = new Audio({mp3});
    };


    render(){
      return (<div><audio src={mp3} type="audio.mpeg" id="song" data-key="1" /><button onClick={this.playSong}>Play</button></div>)
    };

    playSong(){
      const audio = document.querySelector("audio");
      if (!(this.state.playing)){
        audio.play();
        this.setState({playing:true});
      } else {
        audio.pause();
        this.setState({playing:false});
      };


      };


    };

class ForwardButton extends React.Component{
  constructor(props){
    super(props);

    this.changeSong = this.changeSong.bind(this);

  };

  render(){
    return(<div><button onClick={this.changeSong}>Forward</button></div>)
  };

  changeSong(){
    var j = 1;
    j++;
    document.querySelector("audio[data-key==j]").play();
  };
};

const App = () => {
  return (<div><PlayButton /></div>)
};

ReactDOM.render(<App />, document.querySelector("body"));
