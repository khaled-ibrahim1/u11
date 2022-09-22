import styled from "styled-components";
import Navbar from '../components/Navbar';
import { RemoveCircleOutlined } from '@material-ui/icons';
import { AddCircleOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { publicRequest } from "../requestMethods";
import { useLocation } from 'react-router-dom';
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from 'react-redux';
import {Responsive} from "../Responsive";


const Container = styled.div`
`;

const Wrapper = styled.div`
  padding: 170px;
  display: flex;
  ${Responsive({ padding: "85px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  ${Responsive({ height: "35vh",  
 })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${Responsive({ padding: "10px" })}
`;

const Title = styled.h1`
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-size: 35px;
`;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  ${Responsive({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 20px;
  height: 20px;
  border: 1px solid green;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 1px solid green;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #f8f4f4;
  }
`;


const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();



    useEffect(() => {
        const getProduct = async () => {
          try {
            const res = await publicRequest.get("/products/find/" + id);
            setProduct(res.data);
          } catch {}
        };
        getProduct();
      }, [id]);

      const handleQuantity = (type) => {
        if (type === "dec") {
          quantity > 1 && setQuantity(quantity - 1);
        } else {
          setQuantity(quantity + 1);
        }
      };
    
    const handleClick = ()=> {
        dispatch(addProduct({ ...product, quantity}));
    };
  return (

<Container>

<Navbar/>
<Wrapper>
<ImgContainer>
<Image src={product.img}/> 
</ImgContainer>
<InfoContainer>
    <Title>{product.title}</Title>
    <Desc>{product.desc}</Desc>
        <Price>{product.price} KR </Price>
        <AddContainer>
        <AmountContainer>
              <RemoveCircleOutlined onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <AddCircleOutlined onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>Add to cart</Button>
        </AddContainer>
        
</InfoContainer>

</Wrapper>
</Container>
    )
}

export default Product