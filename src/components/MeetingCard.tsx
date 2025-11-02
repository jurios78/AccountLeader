import { Video, Edit, Users, FileText } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

interface MeetingCardProps {
  meeting: {
    id: string;
    title: string;
    time: string;
    duration: string;
    participants: Array<{ name: string; initials: string }>;
    agenda?: string;
    type: 'online' | 'offline';
    priority?: 'high' | 'normal';
  };
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-800 p-4 hover:bg-gray-800 transition-colors">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white">{meeting.title}</h3>
              {meeting.priority === 'high' && (
                <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                  Важно
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{meeting.time}</span>
              <span>•</span>
              <span>{meeting.duration}</span>
            </div>
          </div>
          {meeting.type === 'online' && (
            <Video className="h-4 w-4 text-blue-500" />
          )}
        </div>

        {/* Agenda */}
        {meeting.agenda && (
          <div className="flex items-start gap-2 text-sm text-gray-400">
            <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p className="line-clamp-2">{meeting.agenda}</p>
          </div>
        )}

        {/* Participants */}
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-500" />
          <div className="flex -space-x-2">
            {meeting.participants.slice(0, 3).map((participant, index) => (
              <Avatar key={index} className="h-6 w-6 border-2 border-gray-900">
                <AvatarFallback className="bg-blue-600 text-white text-xs">
                  {participant.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {meeting.participants.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs text-gray-400">
                +{meeting.participants.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {meeting.type === 'online' && (
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              <Video className="h-4 w-4 mr-2" />
              Присоединиться
            </Button>
          )}
          <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
