import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, CheckCircle, Users, Clock } from "lucide-react";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  source: z.string().default("landing"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  source?: string;
  className?: string;
  buttonText?: string;
  showStats?: boolean;
}

export default function WaitlistForm({ 
  source = "landing", 
  className = "",
  buttonText = "Join Waitlist",
  showStats = false 
}: WaitlistFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
      source,
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/waitlist/stats"],
    enabled: showStats,
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: WaitlistFormData) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSuccess(true);
      form.reset();
      toast({
        title: "Welcome to the waitlist! 🎉",
        description: `You're #${data.position} in line. We'll notify you when we launch!`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/waitlist/stats"] });
    },
    onError: (error: Error) => {
      const message = error.message.includes("409") 
        ? "You're already on our waitlist! We'll be in touch soon."
        : error.message.includes("400")
        ? "Please enter a valid email address."
        : "Something went wrong. Please try again.";
      
      toast({
        title: "Oops!",
        description: message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WaitlistFormData) => {
    waitlistMutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className={`flex flex-col items-center space-y-4 ${className}`}>
        <div className="flex items-center space-x-2 text-green-400">
          <CheckCircle className="w-6 h-6" />
          <span className="font-semibold">You're on the list!</span>
        </div>
        <p className="text-sm text-gray-400 text-center">
          We'll notify you as soon as Javlin.ai is ready for early access.
        </p>
        {showStats && stats && (
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{stats.totalSignups} joined</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{stats.foundersSpotRemaining} founder spots left</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    className="px-4 py-3 bg-slate-800 border-slate-600 focus:border-purple-500 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={waitlistMutation.isPending}
            className="waitlist-button px-6 py-3 font-semibold whitespace-nowrap transition-all duration-300"
          >
            {waitlistMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span className="waitlist-button-text">Joining...</span>
              </>
            ) : (
              <span className="waitlist-button-text">{buttonText}</span>
            )}
          </Button>
        </form>
      </Form>
      
      {showStats && stats && (
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400 mt-4">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-purple-400" />
            <span>{stats.totalSignups} people joined</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>{stats.foundersSpotRemaining} founder spots remaining</span>
          </div>
        </div>
      )}
    </div>
  );
}
