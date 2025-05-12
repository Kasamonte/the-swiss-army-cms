
import React, { useState } from 'react';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock data for blog posts
const mockPosts = [
  {
    id: 1,
    title: 'Getting Started with Our CMS',
    slug: 'getting-started-with-our-cms',
    category: 'Tutorials',
    status: 'Published',
    date: '2025-05-10',
    author: 'Admin',
  },
  {
    id: 2,
    title: '10 Tips for Better Content Management',
    slug: '10-tips-for-better-content-management',
    category: 'Tips & Tricks',
    status: 'Published',
    date: '2025-05-08',
    author: 'Editor',
  },
  {
    id: 3,
    title: 'Upcoming Features in Version 2.0',
    slug: 'upcoming-features-in-version-2',
    category: 'News',
    status: 'Draft',
    date: '2025-05-07',
    author: 'Product Manager',
  },
  {
    id: 4,
    title: 'How to Optimize Your Website Performance',
    slug: 'how-to-optimize-your-website-performance',
    category: 'Tutorials',
    status: 'Published',
    date: '2025-05-05',
    author: 'Admin',
  },
  {
    id: 5,
    title: 'Understanding SEO Basics',
    slug: 'understanding-seo-basics',
    category: 'SEO',
    status: 'Published',
    date: '2025-05-03',
    author: 'SEO Specialist',
  },
];

const categories = [
  'News',
  'Tutorials',
  'Tips & Tricks',
  'SEO',
  'Case Studies',
  'Updates',
];

const BlogManager = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({ 
    title: '', 
    slug: '', 
    content: '', 
    category: 'News',
    status: 'Draft',
  });
  const { toast } = useToast();

  const handleCreatePost = () => {
    const id = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
    
    const postToAdd = {
      id,
      title: newPost.title,
      slug: newPost.slug || newPost.title.toLowerCase().replace(/\s+/g, '-'),
      category: newPost.category,
      status: newPost.status,
      date: new Date().toISOString().split('T')[0],
      author: 'Admin',
    };
    
    setPosts([...posts, postToAdd]);
    setIsCreateDialogOpen(false);
    setNewPost({ 
      title: '', 
      slug: '', 
      content: '', 
      category: 'News',
      status: 'Draft',
    });
    
    toast({
      title: "Post Created",
      description: `${postToAdd.title} has been created successfully.`
    });
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Post Deleted",
      description: "The post has been deleted successfully."
    });
  };

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Category',
      accessorKey: 'category',
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
      header: 'Date',
      accessorKey: 'date',
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
            onClick={() => handleDeletePost(id)}
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
        title="Blog Posts" 
        description="Create, edit and manage your blog content."
        action={{
          label: 'Create Post',
          onClick: () => setIsCreateDialogOpen(true),
        }}
      />
      
      <div className="animate-fade-in">
        <DataTable columns={columns} data={posts} />
      </div>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
            <DialogDescription>
              Add details for your new blog post. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Post Title</Label>
              <Input 
                id="title" 
                value={newPost.title} 
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} 
                placeholder="Enter post title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug (URL Path)</Label>
              <Input 
                id="slug" 
                value={newPost.slug} 
                onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })} 
                placeholder="enter-post-slug"
              />
              <p className="text-sm text-muted-foreground">
                Leave blank to generate from title.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={newPost.category}
                onValueChange={(value) => setNewPost({ ...newPost, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                value={newPost.content} 
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} 
                placeholder="Post content..."
                rows={5}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newPost.status}
                onValueChange={(value) => setNewPost({ ...newPost, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePost}>Create Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogManager;
