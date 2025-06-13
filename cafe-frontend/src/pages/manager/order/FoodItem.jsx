import { useState, useEffect } from "react";
import orderService from "../../../services/order.service";
import bg from '../../../assets/images/coffee-cup.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import productService from "../../../services/product.service";
const FoodItem = ({ receipt, setReceipt, closeMenu, }) => {

    const navigate = useNavigate()
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [foodProducts, setFoodProducts] = useState([]);

    useEffect(() => {
        productService.getAll()
            .then(products => {
                const foodProducts = products.filter(product => product.productType === 'FOOD');
                setFoodProducts(foodProducts);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);



    const handleAddToCart = async () => {
        try {
            // Create the body for the API call
            const body = {
                foodId: selectedProduct,  // Assuming selectedProductDetail is the id of the selected food
                receiptId: receipt.id
            };

            // Call addGiftCustomer from orderService
            const result = await orderService.addGiftCustomer(body);

            // Set the receipt state with the result
            navigate("/manager/cart")

            // Handle the result here. For example, you might want to show a success message:

            toast.success('Food item added to cart successfully!');

        } catch (error) {
            console.error('There was an error!', error);
            // Handle the error here. For example, you might want to show an error message:
            toast.error('Failed to add food item to cart.');
        }
    };



    return (
        <div className="w-50 h-50 container bg-white px-0 rounded">

            <div className="h-25 w-100 d-flex align-items-center rounded" style={{ backgroundColor: "#885b46" }}>
                <a class="handle text-center align-items-center mx-2" onClick={closeMenu}>
                    <div class="material-symbols-outlined" >
                        close
                    </div>
                </a>
                <div className="w-100 d-flex justify-content-center align-items-center" style={{ marginTop: "15%" }}>
                    <img src={bg} className="rounded d-block img-thumbnail z-1" style={{ width: "20%", backgroundColor: "#b1835e" }} />
                    <div className='mx-3 fs-2 text-center flex-column mb-0'>
                        <p className="text-start" style={{ color: "#f9f6f3" }}></p>
                    </div>
                </div>
            </div>
            <div className="p-4 my-3 h-75 w-100">
                <div class="col pt-5">
                    <form class="row d-flex justify-content-center align-items-center">
                        <div className="col-md-12">
                            <label for="inputTotal" className="form-label">Product want to add</label>
                            <select
                                className="form-control"
                                id="inputQuantity"
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                            >
                                {foodProducts.map((product) => {
                                    const sizeL = product.sizes.find(size => size.name === 'L');
                                    return (
                                        <option value={product.id}>
                                            {product.id} - {product.name} - ${sizeL ? sizeL.price : 'N/A'}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button
                            className="col-md-10 btn btn-success mt-4 rounded"
                            style={{ height: '50px' }}
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </button>

                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
export default FoodItem;