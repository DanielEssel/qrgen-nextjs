'use client'; // Required for client-side interactivity in Next.js

import { useState } from "react";
import CategoryField from "./CategoryField";
import styles from "./QRInterface.module.css"; // Changed to CSS Modules
import QROutputInterface from "./QROutputInterface";
import ScrollCategoryOption from "./ScrollCategoryOption";
import Frames from "./Frames";
import FormModal from "../FrameStructure/FormModal";
import ConfirmationModal from "./ConfirmationModal";

// Type definitions
interface CategoryItem {
  label: string;
  value: string;
  icon: JSX.Element;
}

interface ContentState {
  url: string;
  description: string;
  imageUrl: string;
  showIcon: boolean;
}

interface PdfDataState {
  pdfContent: string;
}

interface ImageDataState {
  imageContent: string;
}

interface ContactInfoState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  company: string;
  jobTitle: string;
}

interface SmsDataState {
  [key: string]: any; // Can be refined with specific fields
}

interface WhatsappDataState {
  waPhoneNumber: string;
  waMessage: string;
}

interface QrStyleState {
  dotsOptions: {
    type: string;
    color: string;
  };
  cornersSquareOptions: {
    type: string;
    color: string;
  };
  cornersDotOptions: {
    type: string;
    color: string;
  };
}

const QRInterface = () => {
  // State with TypeScript types
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [tempCategory, setTempCategory] = useState<CategoryItem | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [content, setContent] = useState<ContentState>({
    url: "",
    description: "",
    imageUrl: "",
    showIcon: false,
  });

  const [pdfData, setPdfData] = useState<PdfDataState>({ 
    pdfContent: "" 
  });

  const [imageData, setImageData] = useState<ImageDataState>({ 
    imageContent: "" 
  });

  const [contactInfo, setContactInfo] = useState<ContactInfoState>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    company: "",
    jobTitle: "",
  });

  const [smsData, setSmsData] = useState<SmsDataState>({});
  const [frame, setFrame] = useState<string | null>(null);
  
  const [qrStyle, setQrStyle] = useState<QrStyleState>({
    dotsOptions: { type: "dots", color: "#726e6e" },
    cornersSquareOptions: { type: "square", color: "#160101" },
    cornersDotOptions: { type: "square", color: "#635858" },
  });

  const [whatsappData, setWhatsappData] = useState<WhatsappDataState>({
    waPhoneNumber: "",
    waMessage: "",
  });

  const hasUnsavedData = (): boolean => {
    return (
      Object.values(content).some(value => Boolean(value)) ||
      Object.values(pdfData).some(value => Boolean(value)) ||
      Object.values(imageData).some(value => Boolean(value)) ||
      Object.values(contactInfo).some(value => Boolean(value)) ||
      Object.values(smsData).some(value => Boolean(value)) ||
      Object.values(whatsappData).some(value => Boolean(value))
    );
  };

  // Event handlers with type annotations
  const handleCategorySelected = (categoryItem: CategoryItem): void => {
    if (hasUnsavedData()) {
      setTempCategory(categoryItem);
      setShowModal(true);
    } else {
      setSelectedCategory(categoryItem);
    }
  };

  const handleDiscard = (): void => {
    // Reset all states to their initial values
    setContent({ url: "", description: "", imageUrl: "", showIcon: false });
    setPdfData({ pdfContent: "" });
    setImageData({ imageContent: "" });
    setContactInfo({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      company: "",
      jobTitle: "",
    });
    setSmsData({});
    setWhatsappData({ waPhoneNumber: "", waMessage: "" });
    setSelectedCategory(tempCategory);
    setTempCategory(null);
    setShowModal(false);
  };

  const handleCancel = (): void => {
    setShowModal(false);
    setTempCategory(null);
  };

  const frameHandler = (frameUrl: string): void => {
    setFrame(frameUrl);
  };
  
  const handleContentCreate = (data: any): void => {
    if (!selectedCategory) return;
    
    switch (selectedCategory.label) {
      case "Contact":
        setContactInfo(data as ContactInfoState);
        break;
      case "SMS":
        setSmsData(data);
        break;
      case "WhatsApp":
        setWhatsappData(data as WhatsappDataState);
        break;
      case "PDF":
        setPdfData(data as PdfDataState);
        break;
      case "Image":
        setImageData(data as ImageDataState);
        break;
      default:
        setContent(data as ContentState);
    }
  };

  return (
    <section className={styles.qrSection} style={{ padding: "10px" }}>
      <div className={styles.qrInterface}>
        <ScrollCategoryOption onCategorySelect={handleCategorySelected} />

        <CategoryField
          selectedCategory={selectedCategory}
          onContentCreate={handleContentCreate}
        />

        <QROutputInterface
          frameSelected={frame}
          content={{
            ...(selectedCategory?.label === "Contact"
              ? contactInfo
              : selectedCategory?.label === "SMS"
              ? smsData
              : selectedCategory?.label === "WhatsApp"
              ? whatsappData
              : selectedCategory?.label === "Image"
              ? imageData
              : selectedCategory?.label === "PDF"
              ? pdfData
              : content),
          }}
          qrStyle={qrStyle}
          onStyleChange={setQrStyle}
        />

        <Frames onsetFrame={frameHandler} />

        {(selectedCategory?.label === 'Contact' ? contactInfo : content).url && (
          <FormModal
            formCSSData={frame}
            qrCodeContent={selectedCategory?.label === 'Contact' ? contactInfo : content}
            qrStyle={qrStyle}
          />
        )}

        {showModal && (
          <ConfirmationModal
            onDiscard={handleDiscard}
            onCancel={handleCancel}
          />
        )}
      </div>
    </section>
  );
};

export default QRInterface;