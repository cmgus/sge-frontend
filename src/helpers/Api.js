
const Api = {
    url: 'https://localhost:8000/api/',
    async create(uri, data) {
        /* console.log('Api: ', data) */
        try {
            const userData = JSON.parse(localStorage.getItem('usuario'))
            const res = await fetch(`${this.url}${uri}?token=${userData.usuario.token}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status === 500) {
                console.log(await res.text())
                return {}
            }
            const response = await res.json()
            return response
        } catch (error) {
            console.error(error)
            return null
        }
    },
    async list(uri) {
        const userData = JSON.parse(localStorage.getItem('usuario'))
        /* console.log(userData.usuario.token) */
        const res = await fetch(`${this.url}${uri}?token=${userData.usuario.token}`)
        //console.log(await res.text())
        if (res.status === 500) {
            console.log(await res.text())
        }
        const response = await res.json()
        return response
    },
    async update(uri, data, id) {
        const userData = JSON.parse(localStorage.getItem('usuario'))
        console.log('to update: ', data)
        const res = await fetch(`${this.url}${uri}/${id}?token=${userData.usuario.token}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 500) {
            console.log(await res.text())
            return {}
        }
        const response = await res.json()
        return response
    },
    async destroy(uri, id) {
        const userData = JSON.parse(localStorage.getItem('usuario'))
        const res = await fetch(`${this.url}${uri}/${id}?token=${userData.usuario.token}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await res.text()
        return response
    }
}

export default Api