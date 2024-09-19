import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

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
      country: "",
    },
    publisher: {
      id: "",
      name: "",
      establishmentYear: "",
      address: "",
    },
    categories: [],
  };
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState(initialBook);
  const [bookSwitch, setBookSwitch] = useState(true);
  const [updateBookSwitch, setUpdateBookSwitch] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [updateBook, setUpdateBook] = useState(initialBook);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
        setBookSwitch(true);
      })
      .catch((error) => {
        console.log(error.message);
      });

    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors")
      .then((res) => {
        setAuthors(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers")
      .then((res) => {
        setPublishers(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [bookSwitch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookUpdate = () => {
    axios.put(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books/" + updateBook.id, updateBook)
    .then((res)=> {
        console.log(res);
        setBookSwitch(false);
        setUpdateBookSwitch(false);
        setUpdateBook(initialBook);
    }).catch((error) => {
        console.log(error.message);  
    });
  };

  const handleBook = () => {
    console.log("Sending newBook: ", newBook);
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books", newBook)
      .then((res) => {
        console.log(res);
        setBookSwitch(false);
        setNewBook(initialBook);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNewBookAuthorSelect = (e) => {
    const { value } = e.target;
    const selectedAuthor = authors.find((author) => author.id === value);
    setNewBook((prev) => ({
      ...prev,
      author: selectedAuthor,
    }));
  };

  const handleUpdateBookAuthorSelect = (e) => {
    const { value } = e.target;
    const selectedAuthor = authors.find((author) => author.id === value);
    setUpdateBook((prev) => ({
      ...prev,
      author: selectedAuthor,
    }));
  };

  const handleNewBookPublisherSelect = (e) => {
    const { value } = e.target;
    const selectedPublisher = publishers.find(
      (publisher) => publisher.id === value
    );
    setNewBook((prev) => ({
      ...prev,
      publisher: selectedPublisher,
    }));
  };

  const handleUpdateBookPublisherSelect = (e) => {
    const { value } = e.target;
    const selectedPublisher = publishers.find(
      (publisher) => publisher.id === value
    );
    setUpdateBook((prev) => ({
      ...prev,
      publisher: selectedPublisher,
    }));
  };

  const handleNewBookCategorySelect = (e, category) => {
    const { checked } = e.target;

    setNewBook((prev) => {
      const categories = checked
        ? [...prev.categories, category] // Kategori seçildiyse, yeni kategori eklenir.
        : prev.categories.filter((c) => c.id !== category.id); // Kategori kaldırıldığında, mevcut listeden çıkarılır.

      return {
        ...prev,
        categories, // Güncellenmiş kategoriler listesi
      };
    });
  };

  const handleUpdateBookCategorySelect = (e, category) => {
    const { checked } = e.target;

    setUpdateBook((prev) => {
      const categories = checked
        ? [...prev.categories, category] // Kategori seçildiyse, yeni kategori eklenir.
        : prev.categories.filter((c) => c.id !== category.id); // Kategori kaldırıldığında, mevcut listeden çıkarılır.

      return {
        ...prev,
        categories, // Güncellenmiş kategoriler listesi
      };
    });
  };

  const handleBookDelete = (book) => {
    axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books/" + book.id)
        .then(() => {
            setBookSwitch(false);
            setUpdateBookSwitch(false);
            setUpdateBook(initialBook);
            
        })
        .catch((error) => {
            console.log(error.message);  
        });
  };

  const handleUpdateChange = (e) => {
    const {name, value} = e.target;
    setUpdateBook((prev) => (
        {...prev,
        [name]: value,}
    ));
  }

  const handleBookUpdateSettings = (book) => {
    setUpdateBook(book);
    setUpdateBookSwitch(true);
  }

  return (
    <>
      <h1>Book Management</h1>
      <TextField
        id="standard-basic"
        label="ID"
        variant="standard"
        name="id"
        type="number"
        value={updateBookSwitch ? updateBook.id : newBook.id}
        onChange={updateBookSwitch ? handleUpdateChange : handleChange}
      />
      <TextField
        id="standard-basic"
        label="Name"
        variant="standard"
        name="name"
        value={updateBookSwitch ? updateBook.name : newBook.name}
        onChange={updateBookSwitch ? handleUpdateChange : handleChange}
      />
      <TextField
        id="standard-basic"
        label="Publication Year"
        variant="standard"
        type="number"
        name="publicationYear"
        value={updateBookSwitch ? updateBook.publicationYear : newBook.publicationYear}
        onChange={updateBookSwitch ? handleUpdateChange : handleChange}
      />
      <TextField
        id="standard-basic"
        label="Stock"
        variant="standard"
        name="stock"
        type="number"
        value={updateBookSwitch ? updateBook.stock : newBook.stock}
        onChange={updateBookSwitch ? handleUpdateChange : handleChange}
      />
      <br />

      <Select
        name="author"
        value={updateBookSwitch ? updateBook.author.id || 0  : newBook.author.id || 0}
        variant="standard"
        onChange={updateBookSwitch ? handleUpdateBookAuthorSelect : handleNewBookAuthorSelect}
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
        value={updateBookSwitch ? updateBook.publisher.id || 0 : newBook.publisher.id || 0 }
        variant="standard"
        onChange={updateBookSwitch ? handleUpdateBookPublisherSelect : handleNewBookPublisherSelect}
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
                checked={updateBookSwitch ? updateBook.categories.some((c) => c.id === category.id) :  newBook.categories.some((c) => c.id === category.id)} // Eğer kategori daha önce seçildiyse işaretlenir.
                onChange={(e) => updateBookSwitch ?handleUpdateBookCategorySelect(e, category) : handleNewBookCategorySelect(e, category)} // Kategori seçimini handleNewBookCategorySelect ile yönetir.
              />
            }
            label={category.name}
          />
        ))}
      </FormGroup>

      <br />
      <Button
        variant="contained"
        onClick={updateBookSwitch ? handleBookUpdate : handleBook}
      >
        {updateBookSwitch ? "Güncelle" : "Kaydet"}
      </Button>

      <h2>Books</h2>
      <ul>
        {books?.map((book) => (
          <li key={book.id}>
            <EditIcon
              style={{ fontSize: 16 }}
              onClick={() => handleBookUpdateSettings(book)}
            />
            {book.name}
            <DeleteOutlineIcon
              style={{ fontSize: 16 }}
              onClick={() => handleBookDelete(book)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
export default Book;
