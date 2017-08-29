import React, {Component} from 'react';
import Card from './Card'

class Deck extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            cards: []
        };

    }

    componentDidMount(){
        let cards = []
        const onCorrect = this.handleCorrectAnswer;

        if(this.props.json){
            cards = this.props.json.map(jsonObj => {
                return <Card question={jsonObj.question} title={jsonObj.title} 
                             answer={jsonObj.answer} key={jsonObj.title} onCorrect={onCorrect.bind(this)}/>
            })
        }

        this.setState({cards})
    }

    decrementCardView(){
        let nextIndex = this.state.index - 1
        if(nextIndex >= 0){
            this.setState({index: nextIndex})
        }
    }

    incrementCardView(){
        let nextIndex = this.state.index + 1

        if(nextIndex <= this.props.json.length - 1){
            this.setState({index: nextIndex})
        }
    }

    handleCorrectAnswer(){
        this.incrementCardView()
    }

    render(){
        let index = this.state.index;
       
        return <div>
            {this.state.cards[index]}
            <div className="buttons">
                <button className="change" id="previous" name="previous" onClick={this.decrementCardView.bind(this)}>Previous</button>
                <button className="change" id="next" name="next" onClick={this.incrementCardView.bind(this)}>Next</button>
            </div>
        </div>;
    }
}

export default Deck;