
import React from 'react';
import { Menu, BellRing } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Tela App';
      case '/favoritos':
        return 'Favoritos';
      case '/pesquisa':
        return 'Pesquisa';
      case '/alertas':
        return 'Alertas';
      case '/linhas':
        return 'Linhas';
      default:
        return 'Bus Mapper';
    }
  };
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-white shadow-sm z-10 sticky top-0 p-4 flex items-center justify-between"
    >
      <div className="flex items-center">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="mr-3 focus:outline-none"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </motion.button>
        <h1 className="text-lg font-semibold text-gray-800">{getTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-gray-100 focus:outline-none"
        >
          <BellRing className="w-5 h-5 text-gray-700" />
        </motion.button>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 rounded-full bus-gradient flex items-center justify-center text-white text-sm font-medium"
        >
          JV
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
