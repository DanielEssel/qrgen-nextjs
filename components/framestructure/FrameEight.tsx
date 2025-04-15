import Image, { ImageProps } from 'next/image';
// import Frame1 from '../QRInterface/Frames/Frame1.svg'; // Adjust the path as necessary
import '../QRInterface/QRInterface.module.css'; // Adjust the path as necessary

interface FrameOneProps extends Pick<ImageProps, 'priority' | 'className'> {
  sizes?: string; // Responsive image sizing
}

export default function FrameOne({
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