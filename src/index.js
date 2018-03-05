import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import songfile1 from "./Relax.mp3";
import songfile2 from "./Reckoner.mp3";
import songfile3 from "./Imaginary Parties.mp3"
import Rezz from "./Rezz.jpg";

const songinfo = [{trackname:"Relax", artist:"Rezz", image:"",src:songfile1},
		{trackname:"Reckoner", artist:"Radiohead", image:"",src:songfile2},
		{trackname:"Unknown", artist:"Unknown", image:"",src:songfile3}];
var songIndex = 0;

class Controls extends React.Component{
  constructor(props){
    super(props);

    this.songs = [songfile1, songfile2, songfile3];
    this.props = [{song:songfile1, playing:false, image: ""},
                  {song:songfile2, playing:false, image:""}];

    this.state = {trackname: songinfo[songIndex].trackname, artist: songinfo[songIndex].artist, song:songinfo[songIndex].src, playing:false, image:"./Rezz.jpg"};
    this.audio = document.querySelector("audio");



    this.playSong = this.playSong.bind(this);
    this.changeSong = this.changeSong.bind(this);

  };

  render(){
    return(<div>
	  <div background={this.state.img} className="albumArtwork">
    <div className="imageborder"><img src={require('./Rezz.jpg')} /></div>
	  <h2 id="songTitle">{this.state.trackname}</h2>
	  <h3 id="artist">{this.state.artist}</h3>
	  </div>
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
        song: songinfo[songIndex].src, playing:false, artist: songinfo[songIndex].artist, trackname:songinfo[songIndex].trackname});

      this.audio.play();
      console.log(this.state.playing);
        console.log(songIndex);
        console.log(this.state.song);
        console.log(songinfo[songIndex]);
        console.log(this.audio);
        console.log(Rezz);

      };

};

const App = () => {
  return (<div><Controls /></div>)
};

ReactDOM.render(<App />, document.querySelector("body"));
