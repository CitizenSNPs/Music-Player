import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import HttpService from './services/service';

const http = new HttpService();


class Controls extends React.Component{
  constructor(props){
    super(props);
		this.loadData();
    this.state = {}

    this.loadData = this.loadData.bind(this);
  }

  loadData = () => {
		http.getSongs().then(songs => {
			console.log(songs);
		}, err => {
			console.log("error!");

		}
	)}

  render(){
    return(<div />)
  }

}

ReactDOM.render(<Controls />, document.querySelector("body"));
