import axios from "axios";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

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


    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors")
        .then((res) => 
            {setAuthors(res.data);
            setLoading(false);
            setSwitchOn(true);
        })
        .catch((error) => {
            console.log(error.message);  
        });
    },[switchOn]);

    if(loading) return <div>Loading...</div>;

    const handleAuthor = () => {
        axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors", newAuthor)
        .then((res) => {
            console.log(res);
            setSwitchOn(false);
            setNewAuthor(
                initialState
            );
        })
        .catch((err) => {
            console.log(err);
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
            .catch((error) => {
                console.log(error.message);  
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
        .catch((error) => {
            console.log(error.message);  
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
    <button onClick={updateSwitch ? handleAuthorUpdate : handleAuthor}>
    {updateSwitch ? "Güncelle" : "Kaydet"}
    </button>
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