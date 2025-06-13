import { useState } from "react";
import orderService from "../../../services/order.service";
import bg from '../../../assets/images/coffee-cup.png'
import { toast } from 'react-toastify';



const CondimentItem = ({ selectedProduct, receipt, closeMenu, }) => {

    const [unitPrice, setUnitPrice] = useState(selectedProduct.unitPrice);
    const [quantity, setQuantity] = useState(1);
    const [selectedProductDetail, setSelectedProductDetail] = useState(receipt.productDetails[0]);


    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);

    };

    const handleAddToCart = () => {
        orderService.addCondimentReceipt(selectedProductDetail, selectedProduct.id, quantity)
            .then(data => {
                toast.success(`${selectedProduct.name} added successfully`)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    return (
        <div className="w-50 h-75 container bg-white px-0 rounded">
            <div className="h-25 w-100 rounded" style={{ backgroundColor: "#885b46" }}>
                <a class="close text-center align-items-center h-25 w-15 mx-2 my-2 " onClick={closeMenu}>
                    <div class="material-symbols-outlined handle mx-2 my-3 handle ">
                        close
                    </div>
                </a>
                <div className="w-100 d-flex justify-content-center align-items-center" >
                    <img src={bg} className="rounded d-block img-thumbnail z-1" style={{ width: "20%", backgroundColor: "#b1835e" }} />
                    <div className='mx-3 fs-2 text-center flex-column mb-0'>
                        <p className="text-start" style={{ color: "#f9f6f3" }}>{selectedProduct.name}</p>
                    </div>
                </div>
            </div>
            <div className="mx-4 h-75">
                <div class="col pt-5">
                    <form class="row d-flex justify-content-center align-items-center">
                        <div className="col-md-12 d-flex mb-2">
                            <p className='text-uppercase fw-bold'>Unit Price : </p>
                            <p className="mx-3">${unitPrice}</p>
                        </div>
                        <div className="col-md-6">
                            <label for="inputTotal" className="form-label">Quantity</label>
                            <input type="number" step="1" className="form-control" id="inputQuantity" value={quantity} onChange={handleQuantityChange} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputTotal" className="form-label">Price</label>
                            <input type="number" className="form-control" id="inputQuantity" value={(unitPrice * quantity).toFixed(2)} />
                        </div>
                        <div className="col-md-12">
                            <label for="inputTotal" className="form-label">Product want to add</label>
                            <select
                                className="form-control"
                                id="inputQuantity"
                                value={selectedProductDetail}
                                onChange={(e) => setSelectedProductDetail(e.target.value)}
                            >
                                {receipt.productDetails.map((productDetail) => (
                                    <option value={productDetail.id}>
                                        {productDetail.id} - {productDetail.productSize.productName} - {productDetail.productSize.sizeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="col-md-10 btn btn-success mt-4 rounded handle"
                            style={{ height: '50px' }}
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </button>

                    </form>
                </div>
            </div>

        </div>
    )
}
export default CondimentItem;