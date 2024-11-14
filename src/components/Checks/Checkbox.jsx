import React, { useState, useEffect } from "react";
import {
  Tooltip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function CustomSelect({
  label,
  name,
  options,
  onSelectionChange,
  defaultO = "",
  isDisable = false,
}) {
  const [selectedValue, setSelectedValue] = useState(defaultO);

  useEffect(() => {
    setSelectedValue(defaultO);
  }, [defaultO]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onSelectionChange) {
      onSelectionChange(name, newValue);
    }
  };

  return (
    <FormControl fullWidth disabled={isDisable}>
      <InputLabel>{label}</InputLabel>
      <Select value={selectedValue} label={label} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.tooltip ? (
              <Tooltip title={option.tooltip} arrow>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <InfoIcon style={{ color: "gray", marginRight: 8 }} />
                  {option.label}
                </span>
              </Tooltip>
            ) : (
              option.label
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
