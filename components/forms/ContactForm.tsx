'use client'; // Required for client-side interactivity in Next.js

import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../QRInterface/QRInterface.module.css'; // Converted to CSS Modules

interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  company: string;
  jobTitle: string;
}

interface ContactFormProps {
  linkContent: (contactInfo: ContactInfo) => void;
}

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

const ContactForm = ({ linkContent }: ContactFormProps) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    company: '',
    jobTitle: '',
  });

  useEffect(() => {
    linkContent(contactInfo);
  }, [contactInfo, linkContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const fieldLabels: Record<keyof ContactInfo, string> = {
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    company: 'Company',
    jobTitle: 'Job Title'
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxHeight: '400px',
          overflowY: 'auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          width: '100%',
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}
        >
          {(Object.keys(contactInfo) as Array<keyof ContactInfo>).map((field) => (
            <TextField
              key={field}
              id={`${field}-field`}
              label={fieldLabels[field]}
              variant="filled"
              color="primary"
              name={field}
              value={contactInfo[field]}
              onChange={handleChange}
              required={['firstName', 'lastName', 'phone', 'email'].includes(field)}
            />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ContactForm;