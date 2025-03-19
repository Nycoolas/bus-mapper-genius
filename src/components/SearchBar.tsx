
import React, { useState } from 'react';
import { Search, MapPin, Bus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string, type: 'local' | 'linha') => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchType, setSearchType] = useState<'local' | 'linha'>('local');
  const [query, setQuery] = useState('');
  
  const handleSearch = () => {
    onSearch(query, searchType);
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center bg-white rounded-full shadow-md p-1">
        <div className="flex items-center w-full">
          <div className="flex space-x-1 p-1 bg-bus-lightBlue bg-opacity-20 rounded-full mr-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={cn(
                "px-3 py-1 text-sm rounded-full transition-all",
                searchType === 'local' ? "bg-bus-blue text-white" : "text-gray-600"
              )}
              onClick={() => setSearchType('local')}
            >
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Local
              </div>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={cn(
                "px-3 py-1 text-sm rounded-full transition-all",
                searchType === 'linha' ? "bg-bus-blue text-white" : "text-gray-600"
              )}
              onClick={() => setSearchType('linha')}
            >
              <div className="flex items-center">
                <Bus className="w-4 h-4 mr-1" />
                Destino
              </div>
            </motion.button>
          </div>
        </div>
        
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchType === 'local' ? "Digite o local..." : "Digite o número da linha..."}
            className="w-full py-2 px-4 pr-10 text-sm text-gray-700 rounded-full focus:outline-none"
          />
          {query && (
            <button 
              className="absolute right-10 top-1/2 transform -translate-y-1/2"
              onClick={() => setQuery('')}
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-bus-blue text-white p-2 rounded-full"
          onClick={handleSearch}
        >
          <Search className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default SearchBar;
