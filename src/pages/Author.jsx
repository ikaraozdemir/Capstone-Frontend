import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthorCard from "../components/AuthorCard";

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  if (loading) return <div>Loading...</div>;

  const handleAuthor = () => {
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors", newAuthor)
      .then((res) => {
        console.log(res);
        setAuthorSwitch(false);
        setNewAuthor(initialAuthor);
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

  return (
    <>
      <div className="books">
        <h1>Author Management</h1>
        <div className="books-container">
          <div className="book-inputs">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={updateAuthorSwitch ? updateAuthor.name : newAuthor.name}
              onChange={updateAuthorSwitch ? handleUpdateChange : handleChange}
            />
            <input
              type="date"
              name="birthDate"
              value={
                updateAuthorSwitch
                  ? updateAuthor.birthDate
                  : newAuthor.birthDate
              }
              onChange={updateAuthorSwitch ? handleUpdateChange : handleChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
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
            >
              {updateAuthorSwitch ? "Güncelle" : "Kaydet"}
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
          <div className="book-list">
            <h2>Authors</h2>
            <ul>
              {authors.map((author) => (
                <li key={author.id}>
                  <AuthorCard
                    author={author}
                    setUpdateauthor={setUpdateAuthor}
                    setUpdateAuthorSwitch={setUpdateAuthorSwitch}
                    setAuthorSwitch={setAuthorSwitch}
                    initiaAuthor={initialAuthor}
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
