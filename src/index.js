import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import songfile1 from "./Relax.mp3";
import songfile2 from "./Reckoner.mp3";
import songfile3 from "./Imaginary Parties.mp3"

const songinfo = [{trackname:"Relax", artist:"Rezz", image:"http://www.youredm.com/wp-content/uploads/2017/06/rezz-face-first-rukes-1024x683.jpg",src:songfile1},
		{trackname:"Reckoner", artist:"Radiohead", image:"http://diymag.com/media/img/General/Hall-of-Fame/_1500x1000_crop_center-center_75/tumblr_m8yak1u0a41qj3af5o1_1280.jpg",src:songfile2},
		{trackname:"Unknown", artist:"Unknown", image:"https://ih0.redbubble.net/image.392413794.3911/flat,800x800,075,f.jpg",src:songfile3}];
var songIndex = 0;

class Controls extends React.Component{
  constructor(props){
    super(props);

    this.songs = [songfile1, songfile2, songfile3];
    this.props = [{song:songfile1, playing:false, image: ""},
                  {song:songfile2, playing:false, image:""}];

    this.state = {trackname: songinfo[songIndex].trackname, artist: songinfo[songIndex].artist,
		song:songinfo[songIndex].src, playing:false, image:songinfo[songIndex].image};



    this.audio = document.querySelector("audio");



    this.playSong = this.playSong.bind(this);
    this.changeSong = this.changeSong.bind(this);
		this.songBack = this.songBack.bind(this);
		//this.songSelect = this.songSelect.bind(this);

  };

  render(){
    return(<div>
	  <div background={this.state.img} className="albumArtwork">
    <div className="imageborder"><img src={this.state.image} /></div>
	  <h2 id="songTitle">{this.state.trackname}</h2>
	  <h3 id="artist">{this.state.artist}</h3>
	  </div>
          <audio type="audio.mpeg" src= {this.state.song} ref="audio"/>
          <button onClick={this.songBack}>Back</button>
          <button onClick={this.playSong}>Play/Pause</button>
          <button onClick={this.changeSong}>Forward</button>
					<select>
						<option selected disabled hidden>Song Selection</option>
						<option value="1">{songinfo[0].trackname} - {songinfo[0].artist}</option>
						<option value="2">{songinfo[1].trackname} - {songinfo[1].artist}</option>
						<option value="3">{songinfo[2].trackname} - {songinfo[2].artist}</option>

					</select>
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
			this.audio=document.querySelector("audio");
      console.log(songIndex);
      songIndex +=1;
      this.setState({
        song: songinfo[songIndex].src, image: songinfo[songIndex].image, trackname: songinfo[songIndex].trackname, artist: songinfo[songIndex].artist}, function(){
					this.refs.audio.pause();
					this.refs.audio.load();
					this.refs.audio.play();

					console.log(this.state);
				});
      };

		songBack(){
			this.audio=document.querySelector("audio");
      console.log(songIndex);
      songIndex -=1;
      this.setState({
        song: songinfo[songIndex].src, image: songinfo[songIndex].image, trackname: songinfo[songIndex].trackname, artist: songinfo[songIndex].artist}, function(){
					this.refs.audio.pause();
					this.refs.audio.load();
					this.refs.audio.play();
		});

		};

		/*songSelect(){
			this.audio = document.querySelector("audio");
			var key = this.props.value;
			songIndex = Number(key);
			song: songinfo[songIndex].src, image: songinfo[songIndex].image, trackname: songinfo[songIndex].trackname, artist: songinfo[songIndex].artist}, function(){
				this.refs.audio.pause();
				this.refs.audio.load();
				this.refs.audio.play();
		}; */
};

const App = () => {
  return (<div><Controls /></div>)
};

ReactDOM.render(<App />, document.querySelector("body"));
