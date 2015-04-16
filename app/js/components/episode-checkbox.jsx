'use strict';
var React = require('react');
var MovieActions = require('../actions/movie-actions');

//child of Sublist
var EpisodeCheckbox = React.createClass({
  handleChange: function(event) {
    var payload = {
      movie: this.props.showData,
      checked: event.target.checked
    };
    MovieActions.searchListModifyItem(payload);
  },

  render: function() {
    var showData = this.props.showData;
    var url = this.props.imageUrl + showData.url;
    var img = showData.url ? <img alt={showData.name} src={url}/> : '';
    return (
      <div className="searchitems episode">
        {img}
        <label><input name={showData.name} value={showData.name}
          onChange={this.handleChange} type="checkbox"/>{showData.name}<br/></label>
      </div>
    );
  }
});

module.exports = EpisodeCheckbox;
