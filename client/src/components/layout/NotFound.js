import React from 'react';

const NotFound = (props) => {
	return (
		<div className='container'>
			<h1 className='x-large text-primary'>
				<i className='fas fa-exclamation-triangle'> Page Not Fund</i>
			</h1>
			<p className='large'>Sorry, this page does not exist</p>
		</div>
	);
};

export default NotFound;
