import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { RequestsStats } from './components/RequestsStats';
import { RequestsList } from './components/RequestsList';
import { RequestDetails } from './components/RequestDetails';
import { MeetingsCalendar } from './components/MeetingsCalendar';
import { Toaster } from './components/ui/sonner';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { List, Calendar } from 'lucide-react';

interface Request {
  id: string;
  employee: {
    name: string;
    position: string;
    initials: string;
  };
  subject: string;
  description: string;
  requestedDate: string;
  requestedTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'rescheduled';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

export default function App() {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [view, setView] = useState<'list' | 'calendar'>('list');

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white">
      {/* Top Bar */}
      <TopBar />

      {/* View Switcher */}
      <div className="border-b border-gray-800 px-6 py-3 bg-gray-950">
        <Tabs value={view} onValueChange={(v) => setView(v as 'list' | 'calendar')}>
          <TabsList className="bg-gray-900 border border-gray-700">
            <TabsTrigger 
              value="list" 
              className="border border-gray-700 text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-500"
            >
              <List className="h-4 w-4 mr-2" />
              Список заявок
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="border border-gray-700 text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-500"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Календарь встреч
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Stats Panel */}
        <RequestsStats />

        {/* Center Content - Switch between List and Calendar */}
        {view === 'list' ? (
          <RequestsList 
            onSelectRequest={setSelectedRequest} 
            selectedRequestId={selectedRequest?.id}
          />
        ) : (
          <MeetingsCalendar 
            onSelectMeeting={(id) => {
              // Здесь можно добавить логику для выбора встречи
              console.log('Selected meeting:', id);
            }}
          />
        )}

        {/* Right Details Panel - Only show in list view */}
        {view === 'list' && <RequestDetails request={selectedRequest} />}
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
