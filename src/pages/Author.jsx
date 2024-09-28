import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthorCard from "../components/AuthorCard";
import Snackbar from "@mui/material/Snackbar";
import LinearBuffer from "../components/LinearBuffer";
import TextField from "@mui/material/TextField";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

let errMessage = "";

function Author() {
  const initialAuthor = {
    name: "",
    birthDate: "",
    country: "",
  };
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorSwitch, setAuthorSwitch] = useState(true);
  const [updateAuthorSwitch, setUpdateAuthorSwitch] = useState(false);
  const [newAuthor, setNewAuthor] = useState(initialAuthor);
  const [updateAuthor, setUpdateAuthor] = useState(initialAuthor);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors")
      .then((res) => {
        setAuthors(res.data);
        setLoading(false);
        setAuthorSwitch(true);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  }, [authorSwitch]);

  if (loading) {
    return (
      <div>
        <Box sx={{ width: "100%" }}>
          <LinearBuffer />
        </Box>
      </div>
    );
  }

  const handleAuthor = () => {
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors", newAuthor)
      .then((res) => {
        console.log(res);
        setAuthorSwitch(false);
        setNewAuthor(initialAuthor);
        setSnackMessage("Author added successfully!");
        setSnackOpen(true);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAuthorUpdate = () => {
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL +
          "/api/v1/authors/" +
          updateAuthor.id,
        updateAuthor
      )
      .then((res) => {
        console.log(res);
        setAuthorSwitch(false);
        setUpdateAuthorSwitch(false);
        setUpdateAuthor(initialAuthor);
        setSnackMessage("Author updated successfully!");
        setSnackOpen(true);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateAuthor((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };
  return (
    <>
      <div className="books">
        <h1>Author Management</h1>
        <div className="books-container">
          <div className="book-inputs">
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              name="name"
              value={updateAuthorSwitch ? updateAuthor.name : newAuthor.name}
              onChange={updateAuthorSwitch ? handleUpdateChange : handleChange}
            />
          <br />
            <TextField
              id="standard-basic"
              variant="standard"
              type="date"
              name="birthDate"
              value={
                updateAuthorSwitch
                  ? updateAuthor.birthDate
                  : newAuthor.birthDate
              }
              onChange={updateAuthorSwitch ? handleUpdateChange : handleChange}
            />
                    <TextField
            id="standard-basic"
            label="Country"
            variant="standard"
              name="country"
              value={
                updateAuthorSwitch ? updateAuthor.country : newAuthor.country
              }
              onChange={updateAuthorSwitch ? handleUpdateChange : handleChange}
            />

            <br />
            <br />
            <Button
              variant="contained"
              onClick={updateAuthorSwitch ? handleAuthorUpdate : handleAuthor}
              sx={{
                fontSize: "inherit",
                fontFamily: "inherit",
                backgroundColor: "rgb(92, 64, 51)",
              }}
            >
              {updateAuthorSwitch ? "Update" : "Save"}
            </Button>
          </div>
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
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackOpen}
            onClose={handleCloseSnack}
            message={snackMessage}
            autoHideDuration={6000}
          />
          <div className="book-list">
            <h2>Authors</h2>
            <ul>
              {authors.map((author) => (
                <li key={author.id}>
                  <AuthorCard
                    author={author}
                    setUpdateAuthor={setUpdateAuthor}
                    setUpdateAuthorSwitch={setUpdateAuthorSwitch}
                    setAuthorSwitch={setAuthorSwitch}
                    initiaAuthor={initialAuthor}
                    setSnackOpen={setSnackOpen}
                    setSnackMessage={setSnackMessage}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Author;
