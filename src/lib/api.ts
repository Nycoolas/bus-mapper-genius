const BASE_URL = "http://localhost:3001"; // Porta do seu backend Express

// Buscar todos os pontos
export async function getPontos() {
  const res = await fetch(`${BASE_URL}/pontos`);
  return res.json();
}

// Buscar todos os alertas
export async function getAlertas() {
  const res = await fetch(`${BASE_URL}/alertas`);
  return res.json();
}

// Enviar destino escolhido
export async function enviarDestino(destino: string) {
  const res = await fetch(`${BASE_URL}/destino`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destino }),
  });
  return res.json();
}

// lib/api.ts

export interface BusLine {
    id: string;
    number: string;
    route: string;
    isFavorite: boolean;
    estimatedTime?: string;
    status: 'normal' | 'delayed' | 'early';
  }
  
  // Mock temporário (depois trocamos por fetch real)
  export const fetchBusLines = async (): Promise<BusLine[]> => {
    const res = await fetch(`${BASE_URL}/linhas`);
    return res.json();
  };
  
  