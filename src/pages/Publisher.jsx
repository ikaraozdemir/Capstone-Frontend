import axios from "axios";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
  const [switchOn, setSwitchOn] = useState(true);
  const [updateSwitch, setUpdateSwitch] = useState(false);
  const [newPublisher, setNewPublisher] = useState(initialState);
  const [updatePublisher, setUpdatePublisher] = useState(initialState);

  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers")
      .then((res) => {
        setPublishers(res.data);
        setLoading(false);
        setSwitchOn(true);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  }, [switchOn]);

  if (loading) return <div>Loading...</div>;

  const handlePublisher = () => {
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers",
        newPublisher
      )
      .then((res) => {
        console.log(res);
        setSwitchOn(false);
        setNewPublisher(initialState);
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

  const handlePublisherDelete = (publisher) => {
    axios
      .delete(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers/" + publisher.id
      )
      .then(() => {
        setSwitchOn(false);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
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
        setSwitchOn(false);
        setUpdateSwitch(false);
        setUpdatePublisher(initialState);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  };

  const handlePublisherUpdateSettings = (publisher) => {
    setUpdatePublisher(publisher);
    setUpdateSwitch(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatePublisher((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h1>Publisher Management</h1>
      <input
        type="number"
        name="id"
        placeholder="ID"
        value={updateSwitch ? updatePublisher.id : newPublisher.id}
        onChange={updateSwitch ? handleUpdateChange : handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={updateSwitch ? updatePublisher.name : newPublisher.name}
        onChange={updateSwitch ? handleUpdateChange : handleChange}
      />
      <input
        type="number"
        name="establishmentYear"
        placeholder="Establishment Year"
        value={
          updateSwitch
            ? updatePublisher.establishmentYear
            : newPublisher.establishmentYear
        }
        onChange={updateSwitch ? handleUpdateChange : handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={updateSwitch ? updatePublisher.address : newPublisher.address}
        onChange={updateSwitch ? handleUpdateChange : handleChange}
      />
      <br />
      <br />
      <Button variant="contained" onClick={updateSwitch ? handlePublisherUpdate : handlePublisher}>
        {updateSwitch ? "Güncelle" : "Kaydet"}
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
      <h2>Publishers</h2>
      <ul>
        {publishers?.map((item) => (
          <li key={item.id}>
            <EditIcon
              style={{ fontSize: 16 }}
              onClick={() => handlePublisherUpdateSettings(item)}
            />
            {item.name}
            <DeleteOutlineIcon
              style={{ fontSize: 16 }}
              onClick={() => handlePublisherDelete(item)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
export default Publisher;
