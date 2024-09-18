import axios from "axios";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SettingsIcon from '@mui/icons-material/Settings';

function Publisher() {
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [switchOn, setSwitchOn] = useState(true);
    const [updateSwitch, setUpdateSwitch] = useState(false);
    const [newPublisher, setNewPublisher] = useState({
        id:"",
        name:"",
        establishmentYear: "",
        address:"",
    });
    const [updatePublisher, setUpdatePublisher] = useState({
        id:"",
        name:"",
        establishmentYear: "",
        address:"",
    });


    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers").then((res) => {setPublishers(res.data);
            setLoading(false);
            setSwitchOn(true);
        });
    },[switchOn]);

    if(loading) return <div>Loading...</div>;

    const handlePublisher = () => {
        axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers", newPublisher)
        .then((res) => {
            console.log(res);
            setSwitchOn(false);
            setNewPublisher({
                id:"",
                name:"",
                establishmentYear: "",
                address:"",
            });
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewPublisher((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePublisherDelete = (publisher) => {
        axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers/" + publisher.id)
        .then((res)=> {
            console.log(res);
            setSwitchOn(false);
        });
    }

    const handlePublisherUpdate = () => {
        axios.put(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers/" + updatePublisher.id, updatePublisher)
        .then((res)=> {
            console.log(res);
            setSwitchOn(false);
            setUpdatePublisher({
                id:"",
                name:"",
                establishmentYear: "",
                address:"",
            });
        });
    };

    const handlePublisherUpdateSettings = (publisher) => {
        setUpdatePublisher(publisher);
        setUpdateSwitch(true);
    }

    const handleUpdateChange = (e) => {
        const {name, value} = e.target;
        setUpdatePublisher((prev) => (
            {...prev,
            [name]: value,}
        ));
    }


  return (
    <>
    <h2>Add New Publisher</h2>
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
    onChange={updateSwitch ? handleUpdateChange : handleChange}/>
    <input 
    type="number" 
    name="establishmentYear"
    placeholder="Establishment Year" 
    value={updateSwitch ? updatePublisher.establishmentYear : newPublisher.establishmentYear}
    onChange={updateSwitch ? handleUpdateChange : handleChange}/>
    <input 
    type="text" 
    name="address" 
    placeholder="Address" 
    value={updateSwitch ? updatePublisher.address : newPublisher.address}
    onChange={updateSwitch ? handleUpdateChange : handleChange}/>
    <br />
    <button onClick={handlePublisher}>Kaydet</button>
    <button onClick={handlePublisherUpdate}>Güncelle</button>
    <h1>Publishers</h1>
    <ul>{publishers.map((item) => (
        <li key={item.id}>
            {item.name}
            <DeleteOutlineIcon style={{fontSize:16}} onClick={()=>handlePublisherDelete(item)}/>
            <SettingsIcon style={{fontSize:16}} onClick={()=>handlePublisherUpdateSettings(item)}/>
        </li>
    ))}</ul>
    </>
  )
}
export default Publisher