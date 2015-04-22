'use strict';
var React = require('react');
var Movie = require('./movie.jsx');
var UserActions = require('../actions/user-actions');

//child of ListView
var MovieList = React.createClass({
  handleClick: function() {
    var listId = this.props.list.id;
    var listData = this.props.list.subjectInfo;
    console.log(this.props.list.id, this.props.list);
    UserActions.profileListSave({listId: listId, listData: listData});
  },

  render: function() {
    var listData = this.props.list.subjectInfo;
    var movies = listData.map(function(movie) {
      return (
        <Movie key={movie.id} movieData={movie} listId={this.props.list.id}
          imageData={this.props.imageData}/>
      );
    }.bind(this));
    return (
      <div>
        <button onClick={this.handleClick}>Save List</button>
        <h2>{this.props.name}</h2>
        <ul className="searchitemlist">
          {movies}
        </ul>
      </div>
    );
  }
});

module.exports = MovieList;
