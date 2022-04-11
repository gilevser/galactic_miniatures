import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import { checkUserAuth } from './redux/actions/userAC';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkUserAuth());
		}
	}, [dispatch]);

	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/auth/login" element={<Login />} />
				<Route path="/auth/registration" element={<Registration />} />
			</Routes>
		</>
	);
};

export default App;
