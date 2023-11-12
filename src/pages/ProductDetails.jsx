import React, { useState, useRef, useEffect } from "react";
import '../styles/product-details.css';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
// import products from '../assets/data/products';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { motion } from 'framer-motion';
import ProductList from '../components/UI/ProductList';
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import useGetData from "../custom-hooks/useGetData";

const ProductDetails = () => {

    const { data: products } = useGetData('products');

    const [product, setProduct] = useState({});
    const [rating, setRating] = useState(null);
    const [tab, setTab] = useState('desc');
    const { id } = useParams();
    const reviewUser = useRef('');
    const reviewMsg = useRef('');
    const dispatch = useDispatch()


    // const product = products.find(item => item.id === id)

    const docRef = doc(db, 'products', id)

    useEffect(() => {
        const getProduct = async () => {
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setProduct(docSnap.data())
            } else {
                console.log('no products!')
            }
        }
        getProduct()
    }, [])

    const { imgUrl,
        productName,
        price,
        // avgRating, 
        // reviews, 
        description,
        shortDesc,
        category } = product;

    const relatedProduct = products?.filter(item => item.category === category)

    const submitHandler = (e) => {
        e.preventDefault()

        const reviewUserName = reviewUser.current.value
        const reviewUserMsg = reviewMsg.current.value

        const reviewObj = {
            userName: reviewUserName,
            text: reviewUserMsg,
            rating,
        };

        console.log(reviewObj)
        toast.success('Review submitted ')

    }

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id,
            image: imgUrl,
            productName,
            price,
        })
        );

        toast.success('Product added successfully')
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [products])

    return (
        <Helmet title={productName}>
            <CommonSection title={productName} />

            <section className="pt-0">
                <Container>
                    <Row>
                        <Col lg='6' className='img__detail'>
                            <img src={imgUrl} alt="" />
                        </Col>

                        <Col lg='6'>
                            <div className="product__details">
                                <h2>{productName}</h2>
                                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                                    <div>
                                        <span >
                                            <i class="fa-solid fa-star"></i>
                                        </span>
                                        <span >
                                            <i class="fa-solid fa-star"></i>
                                        </span >
                                        <span >
                                            <i class="fa-solid fa-star"></i>
                                        </span>
                                        <span >
                                            <i class="fa-solid fa-star"></i>
                                        </span>
                                        <span >
                                            <i class="fa-regular fa-star-half-stroke"></i>
                                        </span>
                                    </div>

                                    {/* <p>(<span>{avgRating}</span> rating)</p> */}
                                </div>

                                <div className="d-flex align-items-center gap-5">
                                    <span className="product__price">${price}</span>
                                    <span>Category: {category}</span>
                                </div>
                                <p className="mt-3">{shortDesc}</p>

                                <motion.button
                                    whileTap={{ scale: 1.2 }}
                                    className="shop__btn"
                                    onClick={addToCart}
                                >Add to cart
                                </motion.button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className="tab__wrapper d-flex align-items-center gap-5">
                                <h6
                                    className={`${tab === 'desc' ? 'active__tab' : ''}`}
                                    onClick={() => setTab('desc')}
                                >  DesCription</h6>
                                <h6
                                    className={`${tab === 'rev' ? 'active__tab' : ''}`}
                                    onClick={() => setTab('rev')}
                                >
                                    Reviews
                                    {/* ({reviews.length}) */}
                                </h6>
                            </div>


                            {
                                tab === 'desc' ? <div className="tab__content mt-4">
                                    <p>{description}</p></div>
                                    : <div className="product__review mt-5">
                                        <div className="review__wrapper">
                                            {/* <ul>
                                                {
                                                    reviews.map((item, index) => (
                                                        <li key={index} className="mb-4">
                                                            <h6>Johnny Deep</h6>
                                                            <span>{item.rating} (rating)</span>
                                                            <p>{item.text}</p>
                                                        </li>
                                                    ))
                                                }
                                            </ul> */}

                                            <div className="review__form">
                                                <h4>Leas</h4>
                                                <form action="" onSubmit={submitHandler}>
                                                    <div className="form__group">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter name"
                                                            ref={reviewUser}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form__group d-flex align-items-center gap-5 rating__group">
                                                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>
                                                            1<i class="fa-solid fa-star"></i>
                                                        </motion.span>
                                                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>
                                                            2<i class="fa-solid fa-star"></i>
                                                        </motion.span>
                                                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>
                                                            3<i class="fa-solid fa-star"></i>
                                                        </motion.span>
                                                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>
                                                            4<i class="fa-solid fa-star"></i>
                                                        </motion.span>
                                                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>
                                                            5<i class="fa-solid fa-star"></i>
                                                        </motion.span>
                                                    </div>

                                                    <div className="form__group">
                                                        <textarea
                                                            ref={reviewMsg}
                                                            rows={4}
                                                            type="text"
                                                            placeholder="Review Massage..."
                                                            required />
                                                    </div>

                                                    <motion.button whileTap={{ scale: 1.2 }} type="submit" className="shop__btn">Submit</motion.button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                            }

                        </Col>

                        <Col lg='12' className="mt-5">
                            <h2 className="related__title">You might also like</h2>
                        </Col>

                        <ProductList data={relatedProduct} />
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default ProductDetails;