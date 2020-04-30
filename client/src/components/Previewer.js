import React from 'react';

export default (props) => {
	return (
		<div>
			<img className="w-100 img-thumbnail" src={props.path} alt="Preview" />
		</div>
	);
};
