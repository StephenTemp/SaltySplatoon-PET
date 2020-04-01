import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

class Requests extends React.Component {

    Hidden = (requesterName) => {
        var hiddentextarea = document.getElementById('textarea')
        if (hiddentextarea.style.display === 'none'){
            hiddentextarea.style.display = ''
        }else {
            hiddentextarea.style.display = 'none'
        }
    }

    render() {
        //console.log(this.props.todos)
        return this.props.requests.map((request) => (
            <p style={requeststyle}>
                <p onClick={this.Hidden}>
                <h3 style={h3inlinestyle}>{ request.requesterName }</h3>
                <h4 style={h4inlinestyle}>{ request.dateRequested }</h4>
                </p>
                <textarea id='textarea' style={textareastyle} name='textarea' rows='10' cols='50'></textarea>
            </p>
        ));
    }
}

const requeststyle = {
    margin: '15px',
	padding: '15px',
	'background-color': '#FFF',
	'border-radius': '8px',
	'box-shadow': '0px 0px 10px rgba(0, 0, 0, 0.2)'
}

const h3inlinestyle = {
    display: 'inline',
    'margin-right': '50px'
}

const h4inlinestyle = {
    display: 'inline',
    'margin-left': '50px'
}

const textareastyle = {
    'overflow-y': 'hidden'
}

// function Requests ({faq, index, toggleFAQ}) {
// 	return (
// 		<div
// 			className={"faq " + (faq.open ? 'open' : '')}
// 			key={index}
// 			onClick={() => toggleFAQ(index)}
// 		>
// 			<div className="faq-question">
// 				{faq.question}
// 			</div>
// 			<div className="faq-answer">
// 				{faq.answer}
// 			</div>
// 		</div>
// 	)
// }

export default Requests;