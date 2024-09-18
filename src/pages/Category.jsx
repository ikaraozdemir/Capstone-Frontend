import axios from "axios";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';


function Category() {
    const initialCategory = {
        id: "",
        name: "",
        description: ""
      }
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categorySwitch, setCategorySwitch] = useState(true);
    const [updateCategorySwitch, setUpdateCategorySwitch] = useState(false);
    const [newCategory, setNewCategory] = useState(initialCategory);
    const [updateCategory, setUpdateCategory] = useState(initialCategory);


    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories")
        .then((res) => {setCategories(res.data);
            setLoading(false);
            setCategorySwitch(true);
        })
        .catch((error) => {
            console.log(error.message);  
        });
    },[categorySwitch]);

    if(loading) return <div>Loading...</div>;

    const handleCategory = () => {
        axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories", newCategory)
        .then((res) => {
            console.log(res);
            setCategorySwitch(false);
            setNewCategory(initialCategory)
            
        })
        .catch((error) => {
            console.log(error.message);  
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCategoryDelete = (category) => {
        axios.delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories/" + category.id)
        .then((res)=> {
            console.log(res);
            setCategorySwitch(false);
        })
        .catch((error) => {
            console.log(error.message);  
        });
    }

    const handleCategoryUpdate = () => {
        axios.put(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories/" + updateCategory.id, updateCategory)
        .then((res)=> {
            console.log(res);
            setCategorySwitch(false);
        setUpdateCategorySwitch(false);
            setUpdateCategory(initialCategory);
        }).catch((error) => {
            console.log(error.message);  
        });
    };

    const handleCategoryUpdateSettings = (category) => {
        setUpdateCategory(category);
        setUpdateCategorySwitch(true);
    }

    const handleUpdateChange = (e) => {
        const {name, value} = e.target;
        setUpdateCategory((prev) => (
            {...prev,
            [name]: value,}
        ));
    }


  return (
    <>
    <h1>Category Management</h1>
    <input 
    type="number" 
    name="id" 
    placeholder="ID" 
    value={updateCategorySwitch ? updateCategory.id : newCategory.id}
    onChange={updateCategorySwitch ? handleUpdateChange : handleChange}
    />
    <input 
    type="text"
    name="name" 
    placeholder="Name" 
    value={updateCategorySwitch ? updateCategory.name : newCategory.name}
    onChange={updateCategorySwitch ? handleUpdateChange : handleChange}/>
    <input 
    type="text" 
    name="description"
    placeholder="Description" 
    value={updateCategorySwitch ? updateCategory.description : newCategory.description}
    onChange={updateCategorySwitch ? handleUpdateChange : handleChange}/>
    <br />
    <button onClick={updateCategorySwitch ? handleCategoryUpdate : handleCategory}>
    {updateCategorySwitch ? "Güncelle" : "Kaydet"}
    </button>
    <h2>Categories</h2>
    <ul>{categories?.map((item) => (
        <li key={item.id}>
            <EditIcon style={{fontSize:16}} onClick={()=>handleCategoryUpdateSettings(item)}/>
            {item.name}
            <DeleteOutlineIcon style={{fontSize:16}} onClick={()=>handleCategoryDelete(item)}/>
        </li>
    ))}</ul>
    </>
  )
}
export default Category