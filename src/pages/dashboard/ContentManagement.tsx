import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Lock, 
  Unlock, 
  Edit,
  Trash,
  MoreHorizontal,
  Upload,
  Download,
  Tag,
  Calendar,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  Image,
  Link,
  File,
  Save,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { formatDate } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const ContentManagementPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newContentForm, setNewContentForm] = useState({
    title: '',
    description: '',
    contentType: 'article',
    accessTier: 'free',
    status: 'draft',
    publishDate: '',
    tags: '',
    content: ''
  });

  // Mock content data
  const contentItems = [
    { 
      id: '1', 
      title: 'Getting Started with Web Development', 
      type: 'article',
      status: 'published',
      date: new Date('2024-03-01'),
      views: 1243,
      tier: 'free',
      tags: ['beginner', 'web development']
    },
    { 
      id: '2', 
      title: 'Advanced React Hooks', 
      type: 'tutorial',
      status: 'published',
      date: new Date('2024-03-10'),
      views: 856,
      tier: 'basic',
      tags: ['react', 'advanced']
    },
    { 
      id: '3', 
      title: 'Building AI-Powered Applications', 
      type: 'course',
      status: 'draft',
      date: new Date('2024-03-15'),
      views: 0,
      tier: 'premium',
      tags: ['ai', 'programming']
    },
    { 
      id: '4', 
      title: 'Frontend Development Best Practices', 
      type: 'article',
      status: 'published',
      date: new Date('2024-03-05'),
      views: 942,
      tier: 'free',
      tags: ['frontend', 'best practices']
    },
    { 
      id: '5', 
      title: 'Modern CSS Techniques', 
      type: 'tutorial',
      status: 'scheduled',
      date: new Date('2024-03-25'),
      views: 0,
      tier: 'basic',
      tags: ['css', 'web development']
    }
  ];

  // Access tier options
  const accessTiers = [
    { id: 'free', name: 'Free', icon: Unlock },
    { id: 'basic', name: 'Basic', icon: Lock },
    { id: 'premium', name: 'Premium', icon: Lock }
  ];

  // Content types
  const contentTypes = [
    { id: 'all', label: 'All Content' },
    { id: 'article', label: 'Articles' },
    { id: 'tutorial', label: 'Tutorials' },
    { id: 'course', label: 'Courses' },
    { id: 'video', label: 'Videos' },
    { id: 'podcast', label: 'Podcasts' }
  ];

  // Status badge renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            <CheckCircle2 size={12} className="mr-1" />
            Published
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">
            <Edit size={12} className="mr-1" />
            Draft
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            <Calendar size={12} className="mr-1" />
            Scheduled
          </span>
        );
      default:
        return null;
    }
  };

  // Access tier badge renderer
  const renderAccessTierBadge = (tier: string) => {
    const tierInfo = accessTiers.find(t => t.id === tier);
    if (!tierInfo) return null;

    const TierIcon = tierInfo.icon;
    const colors = tier === 'free' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      : tier === 'basic'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors}`}>
        <TierIcon size={12} className="mr-1" />
        {tierInfo.name}
      </span>
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewContentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateContent = () => {
    // Here you would typically submit the form data
    console.log('Form submitted:', newContentForm);
    
    // Close the modal
    setIsCreateModalOpen(false);
    
    // Reset the form
    setNewContentForm({
      title: '',
      description: '',
      contentType: 'article',
      accessTier: 'free',
      status: 'draft',
      publishDate: '',
      tags: '',
      content: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create, manage, and organize your content
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            leftIcon={<Upload size={16} />}
            onClick={() => console.log('Import clicked')}
          >
            Import
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Content
          </Button>
        </div>
      </div>

      {/* Content Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex items-center flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <input
                type="search"
                placeholder="Search content..."
                className="w-full h-10 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                leftIcon={<Filter size={14} />}
              >
                Filters
              </Button>
              <Button
                variant="outline"
                leftIcon={<Download size={14} />}
              >
                Export
              </Button>
            </div>
          </div>

          <div className="mt-4 flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
            {contentTypes.map(type => (
              <Button
                key={type.id}
                variant={selectedFilter === type.id ? 'primary' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedFilter(type.id)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-gray-500" />
            Content Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {contentItems.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </div>
                          <div className="flex gap-1 mt-1">
                            {item.tags.map(tag => (
                              <span 
                                key={tag} 
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {item.type}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {renderStatusBadge(item.status)}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(item.date)}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {item.views > 0 ? item.views.toLocaleString() : '-'}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {renderAccessTierBadge(item.tier)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Eye size={14} />}
                          className="text-blue-600 dark:text-blue-400"
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Edit size={14} />}
                          className="text-gray-600 dark:text-gray-400"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Trash size={14} />}
                          className="text-red-600 dark:text-red-400"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing 1-5 of 25 items
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={true}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="px-3 bg-primary text-white"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="px-3"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="px-3"
              >
                3
              </Button>
              <Button
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Content</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">25</h4>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <FileText size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Views</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">15.4K</h4>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <Eye size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Content Categories</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">8</h4>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Tag size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Content Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Plus size={20} className="mr-2 text-primary" />
                  Create New Content
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCreateModalOpen(false)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={newContentForm.title}
                      onChange={handleInputChange}
                      placeholder="Enter content title"
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Content Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="contentType"
                      name="contentType"
                      value={newContentForm.contentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                      {contentTypes.filter(type => type.id !== 'all').map(type => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newContentForm.description}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Enter a brief description"
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="accessTier" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Access Tier <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="accessTier"
                      name="accessTier"
                      value={newContentForm.accessTier}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                      {accessTiers.map(tier => (
                        <option key={tier.id} value={tier.id}>{tier.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      id="tags"
                      name="tags"
                      type="text"
                      value={newContentForm.tags}
                      onChange={handleInputChange}
                      placeholder="e.g. react, tutorial, beginner"
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={newContentForm.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>

                  <div>
                    {newContentForm.status === 'scheduled' && (
                      <>
                        <label htmlFor="publishDate\" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Publish Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="publishDate"
                            name="publishDate"
                            type="datetime-local"
                            value={newContentForm.publishDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Content
                      </label>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" leftIcon={<Image size={14} />}>Add Image</Button>
                        <Button variant="ghost" size="sm" leftIcon={<Link size={14} />}>Add Link</Button>
                        <Button variant="ghost" size="sm" leftIcon={<File size={14} />}>Add File</Button>
                      </div>
                    </div>
                    {/* Editor toolbar mockup */}
                    <div className="flex items-center gap-1 p-1 bg-gray-50 dark:bg-gray-800 rounded-t-lg border border-gray-300 dark:border-gray-600 border-b-0">
                      {['B', 'I', 'U'].map((format) => (
                        <button
                          key={format}
                          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
                        >
                          {format}
                        </button>
                      ))}
                      <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></span>
                      {['H1', 'H2', 'H3'].map((heading) => (
                        <button
                          key={heading}
                          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
                        >
                          {heading}
                        </button>
                      ))}
                      <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></span>
                      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                        ⚫ Bullet
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                        1. Number
                      </button>
                    </div>
                    <textarea
                      id="content"
                      name="content"
                      value={newContentForm.content}
                      onChange={handleInputChange}
                      rows={10}
                      placeholder="Write your content here..."
                      className="w-full px-4 py-2 rounded-b-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-start">
                      <div className="flex-shrink-0 p-1">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                          Content Creation Tips
                        </h3>
                        <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Use clear, descriptive titles to improve discoverability</li>
                            <li>Add relevant tags to help categorize your content</li>
                            <li>Include high-quality images to make your content more engaging</li>
                            <li>Use headings and formatting to improve readability</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Clock size={14} className="mr-1" />
                  Last saved: Never
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    leftIcon={<Save size={16} />}
                    onClick={() => {
                      setNewContentForm(prev => ({ ...prev, status: 'draft' }));
                      handleCreateContent();
                    }}
                  >
                    Save Draft
                  </Button>
                  <Button
                    variant="primary"
                    leftIcon={<CheckCircle2 size={16} />}
                    onClick={handleCreateContent}
                  >
                    {newContentForm.status === 'scheduled' ? 'Schedule' : 'Publish'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentManagementPage;