import React, { useEffect, useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import Api from '../../helpers/Api'

const UsuarioForm = ({ submit }) => {
    const [usuarioData, setUsuarioData] = useState({})
    const [personaData, setPersonaData] = useState({})
    const [recursosSelected, setRecursosSelected] = useState([])
    const [recursos, setRecursos] = useState([])
    const handleUsuarioChange = e => {
        const target = e.target
        setUsuarioData({
            ...usuarioData,
            [target.name]: target.value
        })
    }
    const handlePersonaData = e => {
        const target = e.target
        setPersonaData({
            dni: target.value
        })
    }
    useEffect(() => {
        async function init() {
            const recursos = await Api.list('recurso')
            setRecursos(recursos)
        }
        init()
    }, [])

    const handleRecursosChange = (e) => {
        const value = e.currentTarget.value

        const indexRepeated = recursosSelected.findIndex(recurso => recurso === value)
        if (indexRepeated > 0) {
            return
        }
        setRecursosSelected([...recursosSelected, value])
    }
    return (
        <Form className="p-3 shadow" onSubmit={e => {
            submit(e, { ...usuarioData, persona: personaData, recursos: recursosSelected })
            setRecursosSelected([])
        }}>
            <Form.Group controlId="email">
                <Form.Label><small>E-mail</small></Form.Label>
                <Form.Control name="email" className="bg-light" type="text" onChange={handleUsuarioChange} size="sm" />
            </Form.Group>
            <Form.Row>
                <Col sm={8}>
                    <Form.Group controlId="password">
                        <Form.Label><small>Password</small></Form.Label>
                        <Form.Control name="password" className="bg-light" type="password" onChange={handleUsuarioChange} size="sm" />
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group controlId="persona_dni">
                        <Form.Label><small>Dni</small></Form.Label>
                        <Form.Control name="persona_dni" className="bg-light" type="text" onChange={handlePersonaData} size="sm" />
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Group controlId="recursos">
                <Form.Label><small>Recursos disponibles:</small></Form.Label>
                <Form.Control 
                    name="recursos" className="bg-light" multiple 
                    onChange={handleRecursosChange} size="sm" as="select" custom>
                    {recursos.map(recurso => (
                        <option key={`sel${recurso.id}`} value={`${recurso.id}`}>
                            {`${recurso.id} - ${recurso.uri}`}
                        </option>))}
                </Form.Control>
            </Form.Group>
            <Button variant="dark" size="sm" block type="submit">Registrar</Button>
        </Form>
    )
}

export default UsuarioForm