import { useState } from "react";
import { User, Mail, Calendar } from "lucide-react";
import useAuthStore from "../store/authStore";
import { formatDate } from "../utils/formatDate";

export default function Profile() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Profile</h1>
        <p className="text-text-secondary text-sm mt-1">
          Your account information
        </p>
      </div>

      <div className="card p-6 lg:p-8 mt-6">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-text-primary">
            {user?.name}
          </h2>
          <p className="text-text-secondary text-sm">{user?.email}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wider font-medium">
                Full Name
              </p>
              <p className="text-text-primary font-medium">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
            <div className="p-2 rounded-lg bg-primary/10">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wider font-medium">
                Email
              </p>
              <p className="text-text-primary font-medium">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
