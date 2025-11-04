import { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  TrendingUp,
  Award,
  User,
  Search,
  Bell,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { OnboardingDialog } from "./components/OnboardingDialog";
import { CourseCard } from "./components/CourseCard";
import { CourseDetailView } from "./components/CourseDetailView";
import { VideoPlayer } from "./components/VideoPlayer";
import { DashboardStats } from "./components/DashboardStats";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";

const menuItems = [
  { icon: Home, label: "Dashboard", id: "dashboard" },
  { icon: BookOpen, label: "My Courses", id: "my-courses" },
  { icon: TrendingUp, label: "Browse", id: "browse" },
  { icon: Award, label: "Achievements", id: "achievements" },
  { icon: User, label: "Profile", id: "profile" },
];

const coursesData = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjIyMTQzNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Web Development",
    duration: "42 hours",
    lessons: 156,
    rating: 4.8,
    students: 45000,
    progress: 65,
    enrolled: true,
    description:
      "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and launch your career as a web developer.",
  },
  {
    id: "2",
    title: "Data Science & Machine Learning A-Z",
    instructor: "Dr. Michael Chen",
    image:
      "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NjIyMzI2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Data Science",
    duration: "38 hours",
    lessons: 142,
    rating: 4.9,
    students: 38000,
    progress: 45,
    enrolled: true,
    description:
      "Learn data science, machine learning, and AI from scratch. Master Python, statistics, and cutting-edge algorithms to become a data scientist.",
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    instructor: "Emily Rodriguez",
    image:
      "https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzYyMjM0OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Design",
    duration: "28 hours",
    lessons: 98,
    rating: 4.7,
    students: 28000,
    progress: 80,
    enrolled: true,
    description:
      "Design beautiful user interfaces and create exceptional user experiences. Learn design thinking, prototyping, and industry-standard tools.",
  },
  {
    id: "4",
    title: "Business Strategy & Leadership",
    instructor: "James Williams",
    image:
      "https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyMTMwMzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Business",
    duration: "24 hours",
    lessons: 85,
    rating: 4.6,
    students: 22000,
    enrolled: false,
    description:
      "Develop strategic thinking and leadership skills to advance your career. Learn from real-world case studies and industry experts.",
  },
  {
    id: "5",
    title: "Professional Photography Course",
    instructor: "Lisa Anderson",
    image:
      "https://images.unsplash.com/photo-1622319977720-9949ac28adc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGNhbWVyYXxlbnwxfHx8fDE3NjIxNDYzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Photography",
    duration: "32 hours",
    lessons: 120,
    rating: 4.8,
    students: 31000,
    enrolled: false,
    description:
      "Master photography from beginner to professional level. Learn composition, lighting, editing, and how to build your photography business.",
  },
  {
    id: "6",
    title: "Digital Marketing Masterclass",
    instructor: "David Thompson",
    image:
      "https://images.unsplash.com/photo-1613151096599-b234757eb4d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzYyMTczOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Marketing",
    duration: "26 hours",
    lessons: 94,
    rating: 4.7,
    students: 35000,
    enrolled: false,
    description:
      "Learn all aspects of digital marketing including SEO, social media, content marketing, and analytics. Grow your business online.",
  },
];

