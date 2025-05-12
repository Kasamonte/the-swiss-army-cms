
import React, { useState } from 'react';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    status: 'Active',
    lastLogin: '2025-05-12',
  },
  {
    id: 2,
    name: 'Content Editor',
    email: 'editor@example.com',
    role: 'Editor',
    status: 'Active',
    lastLogin: '2025-05-11',
  },
  {
    id: 3,
    name: 'Marketing Manager',
    email: 'marketing@example.com',
    role: 'Author',
    status: 'Active',
    lastLogin: '2025-05-10',
  },
  {
    id: 4,
    name: 'Support Team',
    email: 'support@example.com',
    role: 'Contributor',
    status: 'Active',
    lastLogin: '2025-05-09',
  },
  {
    id: 5,
    name: 'Guest User',
    email: 'guest@example.com',
    role: 'Subscriber',
    status: 'Inactive',
    lastLogin: '2025-04-20',
  },
];

const roles = [
  'Administrator',
  'Editor',
  'Author',
  'Contributor',
  'Subscriber',
];

const UserManager = () => {
  const [users, setUsers] = useState(mockUsers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ 
    name: '', 
    email: '', 
    password: '',
    role: 'Subscriber',
  });
  const { toast } = useToast();

  const handleCreateUser = () => {
    const id = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    
    const userToAdd = {
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Active',
      lastLogin: 'Never',
    };
    
    setUsers([...users, userToAdd]);
    setIsCreateDialogOpen(false);
    setNewUser({ 
      name: '', 
      email: '', 
      password: '',
      role: 'Subscriber',
    });
    
    toast({
      title: "User Created",
      description: `${userToAdd.name} has been created successfully.`
    });
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully."
    });
  };

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Role',
      accessorKey: 'role',
      cell: (value: string) => {
        let variant: 'default' | 'outline' | 'secondary' | 'destructive' = 'default';
        
        if (value === 'Administrator') variant = 'destructive';
        else if (value === 'Editor') variant = 'default';
        else if (value === 'Author') variant = 'secondary';
        else variant = 'outline';
        
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (value: string) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    {
      header: 'Last Login',
      accessorKey: 'lastLogin',
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
            onClick={() => handleDeleteUser(id)}
            disabled={id === 1} // Prevent deleting the admin user
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
        title="User Management" 
        description="Manage user accounts and permissions."
        action={{
          label: 'Create User',
          onClick: () => setIsCreateDialogOpen(true),
        }}
      />
      
      <div className="animate-fade-in">
        <DataTable columns={columns} data={users} />
      </div>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system. They'll receive an email with login instructions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={newUser.name} 
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                value={newUser.email} 
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
                placeholder="john@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={newUser.password} 
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
                placeholder="Set a secure password"
              />
              <p className="text-sm text-muted-foreground">
                Must be at least 8 characters.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={newUser.role}
                onValueChange={(value) => setNewUser({ ...newUser, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserManager;
