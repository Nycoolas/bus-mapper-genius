import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Opa! A página que você tentou acessar não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="inline-block bg-bus-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-bus-primary-dark transition"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
