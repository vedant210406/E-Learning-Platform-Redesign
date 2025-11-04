import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Clock, BookOpen, Star, Users, Award, PlayCircle, CheckCircle2, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseDetailViewProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    image: string;
    category: string;
    duration: string;
    lessons: number;
    rating: number;
    students: number;
    description: string;
    progress?: number;
    enrolled?: boolean;
  };
  modules: Module[];
  onLessonClick: (lessonId: string) => void;
  onEnroll: () => void;
}

export function CourseDetailView({
  course,
  modules,
  onLessonClick,
  onEnroll,
}: CourseDetailViewProps) {
  const completedLessons = modules.reduce(
    (acc, module) => acc + module.lessons.filter((l) => l.completed).length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <ImageWithFallback
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex items-end">
          <div className="p-8 text-white w-full">
            <Badge className="mb-3">{course.category}</Badge>
            <h1 className="mb-2">{course.title}</h1>
            <p className="mb-4">by {course.instructor}</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{course.rating} rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{course.lessons} lessons</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar (if enrolled) */}
      {course.enrolled && course.progress !== undefined && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Your Progress</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {completedLessons} of {course.lessons} lessons completed
              </span>
            </div>
            <Progress value={course.progress} className="h-3" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{course.progress}% complete</p>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">About this course</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{course.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Master the fundamentals and core concepts",
                  "Build real-world projects from scratch",
                  "Best practices and industry standards",
                  "Advanced techniques and optimization",
                  "Problem-solving and critical thinking",
                  "Portfolio-ready projects and certification",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Course Curriculum</h2>
              <Accordion type="single" collapsible className="w-full">
                {modules.map((module, index) => (
                  <AccordionItem key={module.id} value={module.id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 dark:text-gray-400">Module {index + 1}</span>
                        <span>{module.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-4">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                            onClick={() =>
                              !lesson.locked && onLessonClick(lesson.id)
                            }
                          >
                            <div className="flex items-center gap-3">
                              {lesson.locked ? (
                                <Lock className="w-4 h-4 text-gray-400" />
                              ) : lesson.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <PlayCircle className="w-4 h-4 text-primary" />
                              )}
                              <span
                                className={
                                  lesson.locked ? "text-gray-400" : ""
                                }
                              >
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {!course.enrolled && (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="mb-2">Ready to start learning?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Enroll now to access all course content and start your learning
                  journey
                </p>
                <Button size="lg" onClick={onEnroll}>
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="instructor" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <h2 className="mb-1">{course.instructor}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Senior Instructor</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8 rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>50,000+ students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>12 courses</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                With over 10 years of industry experience and a passion for teaching,
                our instructor has helped thousands of students achieve their learning
                goals. Specializing in practical, hands-on education, they bring
                real-world expertise to every lesson.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
