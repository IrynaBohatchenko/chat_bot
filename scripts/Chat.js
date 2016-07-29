import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChatForm from './ChatForm';
import $ from 'jquery';

class Chat extends Component{
	constructor(props) {
		super(props);
		this.state = {
			history: []
		};
	};
	updateState(newHist) {
		this.setState({
			history: newHist
		});
	}

	handleAnswerSubmit(answer) {
	    $.ajax({
	    	url: '/answers',
	     	dataType: 'text',
	     	type: 'POST',
		    data: answer,
		    success(data, status, xhr) {
		    	console.log("success");
		    },
		    error(xhr, status, err) {
		    	console.warn("error");
		    }
	    });
	}

	loadQuestionFromServer (){
		const history = [];
		const updateState = this.updateState;
		$.ajax({
			url: '/questions',
			dataType: 'JSON',
			cache: false,
			success(data) {
				data.forEach(s => {
					history.push(<tr><td>{s}</td></tr>);
				});
				updateState(history);
			},
			error(xhr, status, err) {
				console.warn(err.toString());
			}
		});
	}

	renderForm(e){
		e.preventDefault();
		const answer = document.getElementById("111").value;
		this.handleAnswerSubmit(answer);
		this.loadQuestionFromServer();
		document.getElementById("111").value = '';
		return(
			<ChatForm renderForm = {this.renderForm} />
			)
	}

	render() {
		this.renderForm = this.renderForm.bind(this);
		this.updateState =this.updateState.bind(this);
		this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
		this.loadQuestionFromServer = this.loadQuestionFromServer.bind(this);
		return(
			<div>
				{this.props.greet}
				<table><tbody>{this.state.history}</tbody></table>
				<ChatForm  renderForm = {this.renderForm} />
			</div>
			);
	}
}

const GREET = "Hello! Do you want to talk with me?";

ReactDOM.render(<Chat greet = {GREET} />, document.getElementById('content'));