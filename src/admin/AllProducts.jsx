import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import EditProduct from './EditProducts';


const AllProducts = () => {

    const { data: products, loading } = useGetData('products');
    const [filterList, setFilterList] = useState([]);
    const [filterOdd, setFilterOdd] = useState([]);
    const [filterEven, setFilterEven] = useState([]);

    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, 'products', id))
        toast.success('Deleted!')
    }

    const [showModal, setShowModal] = useState(false);

    // const filterPrice = () => {
    //     products.filter(element => {
    //         if (element.price > 500 && element.price < 1000) {
    //             setFilterList(oldArr => [...oldArr, element]);
    //         }
    //     });
    // }

    const filterPriceOdd = () => {
        products.filter(element => {
            if (element.price % 2 === 1) {
                setFilterOdd(oldArr => [...oldArr, element])
                // console.log(element.price);
            }
        })
    }


    const filterPriceEven = () => {
        products.filter(element => {
            if (element.price % 2 === 0) {
                setFilterEven(oldArr => [...oldArr, element])
                // console.log(element.price);
            }
        })
    }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                        {/* <Button onClick={() => filterPrice()}>Price filter</Button> */}
                        <Button onClick={() => filterPriceOdd()}>Price Odd</Button>
                        <Button onClick={() => filterPriceEven()}>Price Even</Button>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {filterEven.length === 0 ? (

                                <tbody>
                                    {
                                        loading ? <h5 className='pt-5 fw-bold'>Loading...</h5> :
                                            products?.map(item => (
                                                <tr key={item.id}>
                                                    <td><img src={item.imgUrl} alt="" /></td>
                                                    <td>{item.productName}</td>
                                                    <td>{item.category}</td>
                                                    <td>${item.price}</td>
                                                    <td>
                                                        <EditProduct data={item} showModal={showModal} setShowModal={setShowModal} />
                                                    </td>
                                                    <td><button onClick={() => { deleteProduct(item.id) }} className='btn btn-danger'>Delete</button></td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            )
                                // : (
                                //     <tbody>
                                //         {
                                //             loading ? <h5 className='pt-5 fw-bold'>Loading...</h5> :
                                //                 filterOdd?.map(item => (
                                //                     <tr key={item.id}>
                                //                         <td><img src={item.imgUrl} alt="" /></td>
                                //                         <td>{item.productName}</td>
                                //                         <td>{item.category}</td>
                                //                         <td>${item.price * 2}</td>
                                //                         <td>
                                //                             <EditProduct data={item} showModal={showModal} setShowModal={setShowModal} />
                                //                         </td>
                                //                         <td><button onClick={() => { deleteProduct(item.id) }} className='btn btn-danger'>Delete</button></td>
                                //                     </tr>
                                //                 ))
                                //         }
                                //     </tbody>
                                // )
                                : (
                                    <tbody>
                                        {
                                            loading ? <h5 className='pt-5 fw-bold'>Loading...</h5> :
                                                filterEven?.map(item => (
                                                    <tr key={item.id}>
                                                        <td><img src={item.imgUrl} alt="" /></td>
                                                        <td style={{ color: 'red' }}>{item.productName}</td>
                                                        <td>{item.category}</td>
                                                        <td>${item.price}</td>
                                                        <td>
                                                            <EditProduct data={item} showModal={showModal} setShowModal={setShowModal} />
                                                        </td>
                                                        <td><button onClick={() => { deleteProduct(item.id) }} className='btn btn-danger'>Delete</button></td>
                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                )
                            }

                        </table>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AllProducts;