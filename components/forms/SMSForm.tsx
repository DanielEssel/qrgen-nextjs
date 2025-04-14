import { useState, ChangeEvent } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import PhoneInput, { Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Define types for the component
interface SMSData {
  phoneNumber: Value; // Using the Value type from react-phone-number-input
  smsMessage: string;
  // showIcon?: boolean;
}

interface SMSFormProps {
  linkContent: (data: SMSData) => void;
}

const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
});

const SMSForm = ({ linkContent }: SMSFormProps) => {
  const [smsData, setSMSData] = useState<SMSData>({
    phoneNumber: '',
    smsMessage: '',
    // showIcon: false,
  });

  const handlePhoneChange = (value: Value) => {
    const newData = { ...smsData, phoneNumber: value };
    setSMSData(newData);
    linkContent(newData);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    const newData = { ...smsData, smsMessage: value };
    setSMSData(newData);
    linkContent(newData);
  };

  // const handleIconToggle = () => {
  //   const newData = { ...smsData, showIcon: !smsData.showIcon };
  //   setSMSData(newData);
  //   linkContent(newData);
  // };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
        {/* <Box display="flex" alignItems="center" mb={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={smsData.showIcon}
                onChange={handleIconToggle}
              />
            }
            label="Add SMS Icon"
          />
          {smsData.showIcon && (
            <Box component="img" src={IconImage} alt="SMS Icon" width={30} height={30} ml={1} />
          )}
        </Box> */}

        <FormControl fullWidth variant="filled" margin="normal">
          <InputLabel shrink htmlFor="phone-input">
            Phone Number
          </InputLabel>
          <PhoneInput
            id="phone-input"
            placeholder="eg: +233 544112245"
            value={smsData.phoneNumber}
            onChange={handlePhoneChange}
            defaultCountry="GH"
            limitMaxLength={16}
            required
            style={{
              width: '100%',
              height: '120px',
              padding: '10px 12px',
              fontFamily: '"Sen", sans-serif',
              backgroundColor: 'rgba(0, 0, 0, 0.06)',
              border: 'none',
            }}
          />
        </FormControl>

        <TextField
          id="message-field"
          label="Message"
          variant="filled"
          color="primary"
          multiline
          rows={3}
          name="smsMessage"
          placeholder="Enter your message here..."
          value={smsData.smsMessage}
          onChange={handleMessageChange}
          required
          fullWidth
        />
      </Box>
    </ThemeProvider>
  );
};

export default SMSForm;