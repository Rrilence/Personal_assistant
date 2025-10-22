import styles from './styles.module.css'
import { useState } from 'react';
import type { Info } from "../../helpers/types"
import clsx from 'clsx';

interface ExpenseItemInfo extends Info {
    handleEditExpense: (id: string) => void;
    deleteExpense: (id: string) => void;
}

export function ExpenseItem({name, category, cost, data, id, handleEditExpense, deleteExpense}: ExpenseItemInfo) {

     const [isOpenAddition, setIsOpenAddition] = useState(false);

    const formatDate = new Date(data).toLocaleDateString();

    const additionFunc: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        setIsOpenAddition(!isOpenAddition)
    }

    return <>
        <div className={clsx(styles.wrapper, {[styles.open]: isOpenAddition})} onClick={additionFunc}>
            <div className={styles.name}>
                <p className={styles.title}>{name}</p>
                <p className={clsx('category', styles.category)}>{category}</p>
            </div>
            <p className={styles.cost}>{cost.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
            <p className={styles.date}>{formatDate}</p>
        </div>
        {isOpenAddition && (
            <div className={styles.additionalFunction}>
                <button 
                className={styles.button}
                title='Редактировать' 
                onClick={() => handleEditExpense(id!)}
                ><i className='fa-duotone fa-solid fa-pen-to-square' style={{color: '#2b044b'}}></i></button>
                <button 
                className={styles.button}
                title='Удалить'
                onClick={() => deleteExpense(id!)}
                ><i className='fa-solid fa-trash' style={{color: '#2b044b'}}></i></button>
            </div>
        )
        }
    </>
}