import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useDeleteQuestionMutation } from "../../store/questionApi";
import CustomAlert from "../CustomAlert";

export default function RemoveDialog({ question, open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [alert, setAlert] = useState({
    open: false,
    type: "error",
    message: "",
  });
  const [deleteQuestion, {}] = useDeleteQuestionMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteQuestion(question._id);
    handleClose();
    setAlert({
      open: true,
      type: "success",
      message: `Вопрос удален`,
    });
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{`Запрос на удаление предмета`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Вы дейстительно хотите удалить вопрос \n${question.question} ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Нет
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </div>
  );
}
