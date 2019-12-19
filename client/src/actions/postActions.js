import axios from "axios";
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  LIKE_POST,
  POSTS_LOADING
} from "./types";

export const getPosts = ipfs_node => dispatch => {
  dispatch(setpostsLoading());
  axios.get("/posts").then(res => {
    // console.log(res.data)
    let newposts = res.data;
    // console.log("NEWPOSTS", newposts);
    res.data.forEach(async (p, idx) => {
      if (p.img) {
        newposts[idx].img = (await ipfs_node.cat(p.img)).toString();
        // console.log(newposts[idx].img);
      }
    });
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  });
};

export const addPost = (post, ipfs_node) => async dispatch => {
  console.log("ACTION_POST", post);

  await ipfs_node.add(post.img, (err, res) => {
    // If fail print error and return
    console.log("ORIGIN", post.img);
    if (err) {
      console.error(err);
      return;
    }
    // If succeed add hash to newPost
    console.log("Image added to ipfs! imgHash", res[0].hash);
    //   post.img = res[0].hash;
    let newpost = { ...post, img: res[0].hash };
    console.log(newpost);
    axios.post("/posts", newpost).then(res =>
      dispatch({
        type: ADD_POST,
        payload: { ...res.data, img: post.img }
      })
    );
  });
};

export const deletePost = id => dispatch => {
  console.log("ID", id);
  axios.delete(`/posts/${id}`).then(res =>
    dispatch({
      type: DELETE_POST,
      payload: id
    })
  );
};

export const likePost = id => dispatch => {
  axios.put(`/posts/${id}`).then(res =>
    dispatch({
      type: LIKE_POST,
      payload: res.data
    })
  );
};

export const setpostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};
