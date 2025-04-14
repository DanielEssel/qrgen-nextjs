'use client'; // Required for client-side interactivity in Next.js

import LinkForm from '../forms/LinkForm';
import CallForm from '../forms/CallForm';
import ContactForm from '../forms/ContactForm';
import EmailForm from '../forms/EmailForm';
import SMSForm from '../forms/SMSForm';
import WhatsAppForm from '../forms/WhatsAppForm';
import PDFForm from '../forms/PDFForm';
import ImageForm from '../forms/ImageForm';

interface CategoryItem {
  label: string;
  value?: string;
  icon?: JSX.Element;
}

interface CategoryFieldProps {
  selectedCategory?: CategoryItem;
  onContentCreate: (data: any) => void;
}

const CategoryField = ({ selectedCategory, onContentCreate }: CategoryFieldProps) => {
  const renderForm = () => {
    switch (selectedCategory?.label) {
      case 'Link':
        return <LinkForm linkContent={onContentCreate} />;
      case 'Contact':
        return <ContactForm linkContent={onContentCreate} />;
      case 'Mail':
        return <EmailForm linkContent={onContentCreate} />;
      case 'WhatsApp':
        return <WhatsAppForm linkContent={onContentCreate} />;
      case 'SMS':
        return <SMSForm linkContent={onContentCreate} />;
      case 'Image':
        return <ImageForm linkContent={onContentCreate} />;
      case 'PDF':
        return <PDFForm linkContent={onContentCreate} />;
      case 'Call':
        return <CallForm linkContent={onContentCreate} />;
      default:
        return (
          <p style={{ color: '#727070' }} className="px-5">
            Select a category to fill the form.
          </p>
        );
    }
  };

  return (
    <div className="bg-white shadow-lg p-3 qr-interface-item">
      <h3 className="px-3">{selectedCategory?.label || 'No Category Selected'}</h3>
      {renderForm()}
    </div>
  );
};

export default CategoryField;