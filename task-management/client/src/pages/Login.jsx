import { motion } from "framer-motion";
import { KanbanSquare } from "lucide-react";
import { LoginForm } from "../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-surface flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-hover items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative text-white max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <KanbanSquare className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold">TaskFlow</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Welcome Back!
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Stay organized, boost productivity, and manage your tasks
            efficiently with TaskFlow.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <KanbanSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              TaskFlow
            </span>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-1">
              Sign In
            </h2>
            <p className="text-text-secondary text-sm mb-6">
              Welcome back! Please enter your credentials.
            </p>
            <LoginForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
