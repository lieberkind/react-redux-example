import React from 'react';
import logo from './logo.svg';
import './App.css';

import { createStore, compose } from 'redux';
import { install } from 'redux-loop';
import { Provider, connect } from 'react-redux';

const loadingStatuses = {
	NOT_REQUESTED: 'NOT_REQUESTED',
	REQUESTING: 'REQUESTING',
	SUCCESS: 'SUCCESS',
	FAILURE: 'FAILURE'
};

const initialState = {
	loadingStatus: loadingStatuses.NOT_REQUESTED,
	githubUsername: '',
	githubUserData: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_GITHUB_USER_REQUEST':
			return Object.assign({}, state, {
				loadingStatus: loadingStatuses.NOT_REQUESTED
			});

		case 'FETCH_GITHUB_USER_SUCCESS':
			return Object.assign({}, state, {
				loadingStatus: loadingStatuses.SUCCESS,
				githubUserData: action.payload
			});

		case 'FETCH_GITHUB_USER_FAILURE':
			return Object.assign({}, state, {
				loadingStatus: loadingStatuses.FAILURE
			});

		case 'UPDATE_GITHUB_USERNAME':
			return Object.assign({}, state, {
				githubUsername: action.payload
			});

		default:
			return state;
	}
};

const enhancer = compose(install());
const store = createStore(reducer, initialState, enhancer);

const App = ({ githubUsername, updateGithubUsername }) => (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">Welcome to React</h1>
		</header>

		<div>
			<label>
				<p>Github Username</p>
				<input
					type="text"
					value={githubUsername}
					onChange={e => updateGithubUsername(e.target.value)}
				/>
			</label>

			<p>
				<button>Search</button>
			</p>
		</div>
		<p>
			<code>{`Hello`}</code>
		</p>

		<div>User not found</div>
	</div>
);

const mapStateToProps = ({ githubUsername }) => ({
	githubUsername
});

const mapDispatchToProps = dispatch => ({
	updateGithubUsername: value => {
		dispatch({ type: 'UPDATE_GITHUB_USERNAME', payload: value });
	}
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

const ProvidedApp = () => (
	<Provider store={store}>
		<AppContainer />
	</Provider>
);

export default ProvidedApp;
