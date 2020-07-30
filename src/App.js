import React, {useEffect, useState} from 'react';
import './App.css';
import Note from './components/note/Note';
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";
import { config } from './config'
import { useCollection } from 'react-firebase-hooks/firestore';

firebase.initializeApp(config.firebase);
let user= {};
var provider = new firebase.auth.GoogleAuthProvider();
if (new URL(window.location.href).searchParams.get('login')) {
	firebase.auth().signInWithPopup(provider).then(function(result) {
		let user = result.user;
		if (!config.allowedUsers.includes(user.email)) {
			firebase.auth().signOut();
		}
		window.location.href = `${window.location.origin}?id=0`;
	})
}
firebase.auth().onAuthStateChanged(u => {
	if (!user) { return }
	user = u;
});

function App() {
	const [idList, setIdList] = useState([new URL(window.location.href).searchParams.get('n') || 0]);
	const [notes, setNotes] = useState([]);
	const [scrollX, setScrollX] = useState(0)
	const [value, loading] = useCollection(
		firebase.firestore().collection('notes'),
		{ snapshotListenOptions: { includeMetadataChanges: true }}
	);
	useEffect(() => {
		const handleScroll = () => {
			setScrollX(window.scrollX);
		}
		window.addEventListener('scroll', handleScroll);
	}, []);
	useEffect(() => {
		let data = [];
		if (value && !loading) {
			data = value.docs;
		}
		setNotes(data)
	}, [loading, value]);
	const loggedIn = !!user && Object.keys(user).length;
	return (
		<div className="App">
			<div className='topbar'>
				{ !!loggedIn && <img className="userPhoto" alt="profilePic" src={(user || {}).photoURL}></img>}
				<div className="title">{loggedIn ? `${(user || {}).displayName.split(' ')[0]}'s` : null} Notes</div>
			</div>
			<div className='notes-container'>
				<Note 
					key={0} 
					docId={idList[0] || '0'} 
					idList={idList}
					setIdList={setIdList}  
					offset={0}
					notes={notes}
					loggedIn={loggedIn}
					scrollX={scrollX}
				>
				</Note>
			</div>
		</div>
	);
}

export default App;
