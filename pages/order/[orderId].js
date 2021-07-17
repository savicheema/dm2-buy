import React from 'react';
import { useRouter } from 'next/router';

export default function Order(props) {
    const router = useRouter();
    const orderId = router.query.orderId;
    console.log(router.query, 'pp');
    return (
        <div>
            <p style={{ color: '#10B981' }}>
                Order Successfull with order ID: {orderId}
            </p>
        </div>
    );
}
