import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

function PublishField({
  content,
  // emailCheck,
  // pwd,
  // nicknameCheck,
  type,
  sx,
  placeholder,
  variant,
  ...otherProps
}) {
  switch (content) {
    case "date":
      return (
        <TextField
          sx={sx}
          required
          variant={variant}
          type="date"
          fullWidth
          // error={verifier.email()}
          // helperText={emailHelper()}
          // onChange={onChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...otherProps}
        />
      );
    case "time":
      return (
        <TextField
          sx={sx}
          required
          variant={variant}
          type="time"
          fullWidth
          // error={verifier.password()}
          // helperText={verifier.password() ? msg.password : ""}
          // onChange={onChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...otherProps}
        />
      );
    case "count":
      return (
        <TextField
          sx={sx}
          required
          variant={variant}
          label="숫자만 입력"
          type="number"
          fullWidth
          // error={verifier.passwordCheck()}
          // helperText={verifier.passwordCheck() ? msg.passwordCheck : ""}
          // onChange={onChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...otherProps}
        />
      );
    case "price":
      return (
        <TextField
          sx={sx}
          required
          label="숫자만 입력"
          type="text"
          placeholder={placeholder}
          variant={variant}
          fullWidth
          // error={verifier.nickname()}
          // helperText={nicknameHelper()}
          // onChange={onChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...otherProps}
        />
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
};

PublishField.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sx: PropTypes.object,
  content: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
};

export default PublishField;
