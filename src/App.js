import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null
		}
	}

	unsubscriveFromAuth = null;

	// listening to authentication state changes on our firebase backend
	componentDidMount() {
		// this is an open messaging system between our application and our firebase app
		// whenever any changes accur on firebase from any source related to this application firebase sends out a message that the auth state has changed, the user has updated wether they ve signed in through the 2 options ot they've signed out
		// this is an open subscription that needs ti be closed on unmount because we don t need any memory leeks
		this.unsubscriveFromAuth = auth.onAuthStateChanged(async userAuth => {
			// this.setState({ currentUser: user });
			if(userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					this.setState({
						currentUser: {
							id: snapShot.id,
							...snapShot.data()
						}
					});
				});
			}
			else {
				this.setState({currentUser: userAuth});
			}
		});
	}

	componentWillUnmount() {
		// closing the subscription
		this.unsubscriveFromAuth();
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser} />
				<Switch> 
					<Route exact path='/'>
						<HomePage />
					</Route>
					<Route exact path='/shop'>
						<ShopPage />
					</Route>
					<Route exact path='/signin'>
						<SignInAndSignUpPage />
					</Route>
				</Switch>
			</div>
		);
	}
}

export default App;
