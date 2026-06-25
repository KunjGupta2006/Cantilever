import { User, Mail } from "lucide-react";
import useAuthStore from "../store/authStore";

export default function Profile() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-lg mx-auto pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-page-heading font-bold text-text-primary dark:text-text-primary-dark">Profile</h1>
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-0.5">Your account information</p>
      </div>

      <div className="card p-6">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl font-bold text-accent">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">{user?.name}</h2>
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{user?.email}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary dark:bg-surface-dark-secondary">
            <div className="p-2 rounded-lg bg-accent/10">
              <User className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider font-medium">Name</p>
              <p className="text-sm font-medium text-text-primary dark:text-text-primary-dark">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary dark:bg-surface-dark-secondary">
            <div className="p-2 rounded-lg bg-accent/10">
              <Mail className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider font-medium">Email</p>
              <p className="text-sm font-medium text-text-primary dark:text-text-primary-dark">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
