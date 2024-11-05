import { FormControl, FormHelperText, FormLabel, Input, Stack } from "@mui/joy";
import PropTypes from "prop-types";

function FormInput({ name, value, onChange, placeholder, helperText }) {
  return (
    <Stack spacing={1} sx={{ pb: 1.8 }}>
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
    </Stack>
  );
}

FormInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
};

export default FormInput;
