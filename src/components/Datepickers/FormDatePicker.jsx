import { FormControl, FormHelperText, FormLabel, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useState } from "react";

function FormDatePicker({
  name,
  value,
  onChange,
  placeholder,
  helperText,
  format = "DD-MMM-YYYY", // Formato por defecto
}) {
  const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : null);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    if (onChange) {
      onChange(name, newValue ? newValue.format(format) : ""); // Enviar valor formateado
    }
  };

  return (
    <Stack spacing={1} sx={{ pb: 1.8 }}>
      <FormControl>
        <FormLabel sx={{ pb: 1.8 }}>{placeholder}</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={placeholder}
            name={name}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Stack>
  );
}

FormDatePicker.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string, // Asegúrate de pasar las fechas como cadenas formateadas
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  format: PropTypes.string, // Formato de fecha
};

export default FormDatePicker;
