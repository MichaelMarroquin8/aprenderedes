import { FormControl, FormLabel, Select, Option, Stack } from "@mui/joy";

function CustomSelect({ label, name, options, defaultValue = "", onChange }) {
  const handleSelectChange = (event, newValue) => {
    onChange(name, newValue);
  };

  return (
    <Stack spacing={1} sx={{ pb: 1.8 }}>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Select
          defaultValue={defaultValue}
          name={name}
          onChange={handleSelectChange}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

export default CustomSelect;
