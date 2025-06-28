import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Mail, MessageSquare, Bot, Users, DollarSign, Settings, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

const FAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: MessageSquare,
      faqs: [
        {
          id: 'what-is-boltdesk',
          question: 'What is BoltDesk?',
          answer: 'BoltDesk is an AI-powered creator micro-portal platform that enables creators to share content, engage with their audience, and monetize their expertise through various channels including courses, consultations, and digital products.'
        },
        {
          id: 'how-to-get-started',
          question: 'How do I get started?',
          answer: 'Simply sign up for an account, choose whether you\'re a creator or consumer, and follow our guided setup process. For creators, you can set up your portal in just a few minutes using our AI-powered tools.'
        },
        {
          id: 'pricing',
          question: 'What does BoltDesk cost?',
          answer: 'BoltDesk operates on a commission-based model. We take a small percentage of your earnings (typically 15-25%) and provide all the tools you need to succeed. There are no upfront costs or monthly fees.'
        }
      ]
    },
    {
      id: 'creators',
      title: 'For Creators',
      icon: Users,
      faqs: [
        {
          id: 'ai-assistant',
          question: 'How does the AI assistant work?',
          answer: 'Your AI assistant is trained on your content and can answer questions from your audience 24/7. It can handle booking inquiries, provide information about your services, and help convert visitors into customers.'
        },
        {
          id: 'content-types',
          question: 'What types of content can I share?',
          answer: 'You can share courses, articles, videos, podcasts, digital downloads, templates, and more. Our platform supports multiple content formats and access tiers (free, premium, subscription-based).'
        },
        {
          id: 'monetization',
          question: 'How can I monetize my content?',
          answer: 'BoltDesk offers multiple monetization options: sell courses and digital products, offer consultations and coaching sessions, create subscription tiers, accept tips and donations, and more.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Settings,
      faqs: [
        {
          id: 'custom-domain',
          question: 'Can I use my own domain?',
          answer: 'Yes! You can connect your custom domain to your BoltDesk portal. We provide step-by-step instructions and support for domain setup with all major providers.'
        },
        {
          id: 'integrations',
          question: 'What integrations are available?',
          answer: 'BoltDesk integrates with Stripe for payments, major email providers, calendar applications, and popular marketing tools. Our API also allows for custom integrations.'
        },
        {
          id: 'data-export',
          question: 'Can I export my data?',
          answer: 'Absolutely. You own your data and can export it at any time. We provide easy-to-use export tools for your content, audience data, and analytics.'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      icon: DollarSign,
      faqs: [
        {
          id: 'payment-processing',
          question: 'How are payments processed?',
          answer: 'All payments are processed securely through Stripe, ensuring PCI compliance and fraud protection. Funds are typically deposited to your account within 2-7 business days.'
        },
        {
          id: 'commission-structure',
          question: 'What are the commission rates?',
          answer: 'Commission rates vary by service type: 15% for courses, 20% for consultations, 25% for digital products. Higher volume creators may qualify for reduced rates.'
        },
        {
          id: 'tax-documents',
          question: 'Do you provide tax documents?',
          answer: 'Yes, we provide all necessary tax documentation including 1099 forms for US creators and appropriate documentation for international creators.'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      faqs: [
        {
          id: 'data-security',
          question: 'How secure is my data?',
          answer: 'We use enterprise-grade security including SSL encryption, regular security audits, and secure data centers. All personal information is encrypted and stored according to industry best practices.'
        },
        {
          id: 'privacy-policy',
          question: 'How do you handle user privacy?',
          answer: 'We are committed to protecting user privacy. We only collect necessary data, never sell personal information, and provide full transparency about data usage. See our Privacy Policy for details.'
        },
        {
          id: 'account-security',
          question: 'How can I secure my account?',
          answer: 'We recommend using a strong, unique password and enabling two-factor authentication. We also monitor for suspicious activity and will alert you of any security concerns.'
        }
      ]
    }
  ];

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

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

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Find answers to common questions about BoltDesk
          </p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-3">
                  <category.icon size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq) => (
                  <Card key={faq.id} className="overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {faq.question}
                          </h3>
                          <div className="flex-shrink-0 ml-4">
                            {openFAQ === faq.id ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                        </div>
                        {openFAQ === faq.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-400">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </button>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg p-8 text-center">
          <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our support team is here to help you succeed on BoltDesk
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:vikassahani17@gmail.com?subject=BoltDesk Support">
              <Button variant="primary" leftIcon={<Mail size={16} />}>
                Email Support
              </Button>
            </a>
            <Button
              variant="outline"
              leftIcon={<MessageSquare size={16} />}
              onClick={() => {
                // Try to trigger AI chat
                const aiButton = document.querySelector('[aria-label="Open chat"]');
                if (aiButton) {
                  (aiButton as HTMLElement).click();
                }
              }}
            >
              Chat with AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;