import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import bg from '../../../assets/images/coffee-cup.png'
import orderService from '../../../services/order.service'
import { useRef, useState } from 'react';
const MenuItem = ({ selectedProduct, receipt, closeMenu, }) => {

    const [currentPrice, setCurrentPrice] = useState(selectedProduct.sizes[0].price);
    const [currentSize, setCurrentSize] = useState(selectedProduct.sizes[0].name);
    const [quantity, setQuantity] = useState(1);

    const handleSizeChange = (event) => {
        const selectedSize = event.target.value;
        const sizeObj = selectedProduct.sizes.find(size => size.name === selectedSize);
        setCurrentPrice(sizeObj.price);
        setCurrentSize(selectedSize);
    };

    const handleQuantityChange = (event) => {
        if (!isNaN(event.target.value) && event.target.value >= 0) {
            setQuantity(event.target.value);
        }
        else toast.error("Select Again!!");
    };

    const handleAddToCart = () => {
        const sizeId = currentSize === 'S' ? 1 : currentSize === 'M' ? 2 : 3;
        const body = {
            productId: selectedProduct.id,
            sizeId: sizeId,
            receiptId: receipt.id,
            quantity: quantity
        };
        orderService.addProductReceipt(body)
            .then(response => {
                console.log('Product added to receipt successfully', response);
                toast.success(`${selectedProduct.name} added successfully`)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className="w-50 pb-2 container bg-white px-0 rounded">

            <div className="w-100 align-items-center rounded pt-2" style={{ backgroundColor: "#885b46" }}>
                <a class="close text-center align-items-center h-25 w-15 mx-2 my-2 " onClick={closeMenu}>
                    <div class="material-symbols-outlined handle mx-1 my-2 ">
                        close
                    </div>
                </a>
                <div className="container mx-2 d-flex justify-content-center align-items-center">
                    <img src={selectedProduct.image ? selectedProduct.image : bg} className="rounded d-block img-thumbnail z-1" style={{ width: "20%", backgroundColor: "#b1835e" }} />
                    <div className='mx-3 fs-2 text-center flex-column mb-0 w-75'>
                        <p className="text-start overflow-auto" style={{ color: "#f9f6f3" }}>{selectedProduct.name}</p>
                    </div>
                </div>
            </div>
            <div className="mx-4 my-3 h-75">
                <div class="col pt-5">
                    <form class="row d-flex justify-content-center align-items-center">
                        <div className="col-md-12 d-flex mb-2">
                            <p className='text-uppercase fw-bold'>Current cost : </p>
                            <p className="mx-3">${currentPrice}</p>
                        </div>
                        <div className="col-md-6">
                            <label for="inputTotal" className="form-label">Size</label>
                            <select id="inputType" className="form-select" onChange={handleSizeChange}>
                                {selectedProduct.sizes.map((size, index) => (
                                    <option key={index} value={size.name}>{size.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label for="inputTotal" className="form-label">Quantity</label>
                            <input type="number" step="1" className="form-control" id="inputQuantity" value={quantity} onChange={handleQuantityChange} />
                        </div>
                        <button className="col-md-10 btn btn-success mt-4 rounded " style={{ height: '50px' }} onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />

        </div>
    )
}

export default MenuItem;