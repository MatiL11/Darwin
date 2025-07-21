import React from 'react';
import { useTranslation } from 'react-i18next';

// Import images
import audioIconMan from 'assets/images/worker/chat/audio-m.png';
import audioIconWoman from 'assets/images/worker/chat/audio-f.png';
import pdfIcon from 'assets/images/worker/chat/pdf.png';
import contactIconMan from 'assets/images/worker/chat/contact-m.png';
import contactIconWoman from 'assets/images/worker/chat/contact-f.png';
// Audio component
interface AudioProps {
  className?: string;
  isMan?: boolean;
}

export const Audio: React.FC<AudioProps> = ({ className, isMan = true }) => {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <img 
        src={isMan ? audioIconMan : audioIconWoman} 
        alt="Audio message" 
        style={{ width: '268px', height: '60px' }} 
      />
    </div>
  );
};

// Image component for chat bubbles
interface ImageMessageProps {
  src: string;
  alt?: string;
  className?: string;
}

export const ImageMessage: React.FC<ImageMessageProps> = ({ src, alt = "Image", className }) => {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <img 
        src={src} 
        alt={alt} 
        style={{ maxWidth: '100%', borderRadius: '8px' }} 
      />
    </div>
  );
};

// PDF component
interface PdfProps {
  description: string;
  className?: string;
  worker?: string;
  industry?: string;
}

export const Pdf: React.FC<PdfProps> = ({ description, className, worker, industry }) => {
  const { t } = useTranslation();
  
  // Get translated description if worker and industry are provided
  const translatedDescription = worker && industry 
    ? t(`worker.chats.pdf.${worker.toLowerCase()}.${industry}`, description)
    : description;
  
  return (
    <div 
      className={`${className} lg:w-[20vw] 2xl:w-[15vw]`} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '78px', 
        backgroundColor: '#D2DAFF', 
        borderRadius: '8px', 
        margin: '4px 0' 
      }}
    >
      <img 
        src={pdfIcon} 
        alt="PDF document" 
        style={{ width: '30px', height: '35px', marginBottom: '8px' }} 
      />
      <span style={{ fontSize: '12px', color: '#333' }}>{translatedDescription}</span>
    </div>
  );
};

// ContactCard component
interface ContactCardProps {
  name: string;
  time: string;
  imageUrl?: string;
  className?: string;
  type?: 'sent' | 'received';
  isMan?: boolean;
}

export const ContactCard: React.FC<ContactCardProps> = ({ 
  name, 
  time, 
  imageUrl, 
  className,
  type = 'received', 
  isMan = true 
}) => {
  const { t } = useTranslation();
  
  // Get translated message text
  const messageText = t('worker.chats.contactCard.message', 'Message');
  
  // Determine background color based on message type
  const bgColor = type === 'received' ? '#F3F2F2' : '#ECEFFE';

  return (
    <div 
      className={`${className} xl:w-[20vw] lg:w-[25vw] 2xl:w-[15vw]`} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '125px',
        borderRadius: '8px', 
        overflow: 'hidden', 
        backgroundColor: bgColor, 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 12px 0px 12px', position: 'relative' }}>
        <img 
          src={imageUrl || (isMan ? contactIconMan : contactIconWoman)} 
          alt={`Contact: ${name}`} 
          style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            marginRight: '12px' 
          }} 
        />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <span style={{ 
            fontFamily: 'Roboto', 
            fontWeight: 700, 
            fontSize: '21.33px', 
            color: '#4F46E5' 
          }}>{name}</span>
        </div>
        {/* Chevron icon */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'relative', marginLeft: 'auto' }}
        >
          <path d="M9 18L15 12L9 6" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {/* Time display */}
      <div style={{ 
        padding: '0 12px 8px', 
        display: 'flex', 
        justifyContent: 'flex-end' 
      }}>
        <span style={{ fontSize: '12px', color: '#666' }}>{time}</span>
      </div>
      <div 
        style={{ 
          borderTop: '0.6px solid #D2DAFF', 
          padding: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginTop: 'auto'
        }}
      >
        <span style={{ color: '#4F46E5', fontSize: '14px' }}>{messageText}</span>
      </div>
    </div>
  );
}; 