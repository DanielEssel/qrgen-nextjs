'use client'; // Required for client-side interactivity in Next.js

import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PhoneInput, { Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Image from 'next/image'; // Using Next.js Image component

const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
});

interface CallFormProps {
  linkContent: (data: { phoneNumber: string; showIcon: boolean }) => void;
}

const CallForm = ({ linkContent }: CallFormProps) => {
  const [selectedCode, setSelectedCode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<Value>();
  const [showIcon, setShowIcon] = useState<boolean>(false);

  const handlePhoneChange = (value: Value) => {
    setPhoneNumber(value);
    if (linkContent && value) {
      linkContent({ 
        phoneNumber: `${selectedCode}${value}`, 
        showIcon 
      });
    }
  };

  const handleIconToggle = () => {
    const newShowIcon = !showIcon;
    setShowIcon(newShowIcon);
    if (linkContent && phoneNumber) {
      linkContent({ 
        phoneNumber: `${selectedCode}${phoneNumber}`, 
        showIcon: newShowIcon 
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
        <Box display="flex" alignItems="center" mb={1}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={showIcon} 
                onChange={handleIconToggle} 
              />
            }
            label="Add Call Image"
          />
          {showIcon && (
            <Image 
              src="/images/freecall-logo.webp" 
              alt="Call Icon" 
              width={30} 
              height={30} 
              style={{ marginLeft: '8px' }}
            />
          )}
        </Box>

        <FormControl fullWidth variant="filled" margin="normal">
          <InputLabel shrink htmlFor="phone-input">
            Phone Number
          </InputLabel>
          <PhoneInput
            id="phone-input"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={handlePhoneChange}
            defaultCountry="GH"
            limitMaxLength={16}
            required
            style={{
              width: '100%',
              height: '120px',
              padding: '10px 12px',
              fontFamily: '"Sen", sans-serif',
              borderRadius: '4px',
              backgroundColor: 'rgba(0, 0, 0, 0.06)',
              border: 'none',
            }}
          />
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};

export default CallForm;