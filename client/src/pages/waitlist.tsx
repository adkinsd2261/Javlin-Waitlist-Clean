import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Brain, Lightbulb, Code, MessageCircle, Shield, Zap, Lock, Users, ArrowRight, Star } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import javlinLogo from "@assets/image_1750806523035.png";

const waitlistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().optional(),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export default function Waitlist() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: WaitlistFormData) => {
      const response = await apiRequest('/api/waitlist', 'POST', data);
      return response;
    },
    onSuccess: () => {
      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['/api/waitlist/stats'] });
      toast({
        title: "Welcome to Javlin!",
        description: "You're on the waitlist. We'll notify you when ready.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.message || "Please try again later.",
      });
    },
  });

  const onSubmit = (data: WaitlistFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181B2B] to-[#232342] text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          {/* Javlin Logo with Glow */}
          <div className="mb-12">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-3xl scale-150 animate-pulse"></div>
              <img 
                src={javlinLogo} 
                alt="Javlin.ai" 
                className="relative w-32 h-32 mx-auto filter drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Hero Headlines */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Javlin: The AI Co-founder for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Next-Gen Founders
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            The first AI platform that remembers your best solutions, warns you about past mistakes, 
            and grows smarter with every project.
          </p>

          {/* CTA Button */}
          <Button 
            onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.05] hover:shadow-blue-500/50"
          >
            Join the Waitlist
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* MemoryOS */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">MemoryOS</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Not just storage, but an active, intelligent "brain" that learns from your actions and proactively surfaces relevant context.
                  </p>
                </div>
              </div>
            </div>

            {/* Cross-Project Intelligence */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Cross-Project Intelligence</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Aggregates lessons, patterns, and pitfalls from all projects to build your personal "institutional knowledge."
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Co-founder */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-green-500/30 transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Personal Co-founder Experience</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Adaptive persona with guidance, not replacement—tone and intervention level adapt to your needs and project mode.
                  </p>
                </div>
              </div>
            </div>

            {/* Control & Privacy */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-red-500/30 transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Control & Privacy</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Users can review, edit, and delete memories. Privacy by default with transparent memory management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Javlin Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">How Javlin Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Four integrated components that work together to be your AI co-founder
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* MemoryOS */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">MemoryOS</h3>
              <p className="text-gray-400 text-sm">
                Active memory brain that learns from your decisions and proactively surfaces relevant context
              </p>
            </div>

            {/* Creative Mode */}
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-10 h-10 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Creative Mode</h3>
              <p className="text-gray-400 text-sm">
                Moodboards, idea capture, and assisted workspace building with memory-powered suggestions
              </p>
            </div>

            {/* Dev Mode */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Dev Mode</h3>
              <p className="text-gray-400 text-sm">
                Context-aware code help, debugging, warnings, and proactive recall of past solutions
              </p>
            </div>

            {/* Assistant */}
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Jav Assistant</h3>
              <p className="text-gray-400 text-sm">
                Chat, context Q&A, and memory-powered suggestions that adapt to your working style
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Magic Moment */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-blue-500/20 text-center">
            <div className="mb-8">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-6">Magic Moment</h3>
            </div>
            
            <blockquote className="text-2xl text-gray-300 leading-relaxed italic mb-8">
              "Javlin surfaced my OAuth bug fix from months ago—saved my launch."
            </blockquote>
            
            <p className="text-lg text-gray-400">
              This is what proactive memory looks like in action
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist-form" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          {isSuccess ? (
            <div className="text-center space-y-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl p-16 border border-green-500/20">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white">You're on the list!</h3>
                <p className="text-xl text-gray-300">
                  We'll notify you as soon as Javlin.ai is ready for early access.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 rounded-3xl p-12 border border-white/10">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Get Early Access</h2>
                <p className="text-lg text-gray-300">
                  Join the waitlist and be the first to experience your AI co-founder
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-lg font-medium">Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              className="bg-white/10 border-white/20 hover:border-white/30 text-white placeholder:text-gray-400 rounded-2xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
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
                        <FormItem>
                          <FormLabel className="text-white text-lg font-medium">Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              className="bg-white/10 border-white/20 hover:border-white/30 text-white placeholder:text-gray-400 rounded-2xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-lg font-medium">
                          What would you want your AI cofounder to remember for you?
                          <span className="text-gray-400 font-normal ml-2">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., My past solutions, mistakes to avoid, creative patterns, successful strategies..."
                            className="bg-white/10 border-white/20 hover:border-white/30 text-white placeholder:text-gray-400 rounded-2xl px-6 py-4 text-lg min-h-[120px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl py-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {mutation.isPending ? "Joining..." : "Join the Waitlist"}
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      </section>

      {/* Founders Badge */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl p-12 border-2 border-blue-500/30 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Founders Special</h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                First 1,000 signups get <span className="text-blue-400 font-bold">30% off Pro/Premium for life</span> and an exclusive Founders badge.
              </p>
              <div className="inline-flex items-center bg-blue-500/20 rounded-full px-6 py-3">
                <Shield className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-blue-400 font-medium">Early Access + Beta Features</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Why not Notion/Mastra/NotebookLM?</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Most competitors offer "AI storage/search"—Javlin offers <span className="text-blue-400 font-semibold">proactive recall</span> with 
            <span className="text-purple-400 font-semibold"> real user control</span> across all your projects.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-lg">
            Your data is safe, always exportable. No spam. Privacy-first.
          </p>
        </div>
      </footer>
    </div>
  );
}