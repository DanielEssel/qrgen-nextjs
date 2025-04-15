import { useEffect, useRef, useState, useCallback } from 'react';
import QRCodeStyling from 'qr-code-styling';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TextField from '@mui/material/TextField';

// Define types for props
interface QRStyle {
  dotsOptions: Record<string, any>;
  cornersSquareOptions: Record<string, any>;
  cornersDotOptions: Record<string, any>;
}

interface QRCodeContent {
  url: string;
  description?: string;
  imageUrl?: string;
}

interface FormModalProps {
  formCSSData: Record<string, any> | null;
  qrCodeContent: QRCodeContent;
  qrStyle: QRStyle;
}

const FormModal: React.FC<FormModalProps> = ({ formCSSData, qrCodeContent, qrStyle }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    text: 'Default Text',
  });

  const qrCodeRef = useRef<HTMLDivElement | null>(null);
  const qrCode = useRef(
    new QRCodeStyling({
      width: 200,
      height: 200,
      type: 'svg',
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'H',
      },
    })
  );

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (formCSSData) {
      setShow(true);
      updateQRCode(); // Update QR code when modal is shown
    }
  }, [formCSSData]);

  const updateQRCode = useCallback(() => {
    if (qrCodeRef.current) {
      const qrData = `Link: ${qrCodeContent.url}\nDescription: ${qrCodeContent.description}\nPowered by: KayDee Solutions`;

      qrCode.current.update({
        data: qrData,
        image: qrCodeContent.imageUrl || '',
        dotsOptions: qrStyle.dotsOptions || {},
        cornersSquareOptions: qrStyle.cornersSquareOptions || {},
        cornersDotOptions: qrStyle.cornersDotOptions || {},
      });

      qrCode.current.append(qrCodeRef.current);
    }
  }, [qrCodeContent, qrStyle]);

  useEffect(() => {
    if (show) {
      updateQRCode(); // Update QR code when content or style changes
    }
  }, [qrCodeContent, qrStyle, show, updateQRCode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Customize Your QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <div>
                <h5>QR Code Properties</h5>
                {/* Frame 2 Customization Form */}
                <TextField
                  label="Border Color"
                  name="borderColor"
                  type="color"
                  value={formData.borderColor}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Background Color"
                  name="backgroundColor"
                  type="color"
                  value={formData.backgroundColor}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Text Color"
                  name="textColor"
                  type="color"
                  value={formData.textColor}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Text"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="qrCodePreview" style={{ width: '100%', overflow: 'hidden' }}>
                <div ref={qrCodeRef} style={{ width: '100%', height: 'auto', maxHeight: '200px' }} />
                <div className="qrInstructions">
                  <p>Preview your QR Code here.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="rounded-0" variant="light" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="rounded-0" variant="secondary">
          Download
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

import Image, { ImageProps } from 'next/image';
// import Frame1 from '../QRInterface/Frames/Frame1.svg'; // Adjust the path as necessary
import '../QRInterface/QRInterface.module.css'; // Import your CSS module

interface FrameOneProps extends Pick<ImageProps, 'priority' | 'className'> {
  sizes?: string; // Responsive image sizing
}

export default function FrameModal({
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, 500px',
}: FrameOneProps) {
  return (
    <div className={`frameOne ${className}`}>
      <Image
        src="/Frame1.svg" // Path to your SVG file
        alt="Decorative frame illustration"
        width={500}  // Intrinsic width of SVG
        height={300} // Intrinsic height of SVG
        priority={priority}
        sizes={sizes}
        className="h-auto w-full" // Responsive by default
        style={{
          objectFit: 'contain', // Prevents distortion
        }}
      />
    </div>
  );
}