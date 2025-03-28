import GoogleLoginButton from "./components/GoogleLoginButton";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Mi Aplicación Neurona
        </h1>
        <GoogleLoginButton />
      </div>
    </div>
  );
}

export default App;
