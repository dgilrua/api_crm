import {useNavigate} from 'react-router-dom'

export const Cliente = ({cliente, handleEliminar}) => {

    const navigate = useNavigate()

    const {nombre, empresa, email, telefono, notas, id} = cliente

  return (
    <tr className='border-b hover:bg-gray-100'>
        <td className='p-3 text-center'>{nombre}</td>
        <td className='p-3'>
            <p><span className='uppercase font-bold text-gray-800'>Email: </span>{email}</p>
            <p><span className='uppercase font-bold text-gray-800'>Tel: </span>{telefono ? telefono : 'No ingreso telefono'}</p>
        </td>
        <td className='p-3'>{empresa}</td>
        <td className='p-3'>
            <button
                type='button'
                className='bg-green-400 hover:bg-green-700 w-full block p-2 text-white uppercase font-semibold' 
                onClick={() => navigate(`/clientes/${id}`)}
            >Ver</button>

            <button
                type='button'
                className='bg-blue-400 hover:bg-blue-800 w-full block p-2 text-white mt-3 uppercase font-semibold' 
                onClick={() => navigate(`/clientes/editar/${id}`)}
            >Editar</button>
            
            <button
                type='button'
                className='bg-red-600 hover:bg-red-800 w-full block p-2 text-white mt-3 font-semibold uppercase'
                onClick={() => handleEliminar(id)}
            >Eliminar</button>
        </td>
    </tr>
  )
}
 