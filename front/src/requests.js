const baseUrl = "https://translate-game-api.herokuapp.com"

const fetchWord = () => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/word`)
        .then((res) => {
            res.json().then((data) => {
                if (data.hasOwnProperty('error')) {
                    reject()
                }
                else {
                    resolve({ wordToFind: data.word, answer: data.translated })
                }
            })
            .catch((e) => {
                console.log(e)
                reject()
            })
        })
        .catch((e) => {
            console.log(e)
            reject()
        })
    })
}

export { fetchWord }