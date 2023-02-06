import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import CustomAlert from "../CustomAlert";
import { useFetchSubjectQuery } from "../../store/subjectApi";
import { useAddQuestionMutation } from "../../store/questionApi";
import { useForm, Controller } from "react-hook-form";

const schoolClass = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function QuestionAddForm() {
  const { data: subjects = [], isLoading } = useFetchSubjectQuery();
  const [alert, setAlert] = useState({
    open: false,
    type: "error",
    message: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
  } = useForm({ mode: "all" });
  const [addQuestion, {}] = useAddQuestionMutation();

  const handleAdd = async (data) => {
    const {
      question,
      subject,
      variant1,
      variant2,
      variant3,
      variant4,
      selectClass,
      answer,
    } = data;
    const newQuestion = {
      question,
      subject,
      class: selectClass,
      answer,
      variants: [variant1, variant2, variant3, variant4],
    };
    console.log(newQuestion);
    const added = await addQuestion(newQuestion);
    if (added.error) {
      setAlert({
        open: true,
        type: "error",
        message: "Ошибка, Вопрос не добавлен",
      });
    } else {
      setAlert({
        open: true,
        type: "success",
        message: "Вопрос успешно добавлен",
      });
      reset();
      reset("subject");
      setValue("subject", "");
    }
  };
  return (
    <Box
      component="form"
      className="question"
      onSubmit={handleSubmit(handleAdd)}
    >
      <Typography component="p" variant="h4">
        Форма добавление вопроса
      </Typography>
      <Box className="question-form" sx={{ padding: "30px 0" }}>
        <Box className="question-form__first">
          <TextField
            label="Вопрос"
            multiline
            rows={4}
            fullWidth
            {...register("question", {
              required: { value: true, message: "Обязательно к заполнению" },
              minLength: { value: 3, message: "Минимум 3 символа" },
            })}
            error={Boolean(errors?.question)}
            helperText={errors.question?.message}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ width: "250px", pt: "30px" }}>
              <TextField
                select
                fullWidth
                label="Предметы"
                defaultValue=""
                inputProps={register("subject", {
                  required: "Выберите предмет",
                })}
                error={!!errors.subject}
                helperText={errors.subject?.message}
              >
                {subjects.length === 0 ? (
                  <MenuItem>1</MenuItem>
                ) : (
                  subjects?.map((subject) => {
                    return (
                      <MenuItem key={subject._id} value={subject._id}>
                        {subject.name}
                      </MenuItem>
                    );
                  })
                )}
                {/* {subjects.length} */}
              </TextField>
            </Box>

            <Box sx={{ width: "200px", pt: "30px" }}>
              <TextField
                select
                fullWidth
                label="Класс"
                defaultValue=""
                inputProps={register("selectClass", {
                  required: "Выберите класс",
                })}
                error={!!errors.selectClass}
                helperText={errors.selectClass?.message}
              >
                {schoolClass.map((c) => {
                  return (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Box>
          </Box>
        </Box>
        <Box className="question-form__second">
          <FormControl fullWidth>
            <Controller
              rules={{ required: { value: true, message: "Ответ не выбран" } }}
              defaultValue={null}
              control={control}
              name="answer"
              render={({ field }) => (
                <RadioGroup {...field}>
                  <div className="variant__item">
                    <FormControlLabel value="A" control={<Radio />} label="A" />
                    <TextField
                      fullWidth
                      id="variantA"
                      variant="outlined"
                      {...register("variant1", {
                        required: {
                          value: true,
                          message: "Обязательно к заполнению",
                        },
                      })}
                      error={!!errors.variant1}
                      helperText={errors.variant1?.message}
                    />
                  </div>
                  <div className="variant__item">
                    <FormControlLabel value="B" control={<Radio />} label="B" />
                    <TextField
                      fullWidth
                      id="variantB"
                      variant="outlined"
                      {...register("variant2", {
                        required: {
                          value: true,
                          message: "Обязательно к заполнению",
                        },
                      })}
                      error={!!errors.variant2}
                      helperText={errors.variant2?.message}
                    />
                  </div>
                  <div className="variant__item">
                    <FormControlLabel value="C" control={<Radio />} label="C" />
                    <TextField
                      fullWidth
                      id="variantC"
                      variant="outlined"
                      {...register("variant3", {
                        required: {
                          value: true,
                          message: "Обязательно к заполнению",
                        },
                      })}
                      error={!!errors.variant3}
                      helperText={errors.variant3?.message}
                    />
                  </div>
                  <div className="variant__item">
                    <FormControlLabel value="D" control={<Radio />} label="D" />
                    <TextField
                      fullWidth
                      id="variantD"
                      variant="outlined"
                      {...register("variant4", {
                        required: {
                          value: true,
                          message: "Обязательно к заполнению",
                        },
                      })}
                      error={!!errors.variant4}
                      helperText={errors.variant4?.message}
                    />
                  </div>
                </RadioGroup>
              )}
            />

            <FormHelperText sx={{ color: "rgb(185, 61, 61)" }}>
              {errors.answer ? errors.answer?.message || "error!" : false}
            </FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ alignSelf: "center" }}
      >
        Сохранить
      </Button>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </Box>
  );
}
