const baseUrl = "https://translate-game-api.herokuapp.com"

const fetchWord = () => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/word`)
        .then((res) => {
            console.log(res)
            res.json().then((data) => {
                resolve({ wordToFind: data.word, answer: data.translation })
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