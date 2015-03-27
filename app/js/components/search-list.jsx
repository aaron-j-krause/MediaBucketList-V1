'use strict';
var React = require('react');
var SearchListCheckbox = require('./search-list-checkbox.jsx');
var UserActions = require('../actions/user-actions');

module.exports = React.createClass({
  componentDidMount: function() {
    UserActions.isValid(true);
  },

  render: function() {
    var searchItems = this.props.movieData.map(function(movie) {
      return (<SearchListCheckbox imageUrl={this.props.imageUrl} movieData={movie}
        key={movie.id} sublist={this.props.sublist}/>);
    }.bind(this));

    return (
      <form className="searchitemlist" onSubmit={this.handleSubmit}>
        <ul>{searchItems}</ul>
      </form>
    );
  }
});
