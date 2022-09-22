import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {mobile} from "../Responsive";
import { useHistory } from "react-router-dom";
import styled from "styled-components";



const Container = styled.div`
background-image: linear-gradient(to top, white , rgb(0, 145, 171));
width: 100%;
height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

`
const Input = styled.input`
flex: 1;
min-width: 40px;
margin: 10px 0px ;
padding: 10px;


`
const Wrapper = styled.div`
width: 25%;
padding: 20px;
${mobile({ width: "75%" })}

`
const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`
const Title = styled.h1`
text-align: center;

`
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  margin-bottom: 10px;
  
  `

const Error = styled.span`
color: red;
`

const Login = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const history = useHistory();


  const handleClick = (e)=>{
    e.preventDefault()
    login(dispatch, { username, password});
  }
  const handleSearchClick = () => {
    history.push(`/register`);
  };

  return (
    
<Container>
<Wrapper>
    <Title>Login</Title>
        <Form>
          
            <Input placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            />
            <Input placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}

            />
<Button onClick={handleClick} disabled={isFetching}>Login</Button>
{error &&<Error>something went wrong...</Error>}
<Button onClick={handleSearchClick}>Create a account</Button>

        </Form>
        </Wrapper>
</Container>  )
}

export default Login