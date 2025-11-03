import { CheckCircle, XCircle, Calendar, MessageSquare, User, Mail, Phone, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from 'sonner';

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

interface RequestDetailsProps {
  request: Request | null;
}

export function RequestDetails({ request }: RequestDetailsProps) {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  if (!request) {
    return (
      <div className="w-96 bg-gray-950 border-l border-gray-800 p-6 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <MessageSquare className="h-8 w-8 text-gray-600" />
          </motion.div>
          <p className="text-gray-500">Выберите заявку</p>
          <p className="text-sm text-gray-600 mt-1">для просмотра деталей</p>
        </motion.div>
      </div>
    );
  }

  const handleApprove = () => {
    toast.success('Заявка одобрена', {
      description: `Встреча с ${request.employee.name} назначена на ${request.requestedDate} в ${request.requestedTime}`
    });
  };

  const handleReject = () => {
    toast.error('Заявка отклонена', {
      description: `Уведомление отправлено ${request.employee.name}`
    });
    setShowRejectDialog(false);
    setRejectReason('');
  };

  const handleReschedule = () => {
    toast.info('Встреча перенесена', {
      description: `Новое время: ${newDate} в ${newTime}`
    });
    setShowRescheduleDialog(false);
    setNewDate('');
    setNewTime('');
  };

  const statusConfig = {
    pending: { label: 'Ожидает решения', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    approved: { label: 'Одобрено', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
    rejected: { label: 'Отклонено', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    rescheduled: { label: 'Перенесено', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  };

  return (
    <>
      <div className="w-96 bg-gray-950 border-l border-gray-800 p-6 overflow-y-auto">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div>
            <Badge className={`mb-4 ${statusConfig[request.status].color}`}>
              {statusConfig[request.status].label}
            </Badge>
            <h2 className="text-xl text-white mb-2">{request.subject}</h2>
            <p className="text-sm text-gray-500">Создано {request.createdAt}</p>
          </div>

          {/* Employee Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-900 border-gray-800 p-4">
            <div className="flex items-start gap-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-600 text-white">
                  {request.employee.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white">{request.employee.name}</h3>
                <p className="text-sm text-gray-400">{request.employee.position}</p>
              </div>
            </div>
            <Separator className="bg-gray-800 mb-4" />
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>{request.employee.name.toLowerCase().replace(' ', '.')}@company.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+7 (999) 123-45-67</span>
              </div>
            </div>
          </Card>
          </motion.div>

          {/* Meeting Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gray-900 border-gray-800 p-4">
            <h3 className="text-white mb-4">Детали встречи</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Дата</p>
                  <p className="text-white">{request.requestedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Время</p>
                  <p className="text-white">{request.requestedTime}</p>
                </div>
              </div>
            </div>
          </Card>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gray-900 border-gray-800 p-4">
              <h3 className="text-white mb-3">Описание вопроса</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{request.description}</p>
            </Card>
          </motion.div>

          {/* Actions */}
          {request.status === 'pending' && (
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handleApprove}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Одобрить встречу
              </Button>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowRescheduleDialog(true)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Перенести встречу
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-red-500 text-red-500 hover:bg-red-500/10"
                onClick={() => setShowRejectDialog(true)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Отклонить заявку
              </Button>
            </motion.div>
          )}

          {request.status === 'approved' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
            <Card className="bg-green-500/10 border-green-500/20 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p className="text-sm text-green-500">Встреча подтверждена и добавлена в календарь</p>
              </div>
            </Card>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Отклонить заявку?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Укажите причину отклонения (необязательно)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            placeholder="Причина отклонения..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="bg-gray-950 border-gray-800 text-white placeholder:text-gray-500"
          />
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Отклонить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reschedule Dialog */}
      <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Перенести встречу</DialogTitle>
            <DialogDescription className="text-gray-400">
              Предложите новое время для встречи
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="date" className="text-white">Новая дата</Label>
              <Input
                id="date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="bg-gray-950 border-gray-800 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-white">Новое время</Label>
              <Input
                id="time"
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="bg-gray-950 border-gray-800 text-white mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowRescheduleDialog(false)}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              Отмена
            </Button>
            <Button 
              onClick={handleReschedule}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Перенести
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
