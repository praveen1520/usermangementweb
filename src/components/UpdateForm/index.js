import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css"
const UpdateForm = () => {
  const [firstName, setFirstName] = useState(""); //firstName state Variable
  const [lastName, setLastName] = useState("");// secondName state variable
  const [email, setEmail] = useState("");// Email state Variable
  const [department, setDepartment] = useState(""); // Department state variable
  const { id } = useParams(); // taking id from params
  const navigate = useNavigate(); // using navigate used for navigation

  useEffect(() => {
    GetUserDetails(); // Getting the details whenever id is changed
  }, [id]);

  const GetUserDetails = async () => {
    try {
      const Url = `https://jsonplaceholder.typicode.com/users/${id}`; //fetching the UserDetails
      const response = await axios.get(Url);
      const user = response.data;
      const [FirstName, LastName] = user.name.split(" ");
      //updating state variable
      setFirstName(FirstName);
      setLastName(LastName);
      setEmail(user.email);
      setDepartment(user.company.name);
    } catch (error) {
      console.log(error.message);
      //showing the error 
      alert(error.message)
    }
  };

  const userUpdate = async (e) => {
    e.preventDefault();
    //packing the details of user for updating the details
    const userDetails = {
      id,
      name: `${firstName} ${lastName}`,
      email,
      company: { name: department },
    };

    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    try {
      await axios.put(url, userDetails, {
        headers: { "Content-Type": "application/json" }, // making an api call to update data
      });
      alert("User Updated SuccessFully")
      navigate("/");
    } catch (error) {
      console.log(error.message);
      alert(error.message)
    }
  };

  return (
    //input form container
    <div className="form-container">
      <h1 className="form-heading">Update User</h1>
      <form className="update-form" onSubmit={userUpdate}>
        <label htmlFor="FirstName">First Name</label>
        <input
          type="text"
          id="FirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="LastName">Last Name</label>
        <input
          type="text"
          id="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="Email">Email</label>
        <input
          type="email"
          id="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="Department">Department</label>
        <input
          type="text"
          id="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <button className="submit-btn" type="submit">
          Edit User
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
