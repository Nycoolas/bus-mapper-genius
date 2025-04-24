import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import BusCard from '@/components/BusCard';
import { Search, Bus, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { fetchBusLines, BusLine } from '@/lib/api';

const Linhas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [busLines, setBusLines] = useState<BusLine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBusLines = async () => {
      try {
        const lines = await fetchBusLines();
        setBusLines(lines);
      } catch (error) {
        console.error("Erro ao buscar linhas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBusLines();
  }, []);

  const toggleFavorite = (id: string) => {
    setBusLines(prevLines =>
      prevLines.map(line =>
        line.id === id ? { ...line, isFavorite: !line.isFavorite } : line
      )
    );
  };

  const filteredBusLines = busLines.filter(line =>
    line.number.includes(searchQuery) ||
    line.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <main className="flex-1 p-4 pb-20 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Linhas de Ônibus</h2>

        <div className="relative mb-6">
          <div className="flex items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar linha ou rota..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-full border-gray-200"
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchQuery('')}
                >
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <div className="bg-gray-200 rounded-full p-1">
                      <span className="text-gray-500 text-xs">×</span>
                    </div>
                  </motion.div>
                </button>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="ml-2 p-2 bg-gray-100 rounded-full"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Carregando linhas...</p>
        ) : filteredBusLines.length > 0 ? (
          <div className="space-y-3">
            {filteredBusLines.map(line => (
              <BusCard
                key={line.id}
                busNumber={line.number}
                routeName={line.route}
                isFavorite={line.isFavorite}
                estimatedTime={line.estimatedTime}
                onToggleFavorite={() => toggleFavorite(line.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bus className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhuma linha encontrada</h3>
            <p className="text-gray-500 max-w-xs">
              {searchQuery
                ? `Não encontramos resultados para "${searchQuery}"`
                : "As linhas de ônibus disponíveis aparecerão aqui"}
            </p>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Linhas;
