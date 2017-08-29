import React, {Component} from 'react';
import $ from 'jquery';
import Deck from './Components/Deck';

class App extends Component{
    constructor(){
        super();
        this.state = {
            jsonData: [],
            data: <h3 className='loading'></h3>
        };
    }

    getJson(){
        const json_promise = $.getJSON($SCRIPT_ROOT + '/get_json/testq_1.json');    

        json_promise.done(function(json) {
            let jsonArr = $.map(json, (el) => {return el});
            this.setState({jsonData: jsonArr, data: <Deck json={jsonArr}/>});
        }.bind(this));

        json_promise.fail(function(){
            console.log('we ain\'t found shit');
        });
    }
    
    componentDidMount(){
        this.getJson();
    }

    render() {
        return this.state.data;
    }
}

export default App;