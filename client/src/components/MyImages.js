import React from 'react';

export default ({ images }) => {
	return (
		<div className="w-100">
			<div className="card w-100">
				<div className="card-body">
					{images.length === 0 ? (
						<div className=" text-center text-muted">
							<small>Uploaded Images will appear here</small>
						</div>
					) : (
						undefined
					)}

					<div className="row">
						{images.map((image, index) => (
							<div key={index} className="col-2">
								<img src={image} alt={`uploaded(${index + 1})`} className="img-thumbnail w-100" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
