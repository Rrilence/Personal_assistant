 import { ExpensesContext } from '../../helpers/context'
 import {  useEffect, useState, Suspense, useContext} from 'react'
 import {useForm, type SubmitHandler} from 'react-hook-form'
 import styles from './styles.module.css'
 import Modal from '../../components/Modal/Modal'
 
 import { type Info} from '../../helpers/types'

 import { ExpensesList } from '../../components/ExpensesList/ExpensesList'
 
 import rent from '../../assets/rent.png'
 import cloth from '../../assets/cloth.png'
 import pizza from '../../assets/pizza.png'
 import bus from '../../assets/bus.jpg'
 import film from '../../assets/film.png'
 
const ExpensesPage = () => {
    const defaultExpenses = localStorage.getItem('expenses');
    const initialState: Info[] = defaultExpenses ? JSON.parse(defaultExpenses) : [];
  
    const [text, setText] = useState('');
    const [expensesState, setExpenseState] = useState<Info[]>(initialState);
    const [modalIsOPen, setModalIsOpen] = useState(false);
    const [editExpenseId, setEditExpenseId] = useState<string | null>(null)

    const defaultDate = new Date().toISOString().substring(0,10);

    const {rentCost, eatCost, transportCost, clothCost, entertainmentCost, dispatch} = useContext(ExpensesContext)

    const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = useForm<Info>({
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
            alert("Статья расходов добавлена")
            dispatch({
                type: data.category,
                payload: {
                    cost: Number(data.cost)
                }
            })
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
    
    const openModal = () => {
        if(text.length === 0 && !watch('name')) {
            alert('Введите название статьи расходов')
        } else {
            setModalIsOpen(true)
        }
    }
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
            alert('Введите название на русском языке')
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
            const updateExpenses = expensesState.map(expense => expense.id === editExpenseId ? {...expense, ...updateExpense} : expense)

            setExpenseState(updateExpenses)
            closeModal();
        }
    }

    const deleteExpense = (id: string) => {
        const updateExpenses = expensesState.filter(expense => expense.id !== id)
        setExpenseState(updateExpenses)
    }

    useEffect(() => {
        try {
            localStorage.setItem('expenses', JSON.stringify(expensesState))          
        } catch (error) {
            console.error('ошибка загрузки данных из LocalStorage', error);
        }}, [expensesState])

    const totalCost = String(rentCost + eatCost + transportCost + clothCost + entertainmentCost).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        
    return (
        <div className='container'>
            <h1>Расходы</h1>
            <form 
            className="form" 
            autoComplete="off" 
            action={openModal}
            >
                <label htmlFor="name">Название:</label>
                <input 
                    type="text"
                    className="input"
                    value={text}
                    onChange={handleInput}
                    form='formModal'
                 />
                    <button className="button" onClick={openModal}>Добавить</button>
            </form>
            <div className={styles.category}>
                <img className={styles.icon} src={rent} alt="rent" />
                <p>Услуги ЖКХ:</p>
                <span>{String(rentCost).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.</span>
            </div>
            <div className={styles.category}>
                <img className={styles.icon} src={pizza} alt="pizza" />
                <p>Еда:</p>
                <span>{String(eatCost).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.</span>
            </div>
            <div className={styles.category}>
                <img className={styles.icon} src={bus} alt="transport" />
                <p>Транспорт:</p>
                <span>{String(transportCost).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.</span>
            </div>
            <div className={styles.category}>
                <img className={styles.icon} src={cloth} alt="cloth" />
                <p>Одежда:</p>
                <span>{String(clothCost).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.</span>
            </div>
            <div className={styles.category} style={{paddingBottom: '20px'}}>
                <img className={styles.icon} src={film} alt="entertainments" />
                <p>Развлечения:</p>
                <span>{String(entertainmentCost).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.</span>
            </div>
            <Suspense fallback={<div>Загрузка...</div>}>
                <ExpensesList expenses={expensesState} handleEditExpense ={handleEditExpense} deleteExpense={deleteExpense}/>
            </Suspense>
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
                autoComplete="off">
                    <input 
                    type='text'
                    className={styles.nameModal}
                    {...register('name', {required: true})}/>
                    <label htmlFor="category">Выберите категорию расходов:</label>
                    <select className="input" {...register('category')}>
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
                    {...register('data', {required: 'Введите дату'})} 
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