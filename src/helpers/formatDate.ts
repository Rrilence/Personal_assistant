
export const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long'
    }
    return date.toLocaleDateString('ru-RU', options)
}
