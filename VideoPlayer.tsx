import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  Settings,
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronLeft,
} from "lucide-react";

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

interface VideoPlayerProps {
  currentLesson: {
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
  };
  modules: Module[];
  onLessonChange: (lessonId: string) => void;
  onBack: () => void;
  onMarkComplete: () => void;
}

export function VideoPlayer({
  currentLesson,
  modules,
  onLessonChange,
  onBack,
  onMarkComplete,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Simulate video progress
    if (!isPlaying && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 300);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Video Area */}
      <div className="lg:col-span-2 space-y-4">
        <Button variant="ghost" onClick={onBack} className="mb-2">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>

        <Card className="overflow-hidden">
          {/* Video Player */}
          <div className="aspect-video bg-black relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-50" />
            <div className="relative z-10 text-center text-white">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-white/30 transition-colors" onClick={togglePlay}>
                {isPlaying ? (
                  <Pause className="w-10 h-10" />
                ) : (
                  <Play className="w-10 h-10 ml-1" />
                )}
              </div>
              <p className="text-sm opacity-80">
                {isPlaying ? "Playing..." : "Click to play"}
              </p>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <Progress value={progress} className="h-1 mb-3" />
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Volume2 className="w-5 h-5" />
                  </Button>
                  <span className="text-sm">
                    {Math.floor(progress / 100 * 10)}:
                    {String(Math.floor((progress / 100 * 600) % 60)).padStart(2, '0')} / 10:00
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Lesson Details */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="mb-2">{currentLesson.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{currentLesson.description}</p>
            </div>
            <Button onClick={onMarkComplete}>Mark Complete</Button>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div>
                <h3 className="mb-2">Lesson Overview</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  In this lesson, you'll learn the fundamental concepts and
                  practical applications. Follow along with the examples and
                  complete the exercises to reinforce your understanding.
                </p>
              </div>
              <div>
                <h3 className="mb-2">Key Takeaways</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Understanding the core principles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Practical implementation techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Best practices and common pitfalls</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Take notes while watching to help you remember key concepts.
              </p>
              <textarea
                className="w-full min-h-[200px] p-3 border rounded-lg resize-none bg-white dark:bg-gray-950 dark:border-gray-700"
                placeholder="Start typing your notes here..."
              />
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">Download course materials and resources.</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  📄 Lesson Slides.pdf
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💾 Source Code.zip
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📋 Exercise Files.zip
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Sidebar - Course Content */}
      <div className="lg:col-span-1">
        <Card className="p-4">
          <h3 className="mb-4">Course Content</h3>
          <Accordion type="single" collapsible className="w-full">
            {modules.map((module, index) => (
              <AccordionItem key={module.id} value={module.id}>
                <AccordionTrigger className="text-sm">
                  <span>Module {index + 1}: {module.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer text-sm ${
                          currentLesson.id === lesson.id
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        } ${lesson.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() =>
                          !lesson.locked && onLessonChange(lesson.id)
                        }
                      >
                        {lesson.locked ? (
                          <Lock className="w-4 h-4 flex-shrink-0" />
                        ) : lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <PlayCircle className="w-4 h-4 flex-shrink-0" />
                        )}
                        <span className="flex-1 truncate">{lesson.title}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {lesson.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </div>
  );
}
