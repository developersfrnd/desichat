import React, { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import SplitForm from './CheckoutForm'
import Sidebar from '../../Profile/Sidebar'
import userModel from '../../../ApiManager/user'


const stripePromise = loadStripe("pk_test_51HNjZOIX1zbhIrFLSzy1OUP4WBdWJ3LQCUQJR4NbV5RM4P60lDsgmieKOrSPqPxTIPU9aYNCFMwnwOPz2jvvvqSb00QH4NMMe4");

function Payment() {

    const [authUser, setauthUser] = useState({});

    useEffect(() => {
        userModel.getAuthUser()
          .then((res) => {
            setauthUser(res.data.data);
        })
  
    }, [])

    return (

        <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
            <div className="container">
                <div className="row">
                    <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                            <h3>Purchase Credit Points</h3>
							<Elements stripe={stripePromise}>
                                <SplitForm authUser={authUser} />
                            </Elements>
                    </div>
                    <Sidebar />
                </div>
            </div>
        </section>
    )
}

export default Payment
