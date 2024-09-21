import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

let errMessage = "";

function Borrowing() {
    const initialBorrowing = {
        borrowerName: "",
        borrowerMail: "",
        borrowingDate: "",
        returnDate: "",
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
    const [updateBorrowingSwitch, setUpdateBorrowingSwitch] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updateBorrowing, setUpdateBorrowing] = useState(initialBorrowing);
    const [books, setBooks] = useState([]);
    const [returnedBorrowingId, setReturnedBorrowingId] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect (() => {
      axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows")
      .then((res) => 
          {setBorrowings(res.data);
          setLoading(false);
          setBorrowingSwitch(true);
      })
      .catch((err) => {
          setOpen(true);
          errMessage = err.message; 
      });

      axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books")
      .then((res) => 
          {setBooks(res.data);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message; 
      });

    },[borrowingSwitch]);


    const handleBorrowing = () => {
      axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows", newBorrowing)
      .then((res) => {
        console.log(res);
        setBorrowingSwitch(false);
        setNewBorrowing(initialBorrowing);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
    }

    const handleBorrowingUpdate = () => {
      axios.put(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows/" + updateBorrowing.id, updateBorrowing)
      .then((res)=> {
          console.log(res);
          setBorrowingSwitch(false);
          setUpdateBorrowingSwitch(false);
          setUpdateBorrowing(initialBorrowing);
      }).catch((err) => {
          setOpen(true);
          errMessage = err.message; 
      });

    }

    const handleUpdateBorrowingSelect = (e) => {
      const { value } = e.target;
      const selectedBook = books.find((book) => book.id === value);
      setUpdateBorrowing((prev) => ({
        ...prev,
        bookForBorrowingRequest: selectedBook,
      }));

    }

    const handleNewBorrowingSelect = (e) => {
      const { value } = e.target;
      const selectedBook = books.find((book) => book.id === value);
      setNewBorrowing((prev) => ({
        ...prev,
        bookForBorrowingRequest: selectedBook,
      }));
    }


    const handleChange = (e) => {
      const {name, value} = e.target;
      setNewBorrowing((prev) => ({
          ...prev,
          [name]:value,
      }));
    }

    const handleUpdateChange = (e) => {
      const {name, value} = e.target;
      setUpdateBorrowing((prev) => ({
          ...prev,
          [name]:value,
      }));
    }

    const handleBorrowingUpdateSettings = (borrowing) => {
      setUpdateBorrowing(borrowing);
      setUpdateBorrowingSwitch(true);
    }

    const handleBorrowingDelete = (borrowing) => {
      axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows/" + borrowing.id)
          .then(() => {
              setBorrowingSwitch(false);
              setUpdateBorrowingSwitch(false);
              setUpdateBorrowing(initialBorrowing);
          })
          .catch((err) => {
            setOpen(true);
            errMessage = err.message; 
          });
    };

    console.log(newBorrowing);

   const handleReturn = (returnedBorrowing) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear(); 
    const month = currentDate.getMonth() + 2; 
    const day = currentDate.getDate();        
    const returnedDate = `${year}-${month}-${day}`;   

    returnedBorrowing.returnDate = returnedDate;

    console.log(returnedBorrowing.id + "#" + returnedBorrowing.returnDate )

    axios.put(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows/" + returnedBorrowing.id, returnedBorrowing)
    .then((res)=> {
        console.log(res);
        setBorrowingSwitch(false);
        setReturnedBorrowingId(returnedBorrowing.id);
    }).catch((err) => {
       setOpen(true);
       errMessage = err.message; 
    });

   };


  return (
    <>
    <h1>Borrowing Management</h1>
      <TextField
        id="standard-basic"
        label="Borrower Name"
        variant="standard"
        name="borrowerName"
        value={updateBorrowingSwitch ? updateBorrowing.borrowerName : newBorrowing.borrowerName}
        onChange={updateBorrowingSwitch ? handleUpdateChange : handleChange}
      />
      <TextField
        id="standard-basic"
        label="Borrower Mail"
        variant="standard"
        name="borrowerMail"
        value={updateBorrowingSwitch ? updateBorrowing.borrowerMail :newBorrowing.borrowerMail}
        onChange={updateBorrowingSwitch ? handleUpdateChange : handleChange}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        name="borrowingDate"
        type="date"
        value={updateBorrowingSwitch ? updateBorrowing.borrowingDate : newBorrowing.borrowingDate}
        onChange={updateBorrowingSwitch ? handleUpdateChange : handleChange}
      />
      <br/>
      <Select
        name="bookForBorrowingRequest"
        value={updateBorrowingSwitch ? updateBorrowing.book.id || 0  : newBorrowing.bookForBorrowingRequest.id || 0}
        variant="standard"
        onChange={updateBorrowingSwitch ? handleUpdateBorrowingSelect : handleNewBorrowingSelect}
      >
        <MenuItem value={0} disabled>
          Select Book
        </MenuItem>
        {books?.map((book) => (
          <MenuItem key={book.id} value={book.id}>
            {book.name}
          </MenuItem>
        ))}
      </Select>
      <br />
      <br />
    <Button variant="contained" onClick={updateBorrowingSwitch ? handleBorrowingUpdate : handleBorrowing}>
    {updateBorrowingSwitch ? "Güncelle" : "Kaydet"}
    </Button>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ERROR
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {errMessage}
          </Typography>
        </Box>
      </Modal>
    
    <h2>Borrowing</h2>
    <ul>
        {borrowings?.map((borrowing) => (
          <li key={borrowing.id}>
            <EditIcon
              style={{ fontSize: 16 }}
              onClick={() => handleBorrowingUpdateSettings(borrowing)}
            />
            {borrowing.borrowerName}
            <DeleteOutlineIcon
              style={{ fontSize: 16 }}
              onClick={() => handleBorrowingDelete(borrowing)}
            /> 
            <br />
            {
            returnedBorrowingId === borrowing.id ? (
              <p>{borrowing.returnDate} tarihinde teslim edildi.</p>
            ) : (
              <Button onClick={() => handleReturn(borrowing)}>
                <FontAwesomeIcon icon={faBook} style={{ color: "#000000", paddingRight: 5 }} />  
                return
              </Button>
              
            )
          }
         
          </li>
        ))}
      </ul>
    </>
  )
}
export default Borrowing