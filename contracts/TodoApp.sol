pragma solidity ^0.5.0;

// Reference: https://github.com/pomelyu/EthereumTodo

contract TodoApp {

    event OnPostAdded(uint todoId);
    event OnTodoAdded(uint todoId);
    event OnTodoDeleted(uint todoId);
    event OnTodoCompleted(uint todoId);
    event OnTodoUndone(uint todoId);

    struct User {
        string addr;
        string name;
    }

    struct Post {
        string id;
        string category;
        string title;
        string content;
    }

    struct Todo {
        string taskName;
        bool isComplete;
        bool isValid;
    }

    Todo[] todos;
    Post[] posts;
    User[] users;
    string[] categorys;



    // Modifier
    modifier isValidTodo(uint _todoId) {
        require(isTodoValid(_todoId), "Todo must be valid to call");
        _;
    }


    function addPost(string memory id, string memory category,
                     string memory title, string memory content) public {
        Post memory post = Post({
            id: id, 
            category: category, 
            title: title, 
            content: content});
            
        uint postId = posts.push(post) - 1;
        emit OnPostAdded(postId);
    }

    function getPostLength() public view returns(uint length){
        return posts.length;
    }
    
    function getPosts(uint idx) public view 
    returns(string memory id, string memory category, string memory title, string memory content){
        Post memory post = posts[idx];
        return(post.id, post.category, post.title, post.content);
    } 
    // Public function

    //function getPosts() public view returns(){
    //    
    //}
    
    function isTodoValid(uint _todoId) public view returns(bool isValid) {
        return todos[_todoId].isValid;
    }

    function isTodoCompleted(uint _todoId) public view isValidTodo(_todoId) returns(bool isValid) {
        return todos[_todoId].isComplete;
    }

    function getTodoList() public view returns(uint[] memory, bool[] memory) {
        uint len;
        uint[] memory valids;

        (valids, len) = _getValidTodos();

        uint[] memory ids = new uint[](len);
        bool[] memory isCompletes = new bool[](len);
        for (uint i = 0; i < len; i++) {
            uint id = valids[i];
            ids[i] = id;
            isCompletes[i] = todos[id].isComplete;
        }
        return (ids, isCompletes);
    }

    function addTodo(string memory _taskName) public {
        Todo memory todo = Todo(_taskName, false, true);
        uint todoId = todos.push(todo) - 1;

        emit OnTodoAdded(todoId);
    }

    function deleteTodo(uint _todoId) public isValidTodo(_todoId) {
        todos[_todoId].isValid = false;

        emit OnTodoDeleted(_todoId);
    }

    function completeTodo(uint _todoId) public isValidTodo(_todoId) {
        todos[_todoId].isComplete = true;

        emit OnTodoCompleted(_todoId);
    }

    function undoneTodo(uint _todoId) public isValidTodo(_todoId) {
        todos[_todoId].isComplete = false;

        emit OnTodoUndone(_todoId);
    }

    // Private methods
    function _getValidTodos() private view returns(uint[] memory valids, uint length) {
        uint[] memory validTodos = new uint[](todos.length);
        uint count = 0;
        for (uint i = 0; i < todos.length; i++) {
            if (isTodoValid(i)) {
                validTodos[count] = i;
                count++;
            }
        }
        return(validTodos, count);
    }
}