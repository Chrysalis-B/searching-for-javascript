import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function SearchResultsList(props) {
	return (props.results.map(result => {
		return (
			<Card style={{ margin: '10px 0' }} key={result.id}>
				<CardHeader
					avatar={
						<Avatar alt="" src={result.userImg} />

					}
					title={result.userName}
					subheader={result.created_at}
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{result.text}
					</Typography>
				</CardContent>
			</Card>
		)
	}));
}

export default SearchResultsList;