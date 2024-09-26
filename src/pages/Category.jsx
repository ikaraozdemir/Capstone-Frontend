import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CategoryCard from "../components/CategoryCard";
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

function Category() {
  const initialCategory = {
    id: "",
    name: "",
    description: "",
  };
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorySwitch, setCategorySwitch] = useState(true);
  const [updateCategorySwitch, setUpdateCategorySwitch] = useState(false);
  const [newCategory, setNewCategory] = useState(initialCategory);
  const [updateCategory, setUpdateCategory] = useState(initialCategory);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
        setCategorySwitch(true);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  }, [categorySwitch]);

  if (loading) {
    return (
      <div>
        <Box sx={{ width: "100%" }}>
          <LinearBuffer />
        </Box>
      </div>
    );
  }

  const handleCategory = () => {
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories",
        newCategory
      )
      .then((res) => {
        console.log(res);
        setCategorySwitch(false);
        setNewCategory(initialCategory);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryUpdate = () => {
    console.log(updateCategory);
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL +
          "/api/v1/categories/" +
          updateCategory.id,
        updateCategory
      )
      .then((res) => {
        console.log(res);
        setCategorySwitch(false);
        setUpdateCategorySwitch(false);
        setUpdateCategory(initialCategory);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  return (
    <>
      <div className="books">
        <h1>Category Management</h1>
        <div className="books-container">
          <div className="book-inputs">
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              type="text"
              name="name"
              value={
                updateCategorySwitch ? updateCategory.name : newCategory.name
              }
              onChange={
                updateCategorySwitch ? handleUpdateChange : handleChange
              }
            />
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              type="text"
              name="description"
              value={
                updateCategorySwitch
                  ? updateCategory.description
                  : newCategory.description
              }
              onChange={
                updateCategorySwitch ? handleUpdateChange : handleChange
              }
            />
            <br />
            <br />
            <Button
              variant="contained"
              onClick={
                updateCategorySwitch ? handleCategoryUpdate : handleCategory
              }
              sx = {{fontSize:"inherit" ,fontFamily:"inherit", backgroundColor:"rgb(92, 64, 51)"}}
            >
              {updateCategorySwitch ? "Update" : "Save"}
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
            <h2>Categories</h2>
            <ul>
              {categories?.map((category) => (
                <li key={category.id}>
                  <CategoryCard
                    category={category}
                    setUpdateCategory={setUpdateCategory}
                    setUpdateCategorySwitch={setUpdateCategorySwitch}
                    setCategorySwitch={setCategorySwitch}
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
export default Category;
