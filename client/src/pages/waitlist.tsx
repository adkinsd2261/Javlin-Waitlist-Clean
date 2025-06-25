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
import { CheckCircle, Brain, Lightbulb, Code, MessageCircle, Shield, Zap, Lock, Users, ArrowRight, Star, Rocket } from "lucide-react";
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

      {/* Meet Jav: Your AI Co-founder */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Meet Jav: Your AI Co-founder</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Stop losing your best ideas and repeating solved problems. Unlike traditional AI tools that lose context, 
              Jav remembers everything and transforms how you create and build.
            </p>
          </div>

          {/* Magic Moments */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Creative Magic */}
            <div className="group bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-3xl p-10 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 group-hover:from-pink-500/30 group-hover:to-purple-500/30 rounded-full flex items-center justify-center mb-8 transition-all duration-500 shadow-lg shadow-pink-500/20 group-hover:scale-110">
                <Lightbulb className="w-12 h-12 text-pink-400 group-hover:animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-pink-400 transition-colors">Creative Mode Magic</h3>
              
              <div className="bg-pink-500/5 rounded-2xl p-6 mb-6 border border-pink-500/10 group-hover:bg-pink-500/10 transition-colors">
                <p className="text-sm text-pink-400 font-medium mb-2">✨ MAGIC MOMENT</p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  It's 2 AM. You're redesigning your portfolio, staring at a blank canvas. Your mind is foggy, but suddenly Jav whispers:
                </p>
                <blockquote className="text-white italic text-lg leading-relaxed border-l-4 border-pink-400 pl-4 mb-4">
                  "Remember that midnight breakthrough on Project Alpha? The blue-purple gradient that made visitors stay 3x longer? Here's the exact hex codes... and the typography pairing that sealed the deal."
                </blockquote>
                <p className="text-sm text-gray-400">
                  In seconds, your creative block dissolves. Jav didn't just remember your colors—it remembered the magic behind them.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Creative resurrection:</span> Jav surfaces buried breakthroughs when inspiration strikes</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Decision confidence:</span> See exactly what converted, what flopped, and why</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Idea evolution:</span> Jav connects scattered concepts across all your creative sessions</p>
                </div>
              </div>
            </div>

            {/* Technical Magic */}
            <div className="group bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-3xl p-10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-600/20 group-hover:from-blue-500/30 group-hover:to-purple-600/30 rounded-full flex items-center justify-center mb-8 transition-all duration-500 shadow-lg shadow-blue-500/20 group-hover:scale-110">
                <Code className="w-12 h-12 text-blue-400 group-hover:animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">Dev Mode Magic</h3>
              
              <div className="bg-blue-500/5 rounded-2xl p-6 mb-6 border border-blue-500/10 group-hover:bg-blue-500/10 transition-colors">
                <p className="text-sm text-blue-400 font-medium mb-2">⚡ MAGIC MOMENT</p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  You're implementing authentication. Your fingers hover over the keyboard, about to repeat the same JWT mistake from 3 months ago. Jav intervenes:
                </p>
                <blockquote className="text-white italic text-lg leading-relaxed border-l-4 border-blue-400 pl-4 mb-4">
                  "Stop! Last time this pattern caused a 48-hour debugging nightmare. Remember the refresh token chaos in Project Beta? Here's the elegant solution you discovered at 4 AM after the all-nighter."
                </blockquote>
                <p className="text-sm text-gray-400">
                  Crisis averted. Jav just saved you from reliving your worst debugging experience.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Crisis prevention:</span> Jav interrupts before you repeat painful mistakes</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Architecture wisdom:</span> Patterns that scale vs patterns that break—all from your history</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Genius recall:</span> Jav resurrects your cleverest solutions when you've forgotten them</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Promise */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-blue-500/20">
              <h3 className="text-3xl font-bold text-white mb-6">Stop Rebuilding What You've Already Built</h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
                Every creative breakthrough and technical solution becomes part of your personal advantage. 
                Powered by Memory Engine, Jav transforms your scattered wins into compounding wisdom.
              </p>
              <div className="inline-flex items-center space-x-2 text-lg text-blue-400 font-medium">
                <Brain className="w-6 h-6" />
                <span>Build faster, create smarter, never lose your best ideas again</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Jav: Your AI Co-founder */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Meet Jav: Your AI Co-founder</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Stop losing your best ideas and repeating solved problems. Unlike traditional AI tools that lose context, 
              Jav remembers everything and transforms how you create and build.
            </p>
          </div>

          {/* Magic Moments */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Creative Magic */}
            <div className="group bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-3xl p-10 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 group-hover:from-pink-500/30 group-hover:to-purple-500/30 rounded-full flex items-center justify-center mb-8 transition-all duration-500 shadow-lg shadow-pink-500/20 group-hover:scale-110">
                <Lightbulb className="w-12 h-12 text-pink-400 group-hover:animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-pink-400 transition-colors">Creative Mode Magic</h3>
              
              <div className="bg-pink-500/5 rounded-2xl p-6 mb-6 border border-pink-500/10 group-hover:bg-pink-500/10 transition-colors">
                <p className="text-sm text-pink-400 font-medium mb-2">✨ MAGIC MOMENT</p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  It's 2 AM. You're redesigning your portfolio, staring at a blank canvas. Your mind is foggy, but suddenly Jav whispers:
                </p>
                <blockquote className="text-white italic text-lg leading-relaxed border-l-4 border-pink-400 pl-4 mb-4">
                  "Remember that midnight breakthrough on Project Alpha? The blue-purple gradient that made visitors stay 3x longer? Here's the exact hex codes... and the typography pairing that sealed the deal."
                </blockquote>
                <p className="text-sm text-gray-400">
                  In seconds, your creative block dissolves. Jav didn't just remember your colors—it remembered the magic behind them.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Creative resurrection:</span> Jav surfaces buried breakthroughs when inspiration strikes</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Decision confidence:</span> See exactly what converted, what flopped, and why</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Idea evolution:</span> Jav connects scattered concepts across all your creative sessions</p>
                </div>
              </div>
            </div>

            {/* Technical Magic */}
            <div className="group bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-3xl p-10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-600/20 group-hover:from-blue-500/30 group-hover:to-purple-600/30 rounded-full flex items-center justify-center mb-8 transition-all duration-500 shadow-lg shadow-blue-500/20 group-hover:scale-110">
                <Code className="w-12 h-12 text-blue-400 group-hover:animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">Dev Mode Magic</h3>
              
              <div className="bg-blue-500/5 rounded-2xl p-6 mb-6 border border-blue-500/10 group-hover:bg-blue-500/10 transition-colors">
                <p className="text-sm text-blue-400 font-medium mb-2">⚡ MAGIC MOMENT</p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  You're implementing authentication. Your fingers hover over the keyboard, about to repeat the same JWT mistake from 3 months ago. Jav intervenes:
                </p>
                <blockquote className="text-white italic text-lg leading-relaxed border-l-4 border-blue-400 pl-4 mb-4">
                  "Stop! Last time this pattern caused a 48-hour debugging nightmare. Remember the refresh token chaos in Project Beta? Here's the elegant solution you discovered at 4 AM after the all-nighter."
                </blockquote>
                <p className="text-sm text-gray-400">
                  Crisis averted. Jav just saved you from reliving your worst debugging experience.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Crisis prevention:</span> Jav interrupts before you repeat painful mistakes</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Architecture wisdom:</span> Patterns that scale vs patterns that break—all from your history</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Genius recall:</span> Jav resurrects your cleverest solutions when you've forgotten them</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Promise */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-blue-500/20">
              <h3 className="text-3xl font-bold text-white mb-6">Stop Rebuilding What You've Already Built</h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
                Every creative breakthrough and technical solution becomes part of your personal advantage. 
                Powered by Memory Engine, Jav transforms your scattered wins into compounding wisdom.
              </p>
              <div className="inline-flex items-center space-x-2 text-lg text-blue-400 font-medium">
                <Brain className="w-6 h-6" />
                <span>Build faster, create smarter, never lose your best ideas again</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jav Assistant Deep Dive */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
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
              {/* Creative Mode */}
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-pink-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Creative Mode</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Moodboards & Idea Capture</p>
                      <p className="text-gray-400 text-sm">Visual workspace for collecting and organizing creative concepts</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Assisted Workspace Building</p>
                      <p className="text-gray-400 text-sm">Memory-aware environment setup for creative projects</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Seamless Creative-to-Dev</p>
                      <p className="text-gray-400 text-sm">Frictionless switching between creative ideation and technical build</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dev Mode */}
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Code className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Dev Mode</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Context-Aware Code Help</p>
                      <p className="text-gray-400 text-sm">AI-powered coding assistance that understands your project context</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Debugging & Code Generation</p>
                      <p className="text-gray-400 text-sm">Intelligent debugging support and context-aware code generation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Proactive Warnings</p>
                      <p className="text-gray-400 text-sm">Prevents repeated mistakes with alerts based on your project history</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* JavChat */}
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">JavChat</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Memory-Assisted Journaling</p>
                      <p className="text-gray-400 text-sm">Context-linked journaling with AI assistance for reflection and planning</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Decision Logs</p>
                      <p className="text-gray-400 text-sm">Track important decisions and their rationale for future reference</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Memory Review</p>
                      <p className="text-gray-400 text-sm">Review, edit, and organize your memories for optimal relevance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Jav Assistant Features */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 mb-8">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">Jav Assistant Core Features</h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <MessageCircle className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Chat & Context Q&A</h5>
                      <p className="text-gray-300 text-sm">Interactive chat interface with context-aware responses and memory-powered suggestions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Brain className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Memory-Powered Suggestions</h5>
                      <p className="text-gray-300 text-sm">Proactive suggestions based on your project history and Memory Engine intelligence</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Adaptive Persona</h5>
                      <p className="text-gray-300 text-sm">Tone, style, and intervention level adapt to your needs, project mode, and task</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Cross-Project Intelligence</h5>
                      <p className="text-gray-300 text-sm">Connects lessons, patterns, and solutions across all your projects with opt-in privacy</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Proactive Warnings</h5>
                      <p className="text-gray-300 text-sm">Real-time alerts to prevent repeated mistakes based on your past experiences</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Lock className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Full Memory Control</h5>
                      <p className="text-gray-300 text-sm">Review, edit, and delete memories. All memory actions are visible, auditable, and reversible</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Co-founder Experience */}
            <div className="text-center">
              <h4 className="text-2xl font-bold text-white mb-4">Your Personal Co-founder Experience</h4>
              <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Jav provides guidance, not replacement—delivering insights, accountability, and context-aware tools. 
                With an adaptive persona that evolves with your working style, Jav becomes the strategic partner and 
                tour guide you need, not just another AI assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Memory Engine Deep Dive */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Brain className="w-12 h-12 text-blue-400" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">The Memory Engine Advantage</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              What makes Javlin different isn't just AI—it's Memory Engine, the active brain that learns from every decision, 
              connects patterns across projects, and proactively surfaces exactly what you need, when you need it.
            </p>
          </div>

          {/* How Memory Engine Works */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-3xl font-bold text-white mb-8">How Memory Engine Works</h3>
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-xl font-bold text-white mb-3">Active Intelligence, Not Storage</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Memory Engine isn't just storage—it's an active, intelligent "brain" that learns from your actions, decisions, 
                    code, and docs. It proactively surfaces relevant context using embedding similarity and context relevance to match 
                    new activity to past memories.
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-xl font-bold text-white mb-3">Proactive Recall System</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Memory Engine moves beyond passive storage by suggesting solutions, surfacing reminders, and preventing repeated 
                    mistakes before they happen. When you work, the system checks the memory index for similar context and surfaces 
                    past solutions or warnings.
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-xl font-bold text-white mb-3">Complete User Control</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Every memory is user-auditable. Review, edit, and delete memories to ensure relevance and trust. 
                    All additions and updates require your validation—Memory Engine learns with you, not from you.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white mb-8">Cross-Project Intelligence</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
                  <h4 className="text-lg font-bold text-white mb-3">Personal Institutional Knowledge</h4>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Beyond per-project context, Memory Engine aggregates lessons, patterns, and pitfalls from all projects 
                    (with your opt-in) to build your personal "institutional knowledge."
                  </p>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>Contextual auto-suggestions: "Remember when you solved this in Project Alpha?"</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>Proactive warnings: "Careful, this schema failed at scale in Gamma!"</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>"Did you know?" inspiring cross-project insights</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>Automated "personal playbook" curation</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">Privacy-First Architecture</h4>
                  <p className="text-gray-300 leading-relaxed">
                    All cross-project learning is opt-in and privacy-focused by default. Your data always belongs to you, 
                    with transparent memory management and full export capabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>



          {/* Competitive Advantage */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-12 border border-purple-500/20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-6">Why Memory Engine Beats The Competition</h3>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                While Replit, Bolt, and others offer AI assistance, only Javlin has Memory Engine—the difference between 
                starting fresh every time and building on everything you've ever learned.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <h4 className="text-lg font-bold text-red-400 mb-4">Traditional AI Tools</h4>
                <div className="space-y-3 text-gray-400 text-sm">
                  <p>❌ Start from scratch every conversation</p>
                  <p>❌ No memory of your preferences</p>
                  <p>❌ Can't learn from past mistakes</p>
                  <p>❌ No cross-project intelligence</p>
                  <p>❌ Passive assistance only</p>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-bold text-yellow-400 mb-4">Note-Taking Apps</h4>
                <div className="space-y-3 text-gray-400 text-sm">
                  <p>⚠️ Passive storage systems</p>
                  <p>⚠️ You must remember to search</p>
                  <p>⚠️ No proactive suggestions</p>
                  <p>⚠️ Limited context understanding</p>
                  <p>⚠️ Manual organization required</p>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-bold text-blue-400 mb-4">Javlin's Memory Engine</h4>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>✅ Proactive recall at perfect moments</p>
                  <p>✅ Learns your patterns and preferences</p>
                  <p>✅ Prevents repeated mistakes</p>
                  <p>✅ Cross-project pattern recognition</p>
                  <p>✅ Active intelligence with user control</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 text-center">
              <h4 className="text-2xl font-bold text-white mb-4">The Game Changer</h4>
              <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Memory Engine doesn't just remember—it thinks ahead. While competitors offer "AI storage/search," 
                Javlin offers <span className="text-blue-400 font-semibold">proactive recall</span> with 
                <span className="text-purple-400 font-semibold"> real user control</span> across all your projects. 
                It's the difference between an AI that helps you and an AI co-founder that grows with you.
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
              From first workspace to shipped product—see how Jav becomes your indispensable co-founder through real magic moments.
            </p>
          </div>

          {/* Journey Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 via-green-400 to-orange-400 opacity-30 hidden lg:block"></div>
            
            <div className="space-y-24">
              {/* Step 1: First Project */}
              <div className="relative">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                  <div className="lg:text-right lg:pr-8">
                    <div className="inline-flex items-center mb-6 lg:flex-row-reverse">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border-2 border-blue-500/30 lg:ml-4">
                        <span className="text-2xl font-bold text-blue-400">1</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white lg:mr-4">Your First Project</h3>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      You're deep in "Project Alpha," wrestling with OAuth integration. After 6 hours of debugging hell, 
                      you finally crack the token expiry puzzle. Just as victory feels sweet, Jav quietly captures the solution in Memory Engine.
                    </p>
                    <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
                      <p className="text-blue-300 font-medium mb-3">Jav learns:</p>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• Your debugging approach and preferred solutions</li>
                        <li>• The specific OAuth configuration that works</li>
                        <li>• Context about your application architecture</li>
                        <li>• Your coding patterns and preferences</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 lg:mt-0 lg:pl-8">
                    <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-3xl p-8 border border-blue-500/30 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-400/50">
                          <Zap className="w-10 h-10 text-blue-300" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">Memory Captured</h4>
                        <p className="text-gray-200 italic text-lg">
                          "OAuth token refresh solution saved - I'll remember this approach for future integrations."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: The Magic Moment */}
              <div className="relative">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                  <div className="lg:order-2 lg:pl-8">
                    <div className="inline-flex items-center mb-6">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center border-2 border-purple-500/30 mr-4">
                        <span className="text-2xl font-bold text-purple-400">2</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white">The Magic Moment</h3>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      Two months later in "Project Beta," you hit the same OAuth wall. Your heart sinks—not this again. 
                      But before despair takes hold, Jav emerges like a time-traveling guardian angel.
                    </p>
                    <div className="bg-purple-500/10 rounded-2xl p-6 border border-purple-500/20">
                      <p className="text-purple-300 font-medium mb-3">Jav intervenes:</p>
                      <blockquote className="text-white italic text-lg leading-relaxed">
                        "Remember how you solved token expiry in Project Alpha? Here's what worked last time."
                      </blockquote>
                      <p className="text-gray-300 text-sm mt-4">
                        You review, update, and apply the solution—saving hours of debugging.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 lg:mt-0 lg:order-1 lg:pr-8">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-8 border border-purple-500/30 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-purple-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-400/50">
                          <Brain className="w-10 h-10 text-purple-300" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">Proactive Recall</h4>
                        <p className="text-gray-200 italic text-lg">
                          "I forgot I even solved that! This just saved me 3 hours of debugging."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Cross-Project Intelligence */}
              <div className="relative">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                  <div className="lg:text-right lg:pr-8">
                    <div className="inline-flex items-center mb-6 lg:flex-row-reverse">
                      <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center border-2 border-green-500/30 lg:ml-4">
                        <span className="text-2xl font-bold text-green-400">3</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white lg:mr-4">Growing Intelligence</h3>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      As you build more projects, Memory Engine connects patterns across your entire journey. 
                      It starts offering insights like architectural warnings, performance optimizations, and creative inspirations.
                    </p>
                    <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/20">
                      <p className="text-green-300 font-medium mb-3">Advanced insights:</p>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• "Careful, this schema pattern failed at scale in Project Gamma"</li>
                        <li>• "This color palette worked beautifully in your last design"</li>
                        <li>• "You tend to get stuck here—maybe try the API-first approach?"</li>
                        <li>• "Remember your breakthrough moment in Project Delta?"</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 lg:mt-0 lg:pl-8">
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl p-8 border border-green-500/30 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-400/50">
                          <Users className="w-10 h-10 text-green-300" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">Personal Playbook</h4>
                        <p className="text-gray-200 italic text-lg">
                          "It's like having a co-founder who's been with me through every project, remembering what I forget."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Ultimate Workflow */}
              <div className="relative">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                  <div className="lg:order-2 lg:pl-8">
                    <div className="inline-flex items-center mb-6">
                      <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center border-2 border-orange-500/30 mr-4">
                        <span className="text-2xl font-bold text-orange-400">4</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white">Your Ultimate Workflow</h3>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      You've built your personal "institutional knowledge." New projects start with accumulated wisdom. 
                      You integrate Javlin's API into your workflow. Your dashboard shows memory insights and credits usage.
                    </p>
                    <div className="bg-orange-500/10 rounded-2xl p-6 border border-orange-500/20">
                      <p className="text-orange-300 font-medium mb-3">Complete integration:</p>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• Memory-powered suggestions in real-time</li>
                        <li>• Seamless Creative ↔ Dev mode transitions</li>
                        <li>• JavChat for decision logs and reflection</li>
                        <li>• API integration with your existing tools</li>
                        <li>• Personal playbook of wins and lessons</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 lg:mt-0 lg:order-1 lg:pr-8">
                    <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl p-8 border border-orange-500/30 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-orange-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-orange-400/50">
                          <Rocket className="w-10 h-10 text-orange-300" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">Competitive Advantage</h4>
                        <p className="text-gray-200 italic text-lg">
                          "I ship faster, make fewer mistakes, and build on everything I've learned. It's unfair how much better I've become."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Visualization */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-blue-500/20">
              <h3 className="text-3xl font-bold text-white mb-6">Your Intelligence Compounds</h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
                Every project makes the next one easier. Every mistake becomes a lesson. Every breakthrough becomes part of your playbook. 
                This is how you build an unfair advantage—one memory at a time.
              </p>
              <div className="flex items-center justify-center space-x-4 text-gray-400">
                <span>Project 1: Learning</span>
                <ArrowRight className="w-4 h-4" />
                <span>Project 2: Recognition</span>
                <ArrowRight className="w-4 h-4" />
                <span>Project 3: Acceleration</span>
                <ArrowRight className="w-4 h-4" />
                <span className="text-blue-400 font-semibold">Project N: Mastery</span>
              </div>
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
                    "Today, I opened Javlin and Memory Engine gently reminded me: 'Remember when you felt overwhelmed in Project Phoenix? You took that 2-day creative retreat and came back with the breakthrough insight. Your current stress pattern matches that moment—maybe it's time for another reset?'"
                  </p>
                  
                  <p className="text-xl text-gray-300 leading-relaxed italic">
                    "It wasn't just remembering code. Memory Engine remembered my journey, my emotions, the moments when I almost quit, and the breakthroughs that kept me going. It remembered me."
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

      {/* Meet Jav: Your AI Co-founder */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Meet Jav: Your AI Co-founder</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Stop losing your best ideas and repeating solved problems. Unlike traditional AI tools that lose context, 
              Jav remembers everything and transforms how you create and build.
            </p>
          </div>

          {/* Magic Moments */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Creative Magic */}
            <div className="group bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-3xl p-10 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 group-hover:from-pink-500/30 group-hover:to-purple-500/30 rounded-full flex items-center justify-center mb-8 transition-all duration-500 shadow-lg shadow-pink-500/20 group-hover:scale-110">
                <Lightbulb className="w-12 h-12 text-pink-400 group-hover:animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-pink-400 transition-colors">Creative Mode Magic</h3>
              
              <div className="bg-pink-500/5 rounded-2xl p-6 mb-6 border border-pink-500/10 group-hover:bg-pink-500/10 transition-colors">
                <p className="text-sm text-pink-400 font-medium mb-2">✨ MAGIC MOMENT</p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  You're stuck designing a brand identity. Every concept feels stale. You're about to scroll Pinterest for hours when Jav gently interrupts:
                </p>
                <blockquote className="text-white italic text-lg leading-relaxed border-l-4 border-pink-400 pl-4 mb-4">
                  "Remember that sketch you loved from your coffee shop project? The hand-drawn style that felt warm and authentic? And that color palette from your nature photos that made you feel calm? What if we combined them for this wellness brand?"
                </blockquote>
                <p className="text-sm text-gray-400">
                  Suddenly, a clear creative direction emerges. Jav didn't just remember your work—it remembered what made you feel creatively alive.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Creative flow restoration:</span> Jav recalls your best creative moments when inspiration is blocked</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Style evolution:</span> Jav tracks what visual choices resonate with your artistic vision</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Deep work protection:</span> Jav surfaces relevant inspiration without breaking your creative focus</p>
                </div>
              </div>
            </div>

            {/* Technical Magic */}
            <div className="group bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-3xl p-10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-600/20 group-hover:from-blue-500/30 group-hover:to-purple-600/30 rounded-full flex items-center justify-center mb-8 transition-all duration-500 shadow-lg shadow-blue-500/20 group-hover:scale-110">
                <Code className="w-12 h-12 text-blue-400 group-hover:animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">Dev Mode Magic</h3>
              
              <div className="bg-blue-500/5 rounded-2xl p-6 mb-6 border border-blue-500/10 group-hover:bg-blue-500/10 transition-colors">
                <p className="text-sm text-blue-400 font-medium mb-2">⚡ MAGIC MOMENT</p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Deep in flow, building a complex feature. You're about to implement authentication the same way that caused a 48-hour debugging nightmare last time. Jav intervenes:
                </p>
                <blockquote className="text-white italic text-lg leading-relaxed border-l-4 border-blue-400 pl-4 mb-4">
                  "Hold on—last time this approach led to refresh token chaos in Project Beta. Remember that elegant solution you discovered at 4 AM? Here's the pattern that actually worked, already adapted for your current setup."
                </blockquote>
                <p className="text-sm text-gray-400">
                  Your deep work continues uninterrupted. Jav just transformed a potential setback into accelerated progress.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Flow state protection:</span> Jav prevents costly mistakes without breaking your deep work rhythm</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Solution evolution:</span> Patterns that scale vs patterns that break—learned from your journey</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><span className="text-white font-medium">Execution acceleration:</span> Jav surfaces your best solutions at the perfect moment</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Promise */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-blue-500/20">
              <h3 className="text-3xl font-bold text-white mb-6">Stop Rebuilding What You've Already Built</h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
                Every creative breakthrough and technical solution becomes part of your personal advantage. 
                Powered by Memory Engine, Jav transforms your scattered wins into compounding wisdom.
              </p>
              <div className="inline-flex items-center space-x-2 text-lg text-blue-400 font-medium">
                <Brain className="w-6 h-6" />
                <span>Build faster, create smarter, never lose your best ideas again</span>
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