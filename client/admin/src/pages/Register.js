import React, { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  isMember: true,
  showAlert: false,
};

function Register(props) {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const { admin, isLoading, showAlert, displayAlert, setupAdmin } =
    useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, confirm, isMember } = values;

    if (
      !email ||
      !password ||
      (!isMember && !name) ||
      (!isMember && !confirm)
    ) {
      displayAlert();
      return;
    }

    const currentAdmin = { name, email, password, confirm };

    if (isMember) {
      setupAdmin({
        currentAdmin,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupAdmin({
        currentAdmin,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (admin) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [admin, navigate]);

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />

        {values.isMember ? <h3> Admin Login</h3> : <h3>Admin Register</h3>}

        {showAlert && <Alert />}

        {/* name input */}

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        {/* c-password input */}
        {!values.isMember && (
          <FormRow
            type="password"
            name="confirm"
            value={values.confirm}
            handleChange={handleChange}
          />
        )}

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isMember ? "Not an admin yet?" : "Already an admin?"}

          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
