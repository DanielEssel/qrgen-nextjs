'use client'; // Required for client-side interactivity in Next.js

import { useState } from "react";
import {
  InsertLinkSharp as InsertLinkSharpIcon,
  CallSharp as CallSharpIcon,
  ContactPage as ContactPageIcon,
  WhatsApp as WhatsAppIcon,
  EmailSharp as EmailSharpIcon,
  TextsmsSharp as TextsmsSharpIcon,
  PictureAsPdfSharp as PictureAsPdfSharpIcon,
  ImageSharp as ImageSharpIcon,
} from "@mui/icons-material";

interface CategoryItem {
  icon: JSX.Element;
  label: string;
  value?: string; // Optional if you need additional values
}

interface ScrollCategoryOptionProps {
  onCategorySelect: (item: CategoryItem) => void;
}

const ScrollCategoryOption = ({ onCategorySelect }: ScrollCategoryOptionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Typed category items array
  const items: CategoryItem[] = [
    {
      icon: <InsertLinkSharpIcon className="icons" />,
      label: "Link",
    },
    {
      icon: <CallSharpIcon className="icons" />,
      label: "Call",
    },
    {
      icon: <ContactPageIcon className="icons" />,
      label: "Contact",
    },
    {
      icon: <EmailSharpIcon className="icons" />,
      label: "Mail",
    },
    {
      icon: <TextsmsSharpIcon className="icons" />,
      label: "SMS",
    },
    {
      icon: <WhatsAppIcon className="icons" />,
      label: "WhatsApp",
    },
    {
      icon: <PictureAsPdfSharpIcon className="icons" />,
      label: "PDF",
    },
    {
      icon: <ImageSharpIcon className="icons" />,
      label: "Image",
    },
  ];

  const handleCategoryClick = (item: CategoryItem, selectedObjectIndex: number): void => {
    setActiveIndex(selectedObjectIndex);
    onCategorySelect(item);
    console.log(`Selected: ${item.label} (index: ${selectedObjectIndex})`);
  };

  return (
    <div
      className="bg-white p-2 shadow-lg text-white qr-interface-item"
      style={{ backgroundColor: "#fff" }} // Fixed color value
    >
      <div className="scroller snaps-inline">
        {items.map((item, index) => (
          <div
            key={index}
            className={`scroller-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleCategoryClick(item, index)}
            role="button" // Better accessibility
            tabIndex={0} // Makes it keyboard accessible
            onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(item, index)}
          >
            {item.icon}
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollCategoryOption;