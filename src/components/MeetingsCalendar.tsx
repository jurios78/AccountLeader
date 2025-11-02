import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface CalendarMeeting {
  id: string;
  employeeName: string;
  subject: string;
  time: string;
  duration: string;
  day: number;
  color: string;
}

interface MeetingsCalendarProps {
  onSelectMeeting?: (meetingId: string) => void;
}

export function MeetingsCalendar({ onSelectMeeting }: MeetingsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 2)); // November 2, 2025

  // Одобренные встречи для отображения в календаре
  const meetings: CalendarMeeting[] = [
    { 
      id: '2', 
      employeeName: 'Петрова Мария', 
      subject: 'Новая функциональность', 
      time: '10:00', 
      duration: '1 ч',
      day: 6, 
      color: '#2563eb' 
    },
    { 
      id: '8', 
      employeeName: 'Волкова Ольга', 
      subject: 'Утверждение кампании', 
      time: '17:00', 
      duration: '45 мин',
      day: 5, 
      color: '#7c3aed' 
    },
    { 
      id: '9', 
      employeeName: 'Иванов Сергей', 
      subject: 'Код-ревью', 
      time: '14:00', 
      duration: '30 мин',
      day: 7, 
      color: '#059669' 
    },
    { 
      id: '10', 
      employeeName: 'Козлов Андрей', 
      subject: 'Обсуждение архитектуры', 
      time: '11:00', 
      duration: '1.5 ч',
      day: 8, 
      color: '#2563eb' 
    },
    { 
      id: '11', 
      employeeName: 'Смирнова Татьяна', 
      subject: 'Планирование спринта', 
      time: '15:00', 
      duration: '1 ч',
      day: 10, 
      color: '#7c3aed' 
    },
    { 
      id: '12', 
      employeeName: 'Федоров Игорь', 
      subject: 'Демо продукта', 
      time: '13:00', 
      duration: '2 ч',
      day: 12, 
      color: '#dc2626' 
    },
    { 
      id: '13', 
      employeeName: 'Морозова Анна', 
      subject: 'Обучение новичков', 
      time: '10:30', 
      duration: '1 ч',
      day: 13, 
      color: '#059669' 
    },
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const monthName = currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const calendarDays = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarDays.push(0);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const getMeetingsForDay = (day: number) => {
    return meetings.filter(meeting => meeting.day === day);
  };

  const today = 2; // November 2nd is today

  return (
    <div className="flex-1 bg-gray-950 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CalendarIcon className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl text-white capitalize">{monthName}</h2>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={prevMonth}
                className="bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMonth}
                className="bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Встреч в этом месяце</p>
              <p className="text-2xl text-white">{meetings.length}</p>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border border-gray-800 rounded-lg overflow-hidden">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 bg-gray-900">
            {weekdays.map((day) => (
              <div key={day} className="p-4 text-center text-gray-400 border-r border-gray-800 last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const dayMeetings = getMeetingsForDay(day);
              const isToday = day === today;
              
              return (
                <div
                  key={index}
                  className={`min-h-[140px] p-2 border-r border-b border-gray-800 ${
                    isToday ? 'bg-blue-950/20' : 'bg-gray-950'
                  } ${day === 0 ? 'bg-gray-900/50' : ''}`}
                >
                  {day > 0 && (
                    <>
                      <div className={`text-sm mb-2 flex items-center justify-between ${
                        isToday ? 'text-blue-500' : 'text-gray-400'
                      }`}>
                        <span>{day}</span>
                        {isToday && (
                          <Badge className="bg-blue-600 text-white text-xs px-1.5 py-0">
                            Сегодня
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        {dayMeetings.map((meeting) => (
                          <Card
                            key={meeting.id}
                            className="p-2 cursor-pointer border-l-2 hover:bg-gray-800 transition-colors"
                            style={{ 
                              borderLeftColor: meeting.color,
                              backgroundColor: `${meeting.color}15`
                            }}
                            onClick={() => onSelectMeeting?.(meeting.id)}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <div 
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: meeting.color }}
                                />
                                <span className="text-xs text-white">{meeting.time}</span>
                              </div>
                              <p className="text-xs text-gray-300 line-clamp-1">
                                {meeting.subject}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {meeting.employeeName}
                              </p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">Категории встреч:</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#2563eb' }} />
              <span className="text-gray-400">Продукт</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#7c3aed' }} />
              <span className="text-gray-400">Команда</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#dc2626' }} />
              <span className="text-gray-400">Важное</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#059669' }} />
              <span className="text-gray-400">HR</span>
            </div>
          </div>
        </div>

        {/* Upcoming meetings list */}
        <div>
          <h3 className="text-white mb-4">Ближайшие встречи</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {meetings
              .filter(m => m.day >= today)
              .sort((a, b) => a.day - b.day)
              .slice(0, 6)
              .map((meeting) => (
                <Card 
                  key={meeting.id} 
                  className="bg-gray-900 border-gray-800 p-4 hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => onSelectMeeting?.(meeting.id)}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: meeting.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white truncate">{meeting.subject}</p>
                      <p className="text-sm text-gray-400 truncate">{meeting.employeeName}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>{meeting.day} ноября</span>
                        <span>•</span>
                        <span>{meeting.time}</span>
                        <span>•</span>
                        <span>{meeting.duration}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
