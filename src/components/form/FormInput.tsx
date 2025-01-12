import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  fullWidth?: boolean;
}

export function FormInput({
  id,
  label,
  type = "text",
  value,
  error,
  onChange,
  onBlur,
  placeholder,
  fullWidth = true,
}: Readonly<FormInputProps>) {
  return (
    <Box>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <TextField
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        variant="outlined"
        fullWidth={fullWidth}
      />
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
}
