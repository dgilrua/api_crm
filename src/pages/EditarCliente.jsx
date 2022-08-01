import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import React from 'react'
import { Formulario } from '../components/Formulario'

export const EditarCliente = () => {

  const {id} = useParams()

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const extraerCliente = async () => {
            try { 
                const url = `http://localhost:4000/clientes/${id}`
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
    <>
      <h1 className='font-black text-4xl text-blue-400'>Editar Cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar los datos del cliente</p>
      {cliente?.nombre ? <Formulario cliente={cliente} cargando={cargando}/> : <p className='mt-5 text-3xl font-bold text-gray-900'>Cliente ID no valido</p>}
    </>
  )
}
