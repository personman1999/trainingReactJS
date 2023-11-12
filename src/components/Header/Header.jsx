import React, { useRef, useEffect } from "react";
import './header.css';
import { Container, Row } from "reactstrap";
import logo from '../../assets/images/eco-logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';


import userIcon from '../../assets/images/user-icon.png';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";



const nav__links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: 'cart',
        display: 'Cart'
    },
    {
        path: 'dashboard',
        display: 'Dashboard'
    }
]

const Header = () => {

    const totalQuantity = useSelector(state => state.cart.totalQuantity)
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const profileActionRef = useRef(null);



    const menuToggle = () => menuRef.current.classList?.toggle('active__menu');

    const navigateToCart = () => {
        navigate('./cart')
    }

    const toggleProfileActions = () => profileActionRef.current.classList?.toggle('show__profileActions');


    const logout = () => {

        signOut(auth).then(() => {
            toast.success('Logged out')
            navigate('/home')
        }).catch(err => {
            toast.error(err.message)
        })
    }

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <div className="logo">
                            <img src={logo} alt="" />
                            <div>
                                <h1 className="nav__store"><NavLink to='/'>Multimart</NavLink> </h1>

                            </div>
                        </div>

                        <div className="navigation" ref={menuRef} onClick={menuToggle}>
                            <ul className="menu">

                                {nav__links.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                        <NavLink to={item.path}
                                            className={(navClass) => navClass.isActive ? 'nav__active' : ''}>{item.display}
                                        </NavLink>
                                    </li>
                                ))}

                            </ul>
                        </div>
                        <div className="nav__icons">
                            <span className="fav__icon">
                                <i class="fa-regular fa-heart"></i>
                                <span className="badge">1</span>
                            </span>
                            <span className="cart__icon" onClick={navigateToCart}>
                                <i class="fa-solid fa-cart-shopping"></i>
                                <span className="badge">{totalQuantity}</span>
                            </span>

                            <div className="profile">
                                {/* <motion.i whileTap={{ scale: 1.2 }} className="fa-solid fa-user"></motion.i> */}
                                <motion.img
                                    whileTap={{ scale: 1.2 }}
                                    src={currentUser ? currentUser.photoURL : userIcon}
                                    alt=""
                                    onClick={toggleProfileActions}
                                />
                                <div
                                    className="profile__actions"
                                    ref={profileActionRef}
                                    onClick={toggleProfileActions}
                                >
                                    {
                                        currentUser ? (<span onClick={logout}>Logout</span>)
                                            : (<div className="d-flex align-items-center justify-content-center flex-column">
                                                <Link to='/signup'>Signup</Link>
                                                <Link to='/login'>Login</Link>

                                            </div>)
                                    }
                                </div>
                            </div>
                            <div className="mobile__menu">
                                <span onClick={menuToggle}>
                                    <i className="fa-solid fa-bars"></i>
                                </span>
                            </div>
                        </div>

                    </div>
                </Row>
            </Container>

        </header>
    )
}

export default Header;