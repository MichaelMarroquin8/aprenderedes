import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";

function FormInput({ name, value, onChange, placeholder, helperText }) {
  return (
    <FormControl>
      <FormLabel>{placeholder}</FormLabel>
      <Input
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default FormInput;
