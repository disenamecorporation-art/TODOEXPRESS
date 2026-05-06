import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const authSchema = z.object({
  displayName: z.string().optional(),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.confirmPassword && data.password !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type AuthFormValues = z.infer<typeof authSchema>;

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function AuthForm({ type, onSubmit, isLoading }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = type === "login";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  });

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <img 
          src="https://i.postimg.cc/t4BQpvJq/weblogo.jpg" 
          alt="TodoExpress" 
          className="h-16 mx-auto mb-4 rounded-xl"
          referrerPolicy="no-referrer"
        />
        <h2 className="text-2xl font-bold text-primary">
          {isLogin ? "¡Bienvenido de nuevo!" : "Crea tu cuenta"}
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          {isLogin 
            ? "Ingresa tus credenciales para acceder a tu cuenta" 
            : "Únete a la familia TodoExpress y disfruta de beneficios exclusivos"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {!isLogin && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
              Nombre Completo
            </label>
            <div className="relative">
              <input
                {...register("displayName")}
                type="text"
                placeholder="Ej. Juan Pérez"
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 transition-all",
                  errors.displayName ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:ring-primary/10 focus:border-primary"
                )}
              />
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.displayName && (
              <p className="text-xs text-red-500 ml-1">{errors.displayName.message as string}</p>
            )}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
            Correo Electrónico
          </label>
          <div className="relative">
            <input
              {...register("email")}
              type="email"
              placeholder="tu@email.com"
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 transition-all",
                errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:ring-primary/10 focus:border-primary"
              )}
            />
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 ml-1">{errors.email.message as string}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={cn(
                "w-full pl-10 pr-12 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 transition-all",
                errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:ring-primary/10 focus:border-primary"
              )}
            />
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 ml-1">{errors.password.message as string}</p>
          )}
        </div>

        {!isLogin && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={cn(
                  "w-full pl-10 pr-12 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 transition-all",
                  errors.confirmPassword ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:ring-primary/10 focus:border-primary"
                )}
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 ml-1">{errors.confirmPassword.message as string}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500">
          {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <button
            onClick={() => window.location.href = isLogin ? "/register" : "/login"}
            className="text-primary font-bold hover:underline"
          >
            {isLogin ? "Regístrate aquí" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
