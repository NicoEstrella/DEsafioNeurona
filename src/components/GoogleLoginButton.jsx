import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {
  ExclamationTriangleIcon,
  CheckBadgeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const GoogleLoginButton = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  // estas credenciales deven estar en un archivo .env
  const clientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    "112187198840-e4p00fsenukebu9bmi9n89tbpf007njn.apps.googleusercontent.com";
  const DIDIT_VERIFICATION_URL =
    import.meta.env.VITE_DIDIT_VERIFICATION_URL ||
    "https://verify.didit.me/session/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDMxMzMwNTAsImV4cCI6MTc0MzczNzg1MCwic2Vzc2lvbl9pZCI6IjJhMzFjNjIyLWFjOWItNDRkZS1hNTg4LWQ0NjViNzVjMGE3YiJ9.XU_Z57FF4217YCDn2lsGJaH5CqM0IWJEtu1QAWDHy7s";

  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setUser(decoded);
      setError(null);
      console.log("Login exitoso:", decoded);

      // aqui se redirecciona a Didit después del login
      setIsRedirecting(true);
      setTimeout(() => {
        window.location.href = DIDIT_VERIFICATION_URL;
      }, 1000); // Pequeño delay para mejorar la UX
    } catch (err) {
      setError("Error al decodificar la credencial");
      console.error("Error:", err);
    }
  };

  const handleError = () => {
    setError("Error en el inicio de sesión con Google");
  };

  const handleLogout = () => {
    setUser(null);
    setIsRedirecting(false);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex flex-col items-center justify-center p-4 min-h-[300px]">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {user ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-green-100 text-green-700 rounded-md flex flex-col items-center">
              <CheckBadgeIcon className="h-8 w-8 mb-2 text-green-500" />
              <p className="font-medium">¡Bienvenido!</p>
              <p>{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            {/* 3. Estado de redirección */}
            {isRedirecting && (
              <div className="p-4 bg-blue-50 rounded-md flex items-center justify-center">
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                <span>Redirigiendo a Didit para verificación...</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-gray-700">Inicia sesión</p>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              useOneTap
              theme="filled_blue"
              size="large"
              text="signin_with"
              shape="rectangular"
              width="300"
            />
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
