import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

// initializing form
const Form = (props) => (
    <form onSubmit={props.onSubmit}>
        <input type="text" autoFocus placeholder="Enter Todo..."
            value={props.value}
            onChange={props.onChange}
        />
    </form>
)

// initializing list
const List = (props) => (
    <ul>
        {props.todos.map((item) =>
            <li className="todo" key={item.id} onClick={() => props.onClick(item.id)}>
                {item.text}
                {/* <button>Delete</button> */}
            </li>
            )}
    </ul>
)

// initializing main app
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            todos: []
        }
        this.onChange = this.onChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.filterTodo = this.filterTodo.bind(this);
        this.toggleTodo =this.toggleTodo.bind(this);
    }

    //getting text input value
    onChange = (e) => {
        this.setState({term: e.target.value})
    }
    
    // adding todo
    addTodo = (e) => {
        e.preventDefault();

        const newTodos = this.state.todos.slice();
        newTodos.push({
            text: this.state.term,
            id: Date.now(),
            completed: false,
            isStrike: null
        })
        this.setState({
            term: '',
            todos: newTodos},
            () => console.log(this.state.todos)
        )
    }

    // filtering todo
    filterTodo = (id) => {
        const filteredTodos = this.state.todos.filter((item) => item.id !== id);
        this.setState({todos: filteredTodos});
    }

    toggleTodo = (item) => {
        item.completed = !item.completed
    }

    // rendering view
    render() {
        return (
            <div>
                <Form
                    value={this.state.term}
                    onChange={this.onChange}
                    onSubmit={this.addTodo}
                />
                <List
                    todos={this.state.todos}
                    onClick={this.filterTodo} 
                    />
            </div>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));

registerServiceWorker();
