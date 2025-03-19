
import React from 'react';
import { MapPin, Star, Search, AlertTriangle, Bus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: MapPin, label: 'Mapa', path: '/' },
    { icon: Star, label: 'Favoritos', path: '/favoritos' },
    { icon: Search, label: 'Buscar', path: '/pesquisa' },
    { icon: AlertTriangle, label: 'Alertas', path: '/alertas' },
    { icon: Bus, label: 'Linhas', path: '/linhas' },
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl border-t border-gray-200 z-50"
    >
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path} key={index} className="w-full">
              <motion.div 
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "bottom-tab",
                  isActive ? "text-bus-gradient-start" : "text-gray-500"
                )}
              >
                <div className="relative">
                  <item.icon className={cn(
                    "w-6 h-6 mx-auto",
                    isActive && "text-bus-gradient-start"
                  )} />
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 mx-auto w-1 h-1 bg-bus-gradient-start rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
                <span className="text-xs">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNavigation;
