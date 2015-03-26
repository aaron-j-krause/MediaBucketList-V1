'use strict';

var React = require('react');
var UserActions = require('../actions/user-actions');
var MovieList = require('./movie-list');

module.exports = React.createClass({
  componentDidMount: function() {
    UserActions.isValid(this.props.signedIn);
  },

  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        <p>THIS IS THE LIST VIEW</p>
        <MovieList listData={this.props.listData} imageData={this.props.imageData}/>
      </div>
    );
    /* jshint ignore:end */
  }
});
