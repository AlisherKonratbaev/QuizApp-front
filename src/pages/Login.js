import React, { useState } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../store/authApi";
import Typography from "@mui/material/Typography";
import CustomAlert from "../components/CustomAlert";

export default function Login() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    open: false,
    type: "error",
    message: "Неверные данные",
  });
  const [loginUser, { data, isLoading, isError }] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const handleLogin = async ({ login, password }) => {
    const res = await loginUser({ login, password });
    if (res.error || !res.data) {
      setError("login", { type: "custom", message: "Логин или пароль не верны" });
      setError("password", { type: "custom", message: "Логин или пароль не верны" });
      setAlert((old) => ({ ...old, open: true }));
    } else {
      navigate("/");
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        className="login-form"
        onSubmit={handleSubmit(handleLogin)}
      >
        <Typography
          component="p"
          variant="h4"
          sx={{ textAlign: "center", mb: "20px" }}
        >
          Вход в аккаунт
        </Typography>
        <TextField
          error={errors.login ? true : false}
          id="login"
          label="Login"
          variant="outlined"
          sx={{ mb: "30px" }}
          {...register("login", {
            minLength: { value: 3, message: "минимум 3 символа" },
            required: {
              value: true,
              message: "Необходимо заполнить поле login",
            },
          })}
          helperText={errors.login ? errors.login?.message || "error!" : false}
        />
        <TextField
          error={errors.password ? true : false}
          id="password"
          type="password"
          label="Password"
          variant="outlined"
          sx={{ mb: "30px" }}
          {...register("password", {
            required: { value: true, message: "Пароль не должен быть пустым" },
            minLength: { value: 6, message: "минимум 6 символа" },
          })}
          helperText={
            errors.password ? errors.password?.message || "error!" : false
          }
        />
        <Button
          variant="outlined"
          type="submit"
          sx={{ margin: "0 auto", width: "200px" }}
          size="large"
        >
          Войти
        </Button>
        {/* <Button variant="text" component={Link} to="/registration">
          У вас нет аккаунта?
        </Button> */}
      </Box>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </Container>
  );
}
