const baseUrl = ""

const fetchWord = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({wordToFind: 'abaisser', answer: 'to lower', rand: Math.random()})
        }, 1000);
    })
}

export { fetchWord }