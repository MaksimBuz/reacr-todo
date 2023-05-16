import classNames from 'classnames';
import closeBtn from '../img/form_close.svg'
import Badge from "./Badge";


const List = (props) => {
    return (
        <ul className="todo__list" onClick={props.onClickForm} >
            {
            props.items.map((listItem ,index)=>   
            // console.log( props.items )
                <li key={index} className={classNames(listItem.className, {active: listItem.active})}>
                    <Badge color={listItem.color}/>
                    <span>{listItem.name}</span>
                    <img onClick={()=>props.onRemove(listItem)} src={  props.isRemovable ? closeBtn : null } className='listRemoveIcon' alt=""/>
                    
                </li>
                )
            }
        </ul>
    );
}

export default List;