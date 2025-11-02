import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { MeetingCard } from './MeetingCard';
import { Badge } from './ui/badge';

export function RightMeetings() {
  const upcomingMeetings = [
    {
      id: '1',
      title: 'Стратегическое планирование',
      time: '14:00',
      duration: '1 ч',
      participants: [
        { name: 'Иванов А.', initials: 'ИА' },
        { name: 'Петрова М.', initials: 'ПМ' },
        { name: 'Сидоров В.', initials: 'СВ' },
      ],
      agenda: 'Обсуждение квартальных целей и KPI на Q1 2025',
      type: 'online' as const,
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'Еженедельный sync с командой',
      time: '16:30',
      duration: '30 мин',
      participants: [
        { name: 'Команда', initials: 'К' },
        { name: 'Менеджеры', initials: 'М' },
      ],
      agenda: 'Обновления по проектам, блокеры, планы на неделю',
      type: 'online' as const,
    },
    {
      id: '3',
      title: 'Встреча с инвесторами',
      time: '18:00',
      duration: '45 мин',
      participants: [
        { name: 'Николаев К.', initials: 'НК' },
        { name: 'Фонд', initials: 'Ф' },
        { name: 'Юрист', initials: 'Ю' },
        { name: 'CFO', initials: 'C' },
      ],
      agenda: 'Презентация результатов за год и планы на следующий период',
      type: 'offline' as const,
      priority: 'high' as const,
    },
    {
      id: '4',
      title: 'Ревью продуктовой стратегии',
      time: 'Завтра, 10:00',
      duration: '2 ч',
      participants: [
        { name: 'Product Team', initials: 'PT' },
        { name: 'Аналитики', initials: 'А' },
      ],
      agenda: 'Анализ метрик, обратная связь пользователей, roadmap',
      type: 'online' as const,
    },
  ];

  return (
    <div className="w-96 bg-gray-950 border-l border-gray-800 p-4 overflow-y-auto">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-500" />
            <h2 className="text-white">Предстоящие встречи</h2>
          </div>
          <Badge variant="secondary" className="bg-gray-800 text-gray-300">
            {upcomingMeetings.length}
          </Badge>
        </div>

        {/* New Meeting Button */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Создать встречу
        </Button>

        {/* Today's Date */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-gray-400 text-sm">Сегодня</p>
            <p className="text-white">2 ноября, воскресенье</p>
          </div>
        </div>

        {/* Meetings List */}
        <div className="space-y-3">
          {upcomingMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>

        {/* Empty State for Tomorrow */}
        <div className="pt-6">
          <p className="text-gray-500 text-sm text-center py-8 border border-dashed border-gray-800 rounded-lg">
            Нет больше встреч на сегодня
          </p>
        </div>
      </div>
    </div>
  );
}
