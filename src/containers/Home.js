import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <div className="bg-primary bg-gradient d-flex justify-content-center align-items-center min-vh-100">
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <h2 className="font-weight-normal text-center">Bienvenido</h2>
                <Link className="btn btn-block btn-dark" to="/login">Iniciar Sesión</Link>
                {/* {% if app.session.get('email') %}
                <a class="btn btn-block btn-dark" href="/logout">Cerrar Sesión</a>
            {% else %}
                <a class="btn btn-block btn-dark" href="/login">Iniciar Sesión</a>
                <!-- <a class="btn btn-block btn-link" href="#">Recuperar contraseña</a> -->
            {% endif %} */}
            </div>
        </div>
    )
}

export default Home