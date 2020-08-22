import React, { useEffect, useState } from 'react'
import EstudianteForm from '../components/estudiante/EstudianteForm'
import EstudianteRow from "../components/estudiante/EstudianteRow";
import Api from '../helpers/Api'

const Estudiante = () => {
    const [estudiantes, setEstudiantes] = useState([])
    const [therereChanges, setTherereCHanges] = useState(false)
    const [estudiantesUpdate, setEstudiantesUpdate] = useState([])
    const handleSubmit = async (e, dataToSave) => {
        e.preventDefault()
        e.currentTarget.reset()
        console.log(dataToSave)
        const estudianteAdded = await Api.create('estudiante', dataToSave)
        console.log(estudianteAdded)
        if (!estudianteAdded) return
        setEstudiantes([
            ...estudiantes,
            estudianteAdded
        ])
    }
    const handleChange = async (e) => {
        const [type, id, ...properties] = e.currentTarget.id.split('_');
        setTherereCHanges(true)
        e.currentTarget.classList.add('bg-warning')
        const changedValue = e.currentTarget.value
        let indexToUpdate = 0;
        const estudianteToUpdate = estudiantes.find((docente, i) => {
            indexToUpdate = i
            return docente.id === parseInt(id, 10)
        })
        if (typeof estudianteToUpdate[properties[0]] === 'object') {
            estudianteToUpdate[properties[0]][properties[1]] = changedValue
        } else {
            estudianteToUpdate[properties[0]] = changedValue
        }
        estudiantes.splice(indexToUpdate, 1, estudianteToUpdate)
        setEstudiantesUpdate([...estudiantesUpdate, indexToUpdate])
        setEstudiantes(estudiantes)
    }
    const handleUpdater = () => {
        let unique = [...new Set(estudiantesUpdate)]
        unique.forEach(async uni => {
            const e = await Api.update('estudiante', estudiantes[uni], estudiantes[uni].id)
            console.log(e)
        });
        document.querySelectorAll('input').forEach(input => input.classList.remove('bg-warning'))
        setEstudiantesUpdate([])
        setTherereCHanges(false)
    }
    useEffect(() => {
        async function init() {
            const estudiantes = await Api.list('estudiante')
            setEstudiantes(estudiantes.data)
        }
        init()
    }, [])
    const handleDelete = async (e) => {
        const [type, id, action] = e.currentTarget.id.split('_')
        const indexToDelete = estudiantes.findIndex(estudiante => estudiante.id === parseInt(id, 10))
        //const deleted = await Api.destroy('docente', id)
        //console.log(deleted)
        estudiantes.splice(indexToDelete, 1)
        setEstudiantes([...estudiantes])
    }
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Dashbaord</li>
                    <li className="breadcrumb-item active" aria-current="page">Estudiante</li>
                </ol>
            </nav>
            <div className="conatiner">
                <div className="row">
                    <div className="col-4">
                        <EstudianteForm submit={handleSubmit} />
                    </div>
                    <div className="col-8">
                        <div className="table-responsive shadow-sm rounded border p-3 shadow">
                            <table className="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>Nº</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Dni</th>
                                        <th>Codigo</th>
                                        <th>Direccion</th>
                                        <th colSpan="2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {estudiantes.map((estudiante, i) => (
                                        <EstudianteRow key={estudiante.id}
                                            estudiante={estudiante}
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

export default Estudiante