import { Clock, User, Calendar, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

interface RequestCardProps {
  request: {
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
  };
  isSelected?: boolean;
  onClick?: () => void;
}

export function RequestCard({ request, isSelected, onClick }: RequestCardProps) {
  const statusConfig = {
    pending: { label: 'Ожидает', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    approved: { label: 'Одобрено', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
    rejected: { label: 'Отклонено', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    rescheduled: { label: 'Перенесено', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  };

  const priorityConfig = {
    high: { label: 'Срочно', color: 'border-red-500 text-red-500' },
    medium: { label: 'Средний', color: 'border-yellow-500 text-yellow-500' },
    low: { label: 'Низкий', color: 'border-gray-500 text-gray-500' },
  };

  return (
    <Card 
      className={`bg-gray-900 border p-4 cursor-pointer transition-all ${
        isSelected 
          ? 'border-blue-500 bg-gray-800' 
          : 'border-gray-800 hover:bg-gray-800 hover:border-gray-700'
      }`}
      onClick={onClick}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarFallback className="bg-blue-600 text-white">
                {request.employee.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-white truncate">{request.employee.name}</h3>
              <p className="text-sm text-gray-400 truncate">{request.employee.position}</p>
            </div>
          </div>
          <Badge className={`${statusConfig[request.status].color} flex-shrink-0`}>
            {statusConfig[request.status].label}
          </Badge>
        </div>

        {/* Subject */}
        <div>
          <h4 className="text-white mb-1">{request.subject}</h4>
          <p className="text-sm text-gray-400 line-clamp-2">{request.description}</p>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{request.requestedDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{request.requestedTime}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
          <Badge variant="outline" className={`text-xs ${priorityConfig[request.priority].color}`}>
            {priorityConfig[request.priority].label}
          </Badge>
          <span className="text-xs text-gray-500">{request.createdAt}</span>
        </div>
      </div>
    </Card>
  );
}
