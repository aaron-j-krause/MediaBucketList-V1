'use strict';
var React = require('react');
var UserActions = require('../actions/user-actions');

module.exports = React.createClass({
  componentDidMount: function() {
    UserActions.isValid(this.props.signedIn);
  },

  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        <p>THIS IS THE PROFILE VIEW</p>
      </div>
    );
    /* jshint ignore:end */
  }
});
