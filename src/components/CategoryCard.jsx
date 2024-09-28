import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

export default function CategoryCard({
  category,
  setUpdateCategory,
  setUpdateCategorySwitch,
  setCategorySwitch,
  setSnackOpen,
  setSnackMessage,
}) {
  const handleCategoryUpdateSettings = (category) => {
    setUpdateCategory(category);
    setUpdateCategorySwitch(true);
  };

  const handleCategoryDelete = (category) => {
    axios
      .delete(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories/" + category.id
      )
      .then((res) => {
        console.log(res);
        setCategorySwitch(false);
        setSnackMessage("Category deleted successfully!");
        setSnackOpen(true);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        minHeight: 210,
        paddingLeft: 3,
        paddingRight: 3,
      }}
    >
      <EditIcon
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          cursor: "pointer",
          fontSize: 20,
        }}
        onClick={() => handleCategoryUpdateSettings(category)}
      />

      <CardContent sx={{ paddingBottom: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center", fontFamily: "monospace" }}
        >
          {category.name}
        </Typography>
        <hr />
        <br />
        <Typography
          variant="body3"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          <span style={{ fontWeight: 600, color: "black" }}>Description: </span>
          {category.description}
          <br />
        </Typography>
        <br />
        <hr />
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: 0,
          margin: 0,
        }}
      >
        <Button
          fullWidth
          sx={{
            fontSize: 12,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            color: "rgb(128, 0, 32)",
          }}
          onClick={() => handleCategoryDelete(category)}
        >
          <DeleteOutlineIcon
            style={{ fontSize: 24, color: "rgb(128, 0, 32)" }}
          />
          DELETE
        </Button>
      </CardActions>
    </Card>
  );
}
