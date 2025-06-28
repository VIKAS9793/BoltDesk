import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, Linkedin, Shield, Database, Users, Lock } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const PrivacyPolicy: React.FC = () => {
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
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
            <div className="flex items-center mb-3">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">Your Privacy Matters</h3>
            </div>
            <p className="text-blue-700 dark:text-blue-400">
              This Privacy Policy explains how VIKAS SAHANI ("we," "us," or "our") collects, uses, 
              and protects your information when you use BoltDesk.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Database className="h-6 w-6 mr-2 text-primary" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Name and email address</li>
                  <li>Profile information and preferences</li>
                  <li>Payment information (processed securely by third parties)</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Platform usage analytics</li>
                  <li>Content interaction data</li>
                  <li>AI assistant conversations (anonymized)</li>
                  <li>Device and browser information</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Users className="h-6 w-6 mr-2 text-primary" />
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Provide and improve our services</li>
              <li>Process payments and transactions</li>
              <li>Personalize your experience</li>
              <li>Train and improve our AI assistants</li>
              <li>Send important updates and notifications</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Lock className="h-6 w-6 mr-2 text-primary" />
              Data Protection
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Encryption</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All data is encrypted in transit and at rest using industry-standard protocols.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Access Control</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Strict access controls ensure only authorized personnel can access your data.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Regular Audits</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We conduct regular security audits and vulnerability assessments.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Data Minimization</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We only collect and store data that is necessary for our services.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use trusted third-party services for:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Payment processing (Stripe)</li>
              <li>Analytics (privacy-focused)</li>
              <li>AI services (OpenAI, ElevenLabs)</li>
              <li>Hosting and infrastructure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              For privacy-related questions or to exercise your rights, contact:
            </p>
            <div className="flex flex-col space-y-2">
              <a 
                href="mailto:vikassahani17@gmail.com?subject=Privacy Policy Inquiry"
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

export default PrivacyPolicy;