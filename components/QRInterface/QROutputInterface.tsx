'use client'; // Required for client-side interactivity

import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import QRFrame from "./QRFrame";
import { 
    generateVCard, 
    generateEmailData, 
    generateSmsData, 
    generateWhatsAppLink, 
    generatePDF,
    generateImage 
} from './utils/basicFunctions';

// Import images using Next.js static imports
import IconImage from '../../public/images/freecall-logo.webp';
import EmailImage from '../../public/images/email.png';
import WhatsAppImage from '../../public/images/whatsapp-logo.jpg';

interface DotOptions {
  type?: string;
  color?: string;
}

interface CornerOptions {
  type?: string;
  color?: string;
}

interface QRContent {
    phoneNumber?: string;
    waPhoneNumber?: string;
    smsMessage?: string;
    waMessage?: string;
    showIcon?: boolean;
    firstName?: string;
    pdfTitle?: string;
    pdfAuthor?: string;
    pdfMessage?: string;
    pdfImage?: string;
    lastName?: string;
    url?: string;
    description?: string;
    email?: string;
    receiverEmail?: string;
    subject?: string;
    message?: string;
    address?: string;
    company?: string;
    jobTitle?: string;
    imageUrl?: string;
    pdfContent?: string;
    imageContent?: string;
}

interface QRStyle {
    dotsOptions: DotOptions;
    cornersSquareOptions: CornerOptions;
    cornersDotOptions: CornerOptions;
}

interface QROutputInterfaceProps {
    content: QRContent;
    qrStyle: QRStyle;
    onStyleChange: (style: QRStyle) => void;
}

const QROutputInterface = ({ content, qrStyle, onStyleChange }: QROutputInterfaceProps) => {
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const [selectedFormat, setSelectedFormat] = useState<"png" | "svg" | "jpeg">("png");
    const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling({
        width: 200,
        height: 200,
        type: "svg",
        margin: 0,
        qrOptions: {
            typeNumber: 0,
            mode: "Byte",
            errorCorrectionLevel: "H",
        },
        dotsOptions: qrStyle.dotsOptions ?? {},
        cornersSquareOptions: qrStyle.cornersSquareOptions ?? {},
        cornersDotOptions: qrStyle.cornersDotOptions ?? {},
    }));

    // Update QR code based on content
    const updateQRCode = () => {
        let qrData = "";
        let qrImage = "";

        if (content.waPhoneNumber && content.waMessage) {
            qrData = generateWhatsAppLink(content);
            qrImage = content.showIcon ? WhatsAppImage.src : "";
        } else if (content.smsMessage) {
            qrData = generateSmsData(content);
        } else if (content.phoneNumber) {
            qrData = `tel:${content.phoneNumber}`;
            qrImage = content.showIcon ? IconImage.src : "";
        } else if (content.firstName && content.lastName) {
            qrData = generateVCard(content);
        } else if (content.receiverEmail) {
            qrData = generateEmailData(content);
            qrImage = content.showIcon ? EmailImage.src : "";
        } else if (content.pdfContent) {
            qrData = generatePDF(content);
        } else if (content.imageContent) {
            qrData = generateImage(content);
        } else {
            qrData = `Link: ${content.url}\nProgram Description: ${content.description}\nPowered by: KayDee Solutions`;
        }
        
        qrCode.update({
            data: qrData,
            image: qrImage || content.imageUrl || "",
            dotsOptions: qrStyle.dotsOptions ?? {},
            cornersSquareOptions: qrStyle.cornersSquareOptions ?? {},
            cornersDotOptions: qrStyle.cornersDotOptions ?? {},
        });
    };

    useEffect(() => {
        if (qrCodeRef.current) {
            qrCode.append(qrCodeRef.current);
        }
    }, [qrCode]);

    useEffect(() => {
        updateQRCode();
    }, [content, qrStyle]);

    const handleDownload = (format: "png" | "svg" | "jpeg") => {
        updateQRCode();
        setTimeout(() => {
            qrCode.download({ name: "qr-code", extension: format });
        }, 100);
    };

    const handleStyleChange = (newStyle: QRStyle) => {
        onStyleChange(newStyle);
    };

    return (
        <div className="bg-white shadow-lg qr-interface-item p-3 outputHere">
            <p className="text-center text-black">
                Want to do more? <a href="#">Click Here</a>
            </p>
            <div className=" text-center w-full p-3 qrContainer">
                <div ref={qrCodeRef} />
            </div>

            <div>
                <QRFrame qrCompStyle={handleStyleChange} />
            </div>

            <div className="takeAction d-flex">
                <button
                    className="btn btn-secondary rounded-0 ms-2"
                    type="button"
                    onClick={() => handleDownload(selectedFormat)}
                >
                    Download
                </button>

                <select
                    className="form-select format-select btn-focus btn btn-secondary rounded-0 ms-1"
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value as "png" | "svg" | "jpeg")}
                >
                    <option value="png">PNG</option>
                    <option value="svg">SVG</option>
                    <option value="jpeg">JPEG</option>
                </select>
            </div>
        </div>
    );
};

export default QROutputInterface;