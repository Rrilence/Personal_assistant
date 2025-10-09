import styles from './styles.module.css'
import { ExpenseItem } from "../ExpensesItem/ExpenseItem"
import type { Info } from "../../helpers/types";
import { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
interface ExpensesListProps { 
    expenses: Info[];
    handleEditExpense: (id: string) => void;
    deleteExpense: (id: string) => void;          
}

export const ExpensesList = ({expenses, handleEditExpense, deleteExpense}: ExpensesListProps) => {

const [category, setCategory] = useState('Все');
const [data, setDate] = useState<string | undefined>(undefined);
const [itemOffset, setItemOffset] = useState(0);

const filteredExpenses = useMemo(() => {
    return expenses.filter(item => {
  const categoryMatch = category === 'Все' || item.category === category;
  const dateMatch = !data || item.data === data;

  return categoryMatch && dateMatch;
})
}, [expenses, category, data])

const endOffset = itemOffset + 10;
const currentExpenses = filteredExpenses.slice(itemOffset, endOffset);
const pageCount = Math.ceil(expenses.length / 10);

const handlePageClick = (event: {selected: number}) => {
    const newOffset = (event.selected * 10) % filteredExpenses.length;
    setItemOffset(newOffset);
  };

const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
}
const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
}

    return (
        <>
        <div className={styles.filter}>
            <p>Фильтр:</p>
            <select 
            className='input' 
            style={{width: '130px'}} 
            value={category}
            onChange={handleCategory}>
                <option value="Все">Все категории</option>
                <option value="Услуги ЖКХ">Услуги ЖКХ</option>
                <option value="Еда">Еда</option>
                <option value="Транспорт">Транспорт</option>
                <option value="Одежда">Одежда</option>
                <option value="Развлечения">Развлечения</option>
            </select>
            <input 
            type="date" 
            className='input' 
            style={{width: '130px'}}
            value={data}
            onChange={handleDate} 
            />
        </div>
        <div className={styles.container}>
            <div className={styles.headers}>
                <div className={styles.title}>
                    <p>Название</p>    
                    <p className={styles.category}>Категория</p>    
                </div>
                <p className={styles.cost}>Стоимость, руб</p>
                <p className={styles.date}>Дата</p>
            </div>
            {currentExpenses.map(item => (
                <ExpenseItem key={item.id} {...item} handleEditExpense={handleEditExpense} deleteExpense={deleteExpense}/>
            )
            )}
        </div>
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName={styles.containerClassName}
        />
        </>
    )
}