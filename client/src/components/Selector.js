import React from 'react';

export default (props) => {
	return (
		<div className="custom-file my-1">
			<input type="file" className="custom-file-input" id="customFile" onChange={props.selectedFileHandler} />
			<label className="custom-file-label" htmlFor="customFile">
				<small>{props.filename}</small>
			</label>
			<button className="btn btn-primary w-100 my-2" onClick={props.addImageHandler}>
				Add Image
			</button>
		</div>
	);
};
