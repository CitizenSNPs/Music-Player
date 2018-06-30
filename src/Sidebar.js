import React from "react";
import ReactDOM from "react-dom";
import Controls from "./Controls.js";

const songList = [require("./MP3/01 - Will Smith - Gettin' Jiggy Wit It.mp3"), require('./MP3/02 - Britney Spears -...Baby One More Time.mp3'),
require('./MP3/03 - Christina Aguilera - Genie In A Bottle.mp3'),require('./MP3/04 - Brandy & Monica - The Boy Is Mine.mp3'),require('./MP3/05 - TLC - Waterfalls.mp3'),
require('./MP3/06 - Salt-N-Pepa feat. En Vouge - Whatta Man.mp3'),require('./MP3/07 - Boyz II Men - Motownphilly.mp3'),require('./MP3/08 - Bell Biv DeVoe - Poison.mp3'),
require('./MP3/09 - Wreckx-N-Effect - Rumpshaker.mp3'),require('./MP3/18 - Backstreet Boys - I Want It That Way.mp3')];
const titles = ["Will Smith", "Britney Spears", "Christina Aguilera", "Brandy & Monica", "TLC", "Salt N Peppa", "Boyz II Men",
"Bell Biv Devoe", "Wreckx-N-Effect", "Backstreet Boys"];

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
