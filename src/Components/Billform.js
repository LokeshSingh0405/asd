import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./Billform.css";
import React, { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { addBill, editBill } from "../Redux/Slice/billSlice";
import dayjs from "dayjs";

const Billform = ({ handleClose, selectedBill, setIsEditing, isEditing }) => {
  const dispatch = useDispatch();

  const [formState, setFormState] = React.useState({
    description: "",
    category: "",
    amount: null,
    date: "",
    id: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  useEffect(() => {
    if (selectedBill) {
      setFormState({
        description: selectedBill.description,
        category: selectedBill.category || "",
        amount: Number(selectedBill.amount) || "",
        date: selectedBill.date || "",
        id: selectedBill.id || "",
      });
    }
  }, [selectedBill]);

  const handleDateChange = (newDate) => {
    const formatedDate = newDate.$d?.toISOString().slice(0, 10);
    setFormState((prev) => ({
      ...prev,
      date: formatedDate,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editBill(formState));
    } else {
      dispatch(
        addBill({
          ...formState,
          id: Date.now(),
        })
      );
    }
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className="formcontainer">
        <Box className="form">
          <Typography variant="h6" gutterBottom>
            Add Bill
          </Typography>

          <TextField
            id="outlined-basic"
            label="Description"
            name="description"
            variant="outlined"
            onChange={handleChange}
            required
            value={formState.description}
          />

          <InputLabel id="demo-simple-select-standard-label">
            Select Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={formState.category}
            name="category"
            label="Select Category"
            onChange={handleChange}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"FoodNDining"}>FoodNDining</MenuItem>
            <MenuItem value={"utility"}>Utility</MenuItem>
            <MenuItem value={"shopping"}>Shopping</MenuItem>
            <MenuItem value={"Food & Dining"}>Food & Dining</MenuItem>
            <MenuItem value={"education"}>Education</MenuItem>
            <MenuItem value={"Personal Care"}>Personal Care</MenuItem>
            <MenuItem value={"Travel"}>Travel</MenuItem>
          </Select>

          <TextField
            id="outlined-basic"
            label="Amount"
            type="number"
            name="amount"
            variant="outlined"
            onChange={handleChange}
            required
            value={formState.amount}
          />

          <DatePicker
            onChange={handleDateChange}
            value={formState.date ? dayjs(formState.date) : null}
          />

          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default Billform;