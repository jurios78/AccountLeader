import { TrendingUp, TrendingDown, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

export function LeftDashboard() {
  const kpiData = [
    { label: 'Встречи за месяц', value: '48', change: '+12%', trend: 'up' },
    { label: 'Завершённые задачи', value: '32/45', change: '71%', trend: 'up' },
    { label: 'Среднее время', value: '45 мин', change: '-5%', trend: 'down' },
  ];

  const tasks = [
    { id: 1, title: 'Подготовить презентацию для совета директоров', priority: 'high', completed: false },
    { id: 2, title: 'Утвердить бюджет на Q1', priority: 'high', completed: false },
    { id: 3, title: 'Ревью новых кандидатов', priority: 'medium', completed: true },
    { id: 4, title: 'Согласовать маркетинговую стратегию', priority: 'medium', completed: false },
  ];

  const notifications = [
    { id: 1, text: 'Встреча "Планирование" через 15 минут', time: '15 мин', type: 'urgent' },
    { id: 2, text: 'Новое приглашение от Иванова А.', time: '1 ч', type: 'info' },
    { id: 3, text: 'Отчёт по продажам готов', time: '2 ч', type: 'success' },
  ];

  return (
    <div className="w-80 bg-gray-950 border-r border-gray-800 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* KPI Section */}
        <div>
          <h2 className="text-white mb-4">KPI метрики</h2>
          <div className="space-y-3">
            {kpiData.map((kpi, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm text-gray-400">{kpi.label}</span>
                  <div className={`flex items-center gap-1 text-xs ${
                    kpi.trend === 'up' ? 'text-green-500' : 'text-orange-500'
                  }`}>
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {kpi.change}
                  </div>
                </div>
                <div className="text-white text-2xl">{kpi.value}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tasks Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white">Задачи</h2>
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
              4
            </Badge>
          </div>
          <div className="space-y-2">
            {tasks.map((task) => (
              <Card key={task.id} className="bg-gray-900 border-gray-800 p-3 hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${task.completed ? 'text-green-500' : 'text-gray-600'}`}>
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                      {task.title}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={`mt-2 text-xs ${
                        task.priority === 'high' 
                          ? 'border-red-500 text-red-500' 
                          : 'border-yellow-500 text-yellow-500'
                      }`}
                    >
                      {task.priority === 'high' ? 'Высокий' : 'Средний'}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white">Уведомления</h2>
            <Badge variant="secondary" className="bg-blue-600 text-white">
              3
            </Badge>
          </div>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <Card key={notification.id} className="bg-gray-900 border-gray-800 p-3 hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${
                    notification.type === 'urgent' 
                      ? 'text-red-500' 
                      : notification.type === 'success' 
                      ? 'text-green-500' 
                      : 'text-blue-500'
                  }`}>
                    {notification.type === 'urgent' ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">{notification.text}</p>
                    <span className="text-xs text-gray-500 mt-1 inline-block">{notification.time} назад</span>
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
