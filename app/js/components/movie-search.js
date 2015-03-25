var React = require('react');
var MovieActions = require('../actions/movie-actions');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      formType: 'Movie'
    }
  },

  handleChange: function(event){
    var state = this.state;
    state.name = event.target.value;
    this.setState(state);
  },

  changeFormType: function(event) {
    var state = this.state;
    state.formType = event.target.value;
    this.setState(state);
  },

  handleSubmit: function(event) {
    event.preventDefault();
    if (this.state.formType === 'Movie') {
      MovieActions.getMoviesByName(this.state.name);
    } else {
      MovieActions.getTvShowsByName(this.state.name);
    }

    this.setState({
      name: '',
      formType: 'Movie'
    });
  },

  render: function() {
    var submitButton = 'Find ' + this.state.formType;
    var placeholder = 'Search by ' + this.state.formType + ' name';
    return (
      <form onSubmit={this.handleSubmit}>
        <label> By Movie
          <input type="radio" name="searchSelect" value="Movie"
            onChange={this.changeFormType}/>
        </label>
        <label> By TV Show
          <input type="radio" name="searchSelect" value="TV Show" onChange={this.changeFormType}/>
        </label>
        <input type="text" onChange={this.handleChange} value={this.state.name}
          placeholder={placeholder}/>
        <input type="submit" value={submitButton}/>
      </form>
    );
  }
});
