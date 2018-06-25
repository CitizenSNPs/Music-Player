import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import HttpService from '../services/service';

const http = new HttpService();


class Controls extends React.Component{
  constructor(props){
    super(props);
		this.loadData();



    this.state = {}

		this.loadData = this.loadData.bind(this);
    this.playSong = this.playSong.bind(this);
    this.changeSong = this.changeSong.bind(this);
		this.songBack = this.songBack.bind(this);
	}


	// get songs from db
	loadData = () => {
		http.getSongs().then(songs => {
			console.log(songs);
		}, err => {
			console.log("error!");

		}
	)}

  render(){
    return(<div>

    <div className="imageborder"><img src={this.state.image} />
		<div id="info">
	  <h2 id="songTitle">{this.state.trackname} </h2>
	  <h3 id="artist">{this.state.artist}</h3>

		<audio type="audio.mpeg" src= {this.state.song} ref="audio"/>
		<input id="range" type="range" min="0" max="100" step="1" />

		<div id="buttons">
		<button id="back"onClick={this.songBack}></button>
		<button id="play"onClick={this.playSong}></button>
		<button id="forward"onClick={this.changeSong}></button>
		</div>
	  </div>
		</div>
					<select>
						<option selected disabled hidden>Song Selection</option>
						<option value="1" onChange={this.songSelect}>{songinfo[0].trackname} - {songinfo[0].artist}</option>
						<option value="2" onChange={this.songSelect}>{songinfo[1].trackname} - {songinfo[1].artist}</option>
						<option value="3" onChange={this.songSelect}>{songinfo[2].trackname} - {songinfo[2].artist}</option>

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
			if (songIndex == songinfo.length-1){
				return (true)
			}else{
      songIndex +=1;
      this.setState({
        song: songinfo[songIndex].src, image: songinfo[songIndex].image, trackname: songinfo[songIndex].trackname, artist: songinfo[songIndex].artist}, function(){
					this.refs.audio.pause();
					this.refs.audio.load();
					this.refs.audio.play();

					console.log(this.state);
				});
			};
      };

		songBack(){
			this.audio=document.querySelector("audio");
      console.log(songIndex);
			if (songIndex == 0){
				return (true)
			}else{
      songIndex -=1;
      this.setState({
        song: songinfo[songIndex].src, image: songinfo[songIndex].image, trackname: songinfo[songIndex].trackname, artist: songinfo[songIndex].artist}, function(){
					this.refs.audio.pause();
					this.refs.audio.load();
					this.refs.audio.play();
		});
	};

		};

		/*songSelect(){
			this.audio = document.querySelector(`audio[data-key=${this.props.value}]`);
				this.refs.audio.pause();
				this.refs.audio.load();
				this.refs.audio.play();
		}; */
};

const App = () => {
  return (<div><Controls /></div>)
};

ReactDOM.render(<App />, document.querySelector("body"));
