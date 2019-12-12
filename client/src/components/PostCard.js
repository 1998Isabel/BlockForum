import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import moment from "moment";
import { connect } from 'react-redux';
import { deletePost } from '../actions/postActions';

class PostCard extends Component {
  handleDelete = () => {
    this.props.deletePost(this.props.post.id);
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
              <Button variant="secondary" style={{float: "right"}} onClick={this.handleDelete}>Delete</Button>
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

export default connect(null, { deletePost })(PostCard);
