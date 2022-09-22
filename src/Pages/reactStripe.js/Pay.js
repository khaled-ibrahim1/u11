import { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const KEY = "pk_test_51KqbvHGunHGY4fuzQEcn4pjIJKqgCZzGdbN42nXGGunZOwCR0IjDNTJSvsT1WY7j8nap2fXTXVMufdI7Xz5B5c2400dXgYCR32"

const Pay = () => {
    const [stripeToken,setStripeToken] = useState(null)

    const onToken = (token) => {
    setStripeToken(token);
 };
 useEffect(()=> {
     const makeRequest = async () =>{
         try{
         const res = await axios.post("http://localhost:5000/api/checkout/payment",
         {
    tokenId: stripeToken.id,
    amount: 2000,
         }
         );
         console.log(res.data);
        
         } catch(err) {
             console.log(err);
         }
     };
     stripeToken && makeRequest()
 }, [stripeToken]);
    return (
        <div 
        style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            
            <StripeCheckout 
            name="grocerystore online"
        billingAddress
        shippingAddress
        amount={2000}
        token={onToken}
        stripeKey={KEY}
        >
        <button
        style={{
         border: "none",
         width: 120,
         borderRadius: 5,
         padding: "20px",
         backgroundColor: "black",
         color: "white",
         fontWeight: "600",
         cursor: "pointer",
        }}
        >
        pay now
        </button>
        </StripeCheckout>
        </div>
    );
};
export default Pay
