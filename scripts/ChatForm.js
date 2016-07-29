import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ChatForm extends Component{
	render(){
		return(
			<div>
				<form action="./server" method="post" onSubmit={this.props.renderForm}>
					<input type="text" placeholder="Your Answer" ref="inputed" id="111" />
					<input type="submit" value="Send" />
				</form>
			</div>
			)
	}
}