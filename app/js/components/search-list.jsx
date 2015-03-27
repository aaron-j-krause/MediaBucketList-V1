'use strict';
var React = require('react');
var SearchListCheckbox = require('./search-list-checkbox.jsx');
var MovieActions = require('../actions/movie-actions');
var UserActions = require('../actions/user-actions');

module.exports = React.createClass({
  componentDidMount: function() {
    UserActions.isValid(true);
  },

  handleSubmit: function(event) {
    event.preventDefault();
    MovieActions.searchListSaveNew(this.props.searchData);
  },

  render: function() {
    var searchItems = this.props.movieData.map(function(movie) {
      return (<SearchListCheckbox imageUrl={this.props.imageUrl} movieData={movie}
        key={movie.id} sublist={this.props.sublist}/>);
    }.bind(this));

    return (
      <form name="searchitemlist" onSubmit={this.handleSubmit}>
        {searchItems}
        <input type="submit" value="Make List"/>
      </form>
    );
  }
});
