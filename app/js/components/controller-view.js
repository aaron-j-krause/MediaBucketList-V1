'use strict';
var React = require('react');
var MovieStore = require('../stores/movie-store');
var UserStore = require('../stores/user-store');
var HomeView = require('./home-view');
var SearchView = require('./search-view');
var ListView = require('./list-view');
var ProfileView = require('./profile-view');
var UserActions = require('../actions/user-actions.js');
var UserNav = require('./user-nav');
var MovieActions = require('../actions/movie-actions.js');

var cookies = require('cookies-js');

var getControllerState = function() {
  return {
    //movie state
    movieData: MovieStore.getMovies(),
    searchData: MovieStore.getList(),
    listType: MovieStore.getListType(),
    testList: MovieStore.getTestList(),
    imageData: MovieStore.getImageData(),
    //user state
    navView: UserStore.getNavView(),
    signedIn: UserStore.getSignedIn(),
    lists: UserStore.getLists(),
    user: UserStore.getUser()
  };
};

module.exports = React.createClass({
  getInitialState: function() {
    return getControllerState();
  },

  handleMovieClick: function(event) {
    event.preventDefault();
  },

  componentDidMount: function() {
    MovieStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
    var cookie = cookies.get('signIn');
    UserActions.isValid(cookie);
    MovieActions.getConfig();
    this._onChange();
  },

  componentWillUnmount: function() {
    MovieStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getControllerState());
  },

  render: function(){
    /* jshint ignore:start */
    var views = {
      'search': <SearchView movieData={this.state.movieData} listType={this.state.listType}
        searchData={this.state.searchData} imageUrl={this.state.imageData}/>,
      'profile': <ProfileView signedIn={this.state.signedIn} userData={this.state.user}/>,
      'lists': <ListView signedIn={this.state.signedIn} listData={this.state.testList}
        imageData={this.state.imageData}/>
    };

    var view = this.state.signedIn ? views[this.state.navView] : <HomeView />;
    var nav = this.state.signedIn ? <UserNav /> : '';
    return (
      <main>
        {nav}
        {view}
      </main>
    );
    /* jshint ignore:end */
  }
});
