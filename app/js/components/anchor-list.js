var React = require('react');

module.exports = React.createClass({
  render: function() {
    var movieData = this.props.movieData;
    var title = movieData[0] && movieData[0].title ? 'title' : 'name';
    var links = this.props.movieData.map(function(movie) {
      return (
        <li key={movie.id}>
          <a name={movie.id} href="#" onClick={this.props.handleClick}>{movie[title]}</a>
        </li>
      )
    }.bind(this));

    return (
      <ul>
        {links}
      </ul>
    );
  }
});
