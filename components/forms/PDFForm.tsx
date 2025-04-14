import { useState, ChangeEvent } from 'react';
import { uploadPDFAndGetURL } from '../../firebase'; // Adjust path as necessary
import { auth, User } from '../../firebase'; // Ensure you import your auth configuration
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import '../QRInterface/QR-Interface.css';

// Define types for the component
interface FormInfo {
  pdfContent: string;
}

type UploadType = 'file' | 'url';

interface PDFFormProps {
  linkContent: (info: { pdfContent: string; uploadType?: UploadType }) => void;
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

const PDFForm = ({ linkContent }: PDFFormProps) => {
  const [formInfo, setFormInfo] = useState<FormInfo>({
    pdfContent: '',
  });
  const [uploadType, setUploadType] = useState<UploadType>('file');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };

  const handleUploadTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as UploadType;
    setUploadType(value);
    setFormInfo({ pdfContent: '' });
    setErrorMessage(''); // Reset error message on type change
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Authentication check before file upload
    const user: User | null = auth.currentUser;
    console.log("Current User:", user);

    if (!user) {
      console.error("User is not authenticated. Cannot upload files.");
      setErrorMessage("You must be logged in to upload files.");
      return;
    }

    if (file) {
      try {
        const downloadURL = await uploadPDFAndGetURL(file);
        const updatedInfo = { ...formInfo, pdfContent: downloadURL };
        setFormInfo(updatedInfo);
        linkContent(updatedInfo);
        setErrorMessage('');
      } catch (error) {
        console.error("File upload failed:", error);
        setErrorMessage(`Error uploading file: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const handleGenerateQR = () => {
    console.log("Form Info Submitted:", formInfo);
    linkContent({ ...formInfo, uploadType });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className='pdf-form' component="form" noValidate autoComplete="off">
        {errorMessage && (
          <div className="tw-bg-red-500 tw-text-white tw-p-3 tw-rounded tw-mb-4">
            {errorMessage}
          </div>
        )}

        <RadioGroup value={uploadType} onChange={handleUploadTypeChange} row>
          <FormControlLabel value="file" control={<Radio />} label="Upload PDF File" />
          <FormControlLabel value="url" control={<Radio />} label="Enter PDF URL" />
        </RadioGroup>

        {uploadType === 'file' ? (
          <div>
            <input
              type="file"
              name="pdfContent"
              onChange={handleFileChange}
              accept="application/pdf"
            />
          </div>
        ) : (
          <TextField
            id="pdf-url-field"
            label="PDF URL"
            variant="filled"
            color="primary"
            type="text"
            name="pdfContent"
            placeholder="https://example.com/document.pdf"
            value={formInfo.pdfContent}
            onChange={handleChange}
            required
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateQR}
          style={{ marginTop: '10px' }}
        >
          Generate QR Code
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default PDFForm;