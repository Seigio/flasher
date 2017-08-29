import React, {Component} from 'react';
import AnswerHandler from './AnswerHandler'

class Card extends Component {
    render(){
        const onCorrect = this.props.onCorrect

        return  <div className="card">
                    <h2>{this.props.title}</h2>
                    <p>{this.props.question}</p>
                    <AnswerHandler correct={onCorrect.bind(this)} answer={this.props.answer}/>
                </div>
    }
}

export default Card;