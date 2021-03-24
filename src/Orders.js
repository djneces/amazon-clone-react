import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import Order from './Order';
import './Orders.css';
import { useStateValue } from './StateProvider';

function Orders() {
    // states 
    const [{ basket, user }, dispatch] = useStateValue(); 
    const [orders, setOrders] = useState([]); 

    //when the app loads, run only once [], without [] is not the same !
    useEffect(() => {
        if(user) {

        db
        .collection('users')  //users collection
        .doc(user?.uid)  //specific user
        .collection('orders')  //specific user's orders collection
        .orderBy('created', 'desc') // most recent orders on top - ordered by created descending ( or - asc)
        .onSnapshot(snapshot => (  //updates in realtime, mapping through a list
            setOrders(snapshot.docs.map(doc => ({ 
                id: doc.id,
                data: doc.data()
            })))
        ))

    } else {
        setOrders([])
    }

    }, [user]) // we depend on user variable, if statement, thus we need to put it here in the end 

    return (
        <div className="orders">
          <h1>Your Orders</h1> 

          <div className="orders__order">
              {orders?.map(order => (
                 <Order order={order} /> 
              ))}
              </div> 
        </div>
    )
}

export default Orders
