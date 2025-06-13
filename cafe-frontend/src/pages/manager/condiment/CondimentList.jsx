import right from '../../../assets/images/right.png'
import condimentService from '../../../services/condiment.service';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import add from '../../../assets/images/add.png'


const CondimentList = () => {

    const [condimentStatusFilter, setCondimentStatusFilter] = useState("ALL")
    const [condiments, setCondiments] = useState(null);
    const [status, setStatus] = useState('process');

    useEffect(() => {
        condimentService.getAll()
            .then(data => {
                setCondiments(data);
                setStatus('finish');
            })
            .catch(error => {
                console.error('There was an error!', error);
                setStatus('error');
            });
    }, []);


    return (
        <div className="ProductList">
            <div class="my-3">
                <div class="mx-3 mx-1 my-1 bg-custom p-2 rounded">
                    <div class="d-flex " id="filter-bar">
                        <div class="dropdown w-15">
                            <select
                                className="form-select"
                                value={condimentStatusFilter}
                                onChange={(e) => setCondimentStatusFilter(e.target.value)}
                            >
                                <option value="ALL">All</option>
                                <option value="ABLE">Available</option>
                                <option value="OUTSTOCK">Out of stock</option>
                                <option value="ENABLE">Unavailable</option>
                            </select>

                        </div>
                        <div class="" style={{ marginRight: '0px', marginLeft: 'auto', width: '10%' }}>
                            <a class="btn btn-success w-100" href='add-condiment'>
                                <img src={add} alt="add" className="button-transition" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-3">
                        {status === 'process' && <h1>Loading...</h1>}
                        {status === 'finish' && (
                            <table className="table table-striped  table-hover">
                                <thead className="thead-dark">
                                    <tr className='text-center'>
                                        <th style={{ paddingLeft: "50px" }} scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Status</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {condiments
                                        .filter(condiment => {
                                            if (condimentStatusFilter === "ALL") return condiment;
                                            else if (condimentStatusFilter === condiment.productStatus) return condiment;

                                        })
                                        .map((condiments, index) => (

                                            <tr class="text-center" key={index}>
                                                <th style={{ paddingLeft: "50px" }} scope="row">{condiments.id}</th>
                                                <td>{condiments.name}</td>
                                                <td>{"$" + condiments.unitPrice}</td>
                                                <td>
                                                    {
                                                        condiments.productStatus === 'ABLE' ? 'Available' :
                                                            condiments.productStatus === 'OUTSTOCK' ? 'Out of stock' :
                                                                condiments.productStatus === 'ENABLE' ? 'Unavailable' :
                                                                    'Unknown status'
                                                    }
                                                </td>
                                                <td className='d-flex justify-content-end'><Link to={`/manager/condiments/${condiments.id}`}><img src={right} alt="right"
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
    )
}

export default CondimentList;