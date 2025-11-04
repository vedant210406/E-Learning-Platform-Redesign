import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Clock, BookOpen, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  image: string;
  category: string;
  duration: string;
  lessons: number;
  rating: number;
  progress?: number;
  enrolled?: boolean;
  onClick?: () => void;
}

export function CourseCard({
  title,
  instructor,
  image,
  category,
  duration,
  lessons,
  rating,
  progress,
  enrolled = false,
  onClick,
}: CourseCardProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-video relative overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 left-3">{category}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{instructor}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
      </CardContent>
      {enrolled && progress !== undefined && (
        <CardFooter className="p-4 pt-0">
          <div className="w-full space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
