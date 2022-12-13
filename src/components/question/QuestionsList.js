import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useFetchQuestionQuery } from "../../store/questionApi";
import { useFetchSubjectQuery } from "../../store/subjectApi";

export default function QuestionsList() {
  const { data: questions = [], isLoading } = useFetchQuestionQuery();
  const { data: subjects = [] } = useFetchSubjectQuery();

  const getSubject = (id) => {
    if (subjects.length !== 0) {
      const subject = subjects.find((subject) => subject._id === id);
      if (subject) {
        return subject.name;
      }
      return "Не определен";
    }
  };

  const renderVarians = (quesation) => {
    const { variants, answer } = quesation;
    const i = getAnswer(answer);
    return (
      <div className="variants">
        <ul className="variants__list">
          {variants.map((variant, index) => {
            if (index === i)
              return (
                <li className="variants_true" key={index}>
                  {variant}
                </li>
              );
            else return <li key={index}>{variant}</li>;
          })}
        </ul>
      </div>
    );
  };
  const getAnswer = (answer) => {
    switch (answer) {
      case "A":
        return 0;
      case "B":
        return 1;
      case "C":
        return 2;
      case "D":
        return 3;
      default:
        return 0;
    }
  };
  return (
    <>
      {isLoading ? (
        <>Loading</>
      ) : (
        <TableContainer component={Paper} className="question-table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "rgb(248,249,250)" }}>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell sx={{ width: "60%" }}>Вопросы</TableCell>
                <TableCell>Навание предмета</TableCell>
                <TableCell>Действие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.length != 0 &&
                questions?.map((el, index) => {
                  return (
                    <TableRow key={el._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Accordion sx={{ backgroundColor: "#fafafa" }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${el.id}-content`}
                            id={`${el.id}-header`}
                          >
                            <Typography>{el.question}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {renderVarians(el)}
                          </AccordionDetails>
                        </Accordion>
                      </TableCell>
                      <TableCell>{getSubject(el.subject)}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          size="small"
                          sx={{ mr: "10px" }}
                          color="primary"
                          onClick={() => {
                            // handleEdit(el);
                          }}
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          color="secondary"
                          onClick={() => {
                            // handleOpen(el);
                          }}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
