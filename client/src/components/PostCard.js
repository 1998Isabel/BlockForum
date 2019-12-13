import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import moment from "moment";
import { connect } from 'react-redux';
import { deletePost } from '../actions/postActions';

class PostCard extends Component {
  handleDelete = () => {
    this.props.deletePost(this.props.post.id);
  }

  showDelete = () => {
    const now = moment(Date.now())
    const duration = moment.duration(now.diff(this.props.post.date)).asSeconds()
    console.log("DURATION",duration);
    if (duration < 60 && this.props.user.myAccount === this.props.post.user)
      return (
        <Button variant="secondary" style={{float: "right"}} onClick={this.handleDelete}>Delete</Button>
      )
    else
      return
  }

  render() {
    let { post } = this.props;
    let time = moment(post.date).format("MMMM Do YYYY, h:mm:ss a");
    
    return (
      <div>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              {post.title}
              {this.showDelete()}
            </h5>
            <h6 className="card-subtitle text-muted">{post.category}</h6>
          </div>
          <div className="card-body">
            <p className="card-text">{post.content}</p>
          </div>
          <div className="card-footer text-muted">{time}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, { deletePost })(PostCard);
