import React, { useEffect, useState } from "react";
import "./App.css";

function MyComponent() {
  const [workingLinks, setWorkingLinks] = useState([]);
  const [rollNo, setRollNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    SearchImage();
    // setLoading(false);
  }, []);

  const SearchImage = () => {
    const Length = 9;

    // Total digits in value
    function getDigits(num) {
      return Math.floor(Math.log10(Math.abs(num))) + 1;
    }

    // Add zeros to the left of the value
    function addZeros(num, length) {
      const numDigits = getDigits(num);
      let zeros = "";
      for (let i = 0; i < length - numDigits; i++) {
        zeros += "0";
      }
      return zeros + num;
    }

    const l = 99;

    // if (rollNumber.length !== 10) return alert("Enter a valid roll number");

    // const rollNo = "0022110010";
    // const rollNo = "0021113010";

    const array = [];
    for (let i = 1; i <= l; i++) {
      array.push(addZeros(i, getDigits(l)));
    }

    // const images = array.map(
    //   (item) =>
    //     `http://juadmission.jdvu.ac.in/jums_exam/student_photos/${rollNo}${item}.jpg`
    // );
    const imageExtensions = [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"];

    const images = array
      .map((item) => {
        const imageUrls = imageExtensions.map(
          (extension) =>
            `http://juadmission.jdvu.ac.in/jums_exam/student_photos/${rollNo}${item}${extension}`
        );
        return imageUrls;
      })
      .flat();
    ///Filtering out the working links
    for (let i = 0; i < images.length; i++) {
      const img = new Image();
      img.src = images[i];
      img.onload = () => {
        setWorkingLinks((prev) => [...prev, images[i]]);
      };
      img.onerror = () => {
        console.log("error");
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rollNo);
    if (rollNo.length !== 10) return alert("Enter a valid roll number");
    setWorkingLinks([]);
    SearchImage();
  };
  return (
    <div
      style={{
        backgroundColor: "#0e6ed5",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
        }}
      >
        <h2>Enter your 10 digit roll number</h2>
        <input
          type="text"
          disabled={loading}
          value={rollNo}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter your 10 digit roll number"
          style={{
            width: "300px",
            height: "30px",
            borderRadius: "5px",
            border: "none",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
            outline: "none",
            padding: "5px",
            color: "black",
          }}
        />
        <button
          style={{
            width: "300px",
            height: "30px",
            borderRadius: "5px",
            outline: "none",
            padding: "5px",
            backgroundColor: "#00cfa2",
            fontWeight: "bold",
            color: "white",
            border: "none",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
        }}
      >
        {workingLinks.map((link) => (
          <img key={link} src={link} style={{}} alt="Student Photo" />
        ))}
      </div>
    </div>
  );
}

export default MyComponent;
