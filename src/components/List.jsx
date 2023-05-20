import closeBtn from '../img/removeIcon.svg'
import Badge from "./Badge";

import classNames from 'classnames';
import axios from 'axios';

const List = (props) => {
    const removeList=(item)=>{
        axios.delete('http://localhost:3001/lists/'+item.id ).then(()=> props.onRemove(item))

    }
    
    return (
        <ul className="todo__list" onClick={props.onClickForm} >
           { props.items.map((listItem ,index)=>   
                <li onClick={props.onClickItem ? ()=>props.onClickItem(listItem): null} key={index} className={classNames(listItem.className, {active:props.activeItem && props.activeItem.id===listItem.id})}>
                    {listItem.icon?  listItem.icon:null }
                    {listItem.color ?   <Badge color={listItem.color.name}/>:null }
                    <span >{listItem.name}{listItem.tasks && listItem.tasks.length>0 && `(${listItem.tasks.length}) `}</span>
                    <img onClick={()=>removeList(listItem)} src={  props.isRemovable ? closeBtn : null } className='listRemoveIcon' alt=""/>
                </li> )
            
            }
        </ul>
    );
}

export default List;