'use client';

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import EmailImage from '../../public/images/email.png';

interface EmailFormData {
  receiverEmail: string;
  subject: string;
  message: string;
  showIcon?: boolean;
}

interface EmailFormProps {
  linkContent: (data: EmailFormData) => void;
}

const EmailForm = ({ linkContent }: EmailFormProps) => {
  const [formInfo, setFormInfo] = useState<EmailFormData>({
    receiverEmail: '',
    subject: '',
    message: ''
  });
  const [showEmailIcon, setShowEmailIcon] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedFormInfo = {
      ...formInfo,
      [name]: value,
      showIcon: showEmailIcon
    };
    setFormInfo(updatedFormInfo);
    linkContent(updatedFormInfo);
  };

  const handleIconToggle = () => {
    const newShowIcon = !showEmailIcon;
    setShowEmailIcon(newShowIcon);
    const updatedFormInfo = { 
      ...formInfo, 
      showIcon: newShowIcon 
    };
    setFormInfo(updatedFormInfo);
    linkContent(updatedFormInfo);
  };

  return (
    <form className="w-full">
      <div className="flex items-center mb-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showEmailIcon}
            onChange={handleIconToggle}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Add Icon</span>
        </label>
        
        {showEmailIcon && (
          <div className="ml-2">
            <Image 
              src={EmailImage} 
              alt="Email icon" 
              width={30} 
              height={30}
              className="max-w-full h-auto"
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="receiver-email" className="block text-sm font-medium text-gray-700 mb-1">
          Receiver Email
        </label>
        <input
          id="receiver-email"
          type="email"
          name="receiverEmail"
          placeholder="example@domain.com"
          value={formInfo.receiverEmail}
          onChange={handleChange}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
          title="Please enter a valid email address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-gray-50"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          name="subject"
          value={formInfo.subject}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-gray-50"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formInfo.message}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-gray-50"
        />
      </div>
    </form>
  );
};

export default EmailForm;