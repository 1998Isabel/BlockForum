import React, { Component } from 'react';
import './../css/bootstrap.min.css';

class CreatePost extends Component {
	render() {
		return (
			<div>
				<h5>Create Post</h5>
				<form>
					<div className="form-group">
						<div class="input-group mb-3">
							<input type="text" className="form-control" placeholder="Say something..." aria-label="Recipient's username" aria-describedby="button-addon2" />
							<div class="input-group-append">
								<button class="btn btn-outline-secondary" type="button" id="button-addon2">Post</button>
							</div>
						</div>
						{/* <div class="input-group mb-3">
							<div class="custom-file">
								<input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
								<label class="custom-file-label" for="inputGroupFile01">Choose file</label>
							</div>
						</div> */}
					</div>
				</form>
			</div>
		);
	}
}

export default CreatePost;
