import React, { useMemo, useState, useContext } from "react";
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import useResponsiveFontSize from "./useResponsiveFontSize";
import ValidationError from "../ValidationError";
import orderModel from '../../../ApiManager/orders'
import Messages from "../../../Config/Messages";
import Constants from "../../../Config/Constants";
import { toast } from 'react-toastify';
import { AppContext } from "../../../Context";
import usersModel from "../../../ApiManager/user";
import SubmitBtn from "../SubmitBtn";

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
      () => ({
        style: {
          base: {
            fontSize,
            color:"#aab7c4",
            backgroundColor:"#1a1a1a", 
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
          },
          invalid: {
            color: "#9e2146"
          }
        }
      }),
      [fontSize]
    );
  
    return options;
};

const SplitForm = (props) => {
    
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    const authUser = props.authUser;

    const [clientSecret, setClientSecret] = useState('');
    const [loading, setloading] = useState(false);
    const [creditPoints, setcreditPoints] = useState('')
    const [errorObject, seterrorObject] = useState('')

    const authUserContext = useContext(AppContext)
        
    const getPaymentIntent = async (event) => {
      if(event.target.value){
        let cp = event.target.value
        let paymentIntent = await orderModel.postPaymentIntent({'creditPoints':cp});
        setClientSecret(paymentIntent.data.clientSecret);
        setcreditPoints(cp)
      }
    }

    const createPaymentMethod = async () => {
        const payload = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardNumberElement)
        });
        console.log("[PaymentMethod]", payload);

        if(payload.error){
          seterrorObject(payload.error)
        }
        return payload;
      };
    
    const resetPaymentForm = () => {
        elements.getElement(CardNumberElement).clear();
        elements.getElement(CardExpiryElement).clear();
        elements.getElement(CardCvcElement).clear();
    } 

    const confirmPayment = async () => {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: authUser.name,
              email:authUser.email, 
              address: {
                city: (authUser.city) ? authUser.city : Constants.defaultAddress.city,
                country: Constants.defaultAddress.country,
                line1: (authUser.address) ? authUser.address : Constants.defaultAddress.address,
                line2: null,
                postal_code: (authUser.zipcode) ? authUser.zipcode : Constants.defaultAddress.zipcode,
                state: (authUser.state) ? authUser.state : Constants.defaultAddress.state
              },
            },
          }
        });
      
      if (result.error) {
        setloading(false);
        toast.error(result.error.message)
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
            orderModel.postOrder({
              'user_id':authUser.id,
              'credits':creditPoints,
              'amount': result.paymentIntent.amount,
              'transction_id':result.paymentIntent.id,
              'paymentIntent': result.paymentIntent
            })
            .then((res) => {
              return usersModel.getAuthUser()
            })
            .then((res) => {
              setloading(false);
              resetPaymentForm();
              authUserContext.handleEvent({authUser:res.data.data})
              toast.success(Messages.paymentSuccess)
            })
            .catch(error => toast.error(error))
        }
      }
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      
      if(creditPoints == '' || creditPoints == undefined){
        let error = {'type':'validation_error', 'code':'incomplete_creditPoints', 'message':Messages.isRequired};
        seterrorObject(error);
      }else{
        let pm = await createPaymentMethod();
        console.log(pm.paymentMethod.id)
        
        if(pm.paymentMethod.id){
          setloading(true);
          confirmPayment();
        }
      }
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <p className="contact-form-name">
              <label htmlFor="name">Credit Points
                <span className="required">*</span>
              </label>
              <input type="number" name="creditPoints" className="form-control" onChange={ getPaymentIntent } placeholder="Credit Points" />
              {(errorObject && errorObject.type == 'validation_error' && errorObject.code == 'incomplete_creditPoints') ? <ValidationError message={errorObject.message} /> : '' }
            </p>
            <p className="contact-form-name">
                <label htmlFor="name">Card Number
                  <span className="required">*</span>
                </label>
                <CardNumberElement className="form-control" options={options} />
                {(errorObject && errorObject.type == 'validation_error' && errorObject.code == 'incomplete_number') ? <ValidationError message={errorObject.message} /> : '' }
            </p>

            <p className="contact-form-name">
              <label htmlFor="name">Expiration Date
                <span className="required">*</span>
              </label>
              <CardExpiryElement className="form-control" options={options} />
              {(errorObject && errorObject.type == 'validation_error' && errorObject.code == 'incomplete_expiry') ? <ValidationError message={errorObject.message} /> : '' }
            </p>

            <p className="contact-form-name">
              <label htmlFor="name">CVC
                <span className="required">*</span>
              </label>
              <CardCvcElement className="form-control" options={options} />
              {(errorObject && errorObject.type == 'validation_error' && errorObject.code == 'incomplete_cvc') ? <ValidationError message={errorObject.message} /> : '' }
            </p>

            <SubmitBtn inprogress={loading} value="Pay" />       
        </form>
    );
};

export default SplitForm;