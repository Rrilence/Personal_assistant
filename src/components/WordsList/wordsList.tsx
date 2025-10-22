import styles from './styles.module.css'
import type { Dictionary } from "../../helpers/types"
import ReactPaginate from 'react-paginate'
import { useState } from 'react'

interface wordList {
    dictionary:  Dictionary[]
}

const  WordsList = ({dictionary}: wordList) => {

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 14;
    const currentWords = dictionary.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(dictionary.length / 14);

    const handlePageClick = (event: {selected: number}) => {
    const newOffset = (event.selected * 14) % dictionary.length;
    setItemOffset(newOffset);
  };


    return <>
                <div className={styles.wordList}>
                    {currentWords.map((item) => (
                        <div 
                        className={styles.wordItem}
                        key={item.id}>
                            <p><b>{item.original}: </b></p> 
                            <p className={styles.value}>{item.translate}</p>
                        </div>
                    ))
                    }
                </div>
                {dictionary.length > 14 && 
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
                }
    </>  
}

export default WordsList