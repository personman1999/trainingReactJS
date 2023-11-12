import React, { useState } from "react";
import { Button, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row, } from "reactstrap";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase.config';
import { toast } from 'react-toastify';



const EditProduct = (pros) => {

    const [enterTitle, setEnterTitle] = useState(pros.data.productName);
    const [enterShortDesc, setEnterShortDesc] = useState(pros.data.shortDesc);
    const [enterDescription, setEnterDescription] = useState(pros.data.description);

    const [enterCategory, setEnterCategory] = useState(pros.data.category);
    const [enterPrice, setEnterPrice] = useState(pros.data.price);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const editProduct = async (e) => {
        e.preventDefault();
        try {
            const productRef = doc(db, "products", pros.data.id)
            await updateDoc(productRef, {
                productName: enterTitle,
                shortDesc: enterShortDesc,
                description: enterDescription,
                category: enterCategory,
                price: enterPrice,
            })

            toast.success('product successfully updated!')
        } catch (error) {
            toast.error('product not updated');
        }
    }


    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Edit
            </Button>
            <Modal isOpen={modal} toggle={toggle} {...pros}>
                <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
                <ModalBody>
                    <Form >
                        <FormGroup className="form__group">
                            <span>Product title</span>
                            <input
                                type="text"
                                value={enterTitle}
                                onChange={e => setEnterTitle(e.target.value)}
                                required />
                        </FormGroup>

                        <FormGroup className="form__group">
                            <span>Short Description</span>
                            <input
                                type="text"
                                value={enterShortDesc}
                                onChange={e => setEnterShortDesc(e.target.value)}
                                required />
                        </FormGroup>

                        <FormGroup className="form__group">
                            <span>Description</span>
                            <input
                                type="text"
                                value={enterDescription}
                                onChange={e => setEnterDescription(e.target.value)}
                                required />
                        </FormGroup>

                        <div className='d-flex align-items-center justify-content-between gap-5'>
                            <FormGroup className="form__group w-50">
                                <span>Price</span>
                                <input
                                    value={enterPrice}
                                    onChange={e => setEnterPrice(e.target.value)}
                                    required />
                            </FormGroup>

                            <FormGroup className="form__group w-50">
                                <span>Category</span>
                                <select
                                    className='w-100 p-2'
                                    value={enterCategory}
                                    onChange={e => setEnterCategory(e.target.value)}
                                >
                                    <option>Select category</option>
                                    <option value="chair">Chair</option>
                                    <option value="sofa">Sofa</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="watch">Watch</option>
                                    <option value="wireless">Wireless</option>
                                </select>
                            </FormGroup>
                        </div>

                        {/* <div>
                            <FormGroup className="form__group">
                                <span>Product Image</span>
                                <input
                                    type="file"
                                    //onChange={e => setEnterProductImg(e.target.files[0])}
                                    required />
                            </FormGroup>
                        </div> */}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={editProduct}>
                        Edit
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditProduct;


