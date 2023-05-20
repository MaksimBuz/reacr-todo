import redactor from '../img/redactor.svg'
import axios from 'axios';

import AddTaskForm from './AddTaskForm';
const List = (props) => {
    const aditTitle = () => {
        const newTitle = window.prompt('Новое название папки', props.list.name);
        if (newTitle) {
            props.onAdditTitle(props.list.id, newTitle);
            axios.patch('http://localhost:3001/lists/' + props.list.id, { name: newTitle }).catch(() => alert('Не удалось поменять название папки'))
        }
    }
    return (
        <div className="tasks">
            <div className='tasks-title-container'>
                {props.list.tasks.length == 0 ? <h2>Задачи отсутствуют</h2> : <h2 className='tasks-title'> {props.list.name}</h2>}
                <img src={redactor} alt="" onClick={() => aditTitle()} />
            </div>
            <div className='tasks__items'>
                {props.list.tasks.map(item =>
                    <div className='tasks__items-row' key={item.id}>
                        <div className='checkbox'>
                            <input type="checkbox" name="" id={`tasks-${item.id}`} />
                            <label htmlFor={`tasks-${item.id}`}> <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </label>
                        </div>
                        <input value={item.text}></input>
                    </div>
                )}
            </div>
            <AddTaskForm list={props.list} onAddTask={props.onAddTask}/>
        </div>
    );
}

export default List;