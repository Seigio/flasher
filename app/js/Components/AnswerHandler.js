import React, {Component} from 'react';


class AnswerHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerText: '',
        }
    }

    updateAnswerText(e){
        this.setState({
            answerText: e.target.value
        });
    }

    checkAnswer(){
        if(this.state.answerText.toLowerCase() == this.props.answer){
            alert('correct')
            this.props.correct(); //calls handleCorrect in Deck, incrementing the Card
        }
        else {
            alert('wrong')
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.checkAnswer();
    }

    render(){
        return <form name="check_ans" id="check_ans" onSubmit={submitEvent => this.handleSubmit(submitEvent)}>
                    <input autoFocus type="text" name="answer" id="answer" placeholder="Answer" 
                            value={this.state.answerText} onChange={e => this.updateAnswerText(e)}/> 
                    <input type="button" value="Check" id="submit_btn" onClick={this.checkAnswer.bind(this)} /> 
                </form>
    }
}

export default AnswerHandler