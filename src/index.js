import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import HttpService from './services/service';

const http = new HttpService();
const songList = [require('./MP3/Reckoner.mp3'), require('./MP3/ImaginaryParties.mp3')];

class Controls extends React.Component{
  constructor(props){
    super(props);
		this.loadData();
    this.state = {songIndex:0};
    this.songSources = ['./MP3/Reckoner.mp3', './MP3/ImaginaryParties.mp3'];

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
    audio2.id="myAudio";
    audio2.play();
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
    let newIndex = this.state.songIndex + 1;
    this.setState({songIndex: newIndex}, function(){
    let audio = document.querySelector('audio');
    audio.pause();
    audio.src = songList[this.state.songIndex];
    console.log(document.querySelector('audio'));
    audio.play();
    });
  }

  prevSong(){
    let newIndex = this.state.songIndex - 1;
    this.setState({songIndex: newIndex}, function(){
    let audio = document.querySelector('audio');
    audio.pause();
    audio.src = songList[this.state.songIndex];
    console.log(document.querySelector('audio'));
    audio.play();
    });
  }

  render(){
    return (
      <div>
      <audio src="" />
      <button onClick={this.prevSong}>Prev Song</button>
      <button onClick={this.playSong}>Play Song</button>
      <button onClick={this.nextSong}>Next Song</button>
      </div>
  )
  }

}

ReactDOM.render(<Controls />, document.querySelector("body"));
