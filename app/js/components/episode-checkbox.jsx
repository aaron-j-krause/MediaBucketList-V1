'use strict';
var React = require('react');
var MovieActions = require('../actions/movie-actions');

module.exports = React.createClass({
  handleChange: function(event) {
    var payload = {
      movie: this.props.showData,
      checked: event.target.checked
    };
    MovieActions.searchListModifyItem(payload);
  },

  render: function() {
    var showData = this.props.showData;
    var title = showData.title ? showData.title : showData.name;
    var path = showData.poster_path? showData.poster_path : showData.still_path;
    var url = this.props.imageUrl + path;
    var img = path ? <img alt={title} src={url}/> : '';
    return (
      <div className="searchitems episode">
        {img}
        <label><input name={title} value={title}
          onChange={this.handleChange} type="checkbox"/>{title}<br/></label>
      </div>
    );
  }
});