import React, { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { admin, showAlert, displayAlert, updateAdmin, isLoading } =
    useAppContext();

  const [name, setName] = useState(admin?.name);
  const [email, setEmail] = useState(admin?.email);
  const [lastName, setLastName] = useState(admin?.lastName);
  const userType = admin?.userType;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName) {
      displayAlert();
      return;
    }
    updateAdmin({ name, email, lastName });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormRow labelText="user Type" value={userType} disabled="true" />

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
