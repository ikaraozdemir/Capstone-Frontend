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

let errMessage = "";

export default function AuthorCard({
  author,
  setUpdateAuthor,
  setUpdateAuthorSwitch,
  setAuthorSwitch,
  initialAuthor,
  setSnackOpen,
  setSnackMessage,
}) {
  const handleAuthorUpdateSettings = (author) => {
    setUpdateAuthor(author);
    setUpdateAuthorSwitch(true);
  };

  const handleAuthorDelete = (author) => {
    axios
      .delete(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors/" + author.id
      )
      .then(() => {
        setAuthorSwitch(false);
        setUpdateAuthorSwitch(false);
        setUpdateAuthor(initialAuthor);
        setSnackMessage("Author deleted successfully!");
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
        minHeight: 390,
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
        onClick={() => handleAuthorUpdateSettings(author)}
      />

      <div style={{ position: "relative", textAlign: "center" }}>
        <CardMedia
          component="img"
          alt={author.name}
          height="140"
          image="../../images/profile_avatar.png"
          sx={{ width: 150, height: "auto" }}
        />
      </div>
      <Typography
        variant="h6"
        component="div"
        sx={{
          width: "max-content",
        }}
      >
        {author.name}
      </Typography>
      <CardContent>
        <hr />
        <br />
        <Typography
          variant="body3"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          <span style={{ fontWeight: 600, color: "black" }}>
            Date of birth:{" "}
          </span>
          {author.birthDate}
          <br />
          <span style={{ fontWeight: 600, color: "black" }}>Country: </span>
          {author.country}
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
          onClick={() => handleAuthorDelete(author)}
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
