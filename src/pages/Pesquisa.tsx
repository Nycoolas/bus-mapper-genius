
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import SearchBar from '@/components/SearchBar';
import BusCard from '@/components/BusCard';
import { Search, MapPin, Route, AlertTriangle, Bus, Star } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'bus' | 'stop' | 'route';
  title: string;
  subtitle: string;
  isFavorite: boolean;
}

const Pesquisa = () => {
  const [searchType, setSearchType] = useState<'local' | 'linha'>('local');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (query: string, type: 'local' | 'linha') => {
    setSearchQuery(query);
    setSearchType(type);
    setIsSearching(true);
    
    // Simular busca com resultados fictícios
    setTimeout(() => {
      if (type === 'local') {
        setSearchResults([
          { id: '1', type: 'stop', title: 'Terminal Central', subtitle: '5 linhas disponíveis', isFavorite: true },
          { id: '2', type: 'stop', title: 'Salesiano - Av', subtitle: '3 linhas disponíveis', isFavorite: false },
          { id: '3', type: 'stop', title: 'Santa Martha', subtitle: '2 linhas disponíveis', isFavorite: false },
        ]);
      } else {
        setSearchResults([
          { id: '4', type: 'bus', title: '999 - Salesiano', subtitle: 'Via Centro', isFavorite: true },
          { id: '5', type: 'bus', title: '123 - Terminal Central', subtitle: 'Via Salesiano', isFavorite: false },
          { id: '6', type: 'route', title: 'Rota Rápida: Salesiano → Centro', subtitle: '15 minutos', isFavorite: false },
        ]);
      }
      setIsSearching(false);
    }, 1000);
  };
  
  const toggleFavorite = (id: string) => {
    setSearchResults(prevResults => prevResults.map(result => 
      result.id === id ? { ...result, isFavorite: !result.isFavorite } : result
    ));
  };
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'bus':
        return <Bus className="w-5 h-5 text-white" />;
      case 'stop':
        return <MapPin className="w-5 h-5 text-white" />;
      case 'route':
        return <Route className="w-5 h-5 text-white" />;
      default:
        return <Search className="w-5 h-5 text-white" />;
    }
  };
  
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'bus':
        return 'bg-bus-blue';
      case 'stop':
        return 'bg-bus-point';
      case 'route':
        return 'bg-bus-gradient-start';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 p-4 pb-20 overflow-y-auto">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="rounded-xl bg-bus-gradient-start p-4 mb-6 text-white">
          <div className="flex items-center mb-2">
            <div className="bg-white bg-opacity-20 rounded-full p-2 mr-2">
              <Bus className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium">Viagem rápida</h3>
          </div>
          <p className="text-sm opacity-90 mb-3">Encontre o caminho mais rápido para seu destino</p>
          
          <div className="flex space-x-3">
            <div className="flex-1">
              <div className="bg-white bg-opacity-20 rounded-lg p-2 text-sm">
                <div className="flex items-center mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="opacity-80">Local:</span>
                </div>
                <p className="font-medium">Sua localização</p>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="bg-white bg-opacity-20 rounded-lg p-2 text-sm">
                <div className="flex items-center mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="opacity-80">Destino:</span>
                </div>
                <p className="font-medium">Escolha o destino</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resultados da pesquisa */}
        {searchQuery && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Resultados para "{searchQuery}"
            </h3>
            
            {isSearching ? (
              <div className="flex justify-center items-center py-8">
                <div className="w-8 h-8 border-4 border-bus-blue border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-2">
                {searchResults.length > 0 ? (
                  searchResults.map(result => (
                    <motion.div
                      key={result.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-xl shadow-sm p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className={`${getBackgroundColor(result.type)} rounded-full p-2 mr-3`}>
                          {getIcon(result.type)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{result.title}</h3>
                          <p className="text-xs text-gray-500">{result.subtitle}</p>
                        </div>
                      </div>
                      
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => toggleFavorite(result.id)}
                        className="focus:outline-none"
                      >
                        <Star 
                          className={`w-6 h-6 ${result.isFavorite ? "text-bus-favorite" : "text-gray-300"}`} 
                          fill={result.isFavorite ? "#FFB800" : "none"} 
                        />
                      </motion.button>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Search className="w-12 h-12 text-gray-300 mb-2" />
                    <p className="text-gray-500">Nenhum resultado encontrado</p>
                    <p className="text-sm text-gray-400 mt-1">Tente outra pesquisa</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {!searchQuery && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Busque rotas ou locais</h3>
            <p className="text-gray-500 max-w-xs">
              Encontre ônibus, pontos de parada ou trace rotas para seu destino
            </p>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Pesquisa;
