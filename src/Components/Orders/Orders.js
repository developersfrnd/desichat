import React, { useState, useEffect } from 'react';
import Sidebar from '../Profile/Sidebar';
import userModel from '../../ApiManager/user'
import orderModel from '../../ApiManager/orders'
import Loading from '../Loaders/Loading';
import PaginationLinks from '../../Containers/Pagination/PaginationLinks';

function Orders() {

    const [orders, setorders] = useState([]);
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)

    useEffect(() => {
        orderModel.getOrders({params:{page:page}})
        .then((res) => {
            setorders(res.data);
            setloading(false)
        })
    }, [page])

    const clickPageNumberHandler = (pageNumber) => {
        setpage(pageNumber);
    }
    
    return (
        (loading) ? <Loading /> :
        <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
            <div className="container">
                <div className="row">
                    <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                        <h3>Order History</h3>
                        <div className="table-responsive">
                            <table className="table_template darklinks" id="timetable">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Credits</th>
                                        <th>Price / Credit</th>
                                        <th>Amount</th>
                                        <th>Order Number</th>
                                        <th>Ordered At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    (!(orders.data).length) ? 
                                        <tr>
                                            <td colSpan="7" align="center"> No Orders Found </td>
                                        </tr>

                                        : 
                                    
                                        orders.data.map((order, index) => {
                                            return (
                                                <tr key={order.id}>
                                                    <th>{index + 1}</th>
                                                    <td>{order.credits}</td>
                                                    <td>{order.pricePerCredit}</td>
                                                    <td>{order.amount}</td>
                                                    <td>{order.transction_id}</td>
                                                    <td>{(order.created_at).substr(0, 10)}</td>
                                                </tr>
                                            )
                                        })    
                                    }
                                </tbody>
                            </table>

                            <PaginationLinks meta={orders.meta} clickEvent={clickPageNumberHandler} />
                        </div>
                    </div>
                    <Sidebar />
                </div>
            </div>
        </section>
    )
}

export default Orders
