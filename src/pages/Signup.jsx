import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from 'react-router-dom';

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';

import { storage } from '../firebase.config';
import { auth } from '../firebase.config';
import { db } from '../firebase.config';

import { toast } from 'react-toastify';


const Signup = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    const signup = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            const storageRef = ref(storage, `images/${Date.now() + userName}`)
            const uploadTask = uploadBytesResumable(storageRef, file)


            uploadTask.on((error) => {
                toast.error(error.message)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    //update user profile
                    await updateProfile(user, {
                        displayName: userName,
                        photoURL: downloadURL
                    });
                    //store user data in firebase database
                    await setDoc(doc(db, 'users', user.uid), {
                        uid: user.uid,
                        displayName: userName,
                        email,
                        photoURL: downloadURL
                    })

                });
            }
            );


            setLoading(false)
            toast.success('Account created')
            navigate('/login')

        } catch (error) {
            setLoading(false)
            toast.error('something went wrong')
        }
    }

    return (
        <Helmet title='Signup'>
            <section>
                <Container>
                    <Row>
                        {
                            loading ? <Col lg='12' className="text-center">
                                <h5 className="fw-bold">Loading...</h5></Col>
                                : <Col lg='6' className="m-auto text-center">
                                    <h3 className="fw-bold mb-4">Signup</h3>

                                    <Form className="auth__form" onSubmit={signup}>
                                        <FormGroup className="form__group">
                                            <input
                                                type="text"
                                                placeholder="UserName"
                                                onChange={e => setUserName(e.target.value)}
                                                value={userName}
                                            />
                                        </FormGroup>

                                        <FormGroup className="form__group">
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                onChange={e => setEmail(e.target.value)}
                                                value={email}
                                            />
                                        </FormGroup>

                                        <FormGroup className="form__group">
                                            <input
                                                type="password"
                                                placeholder="Password..."
                                                onChange={e => setPassword(e.target.value)}
                                                value={password}
                                            />
                                        </FormGroup>

                                        <FormGroup className="form__group">
                                            <input
                                                type="file"
                                                onChange={e => {
                                                    console.log(e.target.files)
                                                    setFile(e.target.files[0])
                                                }}
                                            />


                                        </FormGroup>


                                        <button type="submit" className="buy__btn auth__btn">Sign Up</button>
                                        <p>Already have an account?
                                            <Link to='/login'>Login</Link>
                                        </p>
                                    </Form>
                                </Col>
                        }
                    </Row>
                </Container>
            </section>

        </Helmet>
    )
}

export default Signup;