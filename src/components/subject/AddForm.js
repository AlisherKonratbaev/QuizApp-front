import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CustomAlert from "../CustomAlert";
import { useForm } from "react-hook-form";
import { useAddSubjectMutation } from "../../store/subjectApi";

export default function AddForm() {
  const { register, handleSubmit,setError, reset, formState: { errors }} = useForm({mode:"all"});
  const [alert, setAlert] = useState({
    open: false,
    type: "error",
    message: "",
  });

  const [addSubject] = useAddSubjectMutation();

  const saveSubjet = async (data) => {
    const { name } = data;
    console.log(name);
    const result = await addSubject(name.trim().toLowerCase());
    if (result.error) {
      setAlert({
        open: true,
        type: "error",
        message: `Ошибка! Неверный предмет`,
      });
    } else {
      setAlert({
        open: true,
        type: "success",
        message: "Предмет успешно добавлен",
      });
      reset();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(saveSubjet)}
      sx={{
        width: 500,
        height: 200,
        padding: "1.5rem",
        borderRadius: "10px",
        border: "1px solid #dee2e6",
        backgroundColor: "rgb(248,249,250)",
        mb: "50px",
      }}
    >
      <Typography variant="h4" component="p" sx={{ mb: "30px" }}>
        Добавить предмет
      </Typography>
      <TextField
        error={errors.name ? true : false}
        fullWidth
        id="name"
        label="Название предмета"
        variant="outlined"
        sx={{ mb: "20px" }}
        {...register("name", {
          required: { value: true, message: "Обязательно к заполнению" },
          minLength: { value: 3, message: "Минимум 3 символа" },
        })}
        helperText={errors.name ? errors.name?.message || "error!" : false}
      />
      <Button variant="outlined" size="large" type="submit">
        Добавить
      </Button>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </Box>
  );
}
