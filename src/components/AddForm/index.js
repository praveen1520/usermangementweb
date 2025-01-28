import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";


const AddForm = (props) => {
//state variables for form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate the form inputs
  const validate = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!department) newErrors.department = "Department is required";
    return newErrors;
  };

  const userAddition = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    // Run validation
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Show validation errors
      return;
    }

    const userDetails = {
      name: `${firstName} ${lastName}`,
      email,
      company: { name: department },
    };

    const url = "https://jsonplaceholder.typicode.com/users";
    try {
      const addUser = await axios.post(url, userDetails, {  //making an api call to add the data
        headers: { "Content-Type": "application/json" },
      });
      console.log(addUser.data);
      alert('User Added SuccessFully')
      navigate("/"); // Navigate back to the user list or home
    } catch (error) {
      console.log(error.message);
      alert(error.message)
    }
  };

  return (
    //Add form Container
    <div className="form-container">
      <h1 className="form-heading">Add New User</h1>
      <form className="add-form" onSubmit={userAddition}>
        <label htmlFor="FirstName">First Name</label>
        <input
          type="text"
          id="FirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}

        <label htmlFor="LastName">Last Name</label>
        <input
          type="text"
          id="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}

        <label htmlFor="Email">Email</label>
        <input
          type="email"
          id="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="Department">Department</label>
        <input
          type="text"
          id="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        {errors.department && <span className="error">{errors.department}</span>}

        <button className="submit-btn" type="submit">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddForm;
