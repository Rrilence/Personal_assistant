const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long'
    }
    return date.toLocaleDateString('ru-RU', options)
}

const formattingCost = (cost: number) => {
    const formatCost = String(cost).replace(/\B(?=(\d{3})+(?!\d))/g, " ")

    return formatCost;
}

const validateDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 10) {
            event.target.value = event.target.value.slice(0, 10)
        }
    };

export {formatDate, formattingCost, validateDate}




