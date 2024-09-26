import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";


export default function BookCard({
  book,
  setUpdateBook,
  setUpdateBookSwitch,
  setBookSwitch,
  initialBook,
  setSnackOpen,
  setSnackMessage
}) {
  const handleBookUpdateSettings = (book) => {
    setUpdateBook(book);
    setUpdateBookSwitch(true);
  };

  const handleBookDelete = (book) => {
    axios
      .delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books/" + book.id)
      .then(() => {
        setBookSwitch(false);
        setUpdateBookSwitch(false);
        setUpdateBook(initialBook);
        setSnackMessage("Book deleted successfully!");
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
        minHeight: 440,
        paddingTop: 5,
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
        onClick={() => handleBookUpdateSettings(book)}
      />

      <div style={{ position: "relative", textAlign: "center" }}>
        <CardMedia
          component="img"
          alt={book.name}
          height="140"
          image="../../images/book-image.png"
          sx={{ width: 150, height: "auto" }}
        />

        <Typography
          variant="h6"
          component="div"
          sx={{
            width: "max-content",
            position: "absolute",
            bottom: 144,
            left: "50%",
            transform: "translateX(-40%)",
            padding: "4px 8px",
            fontFamily: "monospace",
          }}
        >
          {book.name}
        </Typography>
      </div>

      <CardContent>
        <hr />
        <br />
        <Typography
          variant="body3"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          <span style={{ fontWeight: 600, color: "black" }}>Author: </span>
          {book.author.name}
          <br />
          <span style={{ fontWeight: 600, color: "black" }}>
            Publication Year:{" "}
          </span>
          {book.publicationYear}
          <br />
          <span style={{ fontWeight: 600, color: "black" }}>Publisher: </span>
          {book.publisher.name}
          <br />
          <br />
        </Typography>
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
          onClick={() => handleBookDelete(book)}
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
