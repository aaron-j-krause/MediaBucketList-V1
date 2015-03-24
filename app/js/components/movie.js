var React = require('react');

module.exports = React.createClass({
  render: function() {
    var movieData = this.props.movieData;
    var title = !!(movieData.title) ? movieData.title : movieData.name
    return (
      <li>{title}</li>
    );
  }
})