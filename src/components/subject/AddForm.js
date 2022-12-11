import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CustomAlert from "../CustomAlert";

import { useAddSubjectMutation } from "../../store/subjectApi";



export default function AddForm() {
  const [text, setText] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    type: "error",
    message: "",
  });

  const [addSubject, {}] = useAddSubjectMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (text.trim().length < 3) {
      setAlert({
        open: true,
        type: "error",
        message: "Ошибка! Название предмета должен быть не менее 3 символов",
      });
      return;
    }
    const result = await addSubject(text.trim());
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
      setText("");
    }
  };

  return (
    <Box
      onSubmit={submitHandler}
      sx={{
        width: 500,
        height: 200,
        padding: "1.5rem",
        borderRadius: "10px",
        border: "1px solid #dee2e6",
        backgroundColor: "rgb(248,249,250)",
        mb: "50px",
      }}
      component="form"
    >
      <Typography variant="h4" component="p" sx={{ mb: "30px" }}>
        Добавить предмет
      </Typography>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Название предмета"
        variant="outlined"
        sx={{ mb: "20px" }}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button variant="outlined" size="large" type="submit">
        Добавить
      </Button>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </Box>
  );
}
