import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

function PublishField({
  content,
  type,
  sx,
  placeholder,
  defaultTime,
  variant,
  ...otherProps
}) {
  const activeBorderColor = "#BCB6FF";
  const activeLabelColor = "#BCB6FF";
  const defaultDateValue = new Date();
  defaultDateValue.setDate(defaultDateValue.getDate() + 7);
  switch (content) {
    case "date":
      return (
        <TextField
          sx={{
            ...sx,
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: activeBorderColor,
              },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: activeLabelColor,
            },
          }}
          required
          variant={variant}
          type="date"
          fullWidth
          defaultValue={defaultDateValue.toISOString().slice(0, 10)}
          placeholder={defaultDateValue.toISOString().slice(0, 10)}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...otherProps}
        />
      );
    case "time":
      return (
        <TextField
          sx={{
            ...sx,
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: activeBorderColor,
              },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: activeLabelColor,
            },
          }}
          required
          variant={variant}
          type="time"
          fullWidth
          defaultValue={defaultTime}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...otherProps}
        />
      );
    case "count":
      return (
        <TextField
          sx={{
            ...sx,
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: activeBorderColor,
              },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: activeLabelColor,
            },
          }}
          required
          variant={variant}
          type="number"
          fullWidth
          onKeyPress={(event) => {
            if (event.key === "-" || event.key === "+") {
              event.preventDefault();
            }
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...otherProps}
        />
      );
    case "price":
      return (
        <div>
          <TextField
            sx={{
              ...sx,
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: activeBorderColor,
                },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: activeLabelColor,
              },
            }}
            required
            type="number"
            placeholder={placeholder}
            variant={variant}
            fullWidth
            onKeyPress={(event) => {
              if (event.key === "-" || event.key === "+") {
                event.preventDefault();
              }
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
          />
        </div>
      );
    default:
      return <TextField />;
  }
}

PublishField.defaultProps = {
  sx: {},
  content: "",
  type: "",
  placeholder: "",
  variant: "",
  defaultTime: "10:00",
};

PublishField.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sx: PropTypes.object,
  content: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  defaultTime: PropTypes.string,
};

export default PublishField;
