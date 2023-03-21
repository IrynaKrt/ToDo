import TodoHeader from '../todoHeader/TodoHeader';
import TodoList from '../todoList/TodoList';
import TodoFilter from '../todoFilter/TodoFilter';
import TodoAddForm from '../todoAddForm/TodoAddForm';
import TodoFooter from '../todoFooter/TodoFooter';

import './App.css';

function App() {
 return (
    <>
        <TodoHeader/>
        <main className="app">
            <div className="content">
            <TodoList />
                <div className="to-do-tags">
                    <TodoAddForm/>
                    <TodoFilter />
                </div>
            </div>
        </main>
        <TodoFooter/>
    </>
 )
}

export default App;
