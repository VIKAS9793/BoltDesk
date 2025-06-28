import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, Linkedin } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button
            variant="ghost"
            className="mb-6"
            leftIcon={<ArrowLeft size={16} />}
          >
            Back to Home
          </Button>
        </Link>

        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              By accessing and using BoltDesk, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              BoltDesk is an AI-powered creator micro-portal platform that enables creators to share content, 
              engage with their audience, and monetize their expertise through various channels.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You agree to notify us immediately of any unauthorized use of your account</li>
              <li>You may not use another person's account without permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Content and Conduct</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Users are responsible for all content they post, share, or transmit through BoltDesk. 
              Content must not violate any laws or infringe on the rights of others.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Payment and Monetization</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>BoltDesk facilitates payments between creators and their audience</li>
              <li>Commission rates and payment terms are specified in the creator dashboard</li>
              <li>All transactions are processed through secure third-party payment providers</li>
              <li>Refund policies are determined by individual creators within platform guidelines</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              All content, features, and functionality on BoltDesk are owned by VIKAS SAHANI and are 
              protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              BoltDesk and its operators shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              For questions about these Terms of Service, please contact:
            </p>
            <div className="flex flex-col space-y-2">
              <a 
                href="mailto:vikassahani17@gmail.com"
                className="inline-flex items-center text-primary hover:text-primary-600"
              >
                <Mail className="h-5 w-5 mr-2" />
                vikassahani17@gmail.com
              </a>
              <a 
                href="https://github.com/VIKAS9793"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary-600"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub: VIKAS9793
              </a>
              <a 
                href="https://www.linkedin.com/in/vikas-sahani-727420358"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary-600"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn: Vikas Sahani
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;