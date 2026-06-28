import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Loader2, KanbanSquare, CheckCircle2 } from "lucide-react";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const features = [
  "Manage work without chaos",
  "Track progress in real time",
  "Stay organized effortlessly",
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Login Successful");
    } catch {}
  };

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark flex">
      <div className="hidden lg:flex lg:w-1/2 bg-surface-secondary dark:bg-surface-dark-secondary items-center justify-center p-12">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <KanbanSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">TaskFlow</span>
          </div>
          <h1 className="text-hero font-bold mb-6 leading-tight">
            Manage work<br />without chaos
          </h1>
          <div className="space-y-4">
            {features.map((feat, i) => (
              <div key={i} className="flex items-center gap-3 text-text-secondary">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="text-body">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-[420px]"
        >
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <KanbanSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">TaskFlow</span>
          </div>

          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <KanbanSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-section-heading font-semibold">Sign In</h2>
                <p className="text-sm text-text-secondary">Welcome back</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/60" />
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" },
                    })}
                    className="input-field pl-10"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/60" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required" })}
                    className="input-field pl-10 pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/60 hover:text-text-secondary"
                    aria-label={showPassword ? "Hide" : "Show"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 h-11">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border dark:border-border-dark"></div></div>
                <div className="relative flex justify-center text-xs"><span className="bg-surface dark:bg-surface-dark px-2 text-text-secondary dark:text-text-secondary-dark">or</span></div>
              </div>

              <p className="text-center text-sm text-text-secondary">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-accent font-medium hover:text-accent-hover">Sign up</Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
