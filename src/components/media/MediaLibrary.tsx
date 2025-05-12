
import React, { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Image, File, Upload } from 'lucide-react';

// Mock data for media files
const mockMediaFiles = [
  {
    id: 1,
    name: 'hero-image.jpg',
    type: 'image',
    size: '2.4 MB',
    dimensions: '1920x1080',
    uploadedAt: '2025-05-10',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  },
  {
    id: 2,
    name: 'about-team.jpg',
    type: 'image',
    size: '1.8 MB',
    dimensions: '1600x900',
    uploadedAt: '2025-05-09',
    url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
  },
  {
    id: 3,
    name: 'product-catalog.pdf',
    type: 'document',
    size: '5.2 MB',
    dimensions: '',
    uploadedAt: '2025-05-08',
    url: '',
  },
  {
    id: 4,
    name: 'company-logo.png',
    type: 'image',
    size: '0.4 MB',
    dimensions: '400x400',
    uploadedAt: '2025-05-07',
    url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
  },
  {
    id: 5,
    name: 'services-banner.jpg',
    type: 'image',
    size: '1.2 MB',
    dimensions: '1600x600',
    uploadedAt: '2025-05-06',
    url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  },
  {
    id: 6,
    name: 'presentation.pdf',
    type: 'document',
    size: '8.1 MB',
    dimensions: '',
    uploadedAt: '2025-05-05',
    url: '',
  },
];

const MediaLibrary = () => {
  const [mediaFiles, setMediaFiles] = useState(mockMediaFiles);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeTab === 'all' || file.type === activeTab;
    return matchesSearch && matchesType;
  });

  const handleFileUpload = () => {
    if (!newFile && !fileName) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    const id = mediaFiles.length > 0 ? Math.max(...mediaFiles.map(file => file.id)) + 1 : 1;
    const type = newFile?.type?.includes('image') ? 'image' : 'document';
    
    const fileToAdd = {
      id,
      name: fileName || newFile?.name || `file-${id}`,
      type,
      size: newFile ? `${(newFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.0 MB',
      dimensions: type === 'image' ? '1920x1080' : '',
      uploadedAt: new Date().toISOString().split('T')[0],
      url: type === 'image' ? 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5' : '',
    };
    
    setMediaFiles([...mediaFiles, fileToAdd]);
    setIsUploadDialogOpen(false);
    setNewFile(null);
    setFileName('');
    
    toast({
      title: "File Uploaded",
      description: `${fileToAdd.name} has been uploaded successfully.`
    });
  };

  const handleDeleteFile = (id: number) => {
    setMediaFiles(mediaFiles.filter(file => file.id !== id));
    toast({
      title: "File Deleted",
      description: "The file has been deleted successfully."
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <>
      <PageHeader 
        title="Media Library" 
        description="Upload and manage your media files."
        action={{
          label: 'Upload File',
          onClick: () => setIsUploadDialogOpen(true),
        }}
      />
      
      <div className="flex flex-col space-y-4 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative w-full sm:w-auto max-w-sm">
            <Input
              placeholder="Search media files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Image className="h-4 w-4" />
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="image">Images</TabsTrigger>
              <TabsTrigger value="document">Documents</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {filteredFiles.length === 0 ? (
          <div className="bg-muted/40 rounded-md p-8 text-center">
            <p className="text-muted-foreground">No media files found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <MediaCard 
                key={file.id} 
                file={file} 
                onDelete={() => handleDeleteFile(file.id)} 
              />
            ))}
          </div>
        )}
      </div>
      
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>
              Upload a new file to your media library.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file-upload">File</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center cursor-pointer hover:border-muted-foreground/40 transition-colors">
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="mt-2 text-sm font-medium">
                    {newFile ? newFile.name : 'Click to upload or drag and drop'}
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    SVG, PNG, JPG or PDF (max. 10MB)
                  </span>
                </label>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file-name">File Name (optional)</Label>
              <Input 
                id="file-name" 
                value={fileName} 
                onChange={(e) => setFileName(e.target.value)} 
                placeholder="Enter a custom file name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFileUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface MediaCardProps {
  file: {
    id: number;
    name: string;
    type: string;
    size: string;
    dimensions: string;
    uploadedAt: string;
    url: string;
  };
  onDelete: () => void;
}

const MediaCard = ({ file, onDelete }: MediaCardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Card 
      className="overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative">
        <div className="h-40 bg-muted flex items-center justify-center">
          {file.type === 'image' ? (
            <img 
              src={file.url} 
              alt={file.name}
              className="h-full w-full object-cover" 
            />
          ) : (
            <File className="h-16 w-16 text-muted-foreground" />
          )}
        </div>
        
        {isHovering && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-2 animate-fade-in">
            <Button size="sm" variant="secondary">View</Button>
            <Button size="sm" variant="destructive" onClick={onDelete}>Delete</Button>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <div className="font-medium truncate" title={file.name}>{file.name}</div>
        <div className="text-xs text-muted-foreground flex justify-between mt-1">
          <span>{file.size}</span>
          <span>{file.uploadedAt}</span>
        </div>
      </div>
    </Card>
  );
};

export default MediaLibrary;
