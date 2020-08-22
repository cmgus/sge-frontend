import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import AlertDismissible from '../components/AlertDismissable';
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch('https://localhost:8000/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const response = await res.json()
        if (response.code === 'SESSION_STARTED') {
            localStorage.setItem('usuario', JSON.stringify(response.data))
            localStorage.setItem('email', email)
        }
        setCode(response.code)
        setShowMessage(true)
    }
    const handleClose = () => {
        setShowMessage(false)
    }
   
    return (
        <div className="bg-primary bg-gradient d-flex flex-column justify-content-center align-items-center min-vh-100">
            {
                code === 'USER_NOT_FOUND' && showMessage &&
                <AlertDismissible
                    close={handleClose}
                    variant="warning"
                    boldMessage="El e-mail ingresado no está registrado"
                    message=". Intente nuevamente." />
            }
            {
                code === 'INVALID_CREDENTIALS' && showMessage &&
                <AlertDismissible
                    close={handleClose}
                    variant="warning"
                    boldMessage="La contraseña ingresada es incorrecta"
                    message=". Intente nuevamente." />
            }
            {
                code === 'SESSION_STARTED' && <Redirect from="/login" to="/dashboard" />
            }
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-center">
                        <small><b>Inciar de Sesión</b></small>
                    </h3>
                    <label htmlFor="email" className="mb-1"><small>E-mail</small></label>
                    <input
                        className="form-control mb-3 bg-light"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="text"
                        name="email"
                        id="email" />
                    <label htmlFor="password" className="mb-1"><small>Contraseña</small></label>
                    <input
                        className="form-control mb-3 bg-light"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password" />
                    <input className="btn btn-block btn-dark" type="submit" value="Ingresar" />
                </form>
            </div>
        </div>
    )
}

export default Login