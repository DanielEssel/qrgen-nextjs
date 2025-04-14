// components/PageSections/Footer.tsx
'use client'; // Required for client-side interactivity

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 2rem 0;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AboutSection = styled.div`
  flex: 1;
  padding-right: 20rem;
  max-width: 890px;

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

const AboutTitle = styled.h5`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const AboutLogo = styled(Image)`
  width: 40px;
  height: auto;
  margin-right: 10px;
`;

const AboutText = styled.p`
  font-size: 1rem;
  color: #6c757d;
`;

const SocialSection = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    display: block;
    align-items: start;
    margin-top: 2rem;
  }
`;

const SocialTitle = styled.h5`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
`;

const SocialIcon = styled.a`
  font-size: 1.5rem;
  color: #6c757d;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #222121;
    transform: scale(1.2);
    transition: all 0.3s; 
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const FooterLinkItem = styled(Link)`
  font-size: 0.9rem;
  color: #6c757d;
  text-decoration: none;
  position: relative;

  &:hover {
    color: #222121;
  }

  &:hover::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #727070;
    position: absolute;
    bottom: -5px;
    left: 0;
  }

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background-color: #727070;
    transition: width 0.3s ease;
    position: absolute;
    bottom: -5px;
    left: 0;
  }
`;

const CopyrightSection = styled.div`
  background-color: #343a40;
  padding: 1rem;
  text-align: center;
  color: #fff;
`;

export default function Footer () {
  return (
    <>
      <FooterContainer>
        <FooterWrapper>
          <AboutSection>
            <AboutTitle>
              <AboutLogo 
                src="/images/qrlogo.png" 
                alt="QRGen logo" 
                width={40}
                height={40}
              />
              QRGEN
            </AboutTitle>
            <AboutText>
              Your reliable QR code generator for all your needs. 
              Easily create, customize, and manage QR codes for various purposes.
            </AboutText>
          </AboutSection>
          
          <SocialSection>
            <SocialTitle >FOLLOW US</SocialTitle>
            <SocialIcons>
              <SocialIcon 
                href="https://facebook.com/tinyone" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </SocialIcon>
              <SocialIcon 
                href="https://twitter.com/tinyone" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </SocialIcon>
              <SocialIcon 
                href="https://instagram.com/tinyone" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </SocialIcon>
              <SocialIcon 
                href="https://linkedin.com/in/tinyone" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </SocialIcon>
            </SocialIcons>
            <FooterLinks>
              <FooterLinkItem href="/privacypolicy">Privacy Policy</FooterLinkItem>
              <FooterLinkItem href="/terms">Terms</FooterLinkItem>
            </FooterLinks>
          </SocialSection>
        </FooterWrapper>
      </FooterContainer>
      <CopyrightSection>
        © 2024 QRGen. All rights reserved.
      </CopyrightSection>
    </>
  );
};