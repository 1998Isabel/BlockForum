import React, { Component } from 'react';
import './../css/bootstrap.min.css';
import PostCard from '../components/PostCard';

var posts = ["First", "Second", "Third", "Forth"]

class HomePage extends Component {
	posts = posts.map((p, index) => {
		return (
			<div>
				<PostCard key={index}/>
			</div>
		)
	})

	render() {
		return (
			<div>
				<h5>Posts</h5>
				{this.posts}
			</div>
		);
	}
}

export default HomePage;
