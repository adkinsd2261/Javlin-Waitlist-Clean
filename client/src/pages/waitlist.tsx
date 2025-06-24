import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Brain, Shield, Link, Users, CheckCircle, Crown, Lock, Sparkles, Lightbulb, Code, MessageCircle, Database, Zap, User, Twitter } from "lucide-react";
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
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">How It Works</a>
              <a href="#waitlist-form" className="bg-[#5151FF] hover:bg-[#6a5cff] text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-[#5151FF]/25">Join Waitlist</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="text-center py-32 lg:py-40 px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full px-6 py-3 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#5151FF] mr-2" />
              <span className="text-sm font-medium text-white">Introducing the first AI with persistent memory</span>
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
            
            <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-[#5151FF] to-[#6a5cff] hover:from-[#4141EF] hover:to-[#5a4cef] text-white font-semibold text-xl px-16 py-6 rounded-2xl shadow-2xl shadow-[#5151FF]/30 border-0 transition-all duration-300 transform hover:scale-105 hover:shadow-[#5151FF]/50"
              >
                Join the Waitlist
                <span className="ml-2">→</span>
              </Button>
              <button className="text-gray-300 hover:text-white font-medium text-lg transition-colors duration-200 flex items-center space-x-2">
                <span>Watch Demo</span>
                <div className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
              </button>
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
        <section id="features" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
                <span className="text-sm font-medium text-red-400">The Problem</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">The Problem Every Builder Faces</h2>
              <p className="text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
                Current AI tools forget everything the moment you close the chat. No-code builders lose context between sessions. 
                You're constantly re-explaining the same problems, re-solving the same bugs, repeating the same mistakes.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
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
                    <p className="text-gray-300">MemoryOS remembers every solution, every decision, every lesson learned. Nothing is ever lost.</p>
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

            <div className="text-center bg-gradient-to-r from-[#5151FF]/10 to-[#6a5cff]/10 rounded-3xl p-12 lg:p-16 border border-[#5151FF]/20 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5151FF]/5 to-[#6a5cff]/5 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center bg-[#5151FF]/20 border border-[#5151FF]/30 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
                  <span className="text-sm font-medium text-[#5151FF]">The Solution</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">Why Javlin is Superior</h3>
                <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
                  While Bolt, Replit, and other tools treat each session as a blank slate, Javlin builds institutional knowledge. 
                  You're not just getting an AI assistant—you're getting a co-founder that truly learns and evolves with you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6">Complete AI Co-founder Platform</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Every tool you need for creative and technical work, unified by intelligent memory that learns and evolves with you.
              </p>
            </div>
            
            {/* Primary Features Grid */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              <div className="bg-gradient-to-br from-[#5151FF]/10 to-[#6a5cff]/10 rounded-3xl p-8 lg:p-10 border border-[#5151FF]/20">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-[#5151FF]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-white">MemoryOS: Your Intelligent Brain</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      The core that makes everything else possible. MemoryOS actively learns from your decisions, code, and workflows, 
                      then proactively surfaces relevant context when you need it most.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#5151FF] rounded-full"></div>
                        <span className="text-gray-300">Embedding-based similarity matching for instant recall</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#5151FF] rounded-full"></div>
                        <span className="text-gray-300">User-auditable memory with full edit/delete control</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#5151FF] rounded-full"></div>
                        <span className="text-gray-300">Contextual auto-suggestions and proactive warnings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-8 lg:p-10 border border-white/10">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-white">Jav Assistant: Your AI Co-founder</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      More than a chatbot—a true co-founder that provides guidance, accountability, and evolves with your working style. 
                      Adapts its persona and intervention level to match your needs.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-gray-300">Memory-powered context awareness in every conversation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-gray-300">Strategic guidance and decision-making support</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-gray-300">Adaptive tone and communication style</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Integrated Environment Features */}
            <div className="space-y-8">
              <h3 className="text-2xl lg:text-3xl font-semibold text-white text-center mb-12">Integrated Development Environment</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3">Creative Mode</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Capture ideas, build moodboards, and start projects. Seamless creative-to-dev workflow with shared memory and context.
                  </p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>• Idea capture and organization</div>
                    <div>• Visual moodboard creation</div>
                    <div>• Project ideation assistance</div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Code className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3">Dev Mode</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    AI-supercharged development with context-aware code help, real-time debugging, and proactive warnings.
                  </p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>• Context-aware code generation</div>
                    <div>• Real-time debugging assistance</div>
                    <div>• Memory-powered error prevention</div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3">JavChat</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Memory-assisted journaling for decision logs, project insights, and knowledge review.
                  </p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>• Context-linked decision logs</div>
                    <div>• Memory review and curation</div>
                    <div>• Project insight documentation</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Features */}
            <div className="mt-20 space-y-8">
              <h3 className="text-2xl lg:text-3xl font-semibold text-white text-center mb-12">Advanced Intelligence Features</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Link className="w-7 h-7 text-yellow-400" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-semibold text-white">Cross-Project Intelligence</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Aggregates lessons, patterns, and pitfalls from all your projects to build personal institutional knowledge. 
                        Get contextual suggestions like "Remember when you solved this in Project Alpha?"
                      </p>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>• Automated personal playbook curation</div>
                        <div>• Cross-project pattern recognition</div>
                        <div>• Searchable memory across all workspaces</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-7 h-7 text-red-400" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-semibold text-white">Proactive Warnings & Insights</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Get real-time warnings like "Careful, this schema failed at scale in Gamma!" and "Did you know?" 
                        insights that surface relevant past experiences.
                      </p>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>• Real-time mistake prevention</div>
                        <div>• Contextual learning suggestions</div>
                        <div>• Memory-powered code reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workspace Management */}
            <div className="mt-16 text-center bg-gradient-to-r from-white/5 to-white/10 rounded-3xl p-8 lg:p-12 border border-white/10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Unified Workspace Management</h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-6">
                Simple, intuitive project creation and switching. Your dashboard shows workspace metadata, memory insights, 
                and recent activity across all projects.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <span>• Unlimited workspaces (Pro+)</span>
                <span>• Memory insights dashboard</span>
                <span>• Project activity tracking</span>
                <span>• Seamless context switching</span>
              </div>
            </div>
          </div>
        </section>

        {/* How Javlin Works Section */}
        <section id="how-it-works" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-[#5151FF]/10 border border-[#5151FF]/20 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
                <span className="text-sm font-medium text-[#5151FF]">Platform Overview</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">How Javlin Works</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Four integrated modes that share memory and context, creating a seamless creative-to-development workflow.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
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
                <div key={index} className="group bg-white/5 hover:bg-white/10 rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#5151FF]/10">
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-[#5151FF]/20 group-hover:bg-[#5151FF]/30 rounded-3xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#5151FF] transition-colors duration-300">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Secondary CTA */}
            <div className="text-center">
              <Button 
                onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xl px-12 py-6 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm shadow-lg"
              >
                Join for a full product tour before launch!
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
                    <p className="text-lg text-green-400 font-medium">Position: #847 • Estimated access: 4-6 weeks</p>
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