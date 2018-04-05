import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// initializing todo
const Todo = (props) => (
    <ul>
        <li>
            <span
                className="btn-completed"
                style={{color: props.completed ? '#00A86B' : '#fafafa'}}>
                {'\u{2714}'}
            </span>
            <span 
                className="todo"
                style={{textDecoration: props.completed ? 'line-through' : 'none'}}
                onClick={() => props.toggleTodo()}>
                {props.text}
            </span>
            <span
                className="btn-delete"
                onClick={() => props.filter(props.id)} >
                {'\u{2716}'}
            </span>
        </li>
    </ul> 
)

const Banner = props => (
    <div className="banner">
        <span 
            className="btn-toggleAll"
            onClick={() => props.toggleAll()}>
            {'\u{25BD}'}
        </span>
        <span className="banner-status">
            <span>All</span>
            <span>Active</span>
            <span>Completed</span>
        </span>
    </div>
)

// initializing list of todos
const List = (props) => (
    <div>
        {props.todos.map((todo, i) => <Todo key={todo.id} filter={props.filter} toggleTodo={() => props.toggle(i)} {...todo}/>)}
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
        this.toggleAll = this.toggleAll.bind(this);
        this.toggleTodo = this.toggleTodo.bind(this);
    }

    //getting text input value
    onChange = (e) => {
        this.setState({inputText: e.target.value});
    }
    
    // adding todo
    addTodo = (e) => {
        e.preventDefault();

        const newTodos = this.state.todos.concat([{text: this.state.inputText, id: Date.now(), completed: false}]);
        this.setState({inputText: '', todos: newTodos});
    }

    // filtering todo
    filterTodo = (id) => {
        const filteredTodos = this.state.todos.filter((item) => item.id !== id);
        this.setState({todos: filteredTodos});
    }

    toggleAll = () => {
        const newTodos = this.state.todos;
        let totalCompleted = 0;

        newTodos.forEach(todo => {
            if (todo.completed) {
                totalCompleted++;
            }
        })

        newTodos.forEach(todo => {
            totalCompleted === this.state.todos.length ? todo.completed = false : todo.completed = true;
        })

        this.setState({todos: newTodos});
    }

    toggleTodo(i) {
        const newTodos = this.state.todos;
        newTodos[i].completed = !newTodos[i].completed;
        this.setState({todos: newTodos});
    }

    componentWillMount() {
        localStorage.getItem('todos') && this.setState({
            todos: JSON.parse(localStorage.getItem('todos'))
        })
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('todos', JSON.stringify(nextState.todos));
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
                <Banner toggleAll={this.toggleAll}/>
                <List
                    toggle={this.toggleTodo}
                    todos={this.state.todos}
                    filter={this.filterTodo} 
                />
            </div>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
registerServiceWorker();