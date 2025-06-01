import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, BookOpen, Brain, Code, LineChart } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/portal">
          <Button
            variant="ghost"
            className="mb-6"
            leftIcon={<ArrowLeft size={16} />}
          >
            Back to Portal
          </Button>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Hi, I'm Vikas Sahani
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Finance Professional | AI Learner | Project Builder
            </p>
            
            <div className="flex gap-4 mt-6">
              <a 
                href="mailto:vikassahani17@gmail.com"
                className="inline-flex items-center text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400"
              >
                <Mail className="h-5 w-5 mr-2" />
                vikassahani17@gmail.com
              </a>
              <a 
                href="https://github.com/VIKAS9793"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
            </div>
          </div>

          <div className="p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                I'm a finance professional with over 3 years of experience in banking and financial services. 
                I've recently been exploring how AI tools can help solve real business problems — especially 
                in areas like customer insight, risk, and performance tracking.
              </p>

              <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                <Code className="h-6 w-6 mr-2 text-primary" />
                What I Do
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-8">
                <li>Use AI platforms to create project prototypes and business tools</li>
                <li>Explore how AI can support decision-making in finance and sales</li>
                <li>Build practical solutions using no-code and low-code AI assistants</li>
                <li>Focus on making tools simple, useful, and business-ready</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                <Brain className="h-6 w-6 mr-2 text-primary" />
                Areas of Interest
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-8">
                <li>Customer understanding and engagement</li>
                <li>Financial insights and advisory support</li>
                <li>Responsible use of AI in business environments</li>
                <li>Project planning and solution design</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                <BookOpen className="h-6 w-6 mr-2 text-primary" />
                Learning Journey
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-8">
                <li>Google PM</li>
                <li>AI Foundations</li>
                <li>Generative AI</li>
                <li>Responsible AI</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Currently continuing to learn how AI tools can improve financial and business processes.
              </p>

              <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                <LineChart className="h-6 w-6 mr-2 text-primary" />
                Guiding Thought
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                I believe in using AI tools not for complexity, but for clarity — to help real people 
                make better decisions, faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;