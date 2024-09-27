import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PublisherCard from "../components/PublisherCard";
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

function Publisher() {
  const initialState = {
    id: "",
    name: "",
    establishmentYear: "",
    address: "",
  };
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publisherSwitch, setPublisherSwitch] = useState(true);
  const [updatePublisherSwitch, setUpdatePublisherSwitch] = useState(false);
  const [newPublisher, setNewPublisher] = useState(initialState);
  const [updatePublisher, setUpdatePublisher] = useState(initialState);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers")
      .then((res) => {
        setPublishers(res.data);
        setLoading(false);
        setPublisherSwitch(true);
        setLoading(false);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  }, [publisherSwitch]);

  if (loading) {
    return (
      <div>
        <Box sx={{ width: "100%" }}>
          <LinearBuffer />
        </Box>
      </div>
    );
  }

  const handlePublisher = () => {
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers",
        newPublisher
      )
      .then((res) => {
        console.log(res);
        setPublisherSwitch(false);
        setNewPublisher(initialState);
        setSnackMessage("Publisher added successfully!");
        setSnackOpen(true);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPublisher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePublisherUpdate = () => {
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL +
          "/api/v1/publishers/" +
          updatePublisher.id,
        updatePublisher
      )
      .then((res) => {
        console.log(res);
        setPublisherSwitch(false);
        setUpdatePublisherSwitch(false);
        setUpdatePublisher(initialState);
        setSnackMessage("Publisher updated successfully!");
        setSnackOpen(true);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatePublisher((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  return (
    <>
      <div className="books">
        <h1>Publisher Management</h1>
        <div className="books-container">
          <div className="book-inputs">
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              type="text"
              name="name"
              value={
                updatePublisherSwitch ? updatePublisher.name : newPublisher.name
              }
              onChange={
                updatePublisherSwitch ? handleUpdateChange : handleChange
              }
            />
            <TextField
              id="standard-basic"
              label="Establishment Year"
              variant="standard"
              type="number"
              name="establishmentYear"
              value={
                updatePublisherSwitch
                  ? updatePublisher.establishmentYear
                  : newPublisher.establishmentYear
              }
              onChange={
                updatePublisherSwitch ? handleUpdateChange : handleChange
              }
            />
            <TextField
              id="standard-basic"
              label="Address"
              variant="standard"
              type="text"
              name="address"
              value={
                updatePublisherSwitch
                  ? updatePublisher.address
                  : newPublisher.address
              }
              onChange={
                updatePublisherSwitch ? handleUpdateChange : handleChange
              }
            />
            <br />
            <br />
            <Button
              variant="contained"
              onClick={
                updatePublisherSwitch ? handlePublisherUpdate : handlePublisher
              }
              sx = {{fontSize:"inherit" ,fontFamily:"inherit", backgroundColor:"rgb(92, 64, 51)"}}
            >
              {updatePublisherSwitch ? "Update" : "Save"}
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
            <h2>Publishers</h2>
            <ul>
              {publishers?.map((publisher) => (
                <li key={publisher.id}>
                  <PublisherCard
                    publisher={publisher}
                    setUpdatePublisher={setUpdatePublisher}
                    setUpdatePublisherSwitch={setUpdatePublisherSwitch}
                    setPublisherSwitch={setPublisherSwitch}
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
export default Publisher;
