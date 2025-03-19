
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import BusCard from '@/components/BusCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star } from 'lucide-react';

const Favoritos = () => {
  const [favorites, setFavorites] = useState([
    { id: '1', number: '999', route: 'Salesiano - AV', isFavorite: true, estimatedTime: '5 min' },
    { id: '2', number: '999', route: 'Salesiano - AV', isFavorite: true, estimatedTime: '10 min' },
    { id: '3', number: '999', route: 'Salesiano - AV', isFavorite: true, estimatedTime: '15 min' },
    { id: '4', number: '999', route: 'Santa Martha', isFavorite: true, estimatedTime: '20 min' },
    { id: '5', number: '999', route: 'Santa Martha', isFavorite: true, estimatedTime: '25 min' },
    { id: '6', number: '999', route: 'Santa Martha', isFavorite: true, estimatedTime: '30 min' },
  ]);
  
  const toggleFavorite = (id: string) => {
    setFavorites(prevFavorites => prevFavorites.map(favorite => 
      favorite.id === id ? { ...favorite, isFavorite: !favorite.isFavorite } : favorite
    ));
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 p-4 pb-20 overflow-y-auto">
        <div className="bus-gradient rounded-full py-2 px-4 inline-flex items-center text-white font-medium text-sm mb-6 mx-auto">
          <Star className="w-4 h-4 mr-2" fill="white" />
          Favoritos
        </div>
        
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="w-full mb-4 bg-gray-100 p-1 rounded-full">
            <TabsTrigger value="todos" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Todos
            </TabsTrigger>
            <TabsTrigger value="pontos" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Pontos
            </TabsTrigger>
            <TabsTrigger value="linhas" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Linhas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="todos">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Pontos Favoritos</h3>
                <div className="space-y-2">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl shadow-sm p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="bg-bus-point rounded-full p-2 mr-3">
                        <Star className="w-4 h-4 text-white" fill="white" />
                      </div>
                      <span>Terminal Central</span>
                    </div>
                    <span className="text-sm text-gray-500">3 linhas</span>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl shadow-sm p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="bg-bus-point rounded-full p-2 mr-3">
                        <Star className="w-4 h-4 text-white" fill="white" />
                      </div>
                      <span>Salesiano</span>
                    </div>
                    <span className="text-sm text-gray-500">5 linhas</span>
                  </motion.div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Linhas Favoritas</h3>
                <div className="space-y-2">
                  {favorites.map(bus => (
                    <BusCard
                      key={bus.id}
                      busNumber={bus.number}
                      routeName={bus.route}
                      isFavorite={bus.isFavorite}
                      estimatedTime={bus.estimatedTime}
                      onToggleFavorite={() => toggleFavorite(bus.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pontos">
            <div className="space-y-2">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-sm p-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="bg-bus-point rounded-full p-2 mr-3">
                    <Star className="w-4 h-4 text-white" fill="white" />
                  </div>
                  <span>Terminal Central</span>
                </div>
                <span className="text-sm text-gray-500">3 linhas</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-sm p-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="bg-bus-point rounded-full p-2 mr-3">
                    <Star className="w-4 h-4 text-white" fill="white" />
                  </div>
                  <span>Salesiano</span>
                </div>
                <span className="text-sm text-gray-500">5 linhas</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-sm p-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="bg-bus-point rounded-full p-2 mr-3">
                    <Star className="w-4 h-4 text-white" fill="white" />
                  </div>
                  <span>Santa Martha</span>
                </div>
                <span className="text-sm text-gray-500">2 linhas</span>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="linhas">
            <div className="space-y-2">
              {favorites.map(bus => (
                <BusCard
                  key={bus.id}
                  busNumber={bus.number}
                  routeName={bus.route}
                  isFavorite={bus.isFavorite}
                  estimatedTime={bus.estimatedTime}
                  onToggleFavorite={() => toggleFavorite(bus.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Favoritos;
