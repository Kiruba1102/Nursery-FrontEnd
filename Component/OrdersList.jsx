import React, { useState, useEffect } from 'react';

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/shippings/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const date=sessionStorage.getItem("date");
  const cname=sessionStorage.getItem("cname");


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Orders List</h2>
      <table className="table table-bordered ">
        <thead  className=" table-dark">
          <tr>
            <th>Shipping ID</th>
            <th>Customer Name</th>
            <th>Plant ID</th>
            <th>Total Price</th>
            <th>Payment Method</th>
            <th>Orderd Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            order.cartItem.map(item => (
              <tr key={item.cartId}>
                <td>{order.shipId}</td>
                <td>{cname}</td>
                <td>{item.plant.pid}</td>
                <td>{order.totalPrice}</td>
                <td>{order.payment}</td>
                <td>{date}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersList;
