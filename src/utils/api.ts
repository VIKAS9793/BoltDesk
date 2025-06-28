// API utility functions and mock implementations
export interface EntriLinks {
  [provider: string]: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Mock implementation of getEntriLinks function
export async function getEntriLinks(): Promise<EntriLinks> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock Entri domain setup links
  return {
    "GoDaddy": "https://entri.com/setup/godaddy",
    "Namecheap": "https://entri.com/setup/namecheap", 
    "Cloudflare": "https://entri.com/setup/cloudflare",
    "Google Domains": "https://entri.com/setup/google-domains",
    "AWS Route 53": "https://entri.com/setup/route53"
  };
}

// Mock Stripe connection
export async function connectStripe(apiKey: string): Promise<ApiResponse<{ connected: boolean }>> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  if (!apiKey || apiKey.length < 10) {
    return {
      success: false,
      error: "Invalid API key provided"
    };
  }
  
  return {
    success: true,
    data: { connected: true }
  };
}

// Mock deployment trigger
export async function triggerDeployment(): Promise<ApiResponse<{ deploymentId: string }>> {
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  return {
    success: true,
    data: { deploymentId: `deploy_${Date.now()}` }
  };
}

// Mock social login handlers
export async function handleSocialLogin(provider: 'google' | 'twitter' | 'github'): Promise<ApiResponse<{ token: string }>> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate random success/failure
  const success = Math.random() > 0.3;
  
  if (!success) {
    return {
      success: false,
      error: `${provider} authentication failed. Please try again.`
    };
  }
  
  return {
    success: true,
    data: { token: `${provider}_token_${Date.now()}` }
  };
}

// Mock content operations
export async function deleteContent(contentId: string): Promise<ApiResponse<void>> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true
  };
}

export async function exportData(format: 'csv' | 'json' | 'pdf' = 'csv'): Promise<ApiResponse<{ downloadUrl: string }>> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    success: true,
    data: { downloadUrl: `/api/exports/data_${Date.now()}.${format}` }
  };
}

// Mock subscription management
export async function cancelSubscription(subscriptionId: string): Promise<ApiResponse<void>> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true
  };
}

export async function createSubscriptionPlan(plan: {
  name: string;
  price: number;
  description: string;
  features: string[];
}): Promise<ApiResponse<{ planId: string }>> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    success: true,
    data: { planId: `plan_${Date.now()}` }
  };
}