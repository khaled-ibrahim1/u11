import { Badge } from "@material-ui/core";
import {ShoppingCartOutlined} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import {Responsive} from "../Responsive";
import { useDispatch,useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import {logout} from "../redux/apiCalls";



const Container = styled.div`

  width: 100%;
  background-image: linear-gradient(to top, white , rgb(0, 145, 171));
  ${Responsive({  
})}

`;

const Wrapper = styled.div`
  width: 90%;
  padding: 1% 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${Responsive({   width: "80%"
 })}

  
`;

const Left = styled.div`
width:10%;
  flex: 1;
  display: flex;
  align-items: center;
  ${Responsive({ padding: "0px 0px "
})}

`;

const SearchContainer = styled.div`
  align-items: center;
  margin-left: 5%;
  padding: 1%;
  ${Responsive({  
 height:"0px",   marginBottom:"95%"
  })}
`;

const Input = styled.input`
  ${Responsive({ width: "70px", })}
`;

const Center = styled.div`
  flex: 1;
  text-align: right;
  ${Responsive({ width: "100%"})}

`;

const Logo = styled.h1`
font-size: 25px;
width: 100%;
margin-bottom:175px;
  ${Responsive({ fontSize: "20px", marginLeft:"120px"

 })}
`;
const Right = styled.div`
width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${Responsive({ flex: 4, justifyContent: "center", width: "10%"

 })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-right: 20%;
  ${Responsive({ fontSize: "10px", marginRight: "30px", height:"90px", 
   width: "100%" })}
`;
const ProductIdContainer = styled.div`
width: 80%;
border:1px solid;
${Responsive({width: "280%", padding: "25%"

})}

`;
const ProductText = styled.text`
font-size: 10px;
${Responsive({fontSize: "5px"
})}
`

const Title = styled.text`
font-size: 28px;
${Responsive({ fontSize: "11px" })}
`


const Button = styled.button`
padding: 6.5%;
width: 100%;
`
const Logout = styled.button`
margin: 9px;
${Responsive({ fontSize: "10px"
 })}
`


const Navbar = () => {
  const dispatch = useDispatch();
   const quantity = useSelector(state=>state.cart.quantity);
   console.log(quantity);
   const user = useSelector((state) => state.user.currentUser);
   
   const handleDelete = (user) => {
    logout(dispatch, user);
  };
  const [productId,setProductId] = useState("");
  const history = useHistory();
  const handleInput = event => {
    setProductId(event.target.value);
  };
  const handleClick = () => {
    history.push(`/product/${productId}`);
  };
  

  return (

    <Container>
          <Wrapper>
          <Left>
          <ProductIdContainer>
<Title>Productname/ID</Title> <ProductText>(1.bravo apelsin 2 liter/625ecd66d7f978c8c66dbe78)  
(2.bravo äpple 2 liter/625f0fef42ed6d69eccf78f1)
(3.Ricekrispies/6264012fc79409ac37cb3f1a)
(4.Nesquik/62640265c79409ac37cb3f1c)
(5.Morötter 1kg/62640391c79409ac37cb3f1f)
(6.Tomater 500g/6264077ec79409ac37cb3f21)</ProductText>
</ProductIdContainer> 
          <SearchContainer>
   <Input placeholder="productId"
            onChange={handleInput}
            />   <Button onClick={handleClick}>Search</Button>

</SearchContainer>

    


   
      </Left>
      
      <Center><Logo>Grocery store online</Logo>
      
      
      
     </Center>

      <Right> 
      <MenuItem> <Link to="/register">REGISTER</Link></MenuItem>
      { user ? user.username : (
     <MenuItem><Link to="/login">SIGN IN</Link></MenuItem>
      )}
      <Logout onClick={() => handleDelete()}>
            Log out
          </Logout>  
        <Link to="/cart">
        <MenuItem>
        
          <Badge badgeContent= {quantity} color="primary">
            <ShoppingCartOutlined />
          </Badge>
        </MenuItem>
        
        </Link>

        </Right>
        </Wrapper>
            </Container>
    )
}

export default Navbar