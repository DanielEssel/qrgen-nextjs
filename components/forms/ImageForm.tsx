'use client'; // Required for client-side interactivity in Next.js

import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image'; // Using Next.js Image component

const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderColor: 'black',
          '&:hover': {
            borderColor: 'black',
          },
          '&.Mui-focused': {
            borderColor: 'black',
            backgroundColor: '#e8e8e8',
          },
        },
      },
    },
  },
});

interface EmailFormData {
  receiverEmail: string;
  subject: string;
  message: string;
  showIcon?: boolean;
}

interface EmailFormProps {
  linkContent: (formData: EmailFormData) => void;
}

const EmailForm = ({ linkContent }: EmailFormProps) => {
  const [formInfo, setFormInfo] = useState<EmailFormData>({
    receiverEmail: '',
    subject: '',
    message: ''
  });
  const [showEmailIcon, setShowEmailIcon] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormInfo = {
      ...formInfo,
      [name]: value,
      showIcon: showEmailIcon
    };
    setFormInfo(updatedFormInfo);
    linkContent(updatedFormInfo);
  };

  const handleIconToggle = () => {
    const newShowIcon = !showEmailIcon;
    setShowEmailIcon(newShowIcon);
    const updatedFormInfo = { 
      ...formInfo, 
      showIcon: newShowIcon 
    };
    linkContent(updatedFormInfo);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
        <Box display="flex" alignItems="center" mb={1}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={showEmailIcon} 
                onChange={handleIconToggle}
                aria-label="Toggle email icon visibility"
              />
            }
            label="Add Icon"
          />
          {showEmailIcon && (
            <Image 
              src="/images/email.png" 
              alt="Email Icon" 
              width={30} 
              height={30} 
              style={{ marginLeft: '8px' }}
            />
          )}
        </Box>

        <TextField
          id="receiver-email"
          label="Receiver Email"
          variant="filled"
          color="primary"
          type="email"
          name="receiverEmail"
          placeholder="example@domain.com"
          value={formInfo.receiverEmail}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          inputProps={{
            'aria-required': 'true',
            'aria-label': 'Receiver email address'
          }}
        />
        
        <TextField
          id="subject"
          label="Subject"
          variant="filled"
          color="primary"
          type="text"
          name="subject"
          value={formInfo.subject}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          inputProps={{
            'aria-required': 'true'
          }}
        />

        <TextField
          id="message"
          label="Message"
          variant="filled"
          color="primary"
          multiline
          rows={4}
          name="message"
          value={formInfo.message}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          inputProps={{
            'aria-required': 'true',
            'aria-multiline': 'true'
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default EmailForm;