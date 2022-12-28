import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserProvider.js';

export default function Navbar(){
    const { logout, token } = useContext(UserContext)
    return(
        <div className='navbar'>
            { token && 
                <Link 
                    className='link'
                    to='/profile'
                > Profile </Link>
            }
            { token && <Link className='link' 
                to='/main'
                > Posts </Link> }
            <button className='link logout'
                onClick={logout}
                style={{cursor: 'pointer',
                color: 'red',
                fontWeight: '900',
                backgroundColor: 'whitesmoke',
                border: 'none',
                boxShadow: 'none'
            }} to='/'
            > Logout </button>
        </div>
    )
}