import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Brain, Shield, Link, Users, CheckCircle, Crown, Lock, Sparkles, Lightbulb, Code, MessageCircle, Database, Zap, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Logo from "@/components/logo";

const waitlistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().optional(),
  source: z.string().default("waitlist"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export default function Waitlist() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      source: "waitlist",
    },
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
        title: "Welcome to the waitlist!",
        description: `You're #${data.position} in line. We'll notify you when we launch!`,
      });
    },
    onError: (error: Error) => {
      const message = error.message.includes("409") 
        ? "You're already on our waitlist! We'll be in touch soon."
        : error.message.includes("400")
        ? "Please check your information and try again."
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181B2B] to-[#232342]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="md" />
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="text-center py-24 lg:py-32 px-6">
          <div className="max-w-5xl mx-auto space-y-8">
            <h1 className="text-5xl lg:text-7xl font-semibold text-white leading-tight tracking-tight">
              Javlin: The AI Co-founder for{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Next-Gen Founders
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed">
              The first AI co-founder that remembers your best solutions, warns you about past mistakes, 
              and grows smarter with every project — so you never repeat yourself again.
            </p>
            
            <div className="pt-6">
              <Button 
                onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#5151FF] hover:bg-[#6a5cff] text-white font-semibold text-lg px-12 py-6 rounded-2xl shadow-lg border-0 transition-all duration-200 glow-effect"
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {[
                {
                  icon: <Brain className="w-8 h-8 text-white" />,
                  title: "MemoryOS",
                  description: "Not just storage—an active, intelligent brain that learns from your actions and proactively surfaces relevant context."
                },
                {
                  icon: <Link className="w-8 h-8 text-white" />,
                  title: "Cross-Project Intelligence", 
                  description: "Aggregates lessons, patterns, and pitfalls from all projects to build your personal institutional knowledge."
                },
                {
                  icon: <Users className="w-8 h-8 text-white" />,
                  title: "Personal Co-founder",
                  description: "Real guidance and accountability—not replacement. Adaptive persona that evolves with your needs and working style."
                },
                {
                  icon: <Shield className="w-8 h-8 text-white" />,
                  title: "Control & Privacy",
                  description: "All memory is user-visible, auditable, and controllable. Export everything, edit memories, maintain full control."
                }
              ].map((feature, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-white/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Javlin Works Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">How Javlin Works</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
              {[
                {
                  icon: <Brain className="w-8 h-8 text-white" />,
                  title: "MemoryOS",
                  description: "Active memory brain that moves beyond storage—proactively suggests solutions, surfaces reminders, and prevents repeated mistakes before they happen."
                },
                {
                  icon: <Lightbulb className="w-8 h-8 text-white" />,
                  title: "Creative Mode",
                  description: "Integrated ideation environment—capture ideas, build moodboards, start projects. Seamless creative-to-dev workflow with shared memory and context."
                },
                {
                  icon: <Code className="w-8 h-8 text-white" />,
                  title: "Dev Mode",
                  description: "AI-supercharged development environment—context-aware code help, real-time debugging, proactive warnings, all powered by your project memory."
                },
                {
                  icon: <MessageCircle className="w-8 h-8 text-white" />,
                  title: "Jav Assistant",
                  description: "Your true AI co-founder—provides guidance, accountability, and context-aware assistance. Adapts its tone and intervention level to your needs."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-[#5151FF]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Secondary CTA */}
            <div className="text-center">
              <Button 
                onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 hover:bg-white/15 text-white font-medium text-lg px-8 py-4 rounded-2xl border border-white/20 transition-all duration-200"
              >
                Join for a full product tour before launch!
              </Button>
            </div>
          </div>
        </section>

        {/* Waitlist Form Section */}
        <section id="waitlist-form" className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            {isSuccess ? (
              <div className="text-center space-y-8 bg-white/5 rounded-3xl p-12 border border-white/10">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-semibold text-white">You're on the list!</h3>
                  <p className="text-xl text-gray-300">
                    We'll notify you as soon as Javlin.ai is ready for early access.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 rounded-3xl p-8 lg:p-12 border border-white/10">
                <div className="space-y-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-semibold text-white">Join the Waitlist</h2>
                    <p className="text-xl text-gray-300">
                      Be among the first to experience an AI co-founder that truly remembers and evolves with you.
                    </p>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-white font-medium text-lg">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your full name"
                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-4 py-4 text-lg focus:ring-2 focus:ring-[#5151FF] focus:border-[#5151FF] transition-all"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-white font-medium text-lg">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-4 py-4 text-lg focus:ring-2 focus:ring-[#5151FF] focus:border-[#5151FF] transition-all"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-white font-medium text-lg">
                              What would you want your AI cofounder to remember for you?
                              <span className="text-gray-400 font-normal ml-2">(optional)</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="e.g., My coding patterns, past project mistakes, successful strategies..."
                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-4 py-4 text-lg min-h-[120px] resize-none focus:ring-2 focus:ring-[#5151FF] focus:border-[#5151FF] transition-all"
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
                        className="w-full bg-[#5151FF] hover:bg-[#6a5cff] text-white font-semibold text-lg py-4 rounded-xl shadow-lg border-0 transition-all duration-200"
                      >
                        {waitlistMutation.isPending ? "Joining..." : "Join Waitlist"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Founders Badge Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#5151FF]/20 to-[#6a5cff]/20 rounded-3xl p-8 lg:p-12 border border-[#5151FF]/30 backdrop-blur-sm">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-[#5151FF]/20 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10 text-[#5151FF]" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-white">Founders' Special</h3>
                  <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    First 1,000 signups get <span className="text-[#5151FF] font-semibold">30% off Pro or Premium for life</span> and an exclusive Founders badge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <Lock className="w-4 h-4" />
            <p className="text-lg">
              Your data is safe, always exportable. No spam. Privacy-first.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}