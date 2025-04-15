'use client';

import { JSX, useState } from "react";
import CategoryField from "./CategoryField";
import QROutputInterface from "./QROutputInterface";
import ScrollCategoryOption from "./ScrollCategoryOption";
import Frames from "./Frames";
import FormModal from "../framestructure/FormModal";
import ConfirmationModal from "./ConfirmationModel";

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
  [key: string]: any;
}

interface WhatsappDataState {
  waPhoneNumber: string;
  waMessage: string;
}

interface QRStyle {
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
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [tempCategory, setTempCategory] = useState<CategoryItem | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [content, setContent] = useState<ContentState>({ url: "", description: "", imageUrl: "", showIcon: false });
  const [pdfData, setPdfData] = useState<PdfDataState>({ pdfContent: "" });
  const [imageData, setImageData] = useState<ImageDataState>({ imageContent: "" });
  const [contactInfo, setContactInfo] = useState<ContactInfoState>({ firstName: "", lastName: "", phone: "", email: "", address: "", company: "", jobTitle: "" });
  const [smsData, setSmsData] = useState<SmsDataState>({});
  const [frame, setFrame] = useState<string | null>(null);
  const [qrStyle, setQrStyle] = useState<QRStyle>({
    dotsOptions: { type: "dots", color: "#726e6e" },
    cornersSquareOptions: { type: "square", color: "#160101" },
    cornersDotOptions: { type: "square", color: "#635858" },
  });
  const [whatsappData, setWhatsappData] = useState<WhatsappDataState>({ waPhoneNumber: "", waMessage: "" });

  const hasUnsavedData = (): boolean => (
    Object.values(content).some(Boolean) ||
    Object.values(pdfData).some(Boolean) ||
    Object.values(imageData).some(Boolean) ||
    Object.values(contactInfo).some(Boolean) ||
    Object.values(smsData).some(Boolean) ||
    Object.values(whatsappData).some(Boolean)
  );

  const handleCategorySelected = (categoryItem: CategoryItem): void => {
    if (hasUnsavedData()) {
      setTempCategory(categoryItem);
      setShowModal(true);
    } else {
      setSelectedCategory(categoryItem);
    }
  };

  const handleDiscard = (): void => {
    setContent({ url: "", description: "", imageUrl: "", showIcon: false });
    setPdfData({ pdfContent: "" });
    setImageData({ imageContent: "" });
    setContactInfo({ firstName: "", lastName: "", phone: "", email: "", address: "", company: "", jobTitle: "" });
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

  const handleContentCreate = (
    data: ContentState | ContactInfoState | SmsDataState | WhatsappDataState | PdfDataState | ImageDataState
  ): void => {
    if (!selectedCategory) return;

    switch (selectedCategory.label) {
      case "Contact":
        setContactInfo(data as ContactInfoState);
        break;
      case "SMS":
        setSmsData(data as SmsDataState);
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
    <section className="p-4">
      <div className=" grid grid-cols-1 md:grid-cols-[1fr_1fr_25rem] gap-4 w-[95%] max-w-[70rem] mx-auto">
        {/* Category Selector */}
        <div className="col-span-1 md:col-span-2 h-[90px] md:h-[100px] items-center justify-center md:justify-start">
          <ScrollCategoryOption onCategorySelect={handleCategorySelected} />
        </div>

        {/* QR Output */}
        <div className="col-span-1 md:row-span-3 md:col-start-3">
          <QROutputInterface
            frameSelected={frame}
            content={
              selectedCategory?.label === "Contact"
                ? contactInfo
                : selectedCategory?.label === "SMS"
                ? smsData
                : selectedCategory?.label === "WhatsApp"
                ? whatsappData
                : selectedCategory?.label === "Image"
                ? imageData
                : selectedCategory?.label === "PDF"
                ? pdfData
                : content
            }
            qrStyle={qrStyle}
            onStyleChange={setQrStyle}
          />
        </div>

        {/* Category Form */}
        <div className="col-span-1 md:col-span-2">
          <CategoryField
            selectedCategory={selectedCategory}
            onContentCreate={handleContentCreate}
          />
        </div>

        {/* Frame Selection */}
        <div className="col-span-1 md:col-span-2">
          <Frames onsetFrame={frameHandler} />
        </div>

        {/* Modal for Final QR Code */}
        {selectedCategory?.label !== 'Contact' && content.url && (
          <FormModal
            formCSSData={frame}
            qrCodeContent={selectedCategory?.label === 'Contact' ? contactInfo : content}
            qrStyle={qrStyle}
          />
        )}

        {/* Confirmation Modal */}
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
