import TodoHeader from '../todoHeader/TodoHeader';
import TodoList from '../todoList/TodoList';
import TodoFilter from '../todoFilter/TodoFilter';
import TodoAddForm from '../todoAddForm/TodoAddForm';

import './App.css';

function App() {
 return (
    <>
        <TodoHeader/>
        <main className="app">
            <div className="content">
                <div className="to-do-tags">
                    <TodoList />
                    <TodoFilter/>
                </div>
                <TodoAddForm/>
            </div>
        </main>
    </>
 )
}

export default App;
