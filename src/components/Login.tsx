import AuthForm from "./AuthForm";

interface LoginProps {
  onLogin: (data: any) => void;
  isLoading: boolean;
}

export default function Login({ onLogin, isLoading }: LoginProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-4">
      <AuthForm type="login" onSubmit={onLogin} isLoading={isLoading} />
    </div>
  );
}
