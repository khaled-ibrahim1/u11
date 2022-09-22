import React from "react";
import { BrowserRouter as Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {logout} from "../redux/apiCalls";

const Button = styled.button `

`
const Title = styled.span `
  font-weight: bold;
  font-size: 26px;
  color: black;
`
const AdminUser = styled.span `
  cursor: pointer;
`
const TopBar = styled.div `
background-image: linear-gradient(to top, white , rgb(0, 145, 171));
  width: 100%;
  height: 50px;
  position: sticky;
`
const TopbarWrapper = styled.div `
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export default function Topbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.currentUser)
  const handleDelete = (user) => {
    logout(dispatch, user);
  };

  return (
    <TopBar>
      <TopbarWrapper>
          <Title>Grocery store admin</Title>
        <Link to="/CreateNewUser">
        Create new user
        </Link>
        
          { user ? user.username : (
          <AdminUser><Redirect to="/adminlogin"/></AdminUser>
          )}
            <Button onClick={() => handleDelete()} >
        Logout
          </Button>
           
      </TopbarWrapper>
    </TopBar>
  );
}