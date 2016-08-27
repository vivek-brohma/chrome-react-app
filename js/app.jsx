var React = require('react')
	,ReactDom = require('react-dom')
	,Router = require('react-router').Router
	,Route = require('react-router').Route
	,browserHistory = require('react-router').hashHistory;

var Index = require('./index.jsx');

ReactDom.render((
	<Router history={browserHistory}>
		<Route path="/" name="home" component={Index} />
	</Router>
), document.getElementById('react-container'));