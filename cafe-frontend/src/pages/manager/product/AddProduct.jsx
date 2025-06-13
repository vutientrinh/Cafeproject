import ech from '../../../assets/images/ech.jpg';
import coffee from "../../../assets/images/coffee-cup.png"

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProductService from '../../../services/product.service'

const AddProduct = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const sizeSRef = useRef();
    const sizeMRef = useRef();
    const sizeLRef = useRef();

    const nameRef = useRef();
    const discountRef = useRef();
    const producTypeRef = useRef();
    const productStatusRef = useRef();

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleAddClick = async () => {
        try {
            let imageUrl = '';
            if (selectedImage) {
                imageUrl = await ProductService.uploadImage(selectedImage);
            }

            const product = {
                name: nameRef.current.value,
                discount: discountRef.current.value,
                image: imageUrl,
                productType: producTypeRef.current.value,
                productStatus: productStatusRef.current.value,
                sizes: [
                    { name: 'S', price: sizeSRef.current.value },
                    { name: 'M', price: sizeMRef.current.value },
                    { name: 'L', price: sizeLRef.current.value }
                ]
            };

            const createdProduct = await ProductService.addProduct(product);
            console.log('Product created successfully:', createdProduct);
            window.location.href = 'products';
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error(error.response.data.message);

        }
    };


    return (
        <div className="">
            <div className="mx-5 my-2 bg-custom rounded h-100">
                <div className="row mx-2 my-3">
                    <div class="mx-1 my-2" style={{ height: "5%" }}>
                        <a href='products' class="h-100">
                            <div class="material-symbols-outlined fs-2 handle" >
                                close
                            </div>
                        </a>
                    </div>
                    <div className="col col-4 h-100 d-flex">
                        <img src={selectedImage ? URL.createObjectURL(selectedImage) : coffee} className="rounded mx-auto d-block h-100 img-thumbnail" />
                        <input type="file" onChange={handleImageChange} style={{ display: 'none' }} id="imageUpload" />
                        <label htmlFor="imageUpload" class="material-symbols-outlined w-100">
                            add_photo_alternate
                        </label>
                    </div>

                    <div className="col col-7" style={{ marginRight: "0px", marginLeft: "auto" }}>
                        <div className="row">
                        </div>
                        <div className="container my-2 mb-4">
                            <form className="row">
                                <div className="col-md-12">
                                    <label htmlFor="inputFirstName" className="form-label text-uppercase fw-bold">Name</label>
                                    <input type="text" className="form-control" id="inputFirstName" ref={nameRef} />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputFirstName" className="form-label text-uppercase fw-bold">Discount</label>
                                    <input type="number" step="0.01" className="form-control" id="inputFirstName" ref={discountRef} />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputGender" className="form-label text-uppercase fw-bold">Product Type</label>
                                    <select id="inputGender" className="form-select" ref={producTypeRef}>
                                        <option value="CAFE" selected>Cafe</option>
                                        <option value="MILKTEA">Milk Tea</option>
                                        <option value="SOFTDRINK" >Soft Drink</option>
                                        <option value="SMOOTHIE">Smoothie</option>
                                        <option value="FOOD">Food</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputGender" className="form-label text-uppercase fw-bold">Product Status</label>
                                    <select id="inputGender" className="form-select" ref={productStatusRef}>
                                        <option value="ABLE" selected>Avaiable</option>
                                        <option value="ENABLE">Unavailable</option>
                                        <option value="OUTOFSTOCK" >Out of Stock</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label htmlFor="inputSizeS" className="form-label text-uppercase fw-bold">Size S Price</label>
                                    <input type="number" step="0.01" className="form-control" id="inputSizeS" ref={sizeSRef} />
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label htmlFor="inputSizeM" className="form-label text-uppercase fw-bold">Size M Price</label>
                                    <input type="number" step="0.01" className="form-control" id="inputSizeM" ref={sizeMRef} />
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label htmlFor="inputSizeL" className="form-label text-uppercase fw-bold">Size L Price</label>
                                    <input type="number" step="0.01" className="form-control" id="inputSizeL" ref={sizeLRef} />
                                </div>



                                <div className="mt-4 d-flex justify-content-around">
                                    <a className='w-15'>
                                        <Link to="/manager/products">
                                            <button type="button" className="btn btn-danger w-100">CANCEL</button>
                                        </Link>
                                    </a>

                                    <a className='w-15'>
                                        <button type="button" className="btn btn-success w-100" onClick={handleAddClick}>ADD</button>
                                    </a>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>

            </div>
            <ToastContainer />
        </div>
    );

}

export default AddProduct;