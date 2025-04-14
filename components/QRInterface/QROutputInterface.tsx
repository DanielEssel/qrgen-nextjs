'use client'; // Required for client-side interactivity in Next.js

import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import Image from 'next/image';
import QRFrame from "./QRFrame";
import { 
    generateVCard, 
    generateEmailData, 
    generateSmsData, 
    generateWhatsAppLink, 
    generatePDF,
    generateImage 
} from './basicFunctions';

// Define types for all possible content properties
interface QRContent {
    phoneNumber?: string;
    waPhoneNumber?: string;
    waMessage?: string;
    smsMessage?: string;
    showIcon?: boolean;
    firstName?: string;
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
    // PDF specific fields (if needed)
    pdfTitle?: string;
    pdfAuthor?: string;
    pdfMessage?: string;
    pdfImage?: string;
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

interface QROutputInterfaceProps {
    content: QRContent;
    qrStyle: QRStyle;
    onStyleChange: (newStyle: QRStyle) => void;
}

const QROutputInterface = ({ content, qrStyle, onStyleChange }: QROutputInterfaceProps) => {
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const [selectedFormat, setSelectedFormat] = useState<"png" | "svg" | "jpeg">("png");

    // Initialize QR code with proper typing
    const qrCode = useRef<QRCodeStyling>(
        new QRCodeStyling({
            width: 200,
            height: 200,
            type: "svg",
            margin: 0,
            qrOptions: {
                typeNumber: 0,
                mode: "Byte",
                errorCorrectionLevel: "H",
            },
            dotsOptions: qrStyle.dotsOptions,
            cornersSquareOptions: qrStyle.cornersSquareOptions,
            cornersDotOptions: qrStyle.cornersDotOptions,
        })
    ).current;

    // Mount QR code to DOM
    useEffect(() => {
        if (qrCodeRef.current) {
            qrCode.append(qrCodeRef.current);
        }
    }, [qrCode]);

    // Update QR code based on content
    const updateQRCode = () => {
        let qrData = "";
        let qrImage = "";

        if (content.waPhoneNumber && content.waMessage) {
            qrData = generateWhatsAppLink(content);
            qrImage = content.showIcon ? "/images/whatsapp-logo.jpg" : "";
        } else if (content.smsMessage) {
            qrData = generateSmsData(content);
        } else if (content.phoneNumber) {
            qrData = `tel:${content.phoneNumber}`;
            qrImage = content.showIcon ? "/images/freecall-logo.webp" : "";
        } else if (content.firstName && content.lastName) {
            qrData = generateVCard(content);
        } else if (content.receiverEmail) {
            qrData = generateEmailData(content);
            qrImage = content.showIcon ? "/images/email.png" : "";
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
            dotsOptions: qrStyle.dotsOptions,
            cornersSquareOptions: qrStyle.cornersSquareOptions,
            cornersDotOptions: qrStyle.cornersDotOptions,
        });
    };

    useEffect(() => {
        updateQRCode();
    }, [content, qrStyle]);

    // Handle QR code download
    const handleDownload = (format: "png" | "svg" | "jpeg") => {
        updateQRCode();
        setTimeout(() => {
            qrCode.download({ name: "qr-code", extension: format });
        }, 100);
    };

    return (
        <div className="bg-white shadow-lg qr-interface-item p-3 outputHere">
            <p>
                Want to do more? <a href="#">Click Here</a>
            </p>
            <div className="qrContainer">
                <div ref={qrCodeRef} />
            </div>

            {/* QRFrame Component to select styles */}
            <div>
                <QRFrame className="qr" qrCompStyle={onStyleChange} />
            </div>

            {/* Download Buttons */}
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