import styles from './styles.module.css'
import type { Dictionary } from "../../helpers/types"
import ReactPaginate from 'react-paginate'
import { useState } from 'react'

interface wordList {
    dictionary:  Dictionary
}

const  WordsList = ({dictionary}: wordList) => {

    const dictionaryItem = Object.entries(dictionary);
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 20;
    const currentWords = dictionaryItem.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(dictionaryItem.length / 20);

    const handlePageClick = (event: {selected: number}) => {
    const newOffset = (event.selected * 10) % dictionaryItem.length;
    setItemOffset(newOffset);
  };


    return ( <>
                <div className={styles.wordList}>
                {currentWords.map(([key, value]) => (
                    <div 
                    className={styles.wordItem}
                    key={key}>
                        <p><b>{key}: </b></p> 
                        <p className={styles.value}>{value}</p>
                    </div>
                ))
                }
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName='containerClassName'
                />
    </>)  
}

export default WordsList