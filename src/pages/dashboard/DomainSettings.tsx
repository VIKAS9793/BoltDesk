import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Globe, 
  Copy, 
  Check, 
  Loader2, 
  AlertCircle, 
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { getEntriLinks, triggerDeployment } from '../../utils/api';
import { useToast } from '../../hooks/useToast';

export const DomainSettingsPage: React.FC = () => {
  const [customDomain, setCustomDomain] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [entriLinks, setEntriLinks] = useState<{ [key: string]: string } | null>(null);
  const [isLoadingEntriLinks, setIsLoadingEntriLinks] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const { success, error } = useToast();
  
  // Mock domain verification
  const handleVerifyDomain = async () => {
    if (!customDomain) {
      error('Please enter a domain name');
      return;
    }
    
    setIsVerifying(true);
    setVerificationStatus('verifying');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const isValid = Math.random() > 0.3; // 70% success rate
      
      if (isValid) {
        setVerificationStatus('success');
        success('Domain verified successfully!');
      } else {
        setVerificationStatus('error');
        error('Domain verification failed. Please check your DNS settings.');
      }
    } catch (err) {
      setVerificationStatus('error');
      error('An error occurred during verification');
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handleCopyDnsRecord = async () => {
    try {
      await navigator.clipboard.writeText('txt-record ENTRI-VERIFICATION=abc123xyz456');
      setCopied(true);
      success('DNS record copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      error('Failed to copy DNS record');
    }
  };
  
  const handleGetEntriLinks = async () => {
    try {
      setIsLoadingEntriLinks(true);
      const links = await getEntriLinks();
      setEntriLinks(links);
      success('Entri setup links loaded successfully');
    } catch (err) {
      error('Failed to load Entri setup links');
      console.error("Error getting Entri links:", err);
    } finally {
      setIsLoadingEntriLinks(false);
    }
  };

  const handleRedeploy = async () => {
    try {
      setIsDeploying(true);
      const result = await triggerDeployment();
      
      if (result.success) {
        success('Deployment triggered successfully!');
      } else {
        error(result.error || 'Deployment failed');
      }
    } catch (err) {
      error('Failed to trigger deployment');
    } finally {
      setIsDeploying(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Domain Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure your custom domain and deployment settings
        </p>
      </div>
      
      {/* Current Deployment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5 text-gray-500" />
            Current Deployment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Your portal is currently deployed at:
              </p>
              <a 
                href="https://alex-creates.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-600 font-medium inline-flex items-center"
              >
                https://alex-creates.netlify.app
                <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<RefreshCw size={14} />}
              onClick={handleRedeploy}
              isLoading={isDeploying}
            >
              Redeploy Site
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm text-blue-800 dark:text-blue-200 flex items-start">
            <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <p>
              Changes to your portal configuration will automatically trigger a new deployment.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Custom Domain */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5 text-gray-500" />
            Custom Domain Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label htmlFor="domain-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Custom Domain
            </label>
            <div className="flex">
              <input
                id="domain-input"
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="yourdomain.com"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              />
              <Button
                onClick={handleVerifyDomain}
                disabled={!customDomain || isVerifying}
                className="rounded-l-none"
                isLoading={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enter the domain you want to use for your portal (e.g., creator.yourdomain.com)
            </p>
          </div>
          
          {verificationStatus === 'error' && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md text-sm">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-300">
                    Domain Verification Failed
                  </h4>
                  <p className="mt-1 text-red-700 dark:text-red-400">
                    We couldn't verify your domain. Please add the following TXT record to your domain's DNS settings:
                  </p>
                  <div className="mt-2 p-2 bg-red-100 dark:bg-red-800/30 rounded flex justify-between items-center">
                    <code className="text-red-800 dark:text-red-300 text-xs">
                      txt-record ENTRI-VERIFICATION=abc123xyz456
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyDnsRecord}
                      className="h-6 text-red-800 dark:text-red-300"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 text-red-800 border-red-300 hover:bg-red-50"
                    onClick={() => setVerificationStatus('idle')}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {verificationStatus === 'success' && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md text-sm">
              <div className="flex">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-300">
                    Domain Verified Successfully!
                  </h4>
                  <p className="mt-1 text-green-700 dark:text-green-400">
                    Your domain has been verified and is now being set up. This process may take up to 24 hours to fully propagate.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">
              Domain Management Services
            </h4>
            <div className="space-y-3">
              <Button 
                variant="outline"
                size="sm"
                className="w-full justify-between"
                onClick={handleGetEntriLinks}
                rightIcon={<ExternalLink size={14} />}
                isLoading={isLoadingEntriLinks}
              >
                <span>Set up with Entri</span>
              </Button>
              
              {entriLinks && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm">
                  <h5 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Entri Domain Setup Links</h5>
                  <div className="space-y-2">
                    {Object.entries(entriLinks).map(([provider, link]) => (
                      <a
                        key={provider}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 bg-white dark:bg-gray-700 rounded flex items-center justify-between hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
                      >
                        <span className="font-medium">{provider}</span>
                        <ExternalLink size={14} className="text-blue-600 dark:text-blue-400" />
                      </a>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-blue-700 dark:text-blue-400">
                    Click on your domain provider to set up your domain with step-by-step instructions.
                  </p>
                </div>
              )}
              
              <Button 
                variant="outline"
                size="sm"
                className="w-full justify-between"
                rightIcon={<ExternalLink size={14} />}
                onClick={() => window.open('https://ionos.com', '_blank')}
              >
                <span>IONOS Domain Management</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* SSL & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <svg className="mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            SSL & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                SSL Certificate
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your site is secured with HTTPS. Certificate auto-renews.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                DDoS Protection
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Built-in protection against distributed denial-of-service attacks.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Content Delivery Network
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Global CDN ensures fast loading times for all visitors.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainSettingsPage;