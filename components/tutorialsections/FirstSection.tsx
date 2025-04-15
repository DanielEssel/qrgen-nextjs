"use client";

import Image from "next/image";

const FirstSection = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-5">How to Generate a QR Code</h2>

      {/* First Row: Image Left, Text Right */}
      <div className="row shadow-2xl align-items-center mb-5">
        <div className="col-md-6">
          <Image
            src="/images/step1.png"
            alt="Step 1"
            width={300}
            height={300}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h4>Step 1: Enter your data</h4>
          <p>
            Provide the necessary details (like URL, text, or other data) that
            you want to convert into a QR code.
          </p>
        </div>
      </div>

      {/* Second Row: Text Left, Image Right */}
      <div className="row shadow-2xl align-items-center mb-5">
        <div className="col-md-6 order-md-2 d-flex justify-content-end">
          <Image
            src="/images/step2.png"
            alt="Step 2"
            width={300}
            height={300}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6 order-md-1">
          <h4>Step 2: Customize your QR code</h4>
          <p>
            Choose from various customization options such as color, size, and
            design to make your QR code unique.
          </p>
        </div>
      </div>

      {/* Third Row: Image Left, Text Right */}
      <div className="row shadow-2xl align-items-center mb-5">
        <div className="col-md-6">
          <Image
            src="/images/step3.png"
            alt="Step 3"
            width={300}
            height={300}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h4>Step 3: Generate the QR code</h4>
          <p>
            Click the &quot;Generate&quot; button and instantly create your
            custom QR code. You can now download and use it!
          </p>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
