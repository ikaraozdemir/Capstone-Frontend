import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";


function Book() {
    const initialBook = {
        id: "",
        name: "",
        publicationYear: "",
        stock: "",
        author: {
          id: "",
          name: "",
          birthDate: "",
          country: ""
        },
        publisher: {
          id: "",
          name: "",
          establishmentYear: "",
          address: ""
        },
        categories: [
          {
            id: "",
            name: "",
            description: ""
          }
        ]
    }
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState(initialBook);
    const [bookSwitch,setBookSwitch] = useState(true);
    const [updateSwitch, setUpdateSwitch] = useState(false);
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books")
        .then((res) => 
            {setBooks(res.data);
            setLoading(false);
            setBookSwitch(true);
        })
        .catch((error) => {
            console.log(error.message);  
        });
        

        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors")
        .then((res) => 
            {setAuthors(res.data);
        })
        .catch((error) => {
            console.log(error.message);  
        });

        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers")
        .then((res) => 
            {setPublishers(res.data);
        })
        .catch((error) => {
            console.log(error.message);  
        });

        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories")
        .then((res) => 
            {setCategories(res.data);
        })
        .catch((error) => {
            console.log(error.message);  
        });
    },[bookSwitch]);

    const handleNewBookInputChange = (e) => {
        const {name, value} = e.target;
        setNewBook((prev) => ({
            ...prev,
            [name]:value,
        }));
    };



    const handleBookUpdate = () => {

    }

    const handleBook = () => {

    }

  return (
    <>
    <h1>Book Management</h1>
    <TextField
        id="standard-basic"
        label="ID"
        variant="standard"
        name="id"
        value={newBook.id}
        onChange={handleNewBookInputChange}
      />
    <TextField
        id="standard-basic"
        label="Name"
        variant="standard"
        name="name"
        value={newBook.name}
        onChange={handleNewBookInputChange}
      />
        <TextField
        id="standard-basic"
        label="Publication Year"
        variant="standard"
        name="publicationYear"
        value={newBook.publicationYear}
        onChange={handleNewBookInputChange}
      />
        <TextField
        id="standard-basic"
        label="Stock"
        variant="standard"
        name="stock"
        value={newBook.stock}
        onChange={handleNewBookInputChange}
      />
      <br />
      <button onClick={updateSwitch ? handleBookUpdate : handleBook}>
        {updateSwitch ? "Güncelle" : "Kaydet"}
      </button>
    <h2>Books</h2>

    </>
  )
}
export default Book