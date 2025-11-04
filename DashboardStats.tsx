import { Card, CardContent } from "./ui/card";
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
}

function StatCard({ icon, label, value, change }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
            <p className="text-2xl">{value}</p>
            {change && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                {change}
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<BookOpen className="w-6 h-6" />}
        label="Enrolled Courses"
        value="12"
        change="+2 this month"
      />
      <StatCard
        icon={<Clock className="w-6 h-6" />}
        label="Learning Hours"
        value="48h"
        change="+12h this week"
      />
      <StatCard
        icon={<Award className="w-6 h-6" />}
        label="Certificates"
        value="5"
        change="+1 this month"
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6" />}
        label="Avg. Progress"
        value="67%"
        change="+15% this week"
      />
    </div>
  );
}
