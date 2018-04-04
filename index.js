import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// initializing todo
class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: false
        }
        this.toggleTodo = this.toggleTodo.bind(this);
    }

    toggleTodo = () => {
        this.setState(prevState => ({
            completed: !prevState.completed
        }))
    }

    render() {
        return (
            <ul>
                <li className="todo" 
                    onClick={() => this.toggleTodo()}>
                    <span className="btn-completed" style={{color: this.state.completed ? '#99cc99' : '#fafafa'}}>{'\u{2714}'}</span>
                    <span style={{textDecoration: this.state.completed ? 'line-through' : 'none'}}>{this.props.text}</span>
                    <span className="btn-delete" onClick={() => this.props.onClick(this.props.id)} >{'\u{2716}'}</span>
                </li>
            </ul> 
        )
    }
}

// initializing list of todos
const List = (props) => (
    <div>
        {props.todos.map(todo => <Todo key={todo.id} onClick={props.onClick} {...todo}/>)}
    </div>
)

// initializing form
const Form = (props) => (
    <form onSubmit={props.onSubmit}>
        <input type="text" autoFocus required placeholder="Enter Todo..."
            value={props.value}
            onChange={props.onChange}
        />
    </form>
)

// initializing main app
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            todos: []
        }
        this.onChange = this.onChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.filterTodo = this.filterTodo.bind(this);
    }

    //getting text input value
    onChange = (e) => {
        this.setState({inputText: e.target.value})
    }
    
    // adding todo
    addTodo = (e) => {
        e.preventDefault();

        const newTodos = this.state.todos.concat([{text: this.state.inputText, id: Date.now()}])
        this.setState({inputText: '', todos: newTodos},
            () => console.log(this.state.todos)
        )
    }

    // filtering todo
    filterTodo = (id) => {
        const filteredTodos = this.state.todos.filter((item) => item.id !== id);
        this.setState({todos: filteredTodos});
    }

    // rendering view
    render() {
        return (
            <div>
                <Form
                    value={this.state.inputText}
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