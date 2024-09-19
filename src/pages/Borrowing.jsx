import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

function Borrowing() {
    const initialBorrowing = {
        borrowerName: "",
        borrowerMail: "",
        borrowingDate: "",
        bookForBorrowingRequest: {
          id: "",
          name: "",
          publicationYear: "",
          stock: ""
        }
    }
    const [borrowings, setBorrowings] = useState([]);
    const [newBorrowing, setNewBorrowing] = useState(initialBorrowing);
    const [borrowingSwitch,setBorrowingSwitch] = useState(true);
    const [updateSwitch, setUpdateSwitch] = useState(false);
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect (() => {
      axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows")
      .then((res) => 
          {setBorrowings(res.data);
          setLoading(false);
          setBorrowingSwitch(true);
      })
      .catch((error) => {
          console.log(error.message);  
      });

      axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books")
      .then((res) => 
          {setBooks(res.data);
      })
      .catch((error) => {
          console.log(error.message);  
      });

    },[]);

    const handleBorrowing = () => {

    }

    const handleBorrowingUpdate = () => {

    }

    const handleChange = (e) => {
      const {name, value} = e.target;
      setNewBorrowing((prev) => ({
          ...prev,
          [name]:value,
      }));
    }

    console.log(newBorrowing);

  return (
    <>
    <h1>Borrowing Management</h1>
      <TextField
        id="standard-basic"
        label="Borrower Name"
        variant="standard"
        name="borrowerName"
        value={newBorrowing.borrowerName}
        onChange={handleChange}
      />
      <TextField
        id="standard-basic"
        label="Borrower Mail"
        variant="standard"
        name="borrowerMail"
        value={newBorrowing.borrowerMail}
        onChange={handleChange}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        name="borrowerDate"
        type="date"
        value={newBorrowing.borrowingDate}
        onChange={handleChange}
      />

      <br/>
    <button onClick={updateSwitch ? handleBorrowingUpdate : handleBorrowing}>
    {updateSwitch ? "Güncelle" : "Kaydet"}
    </button>
    <h2>Borrowing</h2>
    </>
  )
}
export default Borrowing