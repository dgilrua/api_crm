import {Outlet, Link, useLocation} from 'react-router-dom'

export const Layout = () => {

    const location = useLocation()
    const url = location.pathname

  return (
    <div className='md:flex md:min-h-screen'>

        <div className='md:w-1/4 bg-blue-300 px-5 py-10 overflow-hidden'>
            <h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>

            <nav className='mt-10'>
                <Link 
                    className={`${url === '/' ? 'text-blue-900' : 'text-white'} text-2xl block mt-2 hover:text-blue-900 font-semibold`}
                    to="/"
                >Clientes</Link>
                <Link 
                    className={`${url === '/nuevo' ? 'text-blue-900' : 'text-white'} text-2xl block mt-2 hover:text-blue-900 font-semibold`}
                    to="/nuevo"
                >Nuevo Cliente</Link>
            </nav>
        </div>

        <div className='md:w-3/4 p-10 bg-gray-100 md:h-screen overflow-scroll'>
            <Outlet />
        </div>
    </div>
  ) 
}
 