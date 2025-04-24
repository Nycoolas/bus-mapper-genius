import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bus, MapPin, Plus, TriangleAlert } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface Alert {
  id: number;
  type: "accident" | "traffic" | "closure";
  message: string;
  location: string;
  affectedLines: string[];
  timestamp: string;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    type: "accident",
    message: "Acidente na Av. Paulista com bloqueio parcial",
    location: "Av. Paulista, São Paulo - SP",
    affectedLines: ["875C-10", "908T-10"],
    timestamp: "2023-04-07T14:30:00Z",
  },
  {
    id: 2,
    type: "traffic",
    message: "Trânsito intenso na Marginal Tietê",
    location: "Marginal Tietê, São Paulo - SP",
    affectedLines: ["8500-10"],
    timestamp: "2023-04-07T13:15:00Z",
  },
  {
    id: 3,
    type: "closure",
    message: "Interdição na Rua da Consolação para obras",
    location: "Rua da Consolação, São Paulo - SP",
    affectedLines: ["917M-10", "875A-10"],
    timestamp: "2023-04-07T12:00:00Z",
  },
];

const getAlertIcon = (type: Alert['type']) => {
  switch (type) {
    case "accident":
      return <TriangleAlert className="text-red-500 w-5 h-5" />;
    case "traffic":
      return <Bus className="text-orange-500 w-5 h-5" />;
    case "closure":
      return <MapPin className="text-purple-500 w-5 h-5" />;
    default:
      return null;
  }
};

const getAlertTitle = (type: Alert['type']) => {
  switch (type) {
    case "accident":
      return "Acidente";
    case "traffic":
      return "Trânsito";
    case "closure":
      return "Interdição";
    default:
      return "Alerta";
  }
};

const getAlertStyle = (type: Alert['type']) => {
  switch (type) {
    case "accident":
      return "bg-red-50 border-l-4 border-red-500";
    case "traffic":
      return "bg-orange-50 border-l-4 border-orange-500";
    case "closure":
      return "bg-purple-50 border-l-4 border-purple-500";
    default:
      return "bg-gray-50 border-l-4 border-gray-500";
  }
};

const LineTag = ({ line }: { line: string }) => (
  <span className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-700">
    Linha {line}
  </span>
);

export default function Alertas() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  return (
    <div className="p-4">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="nearby">Proximidade</TabsTrigger>
            <TabsTrigger value="favorites">Minha Linha</TabsTrigger>
          </TabsList>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-bus-blue text-white rounded-full p-2"
            onClick={() => console.log("Adicionar novo alerta")}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        <TabsContent value="all">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                className={`${getAlertStyle(alert.type)} rounded-lg p-4 shadow-sm`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-2">
                  {getAlertIcon(alert.type)}
                  <h3 className="text-sm font-semibold text-gray-800">
                    {getAlertTitle(alert.type)}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.location}</p>
                <div className="flex space-x-2 mt-2">
                  {alert.affectedLines.map((line) => (
                    <LineTag key={line} line={line} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nearby">
          <div className="text-center text-sm text-gray-500">Nenhum alerta próximo.</div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="text-center text-sm text-gray-500">Nenhum alerta nas suas linhas favoritas.</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
