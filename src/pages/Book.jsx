import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


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
      const { name, value } = e.target;
      setNewBook((prev) => ({
          ...prev,
          [name]: value,
      }));
  };
  



    const handleBookUpdate = () => {

    }

    const handleBook = () => {
      console.log("Sending newBook: ", newBook);
      axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books", newBook)
      .then((res) => {
          console.log(res);
          setBookSwitch(false);
          setNewBook(
              initialBook
          );
      })
      .catch((err) => {
          console.log(err);
      });

    }

    const handleNewBookAuthorSelect = (e) => {
      const { value } = e.target;
      const selectedAuthor = authors.find((author) => author.id === value);
      setNewBook((prev) => ({
        ...prev,
        author: selectedAuthor,
      }));
    };
    

    const handleNewBookPublisherSelect = (e) => {
      const { value } = e.target;
      const selectedPublisher = publishers.find((publisher) => publisher.id === value);
      setNewBook((prev) => ({
        ...prev,
        publisher:selectedPublisher, 
      }));
    };
    

    const handleNewBookCategorySelect = (e, category) => {
      const { checked } = e.target;
    
      setNewBook((prev) => {
        const categories = checked
          ? [...prev.categories, category] 
          : prev.categories.filter((c) => c.id !== category.id); 
    
        return {
          ...prev,
          categories, 
        };
      });
    };
    
    

  return (
    <>
    <h1>Book Management</h1>
    <TextField
        id="standard-basic"
        label="ID"
        variant="standard"
        name="id"
        type="number"
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
        type="number"
        name="publicationYear"
        value={newBook.publicationYear}
        onChange={handleNewBookInputChange}
      />
        <TextField
        id="standard-basic"
        label="Stock"
        variant="standard"
        name="stock"
        type="number"
        value={newBook.stock}
        onChange={handleNewBookInputChange}
      />
      <br />

      <Select
        name="author"
        value={newBook.author.id || 0}
        variant="standard"
        onChange={handleNewBookAuthorSelect}
      >
        <MenuItem value={0} disabled>
          Select Author
        </MenuItem>
        {authors?.map((author) => (
        <MenuItem key={author.id} value={author.id}>
          {author.name}
        </MenuItem>
        ))}
      </Select>
      <br />

      <Select
        name="publisher"
        value={newBook.publisher.id || 0}
        variant="standard"
        onChange={handleNewBookPublisherSelect}
      >
        <MenuItem value={0} disabled>
          Select Publisher
        </MenuItem>
        {publishers?.map((publisher) => (
          <MenuItem key={publisher.id} value={publisher.id}>
            {publisher.name}
          </MenuItem>
        ))}
      </Select>
      <br />

      <h3>Select Category</h3>
      <FormGroup>
        {categories?.map((category) => (
        <FormControlLabel
        key={category.id}
        control={
          <Checkbox
          checked={newBook.categories.some((c) => c.id === category.id)} 
          onChange={(e) => handleNewBookCategorySelect(e, category)} 
          />
        }
        label={category.name}
        />
        ))}
      </FormGroup>

      <br />
      <Button variant="contained"  onClick={updateSwitch ? handleBookUpdate : handleBook}>
        {updateSwitch ? "Güncelle" : "Kaydet"}
      </Button>

    <h2>Books</h2>
    <ul>
      {books?.map((book) => (
        <li key={book.id}>
          {book.name}
        </li>
      ))}
    </ul>
    </>
  )
}
export default Book