import React from 'react'
import {Formik, Form, Field} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Alerta } from './Alerta'
import { Spinner } from './Spinner'

export const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                   .min(3, 'El Nombre es muy corto')
                   .max(20, 'El nombre es muy largo')
                   .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                  .required('El email es obligatorio')
                  .email('Email no valido'),  
        telefono: Yup.number()
                     .typeError('El numero no es valido')
                     .integer('El numero no es valido')
                     .positive('El numero no es valido'),
    })

    const handleSubmit = async values => {

        let respuesta

        try {
            if (cliente.id) {
                const url=`${import.meta.env.VITE_API_URL}/${cliente.id}`

                    respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                //Nuevo Registro
                const url=import.meta.env.VITE_API_URL

                    respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            const resultado = await respuesta.json()
            navigate('/')

        } catch (error) {
            console.log(error) 
        }
    }

  return (
    cargando ? <Spinner /> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{ cliente?.nombre ? 'Editar cliente' : 'Agregar Cliente'}</h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',  
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}

                enableReinitialize={true}

                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)

                    resetForm()
                }}

                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => (
                    <Form className='mt-10'>
                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor='nombre'
                            >Nombre: </label>
                            <Field 
                                type='text' 
                                className='mt-2 block w-full p-3 bg-gray-50'
                                id='nombre'
                                placeholder='Nombre del Cliente'
                                name="nombre"
                            />

                            {errors.nombre && touched.nombre ? (
                                <Alerta>{errors.nombre}</Alerta> 
                            ) : null}

                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor='empresa'
                            >Empresa: </label>
                            <Field 
                                type='text' 
                                className='mt-2 block w-full p-3 bg-gray-50'
                                id='empresa'
                                placeholder='Empresa del Cliente'
                                name='empresa'
                            />

                            {errors.empresa && touched.empresa ? (
                                <Alerta>{errors.empresa}</Alerta> 
                            ) : null}
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor='email'
                            >Email: </label>
                            <Field 
                                type='email' 
                                className='mt-2 block w-full p-3 bg-gray-50'
                                id='email'
                                placeholder='Email del Cliente'
                                name='email'
                            />
                            {errors.email && touched.email ? (
                                <Alerta>{errors.email}</Alerta> 
                            ) : null}
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor='tel'
                            >Telefono: </label>
                            <Field 
                                type='tel' 
                                className='mt-2 block w-full p-3 bg-gray-50'
                                id='tel'
                                placeholder='Telofono del Cliente'
                                name='telefono'
                            />
                            {errors.telefono && touched.nombre ? (
                                <Alerta>{errors.telefono}</Alerta> 
                            ) : null}
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor='notas'
                            >Notas: </label>
                            <Field 
                                as='textarea'
                                type='text' 
                                className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                id='notas'
                                placeholder='Notas del Cliente'
                                name='notas'
                            />
                        </div>

                        <input 
                            type="submit" 
                            value={cliente?.nombre ? 'Editar cliente' : 'Agregar Cliente'}
                            className='bg-blue-400 text-center py-3 text-gray-100 block rounded-md w-full mt-10 font-semibold text-lg uppercase hover:cursor-pointer hover:bg-blue-900'
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}
