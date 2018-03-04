import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import songs from "./MusicList.js";
import songfile1 from "./Relax.mp3";
import songfile2 from "./Reckoner.mp3";
import songfile3 from "./Imaginary Parties.mp3"

const songlist = [songfile1, songfile2, songfile3];
var songIndex = 0;

class Controls extends React.Component{
  constructor(props){
    super(props);

    this.songs = [songfile1, songfile2];
    this.props = [{song:songfile1, playing:false, image: ""},
                  {song:songfile2, playing:false, image:""}];

    this.state = {song:songlist[songIndex], playing:false, image:""};
    this.audio = document.querySelector("audio");



    this.playSong = this.playSong.bind(this);
    this.changeSong = this.changeSong.bind(this);

  };

  render(){
    return(<div>
          <audio type="audio.mpeg" src= {this.state.song}/>
          <button>Back</button>
          <button onClick={this.playSong}>Play</button>
          <button onClick={this.changeSong}>Forward</button>
          </div>);
  };

  playSong(){
    this.audio = document.querySelector("audio");
    if (!(this.state.playing)){
      this.audio.play();
      this.setState({playing:true});
    } else {
      this.audio.pause();
      this.setState({playing:false});
      };



    };

    changeSong(){
      console.log(songIndex);
      songIndex +=1;
      this.setState({
        song: songlist[songIndex], playing:false});

      this.audio.play();
      console.log(this.state.playing);
        console.log(songIndex);
        console.log(this.state.song);
        console.log(songlist[songIndex]);
        console.log(this.audio);

      };




};

const App = () => {
  return (<div><Controls /></div>)
};

ReactDOM.render(<App />, document.querySelector("body"));
