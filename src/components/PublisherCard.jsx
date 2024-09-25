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
        
      }}
    >
      <EditIcon
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          cursor: "pointer",
          fontSize: 24,
        }}
        onClick={() => handlePublisherUpdateSettings(publisher)}
      />

      <div style={{ position: "relative", textAlign: "center" }}>

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
          }}
        >
          {publisher.name}
        </Typography>
      </div>

      <CardContent>
      <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center'}}>
          {publisher.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          width: "100%",
          padding: 0,
          marginTop: "auto",
        }}
      >
        <Button
          size="large"
          fullWidth
          sx={{
            fontSize: 14,
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
          onClick={() => handlePublisherDelete(publisher)}
        >
          <DeleteOutlineIcon style={{ fontSize: 24, marginRight: "8px" }} />
          DELETE
        </Button>
      </CardActions>
    </Card>
  );
}
