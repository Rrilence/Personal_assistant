import styles from './styles.module.css'

interface IModal {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
}

const Modal = ({isOpen, onClose, children}: IModal) => {
    const onWrapperClick = (event: React.MouseEvent<HTMLElement>) => {
        if ((event.target as HTMLElement).classList.contains(styles.modalWrapper)) onClose();
    }
    return (
        <> 
            { isOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalWrapper} onClick={onWrapperClick}>
                        <div className={styles.modalContent}>
                            <button className={styles.modalCloseButton} onClick={onClose}>
                                <i className='fa fa-times' aria-hidden='true'></i>
                            </button>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal