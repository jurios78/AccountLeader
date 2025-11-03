import { useState } from 'react';
import { RequestCard } from './RequestCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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

interface RequestsListProps {
  onSelectRequest: (request: Request) => void;
  selectedRequestId?: string;
}

export function RequestsList({ onSelectRequest, selectedRequestId }: RequestsListProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');

  const requests: Request[] = [
    {
      id: '1',
      employee: { name: 'Иванов Алексей', position: 'Старший разработчик', initials: 'ИА' },
      subject: 'Обсуждение повышения зарплаты',
      description: 'Хотел бы обсудить вопрос пересмотра компенсации с учетом текущих результатов и рыночной ситуации',
      requestedDate: '5 ноября',
      requestedTime: '14:00',
      status: 'pending',
      priority: 'high',
      createdAt: '5 мин назад'
    },
    {
      id: '2',
      employee: { name: 'Петрова Мария', position: 'Product Manager', initials: 'ПМ' },
      subject: 'Новая функциональность продукта',
      description: 'Необходимо согласовать roadmap на следующий квартал и обсудить приоритеты',
      requestedDate: '6 ноября',
      requestedTime: '10:00',
      status: 'approved',
      priority: 'medium',
      createdAt: '15 мин назад'
    },
    {
      id: '3',
      employee: { name: 'Сидоров Виктор', position: 'QA Engineer', initials: 'СВ' },
      subject: 'Проблемы в команде',
      description: 'Возникли конфликтные ситуации в команде, требуется ваше участие для разрешения',
      requestedDate: '5 ноября',
      requestedTime: '16:00',
      status: 'pending',
      priority: 'high',
      createdAt: '32 мин назад'
    },
    {
      id: '4',
      employee: { name: 'Кузнецова Анна', position: 'Designer', initials: 'КА' },
      subject: 'Дополнительный отпуск',
      description: 'Прошу рассмотреть возможность предоставления дополнительного отпуска в декабре',
      requestedDate: '4 ноября',
      requestedTime: '11:00',
      status: 'rejected',
      priority: 'low',
      createdAt: '1 ч назад'
    },
    {
      id: '5',
      employee: { name: 'Михайлов Дмитрий', position: 'Backend Developer', initials: 'МД' },
      subject: 'Переход на другой проект',
      description: 'Хочу обсудить возможность перевода на проект по разработке новой платформы',
      requestedDate: '7 ноября',
      requestedTime: '15:00',
      status: 'pending',
      priority: 'medium',
      createdAt: '2 ч назад'
    },
    {
      id: '6',
      employee: { name: 'Новикова Елена', position: 'HR Manager', initials: 'НЕ' },
      subject: 'Адаптация нового сотрудника',
      description: 'Нужна помощь в адаптации нового senior разработчика, возникли сложности',
      requestedDate: '6 ноября',
      requestedTime: '13:00',
      status: 'rescheduled',
      priority: 'medium',
      createdAt: '3 ч назад'
    },
    {
      id: '7',
      employee: { name: 'Соколов Павел', position: 'DevOps Engineer', initials: 'СП' },
      subject: 'Бюджет на инфраструктуру',
      description: 'Требуется согласование дополнительного бюджета на масштабирование инфраструктуры',
      requestedDate: '8 ноября',
      requestedTime: '11:30',
      status: 'pending',
      priority: 'high',
      createdAt: '4 ч назад'
    },
    {
      id: '8',
      employee: { name: 'Волкова Ольга', position: 'Marketing Lead', initials: 'ВО' },
      subject: 'Утверждение кампании',
      description: 'Нужно утвердить финальный вариант маркетинговой кампании на Q1 2025',
      requestedDate: '5 ноября',
      requestedTime: '17:00',
      status: 'approved',
      priority: 'medium',
      createdAt: '5 ч назад'
    },
  ];

  const filteredRequests = requests.filter(request => {
    if (filterStatus === 'all') return true;
    return request.status === filterStatus;
  });

  return (
    <div className="h-full bg-gray-950 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl text-white mb-2">Заявки на встречу</h1>
          <p className="text-gray-400">Управление запросами сотрудников</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Поиск по сотрудникам, темам..."
              className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-gray-900 border-gray-800 text-white">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800 text-white">
              <SelectItem value="date">По дате</SelectItem>
              <SelectItem value="priority">По приоритету</SelectItem>
              <SelectItem value="name">По имени</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Tabs */}
        <Tabs value={filterStatus} onValueChange={setFilterStatus}>
          <TabsList className="bg-gray-900 border-gray-800 w-full justify-start">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Все ({requests.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Ожидают ({requests.filter(r => r.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Одобрено ({requests.filter(r => r.status === 'approved').length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Отклонено ({requests.filter(r => r.status === 'rejected').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Requests List */}
        <div className="space-y-3">
          {filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              isSelected={selectedRequestId === request.id}
              onClick={() => onSelectRequest(request)}
            />
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Заявки не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}
