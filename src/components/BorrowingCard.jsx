import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export default function BorrowingCard({
  borrowing,
  setUpdateBorrowing,
  setUpdateBorrowingSwitch,
  setBorrowingSwitch,
  setReturnedBorrowingId,
  setOpen,
  returnedBorrowingId,
}) {
  const handleBorrowingUpdateSettings = (borrowing) => {
    setUpdateBorrowing(borrowing);
    setUpdateBorrowingSwitch(true);
  };

  const handleBorrowingDelete = (borrowing) => {
    axios
      .delete(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows/" + borrowing.id
      )
      .then(() => {
        setBorrowingSwitch(false);
        setUpdateBorrowingSwitch(false);
        setUpdateBorrowing(null);
      })
      .catch((err) => {
        setOpen(true);
        errMessage = err.message;
      });
  };

  const handleReturn = (returnedBorrowing) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 3;
    const day = currentDate.getDate();
    const returnedDate = `${year}-${month}-${day}`;
    returnedBorrowing.returnDate = returnedDate;

    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL +
          "/api/v1/borrows/" +
          returnedBorrowing.id,
        returnedBorrowing
      )
      .then((res) => {
        setBorrowingSwitch(false);
        setReturnedBorrowingId(returnedBorrowing.id);
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
        paddingLeft:3,
        paddingRight:3
      }}
    >
      {returnedBorrowingId !== borrowing.id && !borrowing.returnDate && (
        <EditIcon
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            cursor: "pointer",
            fontSize: 20,
          }}
          onClick={() => handleBorrowingUpdateSettings(borrowing)}
        />
      )}

      <CardContent sx={{ paddingBottom: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center", fontFamily: "monospace" }}
        >
          {borrowing.book.name}
        </Typography>
        <hr />
        <br />
        <Typography
          variant="body3"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          <span style={{ fontWeight: 600, color: "black" }}>
            Borrower Name:{" "}
          </span>
          {borrowing.borrowerName}
          <br />
          <span style={{ fontWeight: 600, color: "black" }}>
            Borrowered Date:{" "}
          </span>
          {borrowing.borrowingDate}
        </Typography>
        <br />
        {(returnedBorrowingId === borrowing.id || borrowing.returnDate) && (
          <>
            <Typography
              variant="body3"
              sx={{ color: "text.secondary", textAlign: "center" }}
            >
              <span style={{ fontWeight: 600, color: "black" }}>
                Returned Date:{" "}
              </span>
              {borrowing.returnDate}
            </Typography>
            <br />
          </>
        )}

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
        {returnedBorrowingId !== borrowing.id && !borrowing.returnDate && (
          <Button
            fullWidth
            sx={{
              fontSize: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 0,
              color: "rgb(92, 64, 51)",
            }}
            onClick={() => handleReturn(borrowing)}
          >
            <FontAwesomeIcon
              icon={faBook}
              style={{
                fontSize: 18,
                paddingRight: 5,
                color: "rgb(92, 64, 51)",
              }}
            />
            return
          </Button>
        )}

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
          onClick={() => handleBorrowingDelete(borrowing)}
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
