import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";
import Navbar from '../components/Navbar';
import {Responsive} from "../Responsive";
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from "react-router";

import {userRequest} from '../requestMethods';


const Key = process.env.REACT_APP_STRIPE_KEY;


const Container = styled.div`

`
const Wrapper = styled.div`
padding: 20px;
${Responsive({ })}


`
const Top = styled.h1`
display: flex;
align-items: center;
justify-content: space-between;

`
const TopText = styled.span`
text-decoration: none;
cursor: pointer;
${Responsive({ fontSize:"20px"  })}
`
const Info = styled.div`

`

const Bottom = styled.div`
display: flex;
justify-content: space-between;
${Responsive({  })}


`
const Product = styled.div`
display: flex;
justify-content: space-between;
${Responsive({ })}
`
const ProductDetail = styled.span`
flex: 2;
display: flex;

`
const Image = styled.img`
width: 200px;
${Responsive({ width: "50px"
 })}


`
const Details = styled.div`
display: flex;
flex-direction: column;
padding: 20px;

`
const ProductName = styled.span`

${Responsive({ fontSize: "10px"
 })}
`
const PriceDetail = styled.div`
display: flex;
flex-direction: column;
padding: 20px;
flex:1;

`

const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
${Responsive({ fontSize: "16px"
 })}

`
const ProductAmount = styled.div`
font-size: 24px;
margin: 5px;
${Responsive({ fontSize:"17px", margin: "1px"
})}

`
const Hr = styled.hr`


`
const Summary = styled.div`
flex: 1;
border: 0.5 solid lightgray;
border-radius: 10px;
padding: 20px;

`
const SummaryItem = styled.div`
margin: 30px;
${Responsive({ fontSize: "10px"
 })}
`
const SummaryItemPrice = styled.span`

`
const SummaryItemText = styled.span`

`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  ${Responsive({ fontSize: "10px"
 })}
`

const Cart = () => {
    const quantity = useSelector(state=>state.cart.quantity);
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();
  
    const onToken = (token) => {
      setStripeToken(token);
    };
    useEffect(() =>{
const makeRequest = async () => {
    try{
        const res = await userRequest.post("/checkout/payment", {
            tokenId: stripeToken.id,
            amount: 500,
        });
        history.push("/success", {data: res.data});
    } catch {}
};
stripeToken && makeRequest();
}, [stripeToken, cart.total, history]);
  
  return (
<Container>
    <Navbar/>
    <Wrapper>
        <Top>
            <TopText>Cart ({quantity})</TopText>
        </Top>
        <Bottom>
            <Info>
{cart.products.map((product) =>(
<Product>
    <ProductDetail>
<Image src ={product.img} />
<Details>
    <ProductName><b>Product: </b>
    {product.title} </ProductName>

</Details>
    </ProductDetail>
    <PriceDetail>
<ProductAmount>Antal:{product.quantity}</ProductAmount>
            <ProductPrice>KR {product.price*product.quantity} </ProductPrice>
    </PriceDetail>
</Product>
))}
<Hr/>

            </Info>
            <Summary>
    
                <SummaryItem>
                <SummaryItemText type="total">Totalsumma</SummaryItemText>
                <SummaryItemPrice>: {cart.total} KR </SummaryItemPrice>
                </SummaryItem>

                <StripeCheckout
              name="livsmedelsbutik online"
              billingAddress
              shippingAddress
              description={`Ordersumma ${cart.total} Kr`}
              amount={cart.total *100}
              token={onToken}
              stripeKey={Key}
            >
              <Button>Gå till checkout</Button>
            </StripeCheckout>
            </Summary>
        </Bottom>
    </Wrapper>
</Container>
    )
}

export default Cart