const modulesData = [
  {
    id: "module-1",
    title: "Getting Started",
    lessons: [
      {
        id: "lesson-1",
        title: "Welcome & Introduction",
        duration: "5:30",
        completed: true,
        locked: false,
      },
      {
        id: "lesson-2",
        title: "Course Overview",
        duration: "8:15",
        completed: true,
        locked: false,
      },
      {
        id: "lesson-3",
        title: "Setting Up Your Environment",
        duration: "12:45",
        completed: true,
        locked: false,
      },
    ],
  },
  {
    id: "module-2",
    title: "Fundamentals",
    lessons: [
      {
        id: "lesson-4",
        title: "Core Concepts Part 1",
        duration: "15:20",
        completed: true,
        locked: false,
      },
      {
        id: "lesson-5",
        title: "Core Concepts Part 2",
        duration: "18:40",
        completed: false,
        locked: false,
      },
      {
        id: "lesson-6",
        title: "Practical Examples",
        duration: "22:10",
        completed: false,
        locked: false,
      },
    ],
  },
  {
    id: "module-3",
    title: "Advanced Topics",
    lessons: [
      {
        id: "lesson-7",
        title: "Advanced Techniques",
        duration: "25:30",
        completed: false,
        locked: true,
      },
      {
        id: "lesson-8",
        title: "Best Practices",
        duration: "20:15",
        completed: false,
        locked: true,
      },
    ],
  },
];

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Show onboarding for new users
    const hasOnboarded = localStorage.getItem("hasOnboarded");
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasOnboarded", "true");
    setShowOnboarding(false);
  };

  const handleCourseClick = (courseId: string) => {
    setSelectedCourse(courseId);
    setCurrentLesson(null);
  };

  const handleLessonClick = (lessonId: string) => {
    setCurrentLesson(lessonId);
  };

  const handleEnroll = () => {
    if (selectedCourse) {
      const courseIndex = coursesData.findIndex((c) => c.id === selectedCourse);
      if (courseIndex !== -1) {
        coursesData[courseIndex].enrolled = true;
        coursesData[courseIndex].progress = 0;
        setSelectedCourse(null);
        setActiveView("my-courses");
      }
    }
  };

  const handleMarkComplete = () => {
    // Mark lesson as complete logic
    setCurrentLesson(null);
    setSelectedCourse(null);
  };

  const selectedCourseData = coursesData.find((c) => c.id === selectedCourse);
  const currentLessonData = currentLesson
    ? {
        id: currentLesson,
        title: modulesData
          .flatMap((m) => m.lessons)
          .find((l) => l.id === currentLesson)?.title || "",
        description:
          "This lesson covers essential concepts and practical applications. Follow along with the video and complete the exercises to master the material.",
      }
    : null;

  const filteredCourses = coursesData.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const enrolledCourses = filteredCourses.filter((c) => c.enrolled);
  const availableCourses = filteredCourses.filter((c) => !c.enrolled);

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-white dark:bg-gray-950">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            <div className="p-6">
              <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LearnHub
              </h2>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => {
                          setActiveView(item.id);
                          setSelectedCourse(null);
                          setCurrentLesson(null);
                        }}
                        isActive={activeView === item.id}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b dark:border-gray-800">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="relative w-96 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="p-8">
            {currentLesson && currentLessonData && selectedCourseData ? (
              <VideoPlayer
                currentLesson={currentLessonData}
                modules={modulesData}
                onLessonChange={handleLessonClick}
                onBack={() => setCurrentLesson(null)}
                onMarkComplete={handleMarkComplete}
              />
            ) : selectedCourse && selectedCourseData ? (
              <CourseDetailView
                course={selectedCourseData}
                modules={modulesData}
                onLessonClick={handleLessonClick}
                onEnroll={handleEnroll}
              />
            ) : activeView === "dashboard" ? (
              <div className="space-y-8">
                <div>
                  <h1 className="mb-2">Welcome back, John!</h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Continue your learning journey
                  </p>
                </div>

                <DashboardStats />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2>Continue Learning</h2>
                    <Button
                      variant="ghost"
                      onClick={() => setActiveView("my-courses")}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.slice(0, 3).map((course) => (
                      <CourseCard
                        key={course.id}
                        {...course}
                        onClick={() => handleCourseClick(course.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2>Recommended for You</h2>
                    <Button
                      variant="ghost"
                      onClick={() => setActiveView("browse")}
                    >
                      Explore More
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableCourses.slice(0, 3).map((course) => (
                      <CourseCard
                        key={course.id}
                        {...course}
                        onClick={() => handleCourseClick(course.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : activeView === "my-courses" ? (
              <div className="space-y-6">
                <div>
                  <h1 className="mb-2">My Courses</h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {enrolledCourses.length} courses in progress
                  </p>
                </div>

                <Tabs defaultValue="in-progress">
                  <TabsList>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <TabsContent value="in-progress" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {enrolledCourses.map((course) => (
                        <CourseCard
                          key={course.id}
                          {...course}
                          onClick={() => handleCourseClick(course.id)}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="completed" className="mt-6">
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No completed courses yet</p>
                      <p className="text-sm">
                        Keep learning to earn your certificates!
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : activeView === "browse" ? (
              <div className="space-y-6">
                <div>
                  <h1 className="mb-2">Browse Courses</h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Discover your next learning adventure
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="cursor-pointer px-4 py-2">
                    All
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer px-4 py-2">
                    Web Development
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer px-4 py-2">
                    Data Science
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer px-4 py-2">
                    Design
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer px-4 py-2">
                    Business
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer px-4 py-2">
                    Marketing
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      {...course}
                      onClick={() => handleCourseClick(course.id)}
                    />
                  ))}
                </div>
              </div>
            ) : activeView === "achievements" ? (
              <div className="space-y-6">
                <div>
                  <h1 className="mb-2">Achievements</h1>
                  <p className="text-gray-600 dark:text-gray-400">Track your learning milestones</p>
                </div>

                <DashboardStats />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 border dark:border-gray-800 rounded-lg text-center space-y-3">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto">
                      <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <h3>First Course</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Completed your first course
                    </p>
                    <Badge variant="secondary">Earned</Badge>
                  </div>

                  <div className="p-6 border dark:border-gray-800 rounded-lg text-center space-y-3">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                      <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                    </div>
                    <h3>Fast Learner</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Completed 5 courses in a month
                    </p>
                    <Badge variant="outline">Locked</Badge>
                  </div>

                  <div className="p-6 border dark:border-gray-800 rounded-lg text-center space-y-3">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                      <BookOpen className="w-8 h-8 text-green-600 dark:text-green-500" />
                    </div>
                    <h3>Knowledge Seeker</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Enrolled in 10 courses
                    </p>
                    <Badge variant="outline">Locked</Badge>
                  </div>
                </div>
              </div>
            ) : activeView === "profile" ? (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h1 className="mb-2">Profile Settings</h1>
                  <p className="text-gray-600 dark:text-gray-400">Manage your account information</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="text-xl">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3>John Doe</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">john.doe@email.com</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Change Avatar
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
                        Full Name
                      </label>
                      <Input defaultValue="John Doe" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
                        Email
                      </label>
                      <Input defaultValue="john.doe@email.com" type="email" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
                        Bio
                      </label>
                      <textarea
                        className="w-full p-3 border rounded-lg resize-none bg-white dark:bg-gray-950 dark:border-gray-700"
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </main>
        </div>

        {/* Onboarding Dialog */}
        <OnboardingDialog
          open={showOnboarding}
          onComplete={handleOnboardingComplete}
        />
      </SidebarProvider>
    </ThemeProvider>
  );
}
