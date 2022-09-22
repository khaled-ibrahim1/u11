import {
  MailOutline,
  PermIdentity,
} from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { updateUser } from ".././redux/apiCalls";

const UserContainer = styled.div`
flex: 4;
padding: 20px;
background-image: linear-gradient(to bottom, white , rgb(0, 145, 171));
`;

const UserShow = styled.div`
flex: 1;
  padding: 20px;
`;

const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserShowTop = styled.div`
`;

const UserShowBottom = styled.div`
    margin-top: 15px;
`;

const UserShowInfo = styled.div`
`;

const UserUpdate = styled.div`
  flex: 2;
  padding: 20px;
`;

const UserUpdateLeft = styled.div`
`;

const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const UserTitle = styled.h1`
`;

const UserShowTitle = styled.span`
  font-size: 20px;
`;

const UserUpdateTitle = styled.span`
  font-size: 24px;
    font-weight: 600;
`;
const UserUpdateForm = styled.form`
   display: flex;
    justify-content: space-between;
    margin-top: 20px;

`;

export default function User() {
  const location = useLocation();
  const [inputs, setInputs] = useState({});
  const userId = location.pathname.split("/")[2];
  const user = useSelector(state => state.user.users.find((user) => 
  user._id === userId)
  );
const dispatch = useDispatch();

const handleChange = (e) => {
  setInputs((prev) => {
    return { ...prev, [e.target.name]: e.target.value };
  });
};

const handleClick = (e) => {
  e.preventDefault();
  const user = { ...inputs };
  updateUser (userId, user, dispatch);

};
  return (
    <UserContainer>
      <UserTitleContainer>
        <UserTitle>Edit User</UserTitle>
      </UserTitleContainer>
        <UserShow>
          <UserShowTop>

            <UserShowTitle>Account Details</UserShowTitle>
            
          </UserShowTop>
          
          <>User id: {user._id} </>
<UserShowBottom>
              <PermIdentity/>
              <>Username: {user.username}</>
            <UserShowInfo>
            <MailOutline/>
            <>User email: {user.email}</>
            </UserShowInfo>
          </UserShowBottom>
        </UserShow>
        <UserUpdate>
          <UserUpdateTitle>Edit</UserUpdateTitle>
          <UserUpdateForm>
            <UserUpdateLeft>
            
              <UserUpdateItem>
                <label>username</label>
                <input name="username" type="text" placeholder={user.username}  
      onChange={handleChange}
                     />
              </UserUpdateItem>
              <UserUpdateItem
                                >
               <label>Email</label>
          <input name="email" type="email" placeholder={user.email}   
             onChange={handleChange}
                     />
              </UserUpdateItem>

          <label>Password</label>
          <input name="password" type="password" placeholder="password"
         onChange={handleChange}

        />
            </UserUpdateLeft>        
    <button
onClick={handleClick}>Update</button>

          </UserUpdateForm>
        </UserUpdate>
    </UserContainer>
  );
}