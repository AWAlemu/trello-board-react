var React = require('react');
var ReactDOM = require('react-dom');

var Card = React.createClass({
    render: function () {
        return <div>{this.props.text}</div>;
    }
});

var List = React.createClass({
    render: function () {
        var cards = (this.props.cards || []).map(function(cardContent) {
            return <Card text={cardContent} />;
        });
        return (
            <div>
                <h1>{this.props.title}</h1>
                {cards}
                <form> 
                    <input onChange={this.props.onAddInputChanged} type="text" name="card" />
                    <button onClick={this.props.onAddSubmit}>Create Card</button>
                </form>
            </div>
        );
    }
});
var ListContainer = React.createClass({
    getInitialState: function () {
        return {
            text: "",
            cards: ['card 1']
        }
    },
    onAddInputChanged: function (event) {
        this.setState({text: event.target.value}); 
    },
    onAddSubmit: function (event) {
        event.preventDefault();
        var cards = this.state.cards;
        cards.push(this.state.text);
        this.setState({cards: cards});
    },
    render: function () {
        return (
            <List cards={this.state.cards} onAddInputChanged={this.onAddInputChanged} onAddSubmit={this.onAddSubmit} />
        );
    }
});
var Board = React.createClass({
    render: function () {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <ListContainer />
            </div>

        );
    }
});

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<Board title="Trello Board" />, document.getElementById('app'));
});

exports.Board = Board;
exports.ListContainer = ListContainer;
exports.List = List;
exports.Card = Card;