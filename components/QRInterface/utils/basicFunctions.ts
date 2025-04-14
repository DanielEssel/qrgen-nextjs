/**
 * Generate a vCard string for contact information.
 * @param contact - The contact information.
 * @returns The vCard formatted string.
 */
export const generateVCard = (contact: {
    firstName: string;
    lastName: string;
    company?: string;
    jobTitle?: string;
    phone?: string;
    email?: string;
    address?: string;
  }): string => {
    return `
  BEGIN:VCARD
  VERSION:3.0
  N:${contact.lastName};${contact.firstName}
  FN:${contact.firstName} ${contact.lastName}
  ORG:${contact.company || ''}
  TITLE:${contact.jobTitle || ''}
  TEL:${contact.phone || ''}
  EMAIL:${contact.email || ''}
  ADR:;;${contact.address || ''}
  END:VCARD
    `.trim();
  };
  
  /**
   * Create a mailto link for email data.
   * @param emailData - The email data.
   * @returns The mailto link.
   */
  export const generateEmailData = ({
    receiverEmail,
    subject = '',
    message = ''
  }: {
    receiverEmail: string;
    subject?: string;
    message?: string;
  }): string => {
    return `mailto:${receiverEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };
  
  /**
   * Create SMS data URI.
   * @param smsData - The SMS data.
   * @returns The SMS data URI.
   */
  export const generateSmsData = ({
    phoneNumber,
    smsMessage = ''
  }: {
    phoneNumber: string;
    smsMessage?: string;
  }): string => {
    return `sms:${phoneNumber}?body=${encodeURIComponent(smsMessage)}`;
  };
  
  /**
   * Generate a WhatsApp link with an encoded message.
   * @param waData - The WhatsApp data.
   * @returns The WhatsApp link.
   */
  export const generateWhatsAppLink = ({
    waPhoneNumber,
    waMessage = ''
  }: {
    waPhoneNumber: string;
    waMessage?: string;
  }): string => {
    return `https://wa.me/${waPhoneNumber}?text=${encodeURIComponent(waMessage)}`;
  };
  
  /**
   * Generate a PDF with the provided content.
   * @param pdfData - The PDF content details.
   * @returns The PDF content or URL.
   */
  export const generatePDF = ({
    pdfContent
  }: {
    pdfContent: string;
  }): string => {
    return pdfContent;
  };
  
  /**
   * Generate an Image URL or data.
   * @param imageData - The image content details.
   * @returns The image content or URL.
   */
  export const generateImage = ({
    imageContent
  }: {
    imageContent: string;
  }): string => {
    return imageContent;
  };
  
  // Optional: jsPDF implementation (uncomment if needed)
  /*
  import { jsPDF } from "jspdf";
  
  export const generatePDFWithJsPDF = ({
    pdfTitle,
    pdfAuthor,
    pdfMessage,
    pdfImage
  }: {
    pdfTitle: string;
    pdfAuthor: string;
    pdfMessage: string;
    pdfImage?: string;
  }): Promise<void> => {
    return new Promise((resolve) => {
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text(pdfTitle, 10, 10);
      doc.setFontSize(12);
      doc.text(`Author: ${pdfAuthor}`, 10, 20);
      doc.text(pdfMessage, 10, 30);
  
      if (pdfImage) {
        const img = new Image();
        img.src = pdfImage;
        img.onload = () => {
          doc.addImage(img, 'JPEG', 10, 40, 50, 50);
          doc.save(`${pdfTitle}.pdf`);
          resolve();
        };
      } else {
        doc.save(`${pdfTitle}.pdf`);
        resolve();
      }
    });
  };
  */