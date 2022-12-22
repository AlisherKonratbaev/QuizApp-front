import React, { useEffect, useState } from "react";
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
import { useFetchSubjectQuery } from "../../store/subjectApi";
import { useGetQuestionsCountQuery } from "../../store/questionApi";
import RemoveDialog from "./RemoveDialog";
import EditDialog from "./EditDialog";
import SubjectCount from "./SubjectCount";

export default function SubjectsList() {
  const { data: subjects = [], isLoading, isError } = useFetchSubjectQuery();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentSubject, setCurrentSubject] = useState({});

  const handleEdit = (subject) => {
    setCurrentSubject(subject);
    setOpenEdit(true);
  };

  const handleOpen = (subject) => {
    setCurrentSubject(subject);
    setOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "rgb(248,249,250)" }}>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Название предмета</TableCell>
                <TableCell>Количество вопросов</TableCell>
                <TableCell>Действие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.length != 0 &&
                subjects?.map((subject, index) => {
                  return (
                    <TableRow key={subject._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>
                        <SubjectCount subject_id={subject._id} />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          size="small"
                          sx={{ mr: "10px" }}
                          color="primary"
                          onClick={() => {
                            handleEdit(subject);
                          }}
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          color="secondary"
                          onClick={() => {
                            handleOpen(subject);
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
      <RemoveDialog subject={currentSubject} open={open} setOpen={setOpen} />
      <EditDialog
        subject={currentSubject}
        open={openEdit}
        setOpen={setOpenEdit}
      />
    </>
  );
}
