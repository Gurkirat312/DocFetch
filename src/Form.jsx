import React from "react";

function Form() {
  return (
    <div>
      <label htmlFor="name">Name : </label>
      <input type="text" id="name" name="name" /><br />

      <label htmlFor="email">Email : </label>
      <input type="email" id="email" name="email" /><br />

      <fieldset
        style={{
          width: "300px",
          height: "100px",
          padding: "10px",
          border: "2px solid #000",
        }}
      >
        <legend>Gender</legend>
        <input type="radio" value="male" name="gender" id="male" />
        <label htmlFor="male">Male</label>

        <input type="radio" value="female" name="gender" id="female" />
        <label htmlFor="female">Female</label>
      </fieldset>
    </div>
  );
}

export default Form;
