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

      {/* Product Overview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Meet Jav: Your AI Co-founder</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Unlike traditional AI tools that lose context and make you repeat yourself, Jav remembers everything. 
              It's designed for the complete builder journey—from creative ideation to shipping code.
            </p>
          </div>

          {/* Creative & Dev Modes */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Creative Mode */}
            <div className="group bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-3xl p-10 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 group-hover:from-pink-500/30 group-hover:to-purple-500/30 rounded-full flex items-center justify-center mb-8 transition-all duration-300 shadow-lg shadow-pink-500/20">
                <Lightbulb className="w-12 h-12 text-pink-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-pink-400 transition-colors">Creative Mode</h3>
              
              <div className="bg-pink-500/5 rounded-2xl p-6 mb-6 border border-pink-500/10">
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  <strong className="text-pink-400">Real scenario:</strong> You're designing a landing page but can't decide on colors. 
                  Instead of scrolling through Pinterest for hours, Jav says: "You used this blue-purple gradient in your SaaS project last month—users clicked 40% more. Want to try a variation?"
                </p>
                <p className="text-sm text-gray-400">
                  Jav remembers what worked, what flopped, and why—so you're not starting from scratch every time.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300"><span className="text-white font-medium">Creative block?</span> Jav suggests ideas based on your past breakthroughs</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300"><span className="text-white font-medium">Design decisions?</span> See what worked in similar projects instantly</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300"><span className="text-white font-medium">Scattered ideas?</span> Jav connects dots across your creative sessions</p>
                </div>
              </div>
            </div>

            {/* Dev Mode */}
            <div className="group bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-3xl p-10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-600/20 group-hover:from-blue-500/30 group-hover:to-purple-600/30 rounded-full flex items-center justify-center mb-8 transition-all duration-300 shadow-lg shadow-blue-500/20">
                <Code className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">Dev Mode</h3>
              
              <div className="bg-blue-500/5 rounded-2xl p-6 mb-6 border border-blue-500/10">
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  <strong className="text-blue-400">Real scenario:</strong> You're adding user authentication but forgot how you handled JWT tokens. 
                  Jav interrupts: "Hold up—last time you used this approach it caused refresh token issues. Here's the pattern that actually worked."
                </p>
                <p className="text-sm text-gray-400">
                  Jav prevents you from repeating the same debugging session you already survived three months ago.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300"><span className="text-white font-medium">Same bug again?</span> Jav warns you before you waste hours debugging</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300"><span className="text-white font-medium">Architecture decisions?</span> See what scales and what doesn't from your history</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300"><span className="text-white font-medium">Code amnesia?</span> Jav remembers your clever solutions when you don't</p>
                </div>
              </div>
            </div>
          </div>

          {/* Jav Assistant Deep Dive */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-10 border border-purple-500/20">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">How Jav Assists You</h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Jav is your AI co-founder with deep mode-specific intelligence. It adapts its personality, 
                intervention level, and assistance based on what you're doing and how you work best.
              </p>
            </div>

            {/* Mode-Specific Assistance */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Creative Mode Assistance */}
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-pink-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">In Creative Mode</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Inspiration on Demand</p>
                      <p className="text-gray-400 text-sm">Surfaces color schemes, layouts, and design patterns from your successful past projects</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Creative Flow Protection</p>
                      <p className="text-gray-400 text-sm">Stays quiet during deep creative work, only intervening with breakthrough insights</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Idea Connections</p>
                      <p className="text-gray-400 text-sm">Links scattered ideas across sessions, showing how concepts from different projects relate</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">User Testing Insights</p>
                      <p className="text-gray-400 text-sm">Reminds you what design decisions actually converted vs. what just looked good</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dev Mode Assistance */}
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Code className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">In Dev Mode</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Proactive Debugging</p>
                      <p className="text-gray-400 text-sm">Warns before you implement patterns that caused issues in previous projects</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Architecture Guidance</p>
                      <p className="text-gray-400 text-sm">Suggests proven patterns from your codebase and warns about scaling pitfalls</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Context-Aware Code Gen</p>
                      <p className="text-gray-400 text-sm">Generates code that fits your style and integrates with your existing architecture</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Performance Optimization</p>
                      <p className="text-gray-400 text-sm">Surfaces optimization techniques that worked in similar projects</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Journaling Mode */}
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">In Journaling Mode</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Decision Tracking</p>
                      <p className="text-gray-400 text-sm">Helps you log why you made certain choices and their outcomes for future reference</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Pattern Recognition</p>
                      <p className="text-gray-400 text-sm">Identifies recurring challenges and suggests strategies based on past successes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Emotional Intelligence</p>
                      <p className="text-gray-400 text-sm">Tracks your energy patterns and suggests when to take breaks or switch modes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Breakthrough Moments</p>
                      <p className="text-gray-400 text-sm">Captures and categorizes your "aha!" moments for future inspiration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Behind the Scenes */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 mb-8">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">What Jav Does Behind the Scenes</h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Brain className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Continuous Learning</h5>
                      <p className="text-gray-300 text-sm">Every click, keystroke, and decision feeds into MemoryOS. Jav learns your preferences, patterns, and what works for your specific use cases.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Pattern Matching</h5>
                      <p className="text-gray-300 text-sm">Analyzes your current context against thousands of past decisions to surface the most relevant insights at exactly the right moment.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Adaptive Personality</h5>
                      <p className="text-gray-300 text-sm">Adjusts communication style based on your mood, project phase, and stress levels. Cheerleader when you need motivation, strategic advisor when you're stuck.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Risk Assessment</h5>
                      <p className="text-gray-300 text-sm">Continuously evaluates potential pitfalls based on your project history and warns you before you make costly mistakes.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Lock className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Privacy Protection</h5>
                      <p className="text-gray-300 text-sm">All memory processing happens with your explicit control. Review, edit, or delete any memory. Your data stays yours, always.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Seamless Transitions</h5>
                      <p className="text-gray-300 text-sm">Maintains full context when you switch between modes. Your creative decisions inform technical choices and vice versa.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Adaptive Intelligence */}
            <div className="text-center">
              <h4 className="text-2xl font-bold text-white mb-4">The Result: Your Perfect Co-founder</h4>
              <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Jav becomes more valuable with every project. It learns your creative patterns, coding style, decision-making process, 
                and even your emotional rhythms. The longer you work together, the better it gets at being exactly the co-founder you need—
                strategic when you're lost, tactical when you're building, and wise when you're about to repeat a mistake.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Journey */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Your Journey with Javlin</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From first workspace to shipped product—see how Jav becomes your indispensable co-founder.
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1: Create Workspace */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 font-bold">1</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Create Your Workspace</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Start a new project and Jav immediately begins learning. Every decision, every line of code, 
                    every creative choice gets captured in your personal MemoryOS.
                  </p>
                  <p className="text-sm text-gray-400">
                    "Building my portfolio site - want to try that card hover effect from my last project"
                  </p>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                  <div className="text-sm text-gray-400 mb-2">Jav learns:</div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Your preferred tech stack</li>
                    <li>• Design patterns you like</li>
                    <li>• Development workflow</li>
                    <li>• Creative process and timing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2: Creative Process */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-pink-500/10 rounded-xl p-6 border border-pink-500/20">
                    <div className="text-sm text-gray-400 mb-2">Creative Mode assists with:</div>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Color palettes that converted well previously</li>
                      <li>• Layout ideas from successful projects</li>
                      <li>• Copy patterns that resonated with users</li>
                      <li>• Design systems you've built before</li>
                    </ul>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                      <span className="text-pink-400 font-bold">2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Design & Ideate</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Switch to Creative Mode and Jav surfaces relevant inspiration from your past wins. 
                    No more blank page syndrome—your creative history becomes your starting point.
                  </p>
                  <p className="text-sm text-gray-400">
                    "That blue-purple gradient worked great for conversions on Project Alpha"
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Development */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 font-bold">3</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Build & Code</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Switch to Dev Mode with full creative context preserved. Jav warns about past pitfalls 
                    and suggests proven patterns. No more reinventing solutions you've already perfected.
                  </p>
                  <p className="text-sm text-gray-400">
                    "Wait—that JWT approach caused refresh token issues in Project Beta. Here's what actually worked."
                  </p>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                  <div className="text-sm text-gray-400 mb-2">Dev Mode prevents:</div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Repeating the same bugs</li>
                    <li>• Forgotten architecture decisions</li>
                    <li>• Database migration mistakes</li>
                    <li>• API integration pitfalls</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 4: Continuous Learning */}
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-500/20 text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-400 font-bold">4</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Jav Grows Smarter</h3>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Every project makes Jav better. Your personal institutional knowledge grows, 
                connecting patterns across projects and becoming the ultimate competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Magic Moment */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-blue-500/20">
            <div className="text-center mb-12">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-6">When Memory Becomes Wisdom</h3>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 mb-8">
                <div className="space-y-6">
                  <p className="text-xl text-gray-300 leading-relaxed italic">
                    "Six months ago, I was burned out, switching between 12 browser tabs, losing my creative flow every time I had to code. I was building my third startup attempt, convinced this was my last shot."
                  </p>
                  
                  <p className="text-xl text-gray-300 leading-relaxed italic">
                    "Today, I opened Javlin and it gently reminded me: 'Remember when you felt overwhelmed in Project Phoenix? You took that 2-day creative retreat and came back with the breakthrough insight. Your current stress pattern matches that moment—maybe it's time for another reset?'"
                  </p>
                  
                  <p className="text-xl text-gray-300 leading-relaxed italic">
                    "It wasn't just remembering code. It remembered my journey, my emotions, the moments when I almost quit, and the breakthroughs that kept me going. It remembered me."
                  </p>
                </div>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-lg text-gray-400">This is an AI co-founder that understands the human side of building</p>
              </div>
              
              {/* Memory Categories */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-6 h-6 text-pink-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Creative Patterns</h4>
                  <p className="text-gray-400 text-sm">Remembers when your best ideas come, your preferred creative environments, and breakthrough moments</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                  <div className="w-12 h-12 bg-red-400/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-red-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Emotional Journey</h4>
                  <p className="text-gray-400 text-sm">Tracks stress patterns, burnout signals, and the decisions that led to your biggest regrets or victories</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Life Lessons</h4>
                  <p className="text-gray-400 text-sm">Captures hard-won wisdom about team dynamics, product decisions, and personal growth through building</p>
                </div>
              </div>
            </div>
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
                          What patterns, lessons, or moments would you want your AI co-founder to remember?
                          <span className="text-gray-400 font-normal ml-2">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., When I'm most creative, my burnout warning signs, breakthrough moments, team dynamics that worked, hard-learned lessons from failures..."
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

      {/* Why Builders Choose Jav */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Why Builders Choose Jav</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Real problems solved by memory that actually works.
            </p>
          </div>

          <div className="space-y-12 mb-16">
            {/* Pain Point 1 */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Stop Solving the Same Problem Twice</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    You've built user authentication 5 times, but you can't remember which approach actually worked. 
                    Jav does—and warns you about the JWT refresh token bug before you hit it again.
                  </p>
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Cross-project pattern recognition</span>
                  </div>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                  <div className="text-sm text-gray-400 mb-2">Jav remembers:</div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Which OAuth flow actually worked</li>
                    <li>• Database migrations that broke production</li>
                    <li>• API rate limits that caused issues</li>
                    <li>• CSS tricks that saved you hours</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pain Point 2 */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-pink-500/10 rounded-xl p-6 border border-pink-500/20">
                    <div className="text-sm text-gray-400 mb-2">Jav suggests:</div>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Color palettes that converted well</li>
                      <li>• Copy that resonated with your audience</li>
                      <li>• Layouts that users actually clicked</li>
                      <li>• Ideas from your best creative sessions</li>
                    </ul>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-bold text-white mb-4">Creative Block? Not Anymore.</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Staring at a blank canvas while your best ideas are buried in old Figma files? 
                    Jav surfaces your creative patterns and successful approaches when inspiration strikes.
                  </p>
                  <div className="flex items-center space-x-2 text-pink-400">
                    <Lightbulb className="w-5 h-5" />
                    <span className="font-medium">Pattern-driven creativity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Why not Notion/Mastra/NotebookLM?</h3>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Most competitors offer "AI storage/search"—Javlin offers <span className="text-blue-400 font-semibold">proactive recall</span> with 
              <span className="text-purple-400 font-semibold"> real user control</span> across all your projects. 
              No more digging through notes—your AI co-founder brings solutions to you.
            </p>
          </div>
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