import React, { useEffect, useState, useMemo } from "react";
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
import { useForm } from "react-hook-form";

const EditDialog = ({ subject, open, setOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [updateSubject, {}] = useUpdateSubjectMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    setError,
  } = useForm();
  const [alert, setAlert] = useState({
    open: false,
    type: "error",
    message: "",
  });

  useEffect(() => {
    setValue("name", subject.name);
  }, [subject.name]);

  const closeDialogHandle = () => {
    setOpen(false);
  };
  const saveHandler = async (data) => {
    const { name } = data;
    if (name === subject.name) {
      closeDialogHandle();
      return;
    }
    const temp = {
      _id: subject._id,
      name: name.trim().toLowerCase(),
    };
    const updated = await updateSubject(temp);
    if (updated.error) {
      setError("name", { type: "custom", message: "Ошибка при измения" });
    } else {
      setAlert({
        open: true,
        type: "success",
        message: "Предмет был изменен",
      });
      closeDialogHandle();
      reset();
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
        <form onSubmit={handleSubmit(saveHandler)}>
          <DialogContent>
            <TextField
              id="standard-basic"
              label="Название предмета"
              variant="standard"
              {...register("name", {
                required: { value: true, message: "Обязательно к заполнению" },
                minLength: { value: 3, message: "Минимум 3 символа" },
              })}
              error={errors.name ? true : false}
              helperText={
                errors.name ? errors.name?.message || "error!" : false
              }
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={closeDialogHandle}>
              Отмена
            </Button>
            <Button type="submit" autoFocus>
              Сохранить
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </div>
  );
};

export default EditDialog;
