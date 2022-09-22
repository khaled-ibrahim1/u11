import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/apiCalls";
import {Responsive} from "../Responsive";

const Container = styled.div`
background-image: linear-gradient(to top, white , rgb(0, 145, 171));
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${Responsive({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const Register = () => {
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();
  
  
    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }; 
    
    const handleClick = (e) => {
      e.preventDefault();
      const user = { ...inputs };
      registerUser( user, dispatch);
  };
  return (
<Container>
    <Wrapper>
    <Title>Register new user</Title>
        <Form>
            <Input name="username" type="text" placeholder="username" onChange={handleChange}/>
            <Input name="email" type="email" placeholder="email" onChange={handleChange}/>
            <Input name="password" type="password" placeholder="password" onChange={handleChange}/>

<Button onClick={handleClick}>Register</Button>
        </Form>
    </Wrapper>

</Container> 
)
}
export default Register