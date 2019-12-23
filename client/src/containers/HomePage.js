import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, addPost } from '../actions/postActions';
import PostCard from '../components/PostCard';

class HomePage extends Component {
	componentDidMount() {
		this.props.getPosts();
		setInterval(this.props.getPosts, 5000);
	}

	render() {
		const { post, category } = this.props
		let posts = post.posts;
		if (category.show) {
			posts = post.posts.filter(p => {
				return (p.category === category.show)
			})
		}

		const postlist = posts.map((p, index) => {
			return (
				<PostCard key={index} post={p} />
			)
		})

		return (
			<div>
			<h5>Posts <em className="text-secondary">{category.show}</em></h5>
				{postlist}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	post: state.post,
	category: state.category
});

export default connect(mapStateToProps, { getPosts, addPost })(HomePage);
