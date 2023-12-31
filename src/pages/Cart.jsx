import React from "react";
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from 'reactstrap';
import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const Tr = ({ item }) => {

    const dispatch = useDispatch();

    const deleteProduct = () => {
        dispatch(cartActions.deleteItem(item.id))
    }
    console.log(deleteProduct)
    return (
        <tr>
            <td><img src={item.imgUrl} alt="" /></td>
            <td>{item.productName}</td>
            <td>${item.price}</td>
            <td>{item.quantity}px</td>
            <motion.td
                whileTap={{ scale: 1.1 }}
                onClick={deleteProduct}
            >
                <i className="fa-solid fa-trash-can"></i>
            </motion.td>
        </tr>)
}


const Cart = () => {

    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = useSelector(state => state.cart.totalAmount);

    return (
        <Helmet title='cart'>
            <CommonSection title='Shopping cart' />
            <section>
                <Container>
                    <Row>
                        <Col lg='9'>
                            {cartItems.length === 0 ? (
                                <h2 className="fs-4 text-center">No item added to the cart</h2>)
                                : (
                                    <table className="table bordered">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th whileTap={{ scale: 1.2 }}>Delete</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                cartItems.map((item, index) => (
                                                    <Tr item={item} key={index} />
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                )
                            }


                        </Col>
                        <Col lg='3'>
                            <div>
                                <h6 className="d-flex align-items-center justify-content-between">
                                    Subtotal
                                    <span className="fs-4 fw-bold">${totalAmount}</span>
                                </h6>

                            </div>
                            <p className="fs-6 mt-2">taxes and shipping will calculate in checkout</p>
                            <div>
                                <button className="shop__btn w-100">
                                    <Link to='/checkout'>Checkout</Link>
                                </button>
                                <br />
                                <button className="shop__btn w-100 mt-3">
                                    <Link to='/shop'>Continue Shopping</Link>
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}



export default Cart;