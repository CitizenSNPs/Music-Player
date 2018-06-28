import React from "react";
import ReactDOM from "react-dom";
import Controls from "./Controls.js";

const songList = [require('./MP3/Reckoner.mp3'), require('./MP3/ImaginaryParties.mp3')];
const titles = ["Reckoner", "Unknown","BonJovi","Kazoo"];

class Sidebar extends React.Component{
  constructor(props){
    super(props);

    this.state = {songIndex: 0};
    this.createList = this.createList.bind(this);
    this.setState = this.setState.bind(this);
  }


  render(){
    return(<div id="name">
      <ul id="songs">
      </ul>
      <Controls songIndex={this.state.songIndex} />
      </div>
    );
  }



  componentDidMount(){
          this.createList();
  }

  createList() {

    var songTitles = titles;

    var html = "";
    for (let i =0; i < songTitles.length; i++) {
        html += `<li id=${i}>` + songTitles[i]+ "</li>";
    }
    document.getElementById("songs").innerHTML = html;
    var lists = document.querySelectorAll('li');

    for (let i=0; i<lists.length; i++){
    lists[i].addEventListener("click", ()=> {  //must use ES6 function, not ES5

    this.setState({songIndex:i}, function(){
      let audio = document.querySelector('audio');
      audio.pause()
      audio.src = songList[this.state.songIndex];
      audio.play();
    });
  });
}



}
}


export default Sidebar;
