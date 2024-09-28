import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

export default function PublisherCard({
  publisher,
  setUpdatePublisher,
  setUpdatePublisherSwitch,
  setPublisherSwitch,
  setSnackOpen,
  setSnackMessage,
}) {
  const handlePublisherUpdateSettings = (publisher) => {
    setUpdatePublisher(publisher);
    setUpdatePublisherSwitch(true);
  };

  const handlePublisherDelete = (publisher) => {
    axios
      .delete(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers/" + publisher.id
      )
      .then((res) => {
        console.log(res);
        setPublisherSwitch(false);
        setSnackMessage("Publisher deleted successfully!");
        setSnackOpen(true);
        setUpdatePublisher(initialState);
        setNewPublisher(initialState);
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
        onClick={() => handlePublisherUpdateSettings(publisher)}
      />

      <CardContent sx={{ paddingBottom: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center", fontFamily: "monospace" }}
        >
          {publisher.name}
        </Typography>
        <hr />
        <br />
        <Typography
          variant="body3"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          <span style={{ fontWeight: 600, color: "black" }}>
            Establishment Year:{" "}
          </span>
          {publisher.establishmentYear}
          <br />
          <span style={{ fontWeight: 600, color: "black" }}>Address: </span>
          {publisher.address}
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
          onClick={() => handlePublisherDelete(publisher)}
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
