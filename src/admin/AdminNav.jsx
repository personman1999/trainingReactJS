import React from 'react';
import '../styles/admin-nav.css';
import { Container, Row } from 'reactstrap';
import useAuth from '../custom-hooks/useAuth';
import { Link, NavLink, Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase.config';


const admin__nav = [
    {
        display: 'Dashboard',
        path: '/dashboard'
    },
    {
        display: 'All-Products',
        path: '/dashboard/all-products'
    },
    {
        display: 'Add-Products',
        path: '/dashboard/add-products'
    },
    {
        display: 'Users',
        path: '/dashboard/users'
    }
]

const AdminNav = () => {

    const { currentUser } = useAuth();


    const logout = () => {

        signOut(auth).then(() => {
            toast.success('Logged out')
            Navigate('/home')
        }).catch(err => {
            toast.error(err.message)
        })
    }

    return (
        <>
            <header className='admin__header'>
                <div className="admin__nav-top">
                    <Container>
                        <div className="admin__nav-wrapper-top">
                            <div className="logo">
                                <h2 className='nav__storre'><NavLink to='/'>Multimart</NavLink></h2>
                            </div>

                            <div className="search__box">
                                <input type="text" placeholder='Search...' />
                                <span><i class="fa-solid fa-magnifying-glass"></i></span>
                            </div>

                            <div className="admin__nav-top-right">
                                <span><i class="fa-solid fa-bell"></i></span>
                                <span><i class="fa-solid fa-gear"></i></span>
                                <img src={currentUser && currentUser.photoURL} alt="" />
                                <button onClick={logout}>Logout</button>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>


            <section className="admin__menu">
                <Container>
                    <Row>
                        <div className="admin__navigation">
                            <ul className="admin__menu-list">
                                {admin__nav.map((item, index) => (
                                    <li className="admin__menu-item" key={index}>
                                        <NavLink
                                            to={item.path}
                                            className={navClass => navClass.isActive ? 'active__admin-menu' : ''}
                                        >
                                            {item.display}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default AdminNav;