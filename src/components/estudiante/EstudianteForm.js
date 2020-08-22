import React, { useState, useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import Api from '../../helpers/Api'

const EstudianteForm = ({ submit }) => {
    const [estudianteData, setEstudianteData] = useState({})
    const [personaData, setPersonaData] = useState({ rol: { id: 4 } })
    const [docentes, setDocentes] = useState([])
    const handleEstudianteChange = e => {
        const target = e.target
        setEstudianteData({
            ...estudianteData,
            [target.name]: target.value
        })
    }
    const handlePersonaChange = e => {
        const target = e.target
        setPersonaData({
            ...personaData,
            [target.name]: target.value
        })
    }
    useEffect(() => {
        async function init() {
            const docentes = await Api.list('docente')
            setDocentes(docentes.data)
        }
        init()
    }, [])
    return (
        <Form className="p-3 shadow" onSubmit={e => submit(e, { persona: personaData, ...estudianteData })}>
            <Form.Row>
                <Col md={8}>
                    <Form.Group controlId="nombres">
                        <Form.Label><small>Nombres</small></Form.Label>
                        <Form.Control name="nombres" onChange={handlePersonaChange} size="sm" className="bg-light" type="text" />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="dni">
                        <Form.Label><small>Dni</small></Form.Label>
                        <Form.Control name="dni" onChange={handlePersonaChange} size="sm" className="bg-light" type="text" />
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col sm={8}>
                    <Form.Group controlId="apellidos">
                        <Form.Label><small>Apellidos</small></Form.Label>
                        <Form.Control name="apellidos" onChange={handlePersonaChange} size="sm" className="bg-light" type="text" />
                    </Form.Group>
                </Col>
                <Col sm={4} className="pt-4 px-3">
                    <Form.Group controlId="genero">
                        <small>
                            <Form.Check custom type="radio" value="H" onChange={handlePersonaChange} name="genero" label="Hombre" id="h" />
                            <Form.Check custom type="radio" value="M" onChange={handlePersonaChange} name="genero" label="Mujer" id="m" />
                        </small>
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row >
                <Col sm={7}>
                    <Form.Group controlId="direccion">
                        <Form.Label><small>Direccion</small></Form.Label>
                        <Form.Control name="direccion" onChange={handlePersonaChange} size="sm" className="bg-light" as="textarea" />
                    </Form.Group>
                </Col>
                <Col sm={5}>
                    <Form.Group controlId="nacimiento">
                        <Form.Label><small>Nacimiento</small></Form.Label>
                        <Form.Control name="nacimiento" onChange={handlePersonaChange} size="sm" className="bg-light" type="date" />
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col sm={6}>
                    <Form.Group controlId="docente">
                        <Form.Label><small>Docente</small></Form.Label>
                        <Form.Control name="docente" onChange={handleEstudianteChange} size="sm" as="select" custom>
                            <option value="0">Elegir un docente</option>
                            {docentes.map(docente => (
                                <option key={`sel${docente.id}`} value={`${docente.id}`}>
                                    {`${docente.persona.nombres} - ${docente.persona.dni}`}
                                </option>))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group controlId="codigo">
                        <Form.Label><small>Codigo del Estudiante</small></Form.Label>
                        <Form.Control name="codigo" onChange={handleEstudianteChange} className="bg-light" size="sm" type="text" />
                    </Form.Group>
                </Col>
            </Form.Row>
            <Button variant="dark" size="sm" block type="submit">Registrar</Button>
        </Form>
    )
}

export default EstudianteForm