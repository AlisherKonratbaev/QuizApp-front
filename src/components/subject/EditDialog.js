import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CustomAlert from "../CustomAlert";
import TextField from "@mui/material/TextField";
import { useUpdateSubjectMutation } from "../../store/subjectApi";

export default function EditDialog({ subject, open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [updateSubject, {}] = useUpdateSubjectMutation();
  const [text, setText] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    type: "error",
    message: "",
  });
  useEffect(() => {
    setText(`${subject.name}`);
  }, [subject]);

  const closeDialogHandle = () => {
    setOpen(false);
  };
  const saveHandler = async () => {
    if(text.trim() === subject.name) {
      closeDialogHandle();
      return
    }
    const temp = {
      _id: subject._id,
      name: text.trim(),
    };
    const updated = await updateSubject(temp);
    if (updated.error) {
      setAlert({
        open: true,
        type: "error",
        message: "Ошибка название предмета (должен быть не меньше 3 симбола и бить уникальным)",
      });
    } else {
      closeDialogHandle();
      setAlert({
        open: true,
        type: "success",
        message: "Предмет был изменен",
      });
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialogHandle}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{`Редактировать название`}</DialogTitle>
        <DialogContent>
          <TextField
            id="standard-basic"
            label="Название предмета"
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeDialogHandle}>
            Отмена
          </Button>
          <Button onClick={saveHandler} autoFocus>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </div>
  );
}
