import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { CheckCircle2 } from "lucide-react";

interface OnboardingDialogProps {
  open: boolean;
  onComplete: () => void;
}

const interests = [
  "Web Development",
  "Data Science",
  "Graphic Design",
  "Business",
  "Photography",
  "Marketing",
  "Mobile Development",
  "UI/UX Design",
];

const goals = [
  "Learn new skills",
  "Advance my career",
  "Start a business",
  "Get certified",
  "Explore interests",
  "Switch careers",
];

export function OnboardingDialog({ open, onComplete }: OnboardingDialogProps) {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Welcome to LearnHub</DialogTitle>
          <DialogDescription>
            Let's personalize your learning experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">
              Step {step} of {totalSteps}
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="mb-4">What are you interested in learning?</h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant={
                        selectedInterests.includes(interest)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer px-4 py-2"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="mb-4">What are your learning goals?</h3>
                <div className="flex flex-wrap gap-2">
                  {goals.map((goal) => (
                    <Badge
                      key={goal}
                      variant={
                        selectedGoals.includes(goal) ? "default" : "outline"
                      }
                      className="cursor-pointer px-4 py-2"
                      onClick={() => toggleGoal(goal)}
                    >
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
                <h3>You're all set!</h3>
                <p className="text-gray-600">
                  We've curated personalized course recommendations based on
                  your interests. Start your learning journey today!
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && step < totalSteps && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {step === 1 && <div />}
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && selectedInterests.length === 0) ||
                (step === 2 && selectedGoals.length === 0)
              }
              className="ml-auto"
            >
              {step === totalSteps ? "Get Started" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
