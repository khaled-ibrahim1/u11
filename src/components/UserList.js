import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, } from "react-router-dom";
import { useEffect } from "react";
import { deleteUser, getUsers } from "../redux/apiCalls";


const Userlist = styled.div`
background-image: linear-gradient(to bottom, white , rgb(0, 145, 171));
  height: 600px;
  align-items: center;
  overflow-x:auto;
`;
const UserListEdit = styled.button`
    padding: 5px 10px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    width: 100%;
`;


export default function UserList() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);



  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  
  const columns =[
    
    {
      field: "username",
      headerName: "User",
      width:300,
      renderCell: (params) => {
        return (
          <>
            {params.row.username}
            </>
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      width:300,
      
      renderCell: (params) => {
        return (
          <>
            {params.row._id}
            </>
        );
      },
    },
    {
      field: "email",
      headerName: "email",
      width:310,
      renderCell: (params) => {
        return (
          <>
            {params.row.email}
            </>
        );
      },
    },
  
    {
      field: "action",
      headerName: "Action",
      width:220,
      renderCell:(params)=>{
        return(
            <>
      <Link  to={"/user/"+ params.row._id}><UserListEdit>Edit</UserListEdit></Link> 
            <DeleteOutline onClick={()=>handleDelete(params.row._id)}  />
            </>
        );
      },
    },
  ];

  return (
    <Userlist>
    <DataGrid
    rows={users}
    disableExtendRowFullWidth={true}
    disableSelectionOnClick
    columns={columns}
    getRowId={(row) => row._id}
    pageSize={8}
    />
  </Userlist>

  );
}
