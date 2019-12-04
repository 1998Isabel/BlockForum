import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, addPost, deletePost } from '../actions/postActions';
import PropTypes from 'prop-types';
import PostCard from '../components/PostCard';

class HomePage extends Component {
	posts = this.props.posts.map((p, index) => {
		return (
			<div>
				<PostCard key={index} post={p}/>
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

const mapStateToProps = (state) => ({
    posts: state.posts
});

export default connect(mapStateToProps, { getPosts, addPost, deletePost })(HomePage);
