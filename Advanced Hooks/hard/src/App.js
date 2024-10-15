import { useState, useEffect } from "react";
import * as React from "react";
import { useForm } from "./hooks/useForm";
import { useTeams } from "./hooks/useTeams";

function App() {
  const [teams] = useTeams([]); 
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [teamIndex, setTeamIndex] = useState(0); 

  const initialState = {
    name: "",
    email: "",
    phoneNumber: "",
    checkedOne: false,
    checkedTwo: false,
  };

  const validate = (formData) => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.phoneNumber.trim()) errors.phoneNumber = "Phone Number is required";
    return errors;
  };

  const { formData, errors, submittedData, handleChange, handleSubmit } = useForm(initialState, validate);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    if (uploadedFile) {
      const fileUrl = URL.createObjectURL(uploadedFile);
      setFileURL(fileUrl);
    }
  };

  const handleSubmitWithFile = (e) => {
    const customData = {
      fileName: file ? file.name : null,
      valueOne: formData.checkedOne,
      valueTwo: formData.checkedTwo,
    };
    handleSubmit(e, customData); 
  };

  const Checkbox = ({ label, name, checked, onChange }) => (
    <label>
      <input type="checkbox" name={name} checked={checked} onChange={onChange} />
      {label}
    </label>
  );

  
  useEffect(() => {
    const interval = setInterval(() => {
      setTeamIndex((prevIndex) => (prevIndex + 1) % teams.length); 
    }, 5000); 

    return () => clearInterval(interval); 
  }, [teams]);

  return (
    <div className="flex justify-center pt-8 bg-gray-500">
      <form className="bg-gray-500" onSubmit={handleSubmitWithFile}>
        <div>
          <h3 className="p-4 text-xl">Contact Form</h3>
        </div>

        <div>
          <input
            className="p-4"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <input
            className="p-4"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <input
            className="p-4"
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
        </div>

        <div className="bg-gray-500">
          <input className="p-4" type="file" id="myFile" name="filename" onChange={handleFileChange}></input>
        </div>

        <div className="space-x-4">
          <div className="p-2">Language</div>
          <Checkbox
            name="checkedOne"
            label="Swedish"
            checked={formData.checkedOne}
            onChange={handleChange}
          />
          <Checkbox
            name="checkedTwo"
            label="English"
            checked={formData.checkedTwo}
            onChange={handleChange}
          />
        </div>

        

        <div>
          <button type="submit" className="bg-blue-500 text-white p-3 m-5 rounded-xl">
            Submit Contact
          </button>
        </div>
      </form>

      {submittedData && (
        <div className="p-4">
          <h3>Submitted Data</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Swedish:</strong> {submittedData.valueOne ? "Checked" : "Not Checked"}</p>
          <p><strong>English:</strong> {submittedData.valueTwo ? "Checked" : "Not Checked"}</p>
          {submittedData.fileName && (
            <p>
              <strong>Uploaded File:</strong>{" "}
              <a href={fileURL} target="_blank" rel="noopener noreferrer">
                {submittedData.fileName}
              </a>
            </p>
          )}
        <div className="mt-4">
          <h3>Current Team</h3>
          {teams.length > 0 && (
            <p>{teams[teamIndex]}</p>
          )}
        </div> 
        </div>
      )}
    </div>
  );
}

export default App;