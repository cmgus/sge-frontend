import React, { useState, useEffect } from 'react'
import UsuarioForm from "../components/usuario/UsuarioForm";
import UsuarioRow from '../components/usuario/UsuarioRow';
import Api from '../helpers/Api';
const Usuario = props => {
    const [usuarios, setUsuarios] = useState([])
    const [therereChanges, setTherereCHanges] = useState(false)
    const [usuariosUpdated, setUsuariosUpdated] = useState([])
    const handleSubmit = async (e, dataToSave) => {
        e.preventDefault()
        e.currentTarget.reset()
        console.log(dataToSave)
        const usuarioAdded = await Api.create('usuario', dataToSave)
        console.log(usuarioAdded)
        if (!usuarioAdded) return
        setUsuarios([
            ...usuarios,
            usuarioAdded
        ])
    }
    const handleChange = async (e) => {
        const [type, id, ...properties] = e.currentTarget.id.split('_');
        setTherereCHanges(true)
        e.currentTarget.classList.add('bg-warning')
        const changedValue = e.currentTarget.value
        let indexToUpdate = 0;
        const usuarioToUpdate = usuarios.find((usuario, i) => {
            indexToUpdate = i
            return usuario.id === parseInt(id, 10)
        })
        if (typeof usuarioToUpdate[properties[0]] === 'object') {
            usuarioToUpdate[properties[0]][properties[1]] = changedValue
        } else {
            usuarioToUpdate[properties[0]] = changedValue
        }
        usuarios.splice(indexToUpdate, 1, usuarioToUpdate)
        setUsuariosUpdated([...usuariosUpdated, indexToUpdate])
        setUsuarios(usuarios)
    }
    const handleUpdater = () => {
        let unique = [...new Set(usuariosUpdated)]
        unique.forEach(async uni => {
            await Api.update('usuario', usuarios[uni], usuarios[uni].id)
        });
        document.querySelectorAll('input').forEach(input => input.classList.remove('bg-warning'))
        setUsuariosUpdated([])
        setTherereCHanges(false)
    }
    const handleDelete = async (e) => {
        const [type, id, action] = e.currentTarget.id.split('_')
        const indexToDelete = usuarios.findIndex(usuario => usuario.id === parseInt(id, 10))
        // const deleted = await Api.destroy('docente', id)
        //console.log(deleted)
        usuarios.splice(indexToDelete, 1)
        setUsuarios([...usuarios])
    }
    useEffect(() => {
        async function init() {
            const usuarios = await Api.list('usuario')
            setUsuarios(usuarios.data)
        }
        init()
    }, [])
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Dashbaord</li>
                    <li className="breadcrumb-item active" aria-current="page">Usuario</li>
                </ol>
            </nav>
            <div className="conatiner">
                <div className="row">
                    <div className="col-4">
                        <UsuarioForm submit={handleSubmit} />
                    </div>
                    <div className="col-8">
                        <div className="table-responsive shadow-sm rounded border p-3 shadow">
                            <table className="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>Nº</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Email</th>
                                        <th>Dni</th>
                                        <th>Rol</th>
                                        <th colSpan="2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((usuario, i) => (
                                        <UsuarioRow key={usuario.id}
                                            usuario={usuario}
                                            deleter={handleDelete}
                                            change={handleChange}
                                            orden={i} />)
                                    )}
                                </tbody>
                            </table>
                            <div className="d-flex">
                                <button disabled={!therereChanges} onClick={handleUpdater} className="btn btn-primary btn-sm ml-auto">Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usuario