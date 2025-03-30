
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, UserPlus } from "lucide-react";

// Mock users data
const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@vehiclix.com",
    role: "Administrator",
    company: "VehicliX",
    status: "Active",
    lastActive: "Just now"
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@acmeinsurance.com",
    role: "Insurance Provider",
    company: "Acme Insurance",
    status: "Active",
    lastActive: "5 minutes ago"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah@safedrive.com",
    role: "Insurance Provider",
    company: "SafeDrive Insurance",
    status: "Active",
    lastActive: "1 hour ago"
  },
  {
    id: 4,
    name: "Michael Davies",
    email: "michael@vehicleprotect.com",
    role: "Insurance Provider",
    company: "VehicleProtect Inc.",
    status: "Inactive",
    lastActive: "2 days ago"
  },
  {
    id: 5,
    name: "Jennifer Wilson",
    email: "jennifer@nationalauto.com",
    role: "Insurance Provider",
    company: "National Auto Insurance",
    status: "Active",
    lastActive: "3 hours ago"
  },
  {
    id: 6,
    name: "Robert Miller",
    email: "robert@vehiclix.com",
    role: "Operator",
    company: "VehicliX",
    status: "Active",
    lastActive: "20 minutes ago"
  },
];

const Users = () => {
  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="w-full pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={
                    user.role === 'Administrator' ? 'default' : 
                    user.role === 'Insurance Provider' ? 'outline' : 
                    'secondary'
                  }>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'outline' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Reset password</DropdownMenuItem>
                      <DropdownMenuItem>
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
