import { useState, ChangeEvent } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../QRInterface/QRInterface.module.css';

// Define types for the component
interface FormInfo {
  url: string;
  description: string;
  imageUrl: string;
}

type UploadType = 'file' | 'url';

interface LinkFormProps {
  linkContent: (info: FormInfo) => void;
}

// Create a theme with custom font family
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

const LinkForm = ({ linkContent }: LinkFormProps) => {
  const [formInfo, setFormInfo] = useState<FormInfo>({
    url: '', 
    description: '',
    imageUrl: '',
  });
  const [uploadType, setUploadType] = useState<UploadType>('file'); // Control whether file or URL is used

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedInfo = {
      ...formInfo,
      [name]: value,
    };
    setFormInfo(updatedInfo);
    linkContent(updatedInfo);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedInfo = {
        ...formInfo,
        imageUrl,
      };
      setFormInfo(updatedInfo);
      linkContent(updatedInfo);
    }
  };

  const handleUploadTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUploadType = e.target.value as UploadType;
    setUploadType(newUploadType);
    // Clear image URL when switching between file and URL input
    const updatedInfo = { ...formInfo, imageUrl: '' };
    setFormInfo(updatedInfo);
    linkContent(updatedInfo);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className='link-form'
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          id="link-field"
          label="URL"
          variant="filled"
          color="primary"
          type="text"
          name="url" 
          placeholder="https://example.com" 
          pattern="https://.*"
          size="small"
          value={formInfo.url}
          onChange={handleChange}
          required
        /> 
        <br />
        <TextField
          id="description-field"
          label="Description"
          variant="filled"
          color="primary"
          multiline
          rows={2}
          placeholder="Enter your text here..."
          name="description"
          value={formInfo.description}
          onChange={handleChange}
          required
        />
        <br />
        <RadioGroup
          value={uploadType}
          onChange={handleUploadTypeChange}
          row
        >
          <FormControlLabel value="file" control={<Radio />} label="Upload Image File" />
          <FormControlLabel value="url" control={<Radio />} label="Enter Image URL" />
        </RadioGroup>

        {uploadType === 'file' ? (
          <div>
            <input
              type="file"
              name="imageUrl"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        ) : (
          <TextField
            id="image-url-field"
            label="Image URL"
            variant="filled"
            color="primary"
            type="text"
            name="imageUrl"
            placeholder="https://example.com/image.jpg"
            value={formInfo.imageUrl}
            onChange={handleChange}
            required
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default LinkForm;