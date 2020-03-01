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
import fetchRequest from './utils/fetch';
import SearchResultsList from './SearchResultsList';
import './App.css';

function App() {
	const [searchInput, setSearchInput] = useState('');
	const [searchResults, setSearchResults] = useState(null);

	const handleChange = event => {
		setSearchInput(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (searchInput) {
			const query = encodeURIComponent(searchInput);
			const response = await fetchRequest(`http://localhost:3001/search?q=${query}`);
			const results = (response && response.hits) ? response.hits.hits : null;
			setSearchResults(results);
		}
	};

	const ResultsRenderer = () => {
		if (!searchResults) {
			return null;
		} else if (searchResults.length === 0) {
			return (<p>Sorry, no matches found :(</p>)
		} else {
			return (<SearchResultsList results={searchResults} />)
		}
	}

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
			<ResultsRenderer />
		</Container>
	);
}

export default App;
