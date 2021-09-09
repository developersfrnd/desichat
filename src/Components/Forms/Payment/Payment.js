import React, { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import SplitForm from './CheckoutForm'
import Sidebar from '../../Profile/Sidebar'
import userModel from '../../../ApiManager/user'


const stripePromise = loadStripe("pk_live_51JViN3SIdXw5Deq1VhjDlpUOgubnt1LKteSM4f5NOG1sbq9nbGTEZycIBK6Gm2gU7Lnvg6QgI3591wimrF1umh3C00DwiRiElS");

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
