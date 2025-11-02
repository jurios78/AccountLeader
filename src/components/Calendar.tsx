import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  day: number;
}

function CalendarEvent({ event, onMove }: { event: CalendarEvent; onMove: (id: string, day: number) => void }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'event',
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 rounded text-xs cursor-move mb-1 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ backgroundColor: event.color }}
    >
      <div className="text-white">
        <div>{event.start} - {event.end}</div>
        <div className="mt-1">{event.title}</div>
      </div>
    </div>
  );
}

function DayCell({ day, events, onDrop, isToday }: { 
  day: number; 
  events: CalendarEvent[]; 
  onDrop: (id: string, day: number) => void;
  isToday: boolean;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'event',
    drop: (item: { id: string }) => onDrop(item.id, day),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-[120px] p-2 border-r border-b border-gray-800 ${
        isOver ? 'bg-gray-800' : 'bg-gray-950'
      } ${isToday ? 'bg-blue-950/20' : ''}`}
    >
      <div className={`text-sm mb-2 ${isToday ? 'text-blue-500' : 'text-gray-400'}`}>
        {day > 0 && day}
      </div>
      <div className="space-y-1">
        {events.map((event) => (
          <CalendarEvent key={event.id} event={event} onMove={onDrop} />
        ))}
      </div>
    </div>
  );
}

export function Calendar() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 2)); // November 2, 2025
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: '1', title: 'Стратегическое планирование', start: '14:00', end: '15:00', color: '#2563eb', day: 2 },
    { id: '2', title: 'Sync с командой', start: '16:30', end: '17:00', color: '#7c3aed', day: 2 },
    { id: '3', title: 'Встреча с инвесторами', start: '18:00', end: '18:45', color: '#dc2626', day: 2 },
    { id: '4', title: 'Ревью продукта', start: '10:00', end: '12:00', color: '#2563eb', day: 3 },
    { id: '5', title: 'Интервью кандидатов', start: '15:00', end: '16:30', color: '#059669', day: 5 },
    { id: '6', title: 'Презентация Q4', start: '11:00', end: '12:30', color: '#dc2626', day: 7 },
    { id: '7', title: 'Планирование спринта', start: '14:00', end: '15:30', color: '#7c3aed', day: 10 },
  ]);

  const handleEventMove = (eventId: string, newDay: number) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, day: newDay } : event
    ));
  };

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex-1 bg-gray-950 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
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

            {/* View Switcher */}
            <Tabs value={view} onValueChange={(v) => setView(v as any)}>
              <TabsList className="bg-gray-900 border-gray-800">
                <TabsTrigger value="month" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Месяц
                </TabsTrigger>
                <TabsTrigger value="week" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Неделя
                </TabsTrigger>
                <TabsTrigger value="day" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  День
                </TabsTrigger>
              </TabsList>
            </Tabs>
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
                const dayEvents = events.filter(event => event.day === day);
                const isToday = day === 2; // November 2nd is today
                return (
                  <DayCell
                    key={index}
                    day={day}
                    events={dayEvents}
                    onDrop={handleEventMove}
                    isToday={isToday}
                  />
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-gray-400">Категории:</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#2563eb' }} />
              <span className="text-gray-400">Стратегия</span>
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
      </div>
    </DndProvider>
  );
}
