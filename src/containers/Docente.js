import React, { useState, useEffect } from 'react'
import DocenteForm from '../components/docente/DocenteForm'
import DocenteRow from '../components/docente/DocenteRow'
import Api from '../helpers/Api'

const Docente = props => {
    const [docentes, setDocentes] = useState([])
    const [therereChanges, setTherereCHanges] = useState(false)
    const [docentesUpdated, setDocentesUpdated] = useState([])
    const handleSubmit = async (e, dataToSave) => {
        e.preventDefault()
        e.currentTarget.reset()
        console.log(dataToSave)
        const docenteAdded = await Api.create('docente', dataToSave)
        console.log(docenteAdded)
        if (!docenteAdded) return
        setDocentes([
            ...docentes,
            docenteAdded
        ])
    }
    const handleChange = async (e) => {
        const [type, id, ...properties] = e.currentTarget.id.split('_');
        setTherereCHanges(true)
        e.currentTarget.classList.add('bg-warning')
        const changedValue = e.currentTarget.value
        let indexToUpdate = 0;
        const docenteToUpdate = docentes.find((docente, i) => {
            indexToUpdate = i
            return docente.id === parseInt(id, 10)
        })
        if (typeof docenteToUpdate[properties[0]] === 'object') {
            docenteToUpdate[properties[0]][properties[1]] = changedValue
        } else {
            docenteToUpdate[properties[0]] = changedValue
        }
        docentes.splice(indexToUpdate, 1, docenteToUpdate)
        setDocentesUpdated([...docentesUpdated, indexToUpdate])
        setDocentes(docentes)
    }
    const handleUpdater = () => {
        let unique = [...new Set(docentesUpdated)]
        unique.forEach(async uni => {
            await Api.update('docente', docentes[uni], docentes[uni].id)
        });
        document.querySelectorAll('input').forEach(input => input.classList.remove('bg-warning'))
        setDocentesUpdated([])
        setTherereCHanges(false)
    }
    useEffect(() => {
        async function init() {
            const docentes = await Api.list('docente')
            setDocentes(docentes.data)
        }
        init()
    }, [])
    const handleDelete = async (e) => {
        const [type, id, action] = e.currentTarget.id.split('_')
        const indexToDelete = docentes.findIndex(docente => docente.id === parseInt(id, 10))
        //const deleted = await Api.destroy('docente', id)
        //console.log(deleted)
        docentes.splice(indexToDelete, 1)
        setDocentes([...docentes])
    }
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Dashbaord</li>
                    <li className="breadcrumb-item active" aria-current="page">Docente</li>
                </ol>
            </nav>
            <div className="conatiner">
                <div className="row">
                    <div className="col-4">
                        <DocenteForm submit={handleSubmit} />
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
                                        <th>Inicio</th>
                                        <th>Fin</th>
                                        <th>Direccion</th>
                                        <th colSpan="2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {docentes.map((docente, i) => (
                                        <DocenteRow key={docente.id}
                                            docente={docente}
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

export default Docente