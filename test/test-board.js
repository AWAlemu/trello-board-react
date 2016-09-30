var React = require('react');
var TestUtils = require('react-addons-test-utils');
var should = require('chai').should();

var Card = require('../index.js').Card;
var List = require('../index.js').List;
var ListContainer = require('../index.js').ListContainer;
var Board = require('../index.js').Board;

describe('Board component', function() {
    it('Card renders divs',  function() {
        var cardConent = ['card 1', 'card 2'];
        var renderer = TestUtils.createRenderer();
        renderer.render(<Card text={cardConent}/>);
        var result = renderer.getRenderOutput();
        result.type.should.equal('div');
        result.props.children[0].should.equal('card 1');
        result.props.children[1].should.equal('card 2');
    });
    it('Board renders header and ListContainer component instance', function() {
        var renderer = TestUtils.createRenderer();
        renderer.render(<Board title='Trello Board' />);
        var result = renderer.getRenderOutput();
        result.type.should.equal('div');

        var header = result.props.children[0];
        header.type.should.equal('h1');
        header.props.children.should.equal('Trello Board');

        var listContainerInstance = result.props.children[1];
        listContainerInstance.type.displayName.should.equal('ListContainer');
    });
    it('ListContainer renders List', function() {
        var renderer = TestUtils.createRenderer();
        renderer.render(<ListContainer />);
        var result = renderer.getRenderOutput();
        result.type.displayName.should.equal('List');
        result.props.cards[0].should.equal('card 1');
    });
    it('List renders Card instances', function() {
        var onAddInputChanged = function (event) {
            this.setState({text: event.target.value}); 
        };
        var onAddSubmit = function (event) {
            event.preventDefault();
            var cards = this.state.cards;
            cards.push(this.state.text);
            this.setState({cards: cards});
        };
        var renderer = TestUtils.createRenderer();
        var cards = ['card 1', 'card 2', 'card 3'];
        renderer.render(<List cards={cards} onAddInputChanged={onAddInputChanged} onAddSubmit={onAddSubmit}/>);
        var result = renderer.getRenderOutput();
        result.type.should.equal('div');

        var listHeader = result.props.children[0];
        listHeader.type.should.equal('h1');

        var cardsMap = result.props.children[1];
        cardsMap[0].props.text.should.equal('card 1');
        cardsMap[1].props.text.should.equal('card 2');
        cardsMap[2].props.text.should.equal('card 3');
        
        var form = result.props.children[2];
        form.type.should.equal('form');

        var formChildren = result.props.children[2].props.children;
        formChildren[0].type.should.equal('input');
        formChildren[0].props.onChange.should.equal(onAddInputChanged);
        formChildren[0].props.type.should.equal('text');
        formChildren[0].props.name.should.equal('card');

        formChildren[1].type.should.equal('button');
        formChildren[1].props.onClick.should.equal(onAddSubmit);
        formChildren[1].props.children.should.equal('Create Card');
    });
});