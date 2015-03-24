var React = require('react');

module.exports = React.createClass({
  render: function() {
    var movieData = this.props.movieData;
    return (
      <li>{movieData.title}</li>
    );
  }
})