'use strict';
var React = require('react');
var MovieStore = require('../stores/movie-store');
var UserStore = require('../stores/user-store');
var HomeView = require('./home-view.jsx');
var SearchView = require('./search-view.jsx');
var ListView = require('./list-view.jsx');
var ProfileView = require('./profile-view.jsx');
var UserActions = require('../actions/user-actions.js');
var UserNav = require('./user-nav.jsx');
var MovieActions = require('../actions/movie-actions.js');
var Footer = require('./footer.jsx');

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
    var views = {
      'search': <SearchView movieData={this.state.movieData} listType={this.state.listType}
        searchData={this.state.searchData} imageUrl={this.state.imageData}/>,
      'profile': <ProfileView signedIn={this.state.signedIn} userData={this.state.user}/>,
      'lists': <ListView signedIn={this.state.signedIn} listData={this.state.testList}
        imageData={this.state.imageData}/>,
      'footer': <Footer signedIn={this.state.signedIn} />
    };

    var view = this.state.signedIn ? views[this.state.navView] : <HomeView />;
    var nav = this.state.signedIn ? <UserNav /> : '';
    var footer = <Footer />;
    return (
        <main>
          {nav}
          {view}
          {footer}
        </main>
    );
  }
});
