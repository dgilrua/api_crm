import React from 'react'

export const Alerta = ({children}) => {
  return (
    <div className='bg-red-700 w-full py-3 text-center text-white mt-4 font-semibold text-xl uppercase'>
        {children}
    </div>
  )
}
