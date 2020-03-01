import React from 'react';
import { useState } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

import './App.css';

function App() {
	const [searchInput, setSearchInput] = useState('');

	const handleChange = event => {
		setSearchInput(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (searchInput) {

		}
	};

	return (
			<Container maxWidth='sm'>
				<AppBar elevation={0} position='static'>
					<Toolbar>
						<Typography variant='h6'>
							Searching for Javascript
						</Typography>
					</Toolbar>
				</AppBar>
				<Paper component="main" elevation={0}>
					<form onSubmit={handleSubmit}>
						<FormControl fullWidth>
							<TextField
								onChange={handleChange}
								id="input-with-icon-textfield"
								value={searchInput}
								label="Type your query and hit enter"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon>search</Icon>
										</InputAdornment>
									),
								}}
							/>
						</FormControl>
					</form>
				</Paper>
			</Container>
	);
}

export default App;
