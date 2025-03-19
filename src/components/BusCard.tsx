
import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BusCardProps {
  busNumber: string;
  routeName: string;
  isFavorite?: boolean;
  estimatedTime?: string;
  onToggleFavorite?: () => void;
  onClick?: () => void;
}

const BusCard: React.FC<BusCardProps> = ({
  busNumber,
  routeName,
  isFavorite = false,
  estimatedTime,
  onToggleFavorite,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-2 flex items-center justify-between"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="bg-bus-blue rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold mr-3">
          {busNumber.substring(0, 3)}
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{routeName}</h3>
          {estimatedTime && (
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Clock className="w-3 h-3 mr-1" />
              <span>{estimatedTime}</span>
            </div>
          )}
        </div>
      </div>
      
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite?.();
        }}
        className="focus:outline-none"
      >
        <Star 
          className={cn("w-6 h-6", isFavorite ? "text-bus-favorite" : "text-gray-300")} 
          fill={isFavorite ? "#FFB800" : "none"} 
        />
      </motion.button>
    </motion.div>
  );
};

export default BusCard;
