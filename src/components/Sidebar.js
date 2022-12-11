import React from "react";
import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        minHeight: "80vh",
        maxHeight: "80vh",
        position: "relative",
        overflow: "auto",
        borderRight: "1px solid #ccc",
        padding: "5px",
      }}
    >
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/" className="nav-item">
              <ListItemText primary="Главная" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/subjects"
              className="nav-item"
            >
              <ListItemText primary="Предметы" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/questions"
              className="nav-item"
            >
              <ListItemText primary="Вопросы" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
