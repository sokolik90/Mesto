export default class Api {
    constructor(url, myId) {
        this.myId = myId.headers;
        this.url = url;
    }

    getTasks() {
        return fetch(this.url, {
            headers: this.myId
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err)
        })
        
        }

    createTask(gettingName, gettingAbout) {
        fetch(this.url, {
            method: 'PATCH',
            headers: {
                authorization: 'baeab0e2-f3de-4ee4-92e5-286a09106ee3',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: gettingName,
                about: gettingAbout
            })
            
        })
    }

    deleteTask() {

    }
}