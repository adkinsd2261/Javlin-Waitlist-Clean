import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Brain, Shield, Link, Users, CheckCircle, Crown, Lock, Sparkles, Lightbulb, Code, MessageCircle, Database, Zap, User, Twitter, Key, DollarSign, Settings, Star, Download } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-[#181B2B] to-[#232342] relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[#5151FF]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-[#6a5cff]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5151FF]/3 rounded-full blur-2xl"></div>
      </div>

      {/* Premium Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Logo size="lg" />
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Features</a>
              <a href="/pricing" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Pricing</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">How It Works</a>
              <a href="#waitlist-form" className="bg-[#5151FF] hover:bg-[#6a5cff] text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-[#5151FF]/25">Join Waitlist</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="text-center py-20 lg:py-24 px-6">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full px-6 py-3 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#5151FF] mr-2" />
              <span className="text-sm font-medium text-white">Powered by Javlin's proprietary Memory Engine</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight">
              Javlin: The AI Co-founder for{" "}
              <span className="bg-gradient-to-r from-[#5151FF] via-[#6a5cff] to-[#8b7aff] bg-clip-text text-transparent">
                Next-Gen Founders
              </span>
            </h1>
            
            <p className="text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto font-light leading-relaxed">
              The first AI co-founder that remembers your best solutions, warns you about past mistakes, 
              and grows smarter with every project — so you never repeat yourself again.
            </p>
            
            <div className="pt-8 flex justify-center">
              <Button 
                onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-[#5151FF] to-[#6a5cff] hover:from-[#4141EF] hover:to-[#5a4cef] text-white font-semibold text-xl px-16 py-6 rounded-2xl shadow-2xl shadow-[#5151FF]/30 border-0 transition-all duration-300 transform hover:scale-105 hover:shadow-[#5151FF]/50"
              >
                Join the Waitlist
                <span className="ml-2">→</span>
              </Button>
            </div>

            {/* Subtle stats or social proof */}
            <div className="pt-16 flex justify-center items-center space-x-12 text-gray-400">
              <div className="text-center">
                <div className="text-2xl font-semibold text-white">1,000+</div>
                <div className="text-sm">Founders waiting</div>
              </div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-white">0%</div>
                <div className="text-sm">Context loss</div>
              </div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-white">∞</div>
                <div className="text-sm">Memory capacity</div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem-Solution Section */}
        <section id="features" className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
                <span className="text-sm font-medium text-red-400">The Problem</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">The Problem Every Builder Faces</h2>
              <p className="text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
                Current AI tools forget everything the moment you close the chat. No-code builders lose context between sessions. 
                You're constantly re-explaining the same problems, re-solving the same bugs, repeating the same mistakes.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-red-400 mb-6">❌ What's Broken Today</h3>
                <div className="space-y-4">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">LLM Memory Loss</h4>
                    <p className="text-gray-300">ChatGPT, Claude, and others forget your conversation the moment it ends. Zero learning, zero continuity.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">No-Code Context Loss</h4>
                    <p className="text-gray-300">Bolt, Replit Agent, and similar tools lose all project context between sessions. Start from scratch every time.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">Repetitive Problem-Solving</h4>
                    <p className="text-gray-300">You solve the same bugs repeatedly, explain the same requirements over and over, lose valuable learnings.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-[#5151FF] mb-6">✅ How Javlin Solves This</h3>
                <div className="space-y-4">
                  <div className="bg-[#5151FF]/10 border border-[#5151FF]/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">Persistent Memory Engine</h4>
                    <p className="text-gray-300">Javlin's Memory Engine remembers every solution, every decision, every lesson learned. Nothing is ever lost.</p>
                  </div>
                  <div className="bg-[#5151FF]/10 border border-[#5151FF]/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">Proactive Context Recovery</h4>
                    <p className="text-gray-300">Automatically surfaces past solutions when you hit similar problems. "Remember how you solved this in Project Alpha?"</p>
                  </div>
                  <div className="bg-[#5151FF]/10 border border-[#5151FF]/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">Cross-Project Intelligence</h4>
                    <p className="text-gray-300">Learns from ALL your projects, not just one. Your knowledge compounds and accelerates over time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-[#5151FF]/10 to-[#6a5cff]/10 rounded-3xl p-8 lg:p-12 border border-[#5151FF]/20 backdrop-blur-sm relative overflow-hidden glow-card">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5151FF]/5 to-[#6a5cff]/5 rounded-3xl animate-pulse-subtle"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center bg-[#5151FF]/20 border border-[#5151FF]/30 rounded-full px-4 py-2 backdrop-blur-sm mb-4">
                  <span className="text-sm font-medium text-[#5151FF]">The Solution</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Why Javlin is Superior</h3>
                <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
                  While Bolt, Replit, and other tools treat each session as a blank slate, Javlin builds institutional knowledge. 
                  You're not just getting an AI assistant—you're getting a co-founder that truly learns and evolves with you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Streamlined Features Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-[#5151FF]/10 border border-[#5151FF]/20 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
                <span className="text-sm font-medium text-[#5151FF]">Core Features</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Built for Builders Who Want More</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                Advanced features that scale with your ambitions, from solo projects to team collaboration.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-[#5151FF]/10 to-[#6a5cff]/10 rounded-3xl p-8 border border-[#5151FF]/20 hover:border-[#5151FF]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#5151FF]/20">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-[#5151FF]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Link className="w-8 h-8 text-[#5151FF]" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">Cross-Project Intelligence</h3>
                    <p className="text-gray-300 leading-relaxed">
                      "Remember when you solved this in Project Alpha?" Javlin's Memory Engine connects insights across all your work, 
                      building institutional knowledge that compounds over time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-8 h-8 text-red-400" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">Proactive Warnings</h3>
                    <p className="text-gray-300 leading-relaxed">
                      "Careful, this schema failed at scale before." Get real-time alerts based on past experiences 
                      to prevent repeated mistakes before they happen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Memory Engine API</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#5151FF]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Key className="w-6 h-6 text-[#5151FF]" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Memory CRUD</h4>
                  <p className="text-gray-400 text-sm">Read, write, update, and delete memories programmatically</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#5151FF]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Database className="w-6 h-6 text-[#5151FF]" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Context Search</h4>
                  <p className="text-gray-400 text-sm">Find relevant memories based on current context</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#5151FF]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-[#5151FF]" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Playbook Export</h4>
                  <p className="text-gray-400 text-sm">Export your knowledge as structured playbooks</p>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* How Javlin Works Section */}
        <section id="how-it-works" className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-[#5151FF]/10 border border-[#5151FF]/20 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
                <span className="text-sm font-medium text-[#5151FF]">Memory Engine Powered</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">3 Memory-Engine Backed Tools</h2>
              <p className="text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
                Experience no-code building like never before with the full power of AI and zero context loss. 
                Each tool remembers everything, learns from your patterns, and evolves with every project.
              </p>
            </div>

            {/* Three Core Tools */}
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {/* Jav Studio */}
              <div className="group bg-gradient-to-br from-[#5151FF]/10 to-[#6a5cff]/10 rounded-3xl p-8 border border-[#5151FF]/20 hover:border-[#5151FF]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#5151FF]/20 hover:scale-[1.02] transform">
                <div className="w-20 h-20 bg-[#5151FF]/20 group-hover:bg-[#5151FF]/30 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300">
                  <Code className="w-10 h-10 text-[#5151FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#5151FF] transition-colors">Jav Studio</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  The integrated development environment where code, docs, and planning unite in one place. 
                  Every line of code, every decision, every breakthrough is remembered and connected.
                </p>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#5151FF] rounded-full"></div>
                    <span>Context-aware code generation and debugging</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#5151FF] rounded-full"></div>
                    <span>Proactive warnings based on past failures</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#5151FF] rounded-full"></div>
                    <span>Seamless creative-to-development workflow</span>
                  </div>
                </div>
              </div>

              {/* Creative Mode */}
              <div className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 hover:scale-[1.02] transform">
                <div className="w-20 h-20 bg-green-500/20 group-hover:bg-green-500/30 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300">
                  <Lightbulb className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">Creative Mode</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Transform ideas into structured projects with AI that remembers your creative patterns, design preferences, 
                  and successful approaches from past projects.
                </p>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span>Intelligent moodboard and idea capture</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span>Memory-powered design suggestions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span>Assisted workspace building and planning</span>
                  </div>
                </div>
              </div>

              {/* JavChat */}
              <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] transform">
                <div className="w-20 h-20 bg-purple-500/20 group-hover:bg-purple-500/30 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300">
                  <MessageCircle className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">JavChat</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  AI-powered journaling and decision tracking that connects every choice to your project history. 
                  Review patterns, document lessons, and build your personal playbook.
                </p>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <span>Context-linked decision logs and insights</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <span>Memory review and curation tools</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <span>Automated personal playbook generation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Memory Engine Power */}
            <div className="bg-gradient-to-r from-[#181B2B] to-[#232342] rounded-3xl p-12 lg:p-16 border border-[#5151FF]/30 relative overflow-hidden glow-card">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5151FF]/5 to-[#6a5cff]/5 rounded-3xl animate-pulse-subtle"></div>
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 bg-[#5151FF]/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Brain className="w-12 h-12 text-[#5151FF]" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">Powered by Javlin's Memory Engine</h3>
                <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
                  Every tool is backed by Javlin's proprietary Memory Engine that captures, learns, and recalls context 
                  across all your projects. Experience true AI assistance that gets smarter with every interaction.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#5151FF] mb-2">Proactive Recall</div>
                    <p className="text-gray-400">"Remember when you solved this in Project Alpha?"</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#5151FF] mb-2">Smart Warnings</div>
                    <p className="text-gray-400">"Careful, this schema failed at scale before"</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#5151FF] mb-2">Zero Context Loss</div>
                    <p className="text-gray-400">Never repeat the same mistake twice</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Magic Moment Example */}
            <div className="mt-16 bg-white/5 rounded-3xl p-8 lg:p-12 border border-white/10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-4 py-2 backdrop-blur-sm mb-4">
                  <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium text-yellow-400">Magic Moment</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">The "I Forgot I Even Solved That!" Experience</h3>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-[#5151FF]/10 to-[#6a5cff]/10 rounded-2xl p-6 lg:p-8 border border-[#5151FF]/20">
                  <p className="text-lg text-gray-300 leading-relaxed italic">
                    "You're building Project Beta, hit an OAuth bug, and suddenly Javlin surfaces: 'Remember how you solved token expiry in Project Alpha? Here's what worked last time.' 
                    You review, update, and apply the solution—saving hours of debugging you'd already done months ago."
                  </p>
                </div>
                <div className="text-center mt-6">
                  <p className="text-gray-400">This is the power of true memory-driven AI assistance</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <Button 
                onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-[#5151FF] to-[#6a5cff] hover:from-[#4141EF] hover:to-[#5a4cef] text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl shadow-[#5151FF]/30 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Experience the Future of AI Building
                <span className="ml-2">→</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Waitlist Form Section */}
        <section id="waitlist-form" className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            {isSuccess ? (
              <div className="text-center space-y-12 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl p-16 border border-green-500/20 backdrop-blur-sm">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-bold text-white">You're on the list!</h3>
                  <p className="text-2xl text-gray-300 leading-relaxed">
                    We'll notify you as soon as Javlin.ai is ready for early access. Get ready to experience 
                    the future of AI-powered development.
                  </p>
                  <div className="pt-4">
                    <p className="text-lg text-green-400 font-medium">You're in! We'll notify you when ready for early access.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-12 lg:p-16 border border-white/10 backdrop-blur-sm">
                <div className="space-y-12">
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center bg-[#5151FF]/10 border border-[#5151FF]/20 rounded-full px-4 py-2 backdrop-blur-sm mb-4">
                      <span className="text-sm font-medium text-[#5151FF]">Early Access</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white">Join the Waitlist</h2>
                    <p className="text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                      Be among the first to experience an AI co-founder that truly remembers and evolves with you.
                    </p>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-white font-semibold text-lg">Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your full name"
                                  className="bg-white/10 border-white/20 hover:border-white/30 text-white placeholder:text-gray-400 rounded-2xl px-6 py-5 text-lg focus:ring-2 focus:ring-[#5151FF] focus:border-[#5151FF] focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
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
                            <FormItem className="space-y-4">
                              <FormLabel className="text-white font-semibold text-lg">Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  className="bg-white/10 border-white/20 hover:border-white/30 text-white placeholder:text-gray-400 rounded-2xl px-6 py-5 text-lg focus:ring-2 focus:ring-[#5151FF] focus:border-[#5151FF] focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
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
                          <FormItem className="space-y-4">
                            <FormLabel className="text-white font-semibold text-lg">
                              What would you want your AI cofounder to remember for you?
                              <span className="text-gray-400 font-normal ml-2">(optional)</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="e.g., My coding patterns, past project mistakes, successful strategies, team preferences..."
                                className="bg-white/10 border-white/20 hover:border-white/30 text-white placeholder:text-gray-400 rounded-2xl px-6 py-5 text-lg min-h-[140px] resize-none focus:ring-2 focus:ring-[#5151FF] focus:border-[#5151FF] focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={waitlistMutation.isPending}
                          className="w-full bg-gradient-to-r from-[#5151FF] to-[#6a5cff] hover:from-[#4141EF] hover:to-[#5a4cef] text-white font-bold text-xl py-6 rounded-2xl shadow-2xl shadow-[#5151FF]/30 border-0 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
                        >
                          {waitlistMutation.isPending ? (
                            <div className="flex items-center space-x-3">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Joining waitlist...</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center space-x-2">
                              <span>Join Waitlist</span>
                              <span>→</span>
                            </div>
                          )}
                        </Button>
                      </div>
                      
                      <div className="text-center pt-4">
                        <p className="text-sm text-gray-400">
                          By joining, you agree to receive product updates. Unsubscribe anytime.
                        </p>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Founders Badge Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#5151FF]/20 to-[#6a5cff]/20 rounded-3xl p-12 lg:p-16 border border-[#5151FF]/30 backdrop-blur-sm overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#5151FF]/10 to-[#6a5cff]/10"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#5151FF]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#6a5cff]/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 text-center space-y-8">
                <div className="inline-flex items-center bg-gradient-to-r from-[#5151FF]/30 to-[#6a5cff]/30 border border-[#5151FF]/40 rounded-full px-6 py-3 backdrop-blur-sm">
                  <Crown className="w-5 h-5 text-[#5151FF] mr-2" />
                  <span className="text-sm font-bold text-white">LIMITED TIME OFFER</span>
                </div>
                
                <div className="w-24 h-24 bg-gradient-to-br from-[#5151FF]/30 to-[#6a5cff]/30 rounded-full flex items-center justify-center mx-auto border border-[#5151FF]/40">
                  <Sparkles className="w-12 h-12 text-[#5151FF]" />
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-3xl lg:text-4xl font-bold text-white">Founders' Special</h3>
                  <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                    First 1,000 signups get <span className="text-[#5151FF] font-bold bg-[#5151FF]/10 px-3 py-1 rounded-lg">30% off Pro or Premium for life</span> and an exclusive Founders badge.
                  </p>
                  <div className="flex justify-center items-center space-x-8 pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#5151FF]">847</div>
                      <div className="text-sm text-gray-400">Spots taken</div>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">153</div>
                      <div className="text-sm text-gray-400">Spots left</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
                <span className="text-sm font-medium text-white">Community</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Follow Our Journey</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Get behind-the-scenes updates, feature previews, and connect with the Javlin community
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <a 
                href="https://x.com/JavlinAI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 rounded-2xl p-8 border border-white/10 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-[#1DA1F2]/20 rounded-xl flex items-center justify-center">
                    <Twitter className="w-6 h-6 text-[#1DA1F2]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">@JavlinAI</h3>
                    <p className="text-gray-400">Main Account</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Product updates, announcements, and community highlights. Follow for major releases and company news.
                </p>
              </a>
              
              <a 
                href="https://x.com/JavlinDev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 rounded-2xl p-8 border border-white/10 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-[#1DA1F2]/20 rounded-xl flex items-center justify-center">
                    <Twitter className="w-6 h-6 text-[#1DA1F2]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">@JavlinDev</h3>
                    <p className="text-gray-400">Developer Account</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Technical deep-dives, development progress, and engineering insights. Perfect for developers and tech enthusiasts.
                </p>
              </a>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg text-gray-300 mb-6">
                Join the conversation and help shape the future of AI-powered development
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://x.com/JavlinAI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 inline-flex items-center justify-center space-x-2"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Follow @JavlinAI</span>
                </a>
                <a 
                  href="https://x.com/JavlinDev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-all duration-200 inline-flex items-center justify-center space-x-2"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Follow @JavlinDev</span>
                </a>
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