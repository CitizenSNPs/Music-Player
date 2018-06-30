import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import HttpService from './services/service';
import FaPlayCircle from 'react-icons/lib/fa/play-circle';
import FaPauseCircle from 'react-icons/lib/fa/pause-circle';
import FaFastForward from 'react-icons/lib/fa/fast-forward';
import FaFastBackward from 'react-icons/lib/fa/fast-backward';
import AudioSpectrum from 'react-audio-spectrum';


const http = new HttpService();
const songList = [require("./MP3/01 - Will Smith - Gettin' Jiggy Wit It.mp3"), require('./MP3/02 - Britney Spears -...Baby One More Time.mp3'),
require('./MP3/03 - Christina Aguilera - Genie In A Bottle.mp3'),require('./MP3/04 - Brandy & Monica - The Boy Is Mine.mp3'),require('./MP3/05 - TLC - Waterfalls.mp3'),
require('./MP3/06 - Salt-N-Pepa feat. En Vouge - Whatta Man.mp3'),require('./MP3/07 - Boyz II Men - Motownphilly.mp3'),require('./MP3/08 - Bell Biv DeVoe - Poison.mp3'),
require('./MP3/09 - Wreckx-N-Effect - Rumpshaker.mp3'),require('./MP3/18 - Backstreet Boys - I Want It That Way.mp3')];
const titles = ["Gettin'Jiggy Wit It", "Unknown","BonJovi","Kazoo"];

class Controls extends React.Component{
  constructor(props){
    super(props);
		this.loadData();
    this.state = {playing: false, titles: [{artist: "Will Smith", name: "Gettin' Jiggy Wit It", pic:require("./pics/WillSmith.jpg")},
                                        {artist:"Britney Spears", name:"...Baby One More Time", pic:require("./pics/Britney.png")},
                                        {artist:"Christina Aguilera", name:"Genie In A Bottle", pic:require("./pics/Christina.jpg")},
                                        {artist:"Brandy & Monica", name:"The Boy Is Mine", pic:require("./pics/Brandy.jpg")},
                                        {artist:"TLC", name:"Waterfalls", pic:require("./pics/TLC.jpg")},
                                        {artist:"Salt N Pepa", name:"Whatta Man", pic:require("./pics/Saltnpepa.jpg")},
                                        {artist:"Boyz II Men", name:"Motownphilly", pic:require("./pics/Rezz.jpg")},
                                        {artist:"Bell Biv Devoe", name:"Poison", pic:require("./pics/Rezz.jpg")},
                                        {artist:"Wreckx-N-Effect", name:"Rumpshaker", pic:require("./pics/Rezz.jpg")},
                                        {artist:"Backstreet Boys", name:"I Want It That Way", pic:require("./pics/Rezz.jpg")}], songInfo:titles, songTime:0}
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
    if (this.state.playing === true){
      console.log(audio2.currentTime);
      audio2.pause();
      this.setState({playing: false});
      console.log(audio2.currentTime);
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
      <FaFastBackward size={30} color="white" class="functions"onClick={this.prevSong} />
      <FaPlayCircle id="play" class="functions" size={30} color="white" onClick={this.playSong} />
      <FaPauseCircle id="pause" class="functions" size={30} color="white"/>
      <FaFastForward class="functions" size={30} color="white" onClick={this.nextSong}/>
      </div>
      <div id="top">
      <img id="mainImage" src={this.state.titles[this.state.songIndex].pic} />
      <AudioSpectrum
        id="audio-canvas"
        height={25}
        width={235}
        audioId={'audio-element'}
        capColor={'transparent'}
        capHeight={2}
        meterWidth={10}
        meterCount={512}
        meterColor={[
          {stop: 0, color: '#1f1f1f'},
          {stop: 0.5, color: 'purple'},
          {stop: 1, color: 'red'}
        ]}
        gap={4}
      />

      <div id="titles">
      <h2>{this.state.titles[this.state.songIndex].name}</h2>
      <h3>{this.state.titles[this.state.songIndex].artist}</h3>
      </div>
      </div>
      <audio id="audio-element" autoPlay src="" />

      </div>
      </div>
  )
  }

}

export default Controls;
