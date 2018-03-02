import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import songs from "./MusicList.js";
import songfile1 from "./Relax.mp3";
import songfile2 from "./Reckoner.mp3";

window.p = 0;
const audio = document.querySelector("audio");

class PlayButton extends React.Component{
    constructor(props){
      super(props);

      var currentIndex = 0;

      this.songs = [songfile1, songfile2];

      this.state = {playing:false, songIndex: 0};

      this.playSong = this.playSong.bind(this);

    };


    render(){
      var j = 0;
      return (<div><audio src={this.songs[window.p]} type="audio.mpeg" id="song" data-key="1" /><button onClick={this.playSong}>Play</button></div>)
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

      console.log(window.p);


      };

      getcurrentIndex(){
        return this.currentIndex;
      };

      setcurrentIndex(){

      }
    };

class ForwardButton extends React.Component{
  constructor(props){
    super(props);

    this.changeSong = this.changeSong.bind(this);
    this.songs = [songfile1, songfile2];

  };

  render(){
    return(<div><button onClick={this.changeSong}>Forward</button></div>)
  };

  changeSong(){
    window.p = window.p+1;
    console.log(window.p);
    const audio = document.querySelector("audio");

  };
};

const App = () => {
  return (<div><PlayButton /><ForwardButton /></div>)
};

ReactDOM.render(<App />, document.querySelector("body"));
