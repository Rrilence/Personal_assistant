 import {  useEffect, useState} from 'react'
 import {useForm, type SubmitHandler} from 'react-hook-form'
 import { useDispatch} from 'react-redux'
 import { ToastContainer } from 'react-toastify'
 import styles from './styles.module.css'

 import Modal from '../../components/Modal/Modal'
 import { ExpensesList } from '../../components/ExpensesList/ExpensesList'
 import { addCost, removeCost } from '../../features/Category/category-slice'
 import { useCategory } from '../../hooks/use-category'
 
 import { formattingCost} from '../../helpers/formatting'
 import { type Info} from '../../helpers/types'
 import { notify, notifyName } from '../../helpers/toasts'
 
 import rent from '../../assets/rent.png'
 import cloth from '../../assets/cloth.png'
 import pizza from '../../assets/pizza.png'
 import bus from '../../assets/bus.jpg'
 import film from '../../assets/film.png'


const ExpensesPage = () => {
    const initialState = () => {
        const defaultExpenses = localStorage.getItem('expenses');
            if (defaultExpenses) { try {
                const parseExpenses: Info [] = JSON.parse(defaultExpenses)
                    if(Array.isArray(parseExpenses) && parseExpenses.length > 0) {
                        return parseExpenses
                    } else {
                        return []
                    }
            } catch (error) {
                console.error("Ошибка при парсинге данных из localStorage:", error);
                return [];
            }
        } else {
            console.log("LocalStorage expenses is null or undefined");
            return [] 
        }
    }
    
    const [text, setText] = useState('');
    const [expensesState, setExpenseState] = useState<Info[]>(initialState());
    const [modalIsOPen, setModalIsOpen] = useState(false);
    const [editExpenseId, setEditExpenseId] = useState<string | null>(null)

    const defaultDate = new Date().toISOString().substring(0,10);

    const dispatch = useDispatch();
    const [rentCost, eatCost, transportCost, clothCost, entertainmentCost] = useCategory();

    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<Info>({
        defaultValues: {
            data: defaultDate
        }
    });

    const submit: SubmitHandler<Info> = (data) => {
        if(editExpenseId) {
            updateExpense(data)
        } else {
            data.name = text;
            data.id = crypto.randomUUID();
            setExpenseState([...expensesState, data])
            notify();
            dispatch(
                addCost ({
                category: data.category,
                cost: Number(data.cost)
            })
            )
        }
        reset();
        closeModal();
    }

     const isCost = (data: string): true | string => {
        const num = Number(data);
        if(data.trim().length === 0) {
            return 'Введите стоимость'
        }  if (Number.isNaN(num) || num <= 0) {
            return 'Стоимость должна быть положительным числом'
        }
        return true
    }

     const isDate = (data: string): true | string => { 
        if (data.length > 10) {
        return 'Неверный формат даты. Используйте ДД.ММ.ГГГГ';
        }
        return true;
     }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        openModal()
    }
    
    const openModal = () => setModalIsOpen(true);
    
    const closeModal = () => {
        setModalIsOpen(false)
        setEditExpenseId(null)
        setText('')
        reset();
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let name = event.target.value;
        const validation: RegExp = /^[А-Яа-яё\s]/ui;
        if (validation.test(name.trim())) {
           name = name[0].toUpperCase() + name.slice(1)
                setText(name)
                setValue('name', name)
            }
        else {
            setText('')
            notifyName();
        }
    }

    const handleEditExpense = (id: string) => {
        setEditExpenseId(id);
        const expenseEdit = expensesState.find(expense => expense.id === id)
        if(expenseEdit) {
            setEditExpenseId(id);
            setValue('name', expenseEdit.name);
            setValue('category', expenseEdit.category);
            setValue('cost', expenseEdit.cost);
            setValue('data', expenseEdit.data);
            openModal();
        }
    }

    const updateExpense = (updateExpense: Info) => {
        if(editExpenseId) {
            const oldExpense = expensesState.find(expense => expense.id === editExpenseId)
             if (!oldExpense) return;
            const updateExpenses = expensesState.map(expense => expense.id === editExpenseId ? {...expense, ...updateExpense} : expense)

            setExpenseState(updateExpenses)
            dispatch(
                addCost ({
                category: updateExpense.category,
                cost: Number(updateExpense.cost)
            })
            )
            dispatch(
                removeCost ({
                category: oldExpense.category,
                cost: Number(oldExpense.cost)
            })
            )
            closeModal();
        }
    }

    const deleteExpense = (id: string) => {
        const updateExpenses = expensesState.filter(expense => expense.id !== id)
        setExpenseState(updateExpenses);
        const deleteExpense = expensesState.find(expense => expense.id === id)
        if(deleteExpense) 
        dispatch(
                removeCost ({
                category: deleteExpense.category,
                cost: Number(deleteExpense.cost)
            })
            )
    }

    useEffect(() => {
        try {
            localStorage.setItem('expenses', JSON.stringify(expensesState))          
        } catch (error) {
            console.error('ошибка загрузки данных из LocalStorage', error);
        }}, [expensesState])

    const totalCost = formattingCost(rentCost + eatCost + transportCost + clothCost + entertainmentCost)
        
    return (
        <div className='container'>
            <ToastContainer/>
            <h1>Расходы</h1>
            <form 
            className={styles.form} 
            autoComplete="off" 
            onSubmit={handleFormSubmit}
            >
                <label htmlFor="name">Название:</label>
                <input 
                    type="text"
                    className="input"
                    value={text}
                    onChange={handleInput}
                    id='name'
                 />
                    <button type='submit' className="button" disabled={!text}>Добавить</button>
            </form>
            <div className={styles.category}>
                <img className={styles.icon} src={rent} alt="rent" />
                <p>Услуги ЖКХ:</p>
                <span>{formattingCost(rentCost)} руб.</span>
            </div>
            <div className={styles.category}>
                <img className={styles.icon} src={pizza} alt="pizza" />
                <p>Еда:</p>
                <span>{formattingCost(eatCost)} руб.</span>
            </div>
            <div className={styles.category}>
                <img className={styles.icon} src={bus} alt="transport" />
                <p>Транспорт:</p>
                <span>{formattingCost(transportCost)} руб.</span>
            </div>
            <div className={styles.category}>
                <img className={styles.icon} src={cloth} alt="cloth" />
                <p>Одежда:</p>
                <span>{formattingCost(clothCost)} руб.</span>
            </div>
            <div className={styles.category} style={{paddingBottom: '20px'}}>
                <img className={styles.icon} src={film} alt="entertainments" />
                <p>Развлечения:</p>
                <span>{formattingCost(entertainmentCost)} руб.</span>
            </div>
                <ExpensesList expenses={expensesState} handleEditExpense ={handleEditExpense} deleteExpense={deleteExpense}/>
            <div className={styles.total}>
                <p>Итого:</p>
                <span>&nbsp;{totalCost} руб.</span>
            </div>
            <Modal
            isOpen = {modalIsOPen}
            onClose = {closeModal}>
                <form 
                className={styles.formModal} 
                onSubmit={handleSubmit(submit)}
                autoComplete="off"
                >
                    <input 
                    type='text'
                    className={styles.nameModal}
                    {...register('name', {required: true})}/>
                    <label htmlFor="category">Выберите категорию расходов:</label>
                    <select id='category' className="input" {...register('category')}>
                        <option value="Услуги ЖКХ">Услуги ЖКХ</option>
                        <option value="Еда">Еда</option>
                        <option value="Транспорт">Транспорт</option>
                        <option value="Одежда">Одежда</option>
                        <option value="Развлечения">Развлечения</option>
                    </select>
                    <input
                    type="number"
                    className="input"
                    step=".01"
                    min="0"
                    placeholder='000.00'
                    {...register('cost', {required: 'Введите стоимость', validate: isCost})}
                    />
                    <input 
                    type="date"
                    className="input"
                    {...register('data', {required: 'Введите дату', validate: isDate})} 
                    />
                    {errors.cost && <p style={{ color: 'red' }}>{errors.cost.message}</p>}
                    {errors.data && <p style={{ color: 'red' }}>{errors.data.message}</p>}
                    <button className='button'
                    >Добавить</button>
                </form>
            </Modal>
        </div>
    )
 }

 export default ExpensesPage