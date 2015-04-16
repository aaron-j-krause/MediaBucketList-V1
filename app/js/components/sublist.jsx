'use strict';
var React = require('react');
var EpisodeCheckbox = require('./episode-checkbox.jsx');

//child of SearchListCheckbox
var Sublist = React.createClass({
  render: function() {
    var episodes = this.props.episodes;
    var episodeList = episodes.map(function(episode) {
      return (<EpisodeCheckbox showData={episode} key={episode.id} imageUrl={this.props.imageUrl}/>);
    }.bind(this));

    return (
      <ul className="searchitemlist">
        {episodeList}
      </ul>
    );
  }
});

module.exports = Sublist;
