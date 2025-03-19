
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { AlertTriangle, Clock, MapPin, Plus, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Alert {
  id: string;
  type: 'accident' | 'traffic' | 'closure';
  location: string;
  description: string;
  timestamp: string;
  affectedLines: string[];
}

const Alertas = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'accident',
      location: 'Av. Salesiano',
      description: 'Acidente envolvendo dois veículos. Tráfego lento.',
      timestamp: '10 minutos atrás',
      affectedLines: ['999', '123'],
    },
    {
      id: '2',
      type: 'traffic',
      location: 'Rua Santa Martha',
      description: 'Congestionamento intenso devido a obras.',
      timestamp: '30 minutos atrás',
      affectedLines: ['999', '456'],
    },
    {
      id: '3',
      type: 'closure',
      location: 'Terminal Central',
      description: 'Via bloqueada para manutenção.',
      timestamp: '1 hora atrás',
      affectedLines: ['999', '123', '456'],
    },
  ]);
  
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'accident':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case 'traffic':
        return <Car className="w-6 h-6 text-orange-500" />;
      case 'closure':
        return <MapPin className="w-6 h-6 text-purple-500" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-gray-500" />;
    }
  };
  
  const getAlertTitle = (type: string) => {
    switch (type) {
      case 'accident':
        return 'Acidente';
      case 'traffic':
        return 'Congestionamento';
      case 'closure':
        return 'Via bloqueada';
      default:
        return 'Alerta';
    }
  };
  
  const getAlertBg = (type: string) => {
    switch (type) {
      case 'accident':
        return 'bg-red-50';
      case 'traffic':
        return 'bg-orange-50';
      case 'closure':
        return 'bg-purple-50';
      default:
        return 'bg-gray-50';
    }
  };
  
  const getAlertBorder = (type: string) => {
    switch (type) {
      case 'accident':
        return 'border-l-4 border-red-500';
      case 'traffic':
        return 'border-l-4 border-orange-500';
      case 'closure':
        return 'border-l-4 border-purple-500';
      default:
        return 'border-l-4 border-gray-500';
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 p-4 pb-20 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Alertas de Trânsito</h2>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-bus-blue text-white rounded-full p-2"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
        
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="w-full mb-4 bg-gray-100 p-1 rounded-full">
            <TabsTrigger value="todos" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Todos
            </TabsTrigger>
            <TabsTrigger value="proximidade" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Proximidade
            </TabsTrigger>
            <TabsTrigger value="linha" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Minha Linha
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="todos">
            <div className="space-y-3">
              {alerts.map(alert => (
                <motion.div
                  key={alert.id}
                  whileHover={{ scale: 1.01 }}
                  className={`${getAlertBg(alert.type)} ${getAlertBorder(alert.type)} rounded-lg p-4 shadow-sm`}
                >
                  <div className="flex items-start">
                    <div className="mr-3">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{getAlertTitle(alert.type)} - {alert.location}</h3>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      
                      {alert.affectedLines.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {alert.affectedLines.map(line => (
                            <span key={line} className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-700">
                              Linha {line}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="proximidade">
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <MapPin className="w-12 h-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhum alerta próximo</h3>
              <p className="text-gray-500 max-w-xs">
                Os alertas nas proximidades aparecerão aqui
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="linha">
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <AlertTriangle className="w-12 h-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Selecione suas linhas favoritas</h3>
              <p className="text-gray-500 max-w-xs mb-4">
                Adicione linhas aos favoritos para receber alertas sobre elas
              </p>
              <Button className="bg-bus-blue hover:bg-bus-blue/90">
                Adicionar Favoritos
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Alertas;

