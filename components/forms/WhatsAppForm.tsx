import { useState, ChangeEvent } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import PhoneInput, { Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import WhatsAppImage from '../../images/whatsapp-logo.jpg';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

// Define types for the component
interface WhatsAppData {
  waPhoneNumber: Value; // Using the Value type from react-phone-number-input
  waMessage: string;
  showIcon: boolean;
}

interface WhatsAppFormProps {
  linkContent: (data: WhatsAppData) => void;
}

const theme = createTheme({
  typography: {
    fontFamily: '"Sen", sans-serif',
  },
});

const WhatsAppForm = ({ linkContent }: WhatsAppFormProps) => {
  const [whatsAppData, setWhatsAppData] = useState<WhatsAppData>({
    waPhoneNumber: '',
    waMessage: '',
    showIcon: false,
  });

  const handlePhoneChange = (value: Value) => {
    const newData = { ...whatsAppData, waPhoneNumber: value };
    setWhatsAppData(newData);
    linkContent(newData);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    const newData = { ...whatsAppData, waMessage: value };
    setWhatsAppData(newData);
    linkContent(newData);
  };

  const handleIconToggle = () => {
    const newData = { ...whatsAppData, showIcon: !whatsAppData.showIcon };
    setWhatsAppData(newData);
    linkContent(newData);
  };

  const handleSendMessage = () => {
    const { waPhoneNumber, waMessage } = whatsAppData;
    if (waPhoneNumber && waMessage) {
      const phone = waPhoneNumber.toString().replace(/\D/g, ''); // Remove all non-digit characters
      const link = `https://wa.me/${phone}?text=${encodeURIComponent(waMessage)}`;
      window.open(link, '_blank');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" noValidate autoComplete="off">
        <Box display="flex" alignItems="center" mb={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={whatsAppData.showIcon}
                onChange={handleIconToggle}
              />
            }
            label="Add WhatsApp Icon"
          />
          {whatsAppData.showIcon && (
            <Box 
              component="img" 
              src="/path/to/whatsapp-logo.jpg" 
              alt="WhatsApp Icon" 
              width={30} 
              height={30} 
              ml={1} 
              sx={{ borderRadius: '50%' }}
            />
          )}
        </Box>

        <FormControl fullWidth variant="filled" margin="normal">
          <InputLabel shrink htmlFor="whatsapp-phone-input">
            Phone Number
          </InputLabel>
          <PhoneInput
            id="whatsapp-phone-input"
            placeholder="Enter recipient's phone number"
            value={whatsAppData.waPhoneNumber}
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
          id="whatsapp-message-field"
          label="Message"
          variant="filled"
          color="primary"
          multiline
          rows={3}
          name="waMessage"
          placeholder="Enter your message here..."
          value={whatsAppData.waMessage}
          onChange={handleMessageChange}
          required
          fullWidth
        />

        <Box mt={2}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSendMessage}
            disabled={!whatsAppData.waPhoneNumber || !whatsAppData.waMessage}
          >
            Send via WhatsApp
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default WhatsAppForm;