'use strict';
var React = require('react');
var MovieActions = require('../actions/movie-actions');
var SubList = require('./sublist.jsx');

module.exports = React.createClass({
  handleChange: function(event) {
    var payload = {
      movie: this.props.movieData,
      checked: event.target.checked
    };
    MovieActions.searchListModifyItem(payload);
  },

  render: function() {
    var img;
    var sublist = null;

    var movieData = this.props.movieData;
    var classType = movieData.title ? 'searchitems' : '';
    var title = movieData.title ? movieData.title : movieData.name;
    var path = movieData.poster_path? movieData.poster_path : movieData.still_path;
    var url = this.props.imageUrl + path;
    img = path ? <img alt={title} src={url}/> : <img src="./img/logo.png" className="defaultimage"></img>;
    if(this.props.sublist && this.props.sublist[movieData.id]) {
      sublist = <SubList episodes={this.props.sublist[movieData.id]} imageUrl={this.props.imageUrl} />;
    }
    return (
      <li className={classType}>
        {img}
        <label><input name={title} value={title}
          onChange={this.handleChange} type="checkbox"/>{title}<br/></label>
        {sublist}
      </li>
    );
  }
});
