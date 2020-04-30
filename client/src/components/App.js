import React, { useState, Fragment } from 'react';
import axios from 'axios';
import './App.css';
import Previewer from './Previewer';
import Selector from './Selector';
import MyImages from './MyImages';

function App() {
	const [ files, setFiles ] = useState([]);
	const [ file, setFile ] = useState(undefined);
	const [ imagePath, setImagePath ] = useState('');
	const [ images, setImages ] = useState([]);

	const [ filename, setFilename ] = useState('Choose file');

	const selectedFileHandler = (e) => {
		if (Array.from(e.target.files).length > 0) {
			const selectFile = e.target.files[0];
			if (selectFile.type.startsWith('image')) {
				setFile(e.target.files[0]);
				setFilename(e.target.files[0].name);

				const imageURL = URL.createObjectURL(e.target.files[0]);
				setImagePath(imageURL);
			} else {
				console.log('Selected file is not an image');
			}
		}
	};

	const uploadFileHandler = () => {
		let count = 0;

		if (files.length > 0) {
			files.map((file) => {
				return axios
					.post('/api/upload', file, {
						onUploadProgress: (progress) => {
							console.log('Progress: ', Math.round(progress.loaded / progress.total * 100) + '%');
						}
					})
					.then((res) => {
						count += 1;
						console.log('Uploaded files: ', count);
						if (count === files.length) {
							console.log('All files Uploaded successfully');
							setFiles([]);
							setImages([]);
						}
					})
					.catch((err) => {
						const { data } = err.response;
						console.log(data.message);
					});
			});
			setFiles([]);
		} else {
			console.log('No files Added');
		}
	};

	const addImageHandler = () => {
		if (file !== undefined) {
			const fd = new FormData();
			fd.append('photo', file);
			setFiles([ ...files, fd ]);
			setImages([ ...images, imagePath ]);

			setFile(undefined);
			setFilename('Choose file');
			setImagePath('');
		} else {
			console.log('No file uploaded');
		}
	};

	return (
		<Fragment>
			<div className="container my-4 p-3 border">
				<h3 className="text-muted text-center bg-light py-2">IMAGE UPLOADER</h3>
				<div className="row">
					<div className="col-4">
						<Previewer path={imagePath === '' ? './uploads/image-default.jpg' : imagePath} />
						<Selector
							selectedFileHandler={selectedFileHandler}
							addImageHandler={addImageHandler}
							filename={filename}
						/>
					</div>
					<div className="col-8">
						<MyImages images={images} />

						<button className="btn btn-info w-50 mt-3" onClick={uploadFileHandler}>
							Upload Images
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
