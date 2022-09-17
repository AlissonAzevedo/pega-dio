const formatDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const newMonth = month < 10 ? '0'+month : month
    const day = dateObj.getDate();
    const newDay = day < 10 ? '0'+day : day
    const hours = dateObj.getHours();
    const newHours = hours < 10 ? '0'+hours : hours
    const minutes = dateObj.getMinutes();
    const newMinutes = minutes < 10 ? '0'+minutes : minutes
    return `${newDay}/${newMonth}/${year} ${newHours}:${newMinutes}h`;
}

export default formatDate