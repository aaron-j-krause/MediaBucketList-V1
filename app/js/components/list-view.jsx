'use strict';

var React = require('react');
var UserActions = require('../actions/user-actions');
var MovieList = require('./movie-list.jsx');

//child of ControllerView
var ListView = React.createClass({
  getInitialState: function() {
    return {displayList: null}
  },

  componentDidMount: function() {
    UserActions.isValid(this.props.signedIn);
  },

  handleClick: function(event) {
    event.preventDefault();
    var state = this.state;
    console.log(event.target.dataset)
    state.displayList = event.target.dataset.list;
    this.setState(state)
  },

  clickBack: function() {
    var state = this.state;
    state.displayList = null;
    this.setState(state);
  },

  render: function() {
    var displayList;
    var backButton = <button onClick={this.clickBack}>Back</button>;

    if (this.state.displayList) {
      this.props.listData.forEach(function(list) {
        if (list.id == this.state.displayList) {
          displayList = <MovieList list={list} imageData={this.props.imageData}/>
        }
      }.bind(this))
    }

    var movieLinks = !(this.state.displayList) ? this.props.listData.map(function(list, i){
      return <a style={{display: 'block'}} href='#' key={i} data-list={list.id}
        onClick={this.handleClick}>{list.id}</a>
    }.bind(this)) : null;
    return (
      <div>
        {movieLinks || backButton}
        {displayList}
      </div>
    );
  }
});

module.exports = ListView;
