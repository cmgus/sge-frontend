import React, { useState } from 'react'
import {
    Redirect,
} from 'react-router-dom'
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'
import Usuario from './Usuario'
import Docente from './Docente'
import Estudiante from './Estudiante'

const Dashboard = () => {
    
    const email = localStorage.getItem('email') || ''
    const userData = JSON.parse(localStorage.getItem('usuario'))
    const [showPanel, setShowPanel] = useState(userData.recursos[0]['uri'])
    const [sessionFinished, setSessionFinished] = useState(false)
    const handleLogout = async e => {
        setSessionFinished(true)
    }
    const handleShowPanel = async e => {
        const uri = e.currentTarget.id
        setShowPanel(uri)
    }
    /* if (sessionFinished) {
        localStorage.clear()
        return <Redirect from="/dashboard" to="/login" />
    } */
    return (
        <>
            { sessionFinished && <Redirect from="/dashboard" to="/login" />}
            <Navbar collapseOnSelect className="mb-4" expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">SGE</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {
                            userData.recursos.map((recurso, i) => <Nav.Link onClick={handleShowPanel} id={recurso.uri} key={i} href={`#${recurso.uri}`}>{`${recurso.uri.charAt(0).toUpperCase()}${recurso.uri.slice(1)}`}</Nav.Link>)
                        }
                    </Nav>
                    <Nav>
                        <NavDropdown title={email} id="collasible-nav-dropdown">
                            <NavDropdown.Divider />
                            <Button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</Button>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container shadow-sm p-3 mb-5 bg-white rounded">
                {showPanel === 'usuario' && <Usuario />}
                {showPanel === 'docente' && <Docente />}
                {showPanel === 'estudiante' && <Estudiante />}
                {/* {showPanel === 'apoderado' && <Apoderado apoderados={props.data} />}
                {showPanel === 'estudiante' && <Estudiante estudiantes={props.data} />} */}
            </div>
        </>
    )
}

export default Dashboard
