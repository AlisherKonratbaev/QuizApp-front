import React from "react";
import Box from "@mui/material/Box";
import SubjectsList from "../components/subject/SubjectsList";
import AddForm from "../components/subject/AddForm";
export default function Subjects() {
  return (
    <Box>
        <AddForm />
        <SubjectsList />
    </Box>
  );
}
