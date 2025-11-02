import { Search, Filter, Bell, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function TopBar() {
  return (
    <div className="border-b border-gray-800 bg-gray-950 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white">М</span>
          </div>
          <h1 className="text-white">Кабинет руководителя</h1>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Поиск встреч, участников..."
            className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Filters */}
          <Button variant="outline" size="sm" className="bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white">
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white hover:bg-gray-800">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-600 text-white text-xs">
              3
            </Badge>
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-gray-800">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-600 text-white">АП</AvatarFallback>
                </Avatar>
                <span>Александр Петров</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-800 text-white">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-white">
                Профиль
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-white">
                Настройки
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="text-red-400 focus:bg-gray-800 focus:text-red-400">
                Выход
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
