import { Clock, CheckCircle, XCircle, Calendar, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export function RequestsStats() {
  const stats = [
    { 
      label: 'Новые заявки', 
      value: '12', 
      icon: Clock, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    { 
      label: 'Одобрено', 
      value: '28', 
      icon: CheckCircle, 
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    { 
      label: 'Отклонено', 
      value: '5', 
      icon: XCircle, 
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    },
    { 
      label: 'Встреч сегодня', 
      value: '4', 
      icon: Calendar, 
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
  ];

  const recentActivity = [
    { employee: 'Иванов Алексей', action: 'Новая заявка', time: '5 мин назад', type: 'new' },
    { employee: 'Петрова Мария', action: 'Заявка одобрена', time: '15 мин назад', type: 'approved' },
    { employee: 'Сидоров Виктор', action: 'Новая заявка', time: '32 мин назад', type: 'new' },
    { employee: 'Кузнецова Анна', action: 'Встреча завершена', time: '1 ч назад', type: 'completed' },
  ];

  return (
    <div className="w-80 bg-gray-950 border-r border-gray-800 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Stats Section */}
        <div>
          <h2 className="text-white mb-4">Статистика заявок</h2>
          <div className="space-y-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <Card 
                    className={`bg-gray-900 border p-4 ${stat.borderColor} cursor-pointer hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`p-2 rounded-lg ${stat.bgColor}`}
                          whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                        >
                          <Icon className={`h-5 w-5 ${stat.color}`} />
                        </motion.div>
                        <div>
                          <p className="text-sm text-gray-400">{stat.label}</p>
                          <motion.p 
                            className="text-2xl text-white mt-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                          >
                            {stat.value}
                          </motion.p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Weekly Stats */}
        <div>
          <h2 className="text-white mb-4">Эта неделя</h2>
          <Card className="bg-gray-900 border-gray-800 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Всего заявок</span>
                <span className="text-white">45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Обработано</span>
                <span className="text-white">33</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Среднее время ответа</span>
                <span className="text-white">2.5 ч</span>
              </div>
              <div className="pt-2 border-t border-gray-800">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <TrendingUp className="h-4 w-4" />
                  <span>+23% к прошлой неделе</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-white mb-4">Последняя активность</h2>
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <Card 
                  className="bg-gray-900 border-gray-800 p-3 hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <p className="text-sm text-gray-300">{activity.employee}</p>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline"
                        className={`text-xs ${
                          activity.type === 'new' 
                            ? 'border-blue-500 text-blue-500 animate-pulse'
                            : activity.type === 'approved'
                            ? 'border-green-500 text-green-500'
                            : 'border-gray-500 text-gray-500'
                        }`}
                      >
                        {activity.action}
                      </Badge>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
