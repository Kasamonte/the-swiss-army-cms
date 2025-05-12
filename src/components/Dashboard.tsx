
import React from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { Activity, Users, FileText, Image } from 'lucide-react';

const pageViews = [
  { name: 'Mon', views: 420 },
  { name: 'Tue', views: 380 },
  { name: 'Wed', views: 560 },
  { name: 'Thu', views: 640 },
  { name: 'Fri', views: 520 },
  { name: 'Sat', views: 380 },
  { name: 'Sun', views: 460 },
];

const contentCreation = [
  { name: 'Jan', pages: 4, posts: 8 },
  { name: 'Feb', pages: 3, posts: 12 },
  { name: 'Mar', pages: 6, posts: 9 },
  { name: 'Apr', pages: 2, posts: 14 },
  { name: 'May', pages: 5, posts: 10 },
  { name: 'Jun', pages: 8, posts: 7 },
];

const Dashboard = () => {
  return (
    <>
      <PageHeader 
        title="Dashboard" 
        description="Welcome to your CMS dashboard overview."
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6 animate-fade-in">
        <StatsCard 
          title="Total Pages" 
          value="28" 
          change="+2 this week"
          icon={<FileText className="h-5 w-5" />}
        />
        <StatsCard 
          title="Blog Posts" 
          value="60" 
          change="+5 this month"
          icon={<Activity className="h-5 w-5" />}
        />
        <StatsCard 
          title="Media Files" 
          value="142" 
          change="+12 this month"
          icon={<Image className="h-5 w-5" />}
        />
        <StatsCard 
          title="Users" 
          value="6" 
          change="+1 this month"
          icon={<Users className="h-5 w-5" />}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card>
          <CardHeader>
            <CardTitle>Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pageViews}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Content Creation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contentCreation}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="pages" 
                  name="Pages" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]} 
                  barSize={20}
                />
                <Bar 
                  dataKey="posts" 
                  name="Blog Posts" 
                  fill="hsl(var(--accent))" 
                  radius={[4, 4, 0, 0]} 
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ActivityItem 
              title="Homepage Updated" 
              description="Main hero section content was changed" 
              time="2 hours ago" 
              user="Admin" 
            />
            <ActivityItem 
              title="Blog Post Published" 
              description="New blog post 'CMS Best Practices' was published" 
              time="5 hours ago" 
              user="Editor" 
            />
            <ActivityItem 
              title="New User Registered" 
              description="A new user 'content_writer' has registered" 
              time="Yesterday" 
              user="System" 
            />
            <ActivityItem 
              title="Media Files Uploaded" 
              description="7 new images were uploaded to the media library" 
              time="3 days ago" 
              user="Admin" 
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const StatsCard = ({ title, value, change, icon }: { 
  title: string; 
  value: string; 
  change: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card className="stats-card">
      <CardContent className="p-6 flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{change}</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-full text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityItem = ({ title, description, time, user }: { 
  title: string; 
  description: string; 
  time: string; 
  user: string;
}) => {
  return (
    <div className="flex items-start space-x-4 pb-4 border-b last:border-0 last:pb-0">
      <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">{title}</h4>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs mt-1">By: {user}</p>
      </div>
    </div>
  );
};

export default Dashboard;
