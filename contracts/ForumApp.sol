pragma solidity ^0.5.0;

contract ForumApp {

    event OnPostAdded(uint postId);
    event OnCatAdded(uint catId);
    event OnUserAdded(uint userId);

    struct User {
        string addr;
        string name;
    }

    struct Post {
        string id;
        string category;
        string title;
        string content;
        string user;
        string image_hash;
        uint   date;
    }

    Post[] posts;
    User[] users;
    string[] categorys;

    function addPost(string memory id,    string memory category,
                     string memory title, string memory content,
                     string memory user,  uint   date,
                     string memory image_hash) public {
        Post memory post = Post({
            id: id, 
            category: category, 
            title:    title, 
            content:  content,
            user:     user, 
            date:     date,
            image_hash: image_hash
        });
            
        uint postId = posts.push(post) - 1;
        emit OnPostAdded(postId);
    }

    function getPostLength() public view returns(uint length){
        return posts.length;
    }
    
    function getPosts(uint idx) public view 
    returns(string memory id,    string memory category, 
            string memory title, string memory content,
            string memory user,  uint   date, string memory image_hash){

        Post memory post = posts[idx];
        return(post.id,    post.category, 
               post.title, post.content,
               post.user,  post.date,
               post.image_hash);
    } 

    function addCategory(string memory category) public {
        uint catId = categorys.push(category) - 1;
        emit OnCatAdded(catId);
    }

    function getCategoryLength() public view returns(uint length){
        return categorys.length;
    }
    
    function getCategorys(uint idx) public view returns(string memory category){
        return categorys[idx];
    } 

    function addUser(string memory addr, string memory name) public {
        User memory user = User({
            addr: addr, 
            name: name 
        });
            
        uint userId = users.push(user) - 1;
        emit OnUserAdded(userId);
    }

    function getUserLength() public view returns(uint length){
        return users.length;
    }
    
    function getUsers(uint idx) public view 
    returns(string memory addr, string memory name){
        User memory user = users[idx];
        return(user.addr, user.name);
    } 

}
