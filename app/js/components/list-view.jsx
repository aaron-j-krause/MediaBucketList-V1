'use strict';

var React = require('react');
var UserActions = require('../actions/user-actions');
var MovieList = require('./movie-list.jsx');

//child of ControllerView
var ListView = React.createClass({
  componentDidMount: function() {
    UserActions.isValid(this.props.signedIn);
  },

  render: function() {
    var movieLists = this.props.listData.map(function(list){
      return <MovieList name={list.id} listData={list.subjectInfo} imageData={this.props.imageData}/>;
    }.bind(this));
    return (
      <div>
        {movieLists}
      </div>
    );
  }
});

module.exports = ListView;
