import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { Spinner } from '../components/Spinner'

export const VerCliente = () => {
  
    const {id} = useParams()

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    const {nombre, email, notas, telefono, empresa} = cliente

    useEffect(() => {
        const extraerCliente = async () => {
            try { 
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            setCargando(!cargando)
        }
        extraerCliente()
    }, [])

    return (

        cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <p className='text-blue-900 font-bold text-4xl text-center'>Este cliente no existe</p> : (
            <div>
                    <>
                        <h1 className='font-black text-4xl text-blue-900 text-center'>Informacion sobre el cliente</h1>

                        <p className='mt-10 text-2xl text-gray-600'>
                            <span className='text-blue-900 font-bold'>Nombre: </span>
                            {nombre}
                        </p>

                        {telefono && (<p className='mt-5 text-2xl text-gray-600'>
                            <span className='text-blue-900 font-bold'>Telefono: </span>
                            {telefono}
                        </p>)}

                        <p className='mt-5 text-2xl text-gray-600'>
                            <span className='text-blue-900 font-bold'>Empresa: </span>
                            {empresa}
                        </p>

                        <p className='mt-5 text-2xl text-gray-600'>
                            <span className='text-blue-900 font-bold'>Email: </span>
                            {email}
                        </p>

                        {notas && (<p className='mt-5 text-2xl text-gray-600'>
                            <span className='text-blue-900 font-bold'>Notas: </span>
                            {notas}
                        </p>)}    
                    </>
            </div>
        )
    )
}
