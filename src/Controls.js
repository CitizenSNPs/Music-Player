import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import HttpService from './services/service';
import FaPlayCircle from 'react-icons/lib/fa/play-circle';
import FaPauseCircle from 'react-icons/lib/fa/pause-circle';
import FaFastForward from 'react-icons/lib/fa/fast-forward';
import FaFastBackward from 'react-icons/lib/fa/fast-backward';
import AudioSpectrum from 'react-audio-spectrum';
import { FormattedTime, ProgressBar, TimeMarker } from 'react-player-controls'
// import Visualizer from 'react-audio-visualizer';


const http = new HttpService();
const songList = [require('./MP3/Reckoner.mp3'), require('./MP3/ImaginaryParties.mp3')];
const titles = ["Reckoner", "Unknown","BonJovi","Kazoo"];

class Controls extends React.Component{
  constructor(props){
    super(props);
		this.loadData();
    this.state = {playing: false, titles: [{artist: "Radiohead", name: "Reckoner", pic:require("./pics/Radiohead.jpg")},
                                        {artist:"Unknown", name:"Imaginary Parties", pic:require("./pics/Rezz.jpg")}], songInfo:titles}
    this.state.songIndex=this.props.songIndex;
    this.titles = function(){
      var list = [];
      for(var i=0;i<this.state.titles.length; i++){
        list.push(this.state.titles[i].name);
      }

      return list;
    }

    console.log(this.state.songInfo);



    this.loadData = this.loadData.bind(this);
    this.playSong = this.playSong.bind(this);
    // this.addSong = this.addSong.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.prevSong = this.prevSong.bind(this);

  }

  loadData = () => {
		  http.getSongs().then(songs => {
      this.setState({songList:songs}, function(){
			console.log(songs);
      console.log(this.state);
		}, err => {
			console.log("error!");

		});
	});
}

  playSong = () => {
    this.setState(this.state, function(){
    let audio = songList[this.state.songIndex];
    var audio2 = document.querySelector('audio');
    audio2.src = (audio);
    if (this.state.playing == true){
      audio2.pause();
      this.setState({playing: false});
    }else{
        audio2.play();
        this.setState({playing:true});
      }
    });
  }

  // addSong() {
  //   let title = prompt("Please enter the title of the song.");
  //   let artist = prompt("Please enter the artist name.");
  //   let source = prompt("Please enter the filepath.");
  //
  //   this.songSources.push(require(source));
  //   console.log(this.songSources);
  // }


  nextSong(){
    if (this.state.songIndex === this.state.titles.length-1){
      return;
    }
    let newIndex = this.state.songIndex + 1;
    this.setState({songIndex: newIndex}, function(){
    let audio = document.querySelector('audio');
    audio.pause();
    audio.src = songList[this.state.songIndex];
    audio.play();
    });
  }

  prevSong(){
    if (this.state.songIndex === 0){
      return;
    }
    let newIndex = this.state.songIndex - 1;
    this.setState({songIndex: newIndex}, function(){
    let audio = document.querySelector('audio');
    audio.pause();
    audio.src = songList[this.state.songIndex];
    audio.play();
  });
  }

  componentWillReceiveProps(nextProps){
   if (nextProps.songIndex !== this.props.songIndex){
      this.setState({songIndex:nextProps.songIndex});
 }
}

  render(){
    return (
      <div id="background" /*style={{backgroundImage: `url(${this.state.titles[this.state.songIndex].pic})`}}*/>
      <div id="app">
      <div id="controls">
      <FaFastBackward size={40} color="white" class="functions"onClick={this.prevSong} />
      <FaPlayCircle class="functions" size={40} color="white" onClick={this.playSong} />
      <FaPauseCircle class="functions" size={40} color="white"/>
      <FaFastForward class="functions" size={40} color="white" onClick={this.nextSong}/>
      </div>
      <div id="images">
      <img id="mainImage" src={this.state.titles[this.state.songIndex].pic} />
      <AudioSpectrum
        id="audio-canvas"
        height={100}
        width={228}
        audioId={'audio-element'}
        capColor={'transparent'}
        capHeight={2}
        meterWidth={10}
        meterCount={512}
        meterColor={[
          {stop: 0, color: 'rgba(255,250,250,0.5)'},
          {stop: 0.5, color: 'white'},
          {stop: 1, color: 'red'}
        ]}
        gap={4}
      />
      </div>

      <div id="titles">
      <h2>{this.state.titles[this.state.songIndex].name}</h2>
      <h3>{this.state.titles[this.state.songIndex].artist}</h3>
      </div>
      <audio id="audio-element" autoPlay src="" />

      </div>
      </div>
  )
  }

}

export default Controls;
