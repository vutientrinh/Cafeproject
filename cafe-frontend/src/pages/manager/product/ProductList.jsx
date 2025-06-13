import { useState, useEffect } from 'react';
import productService from '../../../services/product.service';
import add from '../../../assets/images/add.png'
import { Link } from 'react-router-dom';
import right from '../../../assets/images/right.png'

const ProductList = () => {

    const [productStatusFilter, setProductStatusFilter] = useState("ALL")
    const [productTypeFilter, setProductTypeFilter] = useState("ALL")

    const [products, setProducts] = useState(null);
    const [status, setStatus] = useState('process');

    useEffect(() => {
        productService.getAll()
            .then(data => {
                setProducts(data);
                setStatus('finish');
            })
            .catch(error => {
                console.error('There was an error!', error);
                setStatus('error');
            });
    }, []);


    return (
        <div className="ProductList w-100 thumnail" style={{ height: '90%' }}>
            <div class="my-3 h-100">
                <div class="mx-3 h-100 mx-1 my-1 bg-custom p-2 rounded">
                    <div class="h-auto container d-flex" id="filter-bar">
                        <div class="w-15" style={{ background: '' }}>
                            <label class="form-label mb-0" style={{ color: "black", zIndex: "1", marginLeft: "10px" }}>Status</label>
                            <select className="form-select form-select-lg" style={{ marginTop: '-10px', backgroundColor: '#e2c8a5' }}
                                value={productStatusFilter}
                                onChange={(e) => setProductStatusFilter(e.target.value)}>
                                <option value="ALL">All</option>
                                <option value="ABLE">Available</option>
                                <option value="OUTSTOCK">Out of stock</option>
                                <option value="ENABLE">Unavailable</option>
                            </select>
                        </div>
                        <div class="w-15 mx-5" style={{ background: '' }}>
                            <label class="form-label mb-0" style={{ color: "black", zIndex: "1", marginLeft: "10px" }}>Type</label>
                            <select className="form-select form-select-lg" style={{ marginTop: '-10px', backgroundColor: '#e2c8a5' }}
                                value={productTypeFilter}
                                onChange={(e) => setProductTypeFilter(e.target.value)}>
                                <option value="ALL">All</option>
                                <option value="CAFE">Cafe</option>
                                <option value="MILKTEA">Milk Tea</option>
                                <option value="SOFTDRINK">Softdrink</option>
                                <option value="SMOOTHIE">Smoothie</option>
                                <option value="FOOD">Food</option>
                            </select>
                        </div>

                        <div class="" style={{ marginRight: '0px', marginLeft: 'auto', width: '10%' }}>
                            <a class="btn btn-success w-100" href='add-product'>
                                <img src={add} alt="add" className="button-transition" />
                            </a>
                        </div>
                    </div>
                    <div class="mt-3 container" style={{ height: '100%' }} >
                        <div style={{ overflowY: 'scroll', height: '80%', overflowX: "hidden" }}>

                            {status === 'process' && <h1>Loading...</h1>}
                            {status === 'finish' && (
                                <table className="table table-striped  table-hover">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Discount</th>
                                            <th scope="col">Status</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products
                                            .filter(product => {
                                                if (productStatusFilter === "ALL" && productTypeFilter === "ALL") {
                                                    return product;
                                                }
                                                else if (productTypeFilter === "ALL" && productStatusFilter === product.productStatus) {
                                                    return product;
                                                }
                                                else if (productStatusFilter === "ALL" && productTypeFilter === product.productType) {
                                                    return product;
                                                }
                                                else if (productStatusFilter === product.productStatus && productTypeFilter === product.productType) {
                                                    return product;
                                                }
                                            }).map((product, index) => (

                                                <tr key={index}>
                                                    <th scope="row">{product.id}</th>
                                                    <td>{product.name}</td>
                                                    <td>{product.productType}</td>
                                                    <td>{product.discount}</td>
                                                    <td>
                                                        {
                                                            product.productStatus === 'ABLE' ? 'Available' :
                                                                product.productStatus === 'OUTSTOCK' ? 'Out of stock' :
                                                                    product.productStatus === 'ENABLE' ? 'Unavailable' :
                                                                        'Unknown status'
                                                        }
                                                    </td>

                                                    <td><Link to={`/manager/products/${product.id}`}><img src={right} alt="right"
                                                        className="button-transition" /></Link>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            )}
                            {status === 'error' && <h1>Đợi 1 xíu...</h1>}
                            {status === 'empty' && <h1>Empty...</h1>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList;