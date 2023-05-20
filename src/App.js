import { useEffect, useState  } from 'react';
import './App.scss';
import axios from 'axios';

import List from './components/List';
import Tasks from './components/Tasks';
import AddBtnList from './components/AddBtnList';

function App() {

  const [Lists,setLists]=useState(null);
  const [Colors,setColors]=useState(null);
  const [activeItem,setActiveItem]=useState(null);
useEffect(()=>{
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then((res)=>{setLists(res.data)});
    axios.get('http://localhost:3001/colors').then((res)=>{setColors(res.data)});
},[]);

  const onAddList=(obj)=>{
    const new_list = [...Lists, obj]
    setLists(new_list)

  }

  const onAddTask=(Listid,taskObj)=>{
    const new_list= Lists.map(item=>{
      if (item.id==Listid) {
        item.tasks = [...item.tasks, taskObj]

      }
      return item;
    })
    setLists(new_list)
  }

  const onAddListTitle=(id,title)=>{
    console.log(id,title);
    const new_list = Lists.map(item=>{
      if (item.id==id) {
        item.name=title;
      }
    return item })
    setLists(new_list)
  }

  return (
    <div className="todo">
      <div className="todo__sidebar">

{/* Список  папок */}
        {
        Lists ? ( <List
        activeItem={activeItem}
        items={ Lists}        
        onRemove={(id)=>{
          const newLists = Lists.filter(item=>item.id!==id)
          setLists(newLists)
      }}

      onClickItem={item=>
        setActiveItem(item)}
         isRemovable
        /> 
        ) : 'Загрузка'}

      {/*Добавление папки*/} 
        <AddBtnList colorsItem={Colors}  onAddList={onAddList} />
      </div>
      <div className="todo__tasks">
      { Lists && Lists.map(item=>{
 <Tasks list={activeItem} onAddTask={onAddTask} onAdditTitle={(id, titel)=>{onAddListTitle(id, titel)}}/> 

      })
        }  
       { Lists && activeItem && 
        <Tasks list={activeItem} onAddTask={onAddTask} onAdditTitle={(id, titel)=>{onAddListTitle(id, titel)}}/> 
        } 
        
      </div>
    </div>
  );
}

export default App;
