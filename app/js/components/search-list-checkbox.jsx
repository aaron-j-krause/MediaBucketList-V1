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
    var movieData = this.props.movieData;
    var sublist = null;
    var classType = movieData.mediaType === 'seasonHeader' ? '' : 'searchitems';
    var url = this.props.imageUrl + movieData.url;
    var img = movieData.url ? <img alt={movieData.name} src={url}/> :
      <img src="./img/logo.png" className="defaultimage"></img>;

    if(this.props.sublist && this.props.sublist[movieData.id]) {
      sublist = <SubList episodes={this.props.sublist[movieData.id]} imageUrl={this.props.imageUrl} />;
    }

    return (
      <li className={classType}>
        {img}
        <label><input name={movieData.name} value={movieData.name}
          onChange={this.handleChange} type="checkbox"/>{movieData.name}<br/></label>
        {sublist}
      </li>
    );
  }
});
