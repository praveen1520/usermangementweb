import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const UserList = () => {
//users list variable and pagination variables
  const [UserList, SetUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // for navigation

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const Url = "https://jsonplaceholder.typicode.com/users";
      const GetUserDetails = await axios.get(Url); // making an api call to get the data
      const transformedData = GetUserDetails.data.map((user) => { //tranforming the data to required data format
        const [FirstName, LastName] = user.name.split(" ");
        return {
          id: user.id,
          FirstName: FirstName,
          LastName: LastName,
          Email: user.email,
          DepartMent: user.company.name,
        };
      });
      
      SetUsersList(transformedData); // setting up the data into state variable
    } catch (error) {
      alert(error.message) // showing error mesaage

    } finally {
      setIsLoading(false); // after succeffully updation update state variable to false
      
    }
  };

  const deleteUser = async (id) => {
    // Delete user functionality
    try{
        const url=`https://jsonplaceholder.typicode.com/users/:${id}`
        const deleteuserDetails=await axios.delete(url)
        console.log(deleteuserDetails)
        alert("Deleted successFully")
        const updatedList = UserList.filter((user) => user.id !== id);
        SetUsersList(updatedList);
    }catch(error){
        console.log(error.message)
        alert(error.message)
    }
    
  };

  const handleUpdate = (id) => {
    //for updating the form 
    navigate(`/updateForm/${id}`);
  };

  const handleAdd = () => {
    //navigating to addfor component
    navigate(`/addForm`);
  };
// for nextpage pagination
  const handleNextPage = () => {
    if (currentPage < Math.ceil(UserList.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  //for previous page navigation
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchUserDetails(); //making the api call
  }, []);
  // pagination setup variables
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = UserList.slice(indexOfFirstUser, indexOfLastUser);

  return (
    //container users  data
    //table for users to display
    <div className="container">
      <h1 className="heading">User Mangement DashBoard</h1>  
      <button className="btn add-btn" onClick={handleAdd}> 
        Add User 
      </button>
      <div className="table-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody> 
                {currentUsers.map((each) => (
                  <tr key={each.id}>
                    <td>{each.id}</td>
                    <td>{each.FirstName}</td>
                    <td>{each.LastName}</td>
                    <td>{each.Email}</td>
                    <td>{each.DepartMent}</td>
                    <td>
                      <button
                        className="btn update-btn"
                        onClick={() => handleUpdate(each.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn delete-btn"
                        onClick={() => deleteUser(each.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                className="btn pagination-btn"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button
                className="btn pagination-btn"
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(UserList.length / usersPerPage)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserList;
