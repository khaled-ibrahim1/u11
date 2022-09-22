import { loginFailure, loginStart, loginSuccess, logoutStart, logoutSuccess, logoutFailure,
    registerUserStart, registerUserSuccess, registerUserFailure, deleteUserStart, deleteUserSuccess, 
    deleteUserFailure, getUserStart, getUserSuccess, getUserFailure,  
    updateUserStart, updateUserSuccess, updateUserFailure, 
    addUserStart, addUserSuccess, addUserFailure,  } from './userRedux'
    import { publicRequest, userRequest, } from '../requestMethods'
    
    
    

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
   const res = await publicRequest.post("/auth/login", user)
   dispatch(loginSuccess(res.data));
    } catch(err) {
        dispatch(loginFailure());
    }
};
export const registerUser = async (user, dispatch) => {
    dispatch(registerUserStart());
    try {
      const res = await userRequest.post(`/auth/register`, user);
      dispatch(registerUserSuccess(res.data));
    } catch (err) {
      dispatch(registerUserFailure());
    }
  };
  export const logout = async (dispatch, user) => {
    dispatch(logoutStart());
    try {
      dispatch(logoutSuccess(user));
    } catch (err) {
      dispatch(logoutFailure());
    }
  };
  
  export const deleteUser = async (_id, dispatch) => {
    dispatch(deleteUserStart());
    try {
    const res = await userRequest.delete(`/users/${_id}`);
      dispatch(deleteUserSuccess(res.data));
    } catch (err) {
      dispatch(deleteUserFailure());
    }
  };
  export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
      const res = await publicRequest.get("/users");
      dispatch(getUserSuccess(res.data));
    } catch (err) {
      dispatch(getUserFailure());
    }
  };
        // update
        export const updateUser = async ( _id, user, dispatch) => {
          dispatch(updateUserStart());
          try {
          // update
          const res = await userRequest.put(`/users/${_id}`, user );
  
            dispatch(updateUserSuccess(res.data, ));
          } catch (err) { 
            dispatch(updateUserFailure());
          }    
        };
  
    export const addUser = async (user, dispatch) => {
      dispatch(addUserStart());
      try {
        const res = await userRequest.post(`/auth/register`, user);
        dispatch(addUserSuccess(res.data));
      } catch (err) {
        dispatch(addUserFailure());
      }
    };