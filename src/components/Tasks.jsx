import redactor from '../img/redactor.svg'
import check from '../img/check.svg'
const List = (props) => {
    return (
        <div className="tasks">
            <h2 className='tasks-title'> Фронтенд</h2>
            <img src={redactor} alt="" />

            <div className='tasks__items'>
                <div className='tasks__items-row'>
                    <div className='checkbox'>
                        <input type="checkbox" name="" id="check" />
                        <label htmlFor='check' > <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        </label>

                    </div>
                    <input value={'Изучить JavaScript'}></input>
                </div>

            </div>
        </div>

    );
}

export default List;