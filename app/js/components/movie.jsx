'use strict';
var React = require('react');
var UserActions= require('../actions/user-actions')

//child of MovieList
var Movie = React.createClass({
  getInitialState: function(){
    return {watched: this.props.movieData.watched}
  },

  handleChange: function(event) {
    var invertWatched = !(this.state.watched);
    var movieData = this.props.movieData;
    this.setState({watched: invertWatched});
    UserActions.profileListModify({
      id: movieData.id,
      watched: invertWatched,
      listId: this.props.listId
    });
  },

  render: function() {
    var imageData = this.props.imageData;
    var movieData = this.props.movieData;
    var url = imageData + movieData.url;
    var watched = this.state.watched;
    var imgTag = movieData.url ? <img src={url} alt={movieData.name}/> : '';

    return (
      <div className="searchitems">
        {imgTag}
        <li>{movieData.name}</li>
        <input type="checkbox" onChange={this.handleChange} checked={watched}/>
      </div>
    );
  }
});

module.exports = Movie;
