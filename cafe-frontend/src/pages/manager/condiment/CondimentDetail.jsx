import coffee from "../../../assets/images/coffee-cup.png";
import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import condimentService from '../../../services/condiment.service';
import productService from "../../../services/product.service";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const CondimentDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [condiment, setCondiment] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState('process');
    const [selectedImage, setSelectedImage] = useState(null);

    // Create refs
    const nameRef = useRef();
    const priceRef = useRef();
    const statusRef = useRef();

    useEffect(() => {
        condimentService.getById(id)
            .then(data => {
                setCondiment(data);
                setStatus('finish');
            })
            .catch(error => {
                console.error('There was an error!', error);
                setStatus('error');
            });
    }, [id]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleFinish = () => {
        const updatedCondiment = {
            ...condiment,
            name: nameRef.current.value,
            unitPrice: parseFloat(priceRef.current.value),
            image: condiment.image,
            productStatus: parseInt(statusRef.current.value)
        };

        const updateCondimentDetails = () => {
            condimentService.updateCondiment(id, updatedCondiment)
                .then(data => {
                    setCondiment(data);
                    setEditMode(false);
                    window.location.href = './';
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };

        if (selectedImage) {
            productService.uploadImage(selectedImage)
                .then(url => {
                    updatedCondiment.image = url;
                    updateCondimentDetails();
                })
                .catch(error => {
                    console.error('Image upload failed!', error);
                });
        } else {
            updateCondimentDetails();
        }
    };

    if (status === 'process') {
        return <div>Loading...</div>; // Or some loading spinner
    }

    if (status === 'error') {
        return <div>Error loading data</div>; // Or some error message
    }

    if (status === 'empty' || !condiment) {
        return <div>No data found</div>; // Or some empty state
    }

    return (
        <div className="Product_detail h-75 w-50">
            <div className="container mx-3 bg-custom rounded h-100">
                <div className="mx-2 my-3 h-100">
                    <div class="mx-1 my-2" style={{ height: "5%" }}>
                        <a href='./' class="handle h-100 w-15">
                            <div class="material-symbols-outlined fs-2" >
                                close
                            </div>
                        </a>
                    </div>
                    <div className="h-50 d-flex flex-column justify-content-center align-items-center">
                        <img src={condiment.image ? condiment.image : coffee} className="h-75 my-3 rounded mx-auto img-thumbnail" />
                        {editMode && (
                            <div className="mt-2">
                                <input type="file" onChange={handleImageChange} />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="container">
                            <form className="row">
                                <div className="col-md-12">
                                    <label htmlFor="inputName" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="inputName" defaultValue={condiment.name} ref={nameRef} disabled={!editMode} />
                                </div>
                                <div className="col-md-6 mt-4">
                                    <label htmlFor="inputType" className="form-label">Price</label>
                                    <input type="text" className="form-control" id="inputPrice" defaultValue={condiment.unitPrice} ref={priceRef} disabled={!editMode} />
                                </div>
                                <div className="col-md-6 mt-4">
                                    <label htmlFor="inputStatus" className="form-label">Status</label>
                                    <select id="inputStatus" className="form-control" defaultValue={condiment.productStatus} ref={statusRef} disabled={!editMode}>
                                        <option value="0">Available</option>
                                        <option value="1">Unavailable</option>
                                        <option value="2">Out of stock</option>
                                    </select>
                                </div>
                                <div className="mt-4 d-flex justify-content-around">


                                    {!editMode && <button type="button" className="btn btn-info w-15" onClick={handleEdit}>Edit</button>}
                                    {editMode && <button type="button" className="btn btn-success w-15" onClick={handleFinish}>Finish</button>}
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CondimentDetail;
