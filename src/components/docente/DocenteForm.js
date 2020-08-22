import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'

const DocenteForm = props => {
    const [docenteData, setDocenteData] = useState({})
    const [personaData, setPersonaData] = useState({ rol: { id: 2 } })
    const handleDocenteChange = e => {
        const target = e.target
        setDocenteData({
            ...docenteData,
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
    return (
        <Form className="p-3 shadow" onSubmit={e => props.submit(e, { persona: personaData, ...docenteData })}>
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
            <Form.Row >
                <Col sm={6}>
                    <Form.Group controlId="inicio">
                        <Form.Label><small>Inicio</small></Form.Label>
                        <Form.Control name="inicio" onChange={handleDocenteChange} size="sm" className="bg-light" type="date" />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group controlId="fin">
                        <Form.Label><small>Fin</small></Form.Label>
                        <Form.Control name="fin" onChange={handleDocenteChange} size="sm" className="bg-light" type="date" />
                    </Form.Group>
                </Col>
            </Form.Row>
            <Button variant="dark" size="sm" block type="submit">Registrar</Button>
        </Form>
    )
}

export default DocenteForm