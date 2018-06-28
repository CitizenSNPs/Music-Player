import React from "react";
import ReactDOM from "react-dom";

const test = [0,1,2,3];

class Sidebar extends React.Component{
  constructor(props){
    super(props);


    this.createList = this.createList.bind(this);
  }


  render(){
    return(<div id="name">
      <ul id="books">
      <li>hello</li>
      </ul>
      </div>
    );
  }



  componentDidMount(){
          this.createList();
  }

  createList() {
    console.log(this.props);

    var songTitles = this.props.titles;

    var html = "";
    for (var i =0; i < songTitles.length; i++) {
        html += "<li>" + songTitles[i]+ "</li>";
    }
    document.getElementById("books").innerHTML = html;
    console.log(html);

}
}

export default Sidebar;
