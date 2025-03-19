
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Map from '@/components/Map';
import BottomNavigation from '@/components/BottomNavigation';
import { AlertTriangle, Clock, Map as MapIcon } from 'lucide-react';

const Index = () => {
  const [showAlert, setShowAlert] = useState(false);
  
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header />
      
      <main className="flex-1 relative">
        <Map />
        
        {/* Alerta flutuante */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-20 left-4 right-4 bg-white rounded-xl shadow-lg p-4 border-l-4 border-bus-warning"
            >
              <div className="flex items-start">
                <div className="bg-bus-warning bg-opacity-10 p-2 rounded-full mr-3">
                  <AlertTriangle className="w-6 h-6 text-bus-warning" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Acidente na via</h3>
                  <p className="text-sm text-gray-600 mt-1">Av. Salesiano bloqueada sentido centro. Linhas 999 e 123 desviadas.</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Há 10 minutos</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Botão para mostrar/esconder alerta (para demonstração) */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-20 right-4 bg-white rounded-full p-3 shadow-lg"
          onClick={() => setShowAlert(!showAlert)}
        >
          <AlertTriangle className="w-5 h-5 text-bus-warning" />
        </motion.button>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
