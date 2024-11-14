import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";

function FormInput({ name, value, onChange, placeholder, helperText, type }) {
  return (
    <Stack spacing={1} sx={{ pb: 1.8 }}>
      <FormControl>
        <FormLabel>{placeholder}</FormLabel>
        <Input
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          fullWidth
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Stack>
  );
}

FormInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
};

export default FormInput;
