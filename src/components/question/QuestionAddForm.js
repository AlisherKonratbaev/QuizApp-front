import React, { useState } from "react";
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
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import CustomAlert from "../CustomAlert";
import { useFetchSubjectQuery } from "../../store/subjectApi";
import { useAddQuestionMutation } from "../../store/questionApi";

const schoolClass = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export default function QuestionAddForm() {
  const [alert, setAlert] = useState({
    open: false,
    type: "error",
    message: "",
  });
  const initialState = {
    question: "",
    subject: "",
    variant1: "",
    variant2: "",
    variant3: "",
    variant4: "",
    selectClass: 1,
    answer: "",
  };
  const [values, setValues] = useState({ ...initialState });
  const { data: subjects = [], isLoading } = useFetchSubjectQuery();
  const [addQuestion, {}] = useAddQuestionMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const newQuestion = {
      ...values,
      class:values.selectClass,
      variants: [
        values.variant1,
        values.variant2,
        values.variant3,
        values.variant4,
      ],
    };
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
      setValues({ ...initialState });
    }
  };
  return (
    <Box component="form" className="question" onSubmit={handleAdd}>
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
            value={values.question}
            onChange={(e) =>
              setValues((val) => ({ ...val, question: e.target.value }))
            }
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ width: "250px", pt: "30px" }}>
              <FormControl fullWidth>
                <InputLabel id="subject-select">Предметы</InputLabel>
                <Select
                  labelId="subject-select"
                  id="subject-select"
                  value={values.subject}
                  label="Предметы"
                  onChange={(e) =>
                    setValues((val) => ({ ...val, subject: e.target.value }))
                  }
                >
                  {subjects.length &&
                    subjects.map((subject) => {
                      return (
                        <MenuItem key={subject._id} value={subject._id}>
                          {subject.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ width: "200px", pt: "30px" }}>
              <FormControl fullWidth>
                <InputLabel id="class-select">Класс</InputLabel>
                <Select
                  labelId="class-select"
                  id="class-select"
                  value={values.selectClass}
                  label="Класс"
                  onChange={(e) =>
                    setValues((val) => ({
                      ...val,
                      selectClass: e.target.value,
                    }))
                  }
                >
                  {schoolClass.map((c) => {
                    return (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box className="question-form__second">
          <FormControl fullWidth>
            <RadioGroup
              aria-labelledby="variantes"
              value={values.answer}
              onChange={(e) =>
                setValues((val) => ({ ...val, answer: e.target.value }))
              }
            >
              <div className="variant__item">
                <FormControlLabel value="A" control={<Radio />} label="A" />
                <TextField
                  fullWidth
                  id=""
                  label=""
                  variant="outlined"
                  value={values.variant1}
                  onChange={(e) =>
                    setValues((val) => ({ ...val, variant1: e.target.value }))
                  }
                />
              </div>
              <div className="variant__item">
                <FormControlLabel value="B" control={<Radio />} label="B" />
                <TextField
                  fullWidth
                  id=""
                  label=""
                  variant="outlined"
                  value={values.variant2}
                  onChange={(e) =>
                    setValues((val) => ({ ...val, variant2: e.target.value }))
                  }
                />
              </div>
              <div className="variant__item">
                <FormControlLabel value="C" control={<Radio />} label="C" />
                <TextField
                  fullWidth
                  id=""
                  label=""
                  variant="outlined"
                  value={values.variant3}
                  onChange={(e) =>
                    setValues((val) => ({ ...val, variant3: e.target.value }))
                  }
                />
              </div>
              <div className="variant__item">
                <FormControlLabel value="D" control={<Radio />} label="D" />
                <TextField
                  fullWidth
                  id=""
                  label=""
                  variant="outlined"
                  value={values.variant4}
                  onChange={(e) =>
                    setValues((val) => ({ ...val, variant4: e.target.value }))
                  }
                />
              </div>
            </RadioGroup>
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
