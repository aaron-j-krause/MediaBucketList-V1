'use strict';
var React = require('react');
var SearchListCheckbox = require('./search-list-checkbox.jsx');
var MovieActions = require('../actions/movie-actions');

module.exports = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    MovieActions.searchListSaveNew(this.props.searchData);
  },

  render: function() {
    var searchItems = this.props.movieData.map(function(movie) {
      return (<SearchListCheckbox movieData={movie} key={movie.id}/>);
    });

    return (
      <form name="searchList" onSubmit={this.handleSubmit}>
        {searchItems}
        <input type="submit" value="Make List"/>
      </form>
    );
  }
});
