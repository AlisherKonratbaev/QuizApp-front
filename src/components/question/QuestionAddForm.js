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

export default function QuestionAddForm() {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box component="form" className="question">
      <Typography component="p" variant="h4">
        Форма добавление вопроса
      </Typography>
      <Box className="question-form" sx={{ padding: "30px 0" }}>
        <Box className="question-form__first">
          <TextField label="Вопрос" multiline rows={4} fullWidth />
          <Box sx={{ width: "300px", pt: "30px" }}>
            <FormControl fullWidth>
              <InputLabel id="subject-select">Предметы</InputLabel>
              <Select
                labelId="subject-select"
                id="subject-select"
                value={age}
                label="Предметы"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box className="question-form__second">
          <FormControl fullWidth>
            <RadioGroup
              aria-labelledby="variantes"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <div className="variant__item">
                <FormControlLabel value="A" control={<Radio />} label="A" />
                <TextField fullWidth id="" label="" variant="outlined" />
              </div>
              <div className="variant__item">
                <FormControlLabel value="B" control={<Radio />} label="B" />
                <TextField fullWidth id="" label="" variant="outlined" />
              </div>
              <div className="variant__item">
                <FormControlLabel value="C" control={<Radio />} label="C" />
                <TextField fullWidth id="" label="" variant="outlined" />
              </div>
              <div className="variant__item">
                <FormControlLabel value="D" control={<Radio />} label="D" />
                <TextField fullWidth id="" label="" variant="outlined" />
              </div>
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Button variant="contained" size="large" sx={{alignSelf:"center"}}>
        Сохранить
      </Button>
    </Box>
  );
}
