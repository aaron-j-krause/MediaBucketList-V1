'use strict';
var React = require('react');
var UserActions = require('../actions/user-actions');

var ProfileView = React.createClass({
  componentDidMount: function() {
    UserActions.isValid(this.props.signedIn);
  },

  render: function() {
    var filler = (
      <div>
        <img src="./img/logo.png" className="filler" alt="Logo image"></img>
      </div>
    );
    return (
      <div>
        {filler}
      </div>
    );
  }
});

module.exports = ProfileView;
