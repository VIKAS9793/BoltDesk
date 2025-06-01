import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const LicensePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/portal">
          <Button
            variant="ghost"
            className="mb-6"
            leftIcon={<ArrowLeft size={16} />}
          >
            Back to Portal
          </Button>
        </Link>

        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-6">License and Legal Information</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Copyright and Ownership</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Copyright © 2024 Vikas Sahani. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This project and its contents are protected by copyright law. Any unauthorized use, 
              reproduction, or distribution of this software without explicit permission from 
              the copyright holder is strictly prohibited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Trademark</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              "BoltDesk" is a trademark of Vikas Sahani.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Third-Party Tools and Services</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This application was created using bolt.new, a product that enables rapid web 
              development and deployment.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-4">Third-Party Ownership and Licenses</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>bolt.new: Copyright © 2024 StackBlitz. All rights reserved.</li>
              <li>React: Copyright © Meta Platforms, Inc. and affiliates. Licensed under MIT License.</li>
              <li>Tailwind CSS: Copyright © Tailwind Labs, Inc. Licensed under MIT License.</li>
              <li>Lucide Icons: Copyright © 2024 Lucide Contributors. Licensed under ISC License.</li>
              <li>Framer Motion: Copyright © 2024 Framer B.V. Licensed under MIT License.</li>
              <li>TypeScript: Copyright © Microsoft Corporation. Licensed under Apache License 2.0.</li>
              <li>Vite: Copyright © 2024 Evan You. Licensed under MIT License.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Terms of Use</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>This software is provided for use by authorized users only.</li>
              <li>Modification and distribution of this software require explicit permission from Vikas Sahani.</li>
              <li>The "BoltDesk" trademark may not be used without written permission from Vikas Sahani.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              For licensing inquiries or permissions, please contact:
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
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-400">
              This software is provided "as is", without warranty of any kind, express or implied. 
              Neither Vikas Sahani nor bolt.new shall be liable for any damages arising from the 
              use of this software.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LicensePage;