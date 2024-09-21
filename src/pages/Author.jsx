import axios from "axios";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";


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
  
function Author() {
    const initialState = {
        name:"",
        birthDate:"",
        country: "",
    }
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [switchOn, setSwitchOn] = useState(true);
    const [updateSwitch, setUpdateSwitch] = useState(false);
    const [newAuthor, setNewAuthor] = useState(initialState);
    const [updateAuthor, setUpdateAuthor] = useState(initialState);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors")
        .then((res) => 
            {setAuthors(res.data);
            setLoading(false);
            setSwitchOn(true);
        })
        .catch((err) => {
            setOpen(true);
            errMessage = err.message;   
        });
    },[switchOn]);

    if(loading) return <div>Loading...</div>;

    const handleAuthor = () => {
        axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors", newAuthor)
        .then((res) => {
            console.log(res);
            setSwitchOn(false);
            setNewAuthor(initialState);
        })
        .catch((err) => {
            setOpen(true);
            errMessage = err.message; 
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewAuthor((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAuthorDelete = (author) => {
        axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors/" + author.id)
            .then(() => {
                setSwitchOn(false); 
            })
            .catch((err) => {
                setOpen(true);
                errMessage = err.message;   
            });
    };
    

    const handleAuthorUpdate = () => {
        axios.put(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors/" + updateAuthor.id, updateAuthor)
        .then((res)=> {
            console.log(res);
            setSwitchOn(false);
            setUpdateSwitch(false);
            setUpdateAuthor(initialState);
        })
        .catch((err) => {
            setOpen(true);
            errMessage = err.message;  
        });
    };

    const handleAuthorUpdateSettings = (author) => {
        setUpdateAuthor(author);
        setUpdateSwitch(true);
    }

    const handleUpdateChange = (e) => {
        const {name, value} = e.target;
        setUpdateAuthor((prev) => (
            {...prev,
            [name]: value,}
        ));
    }


  return (
    <>
    <h1>Author Management</h1>
    <input 
    type="text" 
    name="name" 
    placeholder="Name" 
    value={updateSwitch ? updateAuthor.name : newAuthor.name}
    onChange={updateSwitch ? handleUpdateChange : handleChange}
    />
    <input 
    type="date"
    name="birthDate" 
    value={updateSwitch ? updateAuthor.birthDate : newAuthor.birthDate}
    onChange={updateSwitch ? handleUpdateChange : handleChange}/>
    <input 
    type="text" 
    name="country"
    placeholder="Country" 
    value={updateSwitch ? updateAuthor.country : newAuthor.country}
    onChange={updateSwitch ? handleUpdateChange : handleChange}/>

    <br />
    <br />
    <Button variant="contained" onClick={updateSwitch ? handleAuthorUpdate : handleAuthor}>
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
    <h2>Authors</h2>
    <ul>{authors.map((item) => (
        <li key={item.id}>
            <EditIcon style={{fontSize:16}} onClick={()=>handleAuthorUpdateSettings(item)}/>
            {item.name}
            <DeleteOutlineIcon style={{fontSize:16}} onClick={()=>handleAuthorDelete(item)}/>
        </li>
    ))}</ul>
    </>
  )
}
export default Author