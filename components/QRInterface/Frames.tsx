'use client'; // Required for client-side interactivity in Next.js

import { useState } from "react";
import FrameOne from "../FrameStructure/FrameOne";
import FrameTwo from "../FrameStructure/FrameTwo";
import FrameThree from "../FrameStructure/FrameThree";
import FrameFour from "../FrameStructure/FrameFour";
import Framefive from "../FrameStructure/Framefive";
import FrameSix from "../FrameStructure/FrameSix";
import FrameSeven from "../FrameStructure/FrameSeven";
import FrameEight from "../FrameStructure/FrameEight";
import FrameNine from "../FrameStructure/FrameNine";
import styles from '../QRInterface/QRInterface.module.css'; // Converted to CSS Modules

interface FrameItem {
  icon: JSX.Element;
  label?: string; // Optional since not all items have labels
}

interface FramesProps {
  onsetFrame: (frame: JSX.Element) => void;
}

const Frames = ({ onsetFrame }: FramesProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items: FrameItem[] = [
    { icon: <FrameOne className={styles.icons} />, label: "Link" },
    { icon: <FrameTwo className={styles.icons} />, label: "Call" },
    { icon: <FrameThree className={styles.icons} /> },
    { icon: <FrameFour className={styles.icons} /> },
    { icon: <Framefive className={styles.icons} /> },
    { icon: <FrameSix className={styles.icons} /> },
    { icon: <FrameSeven className={styles.icons} /> },
    { icon: <FrameEight className={styles.icons} /> },
    { icon: <FrameNine className={styles.icons} /> },
  ];

  const handleFrameClick = (item: FrameItem, selectedObjectIndex: number): void => {
    setActiveIndex(selectedObjectIndex);
    onsetFrame(item.icon);
    console.log(`Selected frame with index: ${selectedObjectIndex}`);
  };

  return (
    <div className={`bg-white p-2 shadow-lg ${styles.qrInterfaceItem}`}>
      <div className={`${styles.scroller} ${styles.snapsInline}`}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${styles.scrollerItem} ${activeIndex === index ? styles.active : ""}`}
            onClick={() => handleFrameClick(item, index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleFrameClick(item, index)}
            aria-label={item.label || `Frame ${index + 1}`}
          >
            {item.icon}
            {item.label && <p className={styles.label}>{item.label}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frames;