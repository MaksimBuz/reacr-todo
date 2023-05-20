import { useEffect, useState  } from 'react';
import axios from 'axios';

const AddTaskForm = (props) => {

    const [TogleVisibleForm,setTogleVisibleForm]=useState(false);
    const [inputValue,setInputValue]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const addTask=()=>{ 
         const objTask={
            "listId": props.list.id,
            "text": inputValue,
            "completed": false,
            }
        setIsLoading(true)
        axios.post('http://localhost:3001/tasks' ,objTask )
        .then(({ data })=>{  
       
            setTogleVisibleForm(!TogleVisibleForm);
            props.onAddTask(props.list.id,objTask);
        }).finally(()=>setIsLoading(false)) 
    }

    const onAddList=()=>{
       setTogleVisibleForm(!TogleVisibleForm);
       setInputValue('')
      }
      
    return (
        <div className='tasks_form' >
        {!TogleVisibleForm?   
            <div className='tasks_form_new' onClick={onAddList}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1V11" stroke="#868686" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M1 6H11" stroke="#868686" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>Новая задача</span>
            </div>:
            <div className='tasks_form-block'>
                <input  type="text" placeholder="Текст задачи" className="field"  value={inputValue}  onChange={(event)=>setInputValue(event.target.value)}/>
                <button className="button" onClick={addTask}>{isLoading?"Идет закгрузка" : 'Добавить задачу'}</button>
                <button className="button button-grey" onClick={onAddList} >Отмена</button>
            </div>
             }        
        </div>
    );
}

export default AddTaskForm;