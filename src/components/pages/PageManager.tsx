
import React, { useState } from 'react';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Mock data for pages
const mockPages = [
  {
    id: 1,
    title: 'Home',
    slug: 'home',
    status: 'Published',
    lastUpdated: '2025-05-10',
    author: 'Admin',
  },
  {
    id: 2,
    title: 'About Us',
    slug: 'about-us',
    status: 'Published',
    lastUpdated: '2025-05-08',
    author: 'Admin',
  },
  {
    id: 3,
    title: 'Services',
    slug: 'services',
    status: 'Published',
    lastUpdated: '2025-05-07',
    author: 'Editor',
  },
  {
    id: 4,
    title: 'Contact',
    slug: 'contact',
    status: 'Published',
    lastUpdated: '2025-05-06',
    author: 'Admin',
  },
  {
    id: 5,
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    status: 'Draft',
    lastUpdated: '2025-05-05',
    author: 'Legal',
  },
  {
    id: 6,
    title: 'Terms of Service',
    slug: 'terms-of-service',
    status: 'Draft',
    lastUpdated: '2025-05-04',
    author: 'Legal',
  },
  {
    id: 7,
    title: 'FAQ',
    slug: 'faq',
    status: 'Published',
    lastUpdated: '2025-05-03',
    author: 'Support',
  },
];

const PageManager = () => {
  const [pages, setPages] = useState(mockPages);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPage, setNewPage] = useState({ title: '', slug: '', content: '', isPublished: true });
  const { toast } = useToast();

  const handleCreatePage = () => {
    const id = pages.length > 0 ? Math.max(...pages.map(page => page.id)) + 1 : 1;
    
    const pageToAdd = {
      id,
      title: newPage.title,
      slug: newPage.slug || newPage.title.toLowerCase().replace(/\s+/g, '-'),
      status: newPage.isPublished ? 'Published' : 'Draft',
      lastUpdated: new Date().toISOString().split('T')[0],
      author: 'Admin',
    };
    
    setPages([...pages, pageToAdd]);
    setIsCreateDialogOpen(false);
    setNewPage({ title: '', slug: '', content: '', isPublished: true });
    
    toast({
      title: "Page Created",
      description: `${pageToAdd.title} has been created successfully.`
    });
  };

  const handleDeletePage = (id: number) => {
    setPages(pages.filter(page => page.id !== id));
    toast({
      title: "Page Deleted",
      description: "The page has been deleted successfully."
    });
  };

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Slug',
      accessorKey: 'slug',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (value: string) => (
        <Badge variant={value === 'Published' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    {
      header: 'Last Updated',
      accessorKey: 'lastUpdated',
    },
    {
      header: 'Author',
      accessorKey: 'author',
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (id: number) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Edit</Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => handleDeletePage(id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader 
        title="Pages" 
        description="Create and manage your website pages."
        action={{
          label: 'Create Page',
          onClick: () => setIsCreateDialogOpen(true),
        }}
      />
      
      <div className="animate-fade-in">
        <DataTable columns={columns} data={pages} />
      </div>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>
              Add details for your new page. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Page Title</Label>
              <Input 
                id="title" 
                value={newPage.title} 
                onChange={(e) => setNewPage({ ...newPage, title: e.target.value })} 
                placeholder="Home, About Us, Contact, etc."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug (URL Path)</Label>
              <Input 
                id="slug" 
                value={newPage.slug} 
                onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })} 
                placeholder="home, about-us, contact, etc."
              />
              <p className="text-sm text-muted-foreground">
                Leave blank to generate from title.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                value={newPage.content} 
                onChange={(e) => setNewPage({ ...newPage, content: e.target.value })} 
                placeholder="Page content..."
                rows={5}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="is-published" 
                checked={newPage.isPublished}
                onCheckedChange={(checked) => 
                  setNewPage({ ...newPage, isPublished: checked as boolean })
                }
              />
              <Label htmlFor="is-published">Publish immediately</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePage}>Create Page</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PageManager;
