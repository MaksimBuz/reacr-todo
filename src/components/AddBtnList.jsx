import { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';

import List from './List';
import Badge from "./Badge";
import closeBtn from '../img/form_close.svg'

const AddBtnList = (props) => {
   
    const [visibleForm,setVisibleForm]=useState(false);
    const [selectedColor,setSelectedColor]=useState(3);
    const [inputValuse,setInputValuse]=useState('');
    const [isLoading,setIsLoading]=useState(false);

useEffect(()=>{
    if (Array.isArray(props.colorsItem)) {
       setSelectedColor(props.colorsItem[0].id) 
    }

},[props.colorsItem]);

    const onCloseForm =()=>{
        setVisibleForm(false)
        setSelectedColor(props.colorsItem[0].id)
        setInputValuse('')
    }

    const addList=()=>{
        if (!inputValuse) {
            alert('Введите название папки');
            return
            
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/lists',{ name: inputValuse, colorId: selectedColor}).then(({data})=>{ 
            const color = props.colorsItem.filter(c=>c.id===selectedColor)[0].name;
            const ListObj={...data , color:{name: color }};
            console.log(ListObj)
            props.onAddList(ListObj)
            onCloseForm()
        }).finally(()=> setIsLoading(false))

    };

    return (
        <div className="List__add">
        <List onClickForm={()=>setVisibleForm(true)} 
        items={[
            { 
            className:'List__add-btn',
             icon:<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokelinecap="round" strokeLinejoin="round"/>
             <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokelinecap="round" strokeLinejoin="round"/>
             </svg>,
             name:'Добавить папку',
            }
           ]
           }
           />

    {   visibleForm ? <div className="add__list-form">
            <img src={closeBtn} alt="" className="add__list-form-close-btn" onClick={onCloseForm}/>
            <input value={inputValuse} type="text" placeholder="Название папки" className="field" onChange={(event)=>setInputValuse(event.target.value)}/>
            <img src="../img/form_close.svg" alt="" srcset="" />
           
            <div className="add__list__form-colors">
                <ul>
                    <li>{props.colorsItem.map((color)=>
                        <Badge key={color.id} color={color.name} onClick={()=>setSelectedColor(color.id)} className={selectedColor==color.id ? 'active':null}/>
                    )
                    }
                    </li>
                </ul> 
                <button className="button" onClick={addList}>{isLoading ? 'Добавление' : 'Добавить'}</button>
            </div>
            
           </div>:null}
        </div>
    );
}

export default AddBtnList;