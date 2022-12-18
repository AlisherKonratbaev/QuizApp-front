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
import Box from "@mui/material/Box/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useUpdateQuestionMutation } from "../../store/questionApi";
const schoolClass = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function EditDialog({ question, open, setOpen, subjects }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [updateQuestion, {}] = useUpdateQuestionMutation();
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
  const [alert, setAlert] = useState({
    open: false,
    type: "error",
    message: "",
  });

  useEffect(() => {
    if (subjects && question._id) {
      const subject = subjects.find((s) => s._id === question.subject);
      const subject_id = subject ? subject._id : "";
      setValues({
        question: question.question,
        subject: subject_id,
        variant1: question.variants[0],
        variant2: question.variants[1],
        variant3: question.variants[2],
        variant4: question.variants[3],
        selectClass: question.class,
        answer: question.answer,
      });
    }
  }, [question, subjects]);

  const closeDialogHandle = () => {
    setOpen(false);
  };
  const saveHandler = async () => {
    const temp = {
      _id: question._id,
      question: values.question.trim(),
      subject: values.subject,
      variants: [
        values.variant1,
        values.variant2,
        values.variant3,
        values.variant4,
      ],
      class: values.selectClass,
      answer: values.answer,
    };
    const updated = await updateQuestion(temp);
    if (updated.error) {
      setAlert({
        open: true,
        type: "error",
        message: "Ошибка, вопрос не был изменен",
      });
    } else {
      closeDialogHandle();
      setAlert({
        open: true,
        type: "success",
        message: "Вопрос был изменен",
      });
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialogHandle}
        aria-labelledby="question-edit-title"
      >
        <DialogTitle
          sx={{ mb: "20px" }}
          id="question-edit-title"
        >{`Изменение вопроса`}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ width: "500px", pt: "20px" }}>
            <TextField
              label="Вопрос"
              multiline
              rows={4}
              fullWidth
              value={values.question}
              onChange={(e) =>
                setValues((val) => ({ ...val, question: e.target.value }))
              }
              sx={{ mb: "20px" }}
            />
            <FormControl fullWidth sx={{ mb: "20px" }}>
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
            <Box sx={{ width: "200px", mb: "20px" }}>
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
            <Box>
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
                        setValues((val) => ({
                          ...val,
                          variant1: e.target.value,
                        }))
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
                        setValues((val) => ({
                          ...val,
                          variant2: e.target.value,
                        }))
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
                        setValues((val) => ({
                          ...val,
                          variant3: e.target.value,
                        }))
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
                        setValues((val) => ({
                          ...val,
                          variant4: e.target.value,
                        }))
                      }
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
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
