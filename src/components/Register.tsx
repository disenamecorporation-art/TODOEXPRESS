import AuthForm from "./AuthForm";

interface RegisterProps {
  onRegister: (data: any) => void;
  isLoading: boolean;
}

export default function Register({ onRegister, isLoading }: RegisterProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-4">
      <AuthForm type="register" onSubmit={onRegister} isLoading={isLoading} />
    </div>
  );
}
