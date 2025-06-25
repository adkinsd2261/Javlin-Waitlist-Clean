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
import { useMouseAttraction } from "@/hooks/use-mouse-position";
import { CheckCircle, Brain, Lightbulb, Code, MessageCircle, Shield, Zap, Lock, Users, ArrowRight, Star, Sparkles } from "lucide-react";
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
  const heroButtonRef = useMouseAttraction();
  const founderButtonRef = useMouseAttraction();

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
            Javlin: The AI <span className="highlight-word creative">Co-founder</span> for{" "}
            <span className="gradient-text-flow">
              Next-Gen Founders
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            The first AI platform that <span className="highlight-word memory">remembers</span> your best solutions, <span className="highlight-word dev">warns</span> you about past mistakes, 
            and <span className="highlight-word creative">grows smarter</span> with every project.
          </p>

          {/* CTA Button */}
          <Button 
            ref={heroButtonRef}
            onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="waitlist-button mouse-attracted-button text-xl px-12 py-6 rounded-2xl transition-all duration-300"
          >
            <span className="waitlist-button-text">Join the Waitlist</span>
            <ArrowRight className="ml-3 w-6 h-6 text-white" />
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
              Powered by Memory Engine, it's designed for the complete builder journey—from creative ideation to shipping code.
            </p>
          </div>

          {/* Creative & Dev Modes */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Creative Mode */}
            <div className="group creative-mode-border ambient-glow creative rounded-3xl p-10 transition-all duration-300">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 transition-all duration-300">
                <Lightbulb className="w-12 h-12 text-pink-400 energy-icon creative" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-pink-400 transition-colors">Creative Mode</h3>
              
              <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10 ambient-glow">
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  <strong className="text-pink-400">Real scenario:</strong> You're staring at a blank canvas for your startup's brand identity. 
                  Instead of starting from scratch, Jav reminds you: "Remember that mood board you loved from the coffee shop redesign? The earthy tones tested 40% better with your target audience. Want to explore a variation?"
                </p>
                <p className="text-sm text-gray-400">
                  Jav remembers what worked, what flopped, and why—so you're not starting from scratch every time.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300"><span className="text-white font-medium">Creative block?</span> Jav suggests inspiration from your past creative wins</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300"><span className="text-white font-medium">Design decisions?</span> See what feelings and styles resonated with your audience</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300"><span className="text-white font-medium">Scattered ideas?</span> Jav weaves your creative concepts into cohesive stories</p>
                </div>
              </div>
            </div>

            {/* Dev Mode */}
            <div className="group dev-mode-border ambient-glow dev rounded-3xl p-10 transition-all duration-300">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 transition-all duration-300">
                <Code className="w-12 h-12 text-blue-400 energy-icon dev" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">Dev Mode</h3>
              
              <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10 ambient-glow">
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
          <div className="jav-border ambient-glow rounded-3xl p-10">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-purple-400 energy-icon memory" />
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
              <div className="creative-mode-border ambient-glow creative rounded-2xl p-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-pink-400 energy-icon creative" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Creative Mode</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Visual Inspiration Capture</p>
                      <p className="text-gray-400 text-sm">Collect mood boards, color stories, and creative sparks in one visual space</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Creative Flow Setup</p>
                      <p className="text-gray-400 text-sm">Environment that adapts to your creative process and preferred workflows</p>
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
              <div className="dev-mode-border ambient-glow dev rounded-2xl p-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                  <Code className="w-8 h-8 text-blue-400 energy-icon dev" />
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
              <div className="group jav-border ambient-glow rounded-2xl p-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-purple-400 energy-icon memory" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">JavChat</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Memory-Assisted Journaling</p>
                      <p className="text-gray-400 text-sm">Context-linked journaling with AI assistance for reflection and planning</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Decision Logs</p>
                      <p className="text-gray-400 text-sm">Track important decisions and their rationale for future reference</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium text-sm">Memory Review</p>
                      <p className="text-gray-400 text-sm">Review, edit, and organize your memories for optimal relevance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Jav Assistant Features */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 mb-8 ambient-glow">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">Jav Assistant Core Features</h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <MessageCircle className="w-4 h-4 text-purple-400 energy-icon memory" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Chat & Context Q&A</h5>
                      <p className="text-gray-300 text-sm">Interactive chat interface with context-aware responses and memory-powered suggestions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Brain className="w-4 h-4 text-purple-400 energy-icon memory" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Memory-Powered Suggestions</h5>
                      <p className="text-gray-300 text-sm">Proactive suggestions based on your project history and Memory Engine intelligence</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-4 h-4 text-purple-400 energy-icon memory" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Adaptive Persona</h5>
                      <p className="text-gray-300 text-sm">Tone, style, and intervention level adapt to your needs, project mode, and task</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-4 h-4 text-purple-400 energy-icon memory" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Cross-Project Intelligence</h5>
                      <p className="text-gray-300 text-sm">Connects lessons, patterns, and solutions across all your projects with opt-in privacy</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="w-4 h-4 text-purple-400 energy-icon memory" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-2">Proactive Warnings</h5>
                      <p className="text-gray-300 text-sm">Real-time alerts to prevent repeated mistakes based on your past experiences</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Lock className="w-4 h-4 text-purple-400 energy-icon memory" />
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
            <div className="text-center mb-16">
              <h4 className="text-2xl font-bold text-white mb-4">Your Personal Co-founder Experience</h4>
              <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Jav provides guidance, not replacement—delivering insights, accountability, and context-aware tools. 
                With an adaptive persona that evolves with your working style, Jav becomes the strategic partner and 
                tour guide you need, not just another AI assistant.
              </p>
            </div>

            {/* Real Problems Solved */}
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h4 className="text-3xl font-bold text-white mb-4">Real Problems Solved</h4>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  See how Memory Engine eliminates the frustrations that slow down every builder
                </p>
              </div>

              {/* Problem: Repeated Solutions */}
              <div className="memory-border ambient-glow rounded-2xl p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h5 className="text-2xl font-bold text-white mb-4">Stop Recreating What Already Works</h5>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      You've designed landing pages for 5 different projects, but you can't remember which color psychology actually converted. 
                      Jav does—and reminds you that warm earth tones built trust with your B2B audience.
                    </p>
                    <div className="flex items-center space-x-2 text-blue-400">
                      <Shield className="w-5 h-5 energy-icon memory" />
                      <span className="font-medium">Cross-project pattern recognition</span>
                    </div>
                  </div>
                  <div className="memory-border ambient-glow rounded-xl p-6">
                    <div className="text-sm text-gray-400 mb-2">Jav remembers:</div>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Which color stories created emotional connection</li>
                      <li>• Typography choices that enhanced readability</li>
                      <li>• Layout flows that guided users naturally</li>
                      <li>• Visual hierarchies that improved engagement</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Problem: Creative Block */}
              <div className="creative-mode-border ambient-glow creative rounded-2xl p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="creative-mode-border ambient-glow creative rounded-xl p-6">
                      <div className="text-sm text-gray-400 mb-2">Creative Mode assists with:</div>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Color palettes that made customers feel trusting</li>
                        <li>• Layout flows that guided users naturally</li>
                        <li>• Messaging that sparked emotional connection</li>
                        <li>• Visual styles that matched your brand vision</li>
                      </ul>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <h5 className="text-2xl font-bold text-white mb-4">Beat Creative Block</h5>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Switch to Creative Mode and Jav surfaces inspiration from past creative breakthroughs. 
                      No more staring at empty canvases—your creative journey becomes your foundation.
                    </p>
                    <p className="text-sm text-gray-400 italic">
                      "Remember that warm color story that made users feel welcomed? Let's explore that feeling for this project."
                    </p>
                  </div>
                </div>
              </div>

              {/* Problem: Context Loss */}
              <div className="memory-border ambient-glow rounded-2xl p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h5 className="text-2xl font-bold text-white mb-4">Preserve Context Across Modes</h5>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Switch between creative and technical work with full context preserved. Jav remembers your design 
                      decisions and suggests approaches that worked before. No more losing your creative thread.
                    </p>
                    <p className="text-sm text-gray-400 italic">
                      "That minimalist approach tested well with your target users. Want to apply similar principles here?"
                    </p>
                  </div>
                  <div className="dev-mode-border ambient-glow dev rounded-xl p-6">
                    <div className="text-sm text-gray-400 mb-2">Context preservation helps with:</div>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Remembering design rationale</li>
                      <li>• Maintaining brand consistency</li>
                      <li>• Building on creative momentum</li>
                      <li>• Connecting visual and functional decisions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Continuous Growth */}
              <div className="group memory-border ambient-glow rounded-2xl p-8 text-center">
                <h5 className="text-2xl font-bold text-white mb-4">Your Knowledge Compounds</h5>
                <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  Your personal institutional knowledge grows in Memory Engine, connecting patterns across projects 
                  and becoming the ultimate competitive advantage. Every project makes you faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Memory Engine Deep Dive */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="group w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Brain className="w-12 h-12 text-purple-400 energy-icon memory" />
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
                <div className="memory-border ambient-glow rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-white mb-3">Active Intelligence, Not Storage</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Memory Engine isn't just storage—it's an active, intelligent "brain" that learns from your actions, decisions, 
                    code, and docs. It proactively surfaces relevant context using embedding similarity and context relevance to match 
                    new activity to past memories.
                  </p>
                </div>
                <div className="memory-border ambient-glow rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-white mb-3">Proactive Recall System</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Memory Engine moves beyond passive storage by suggesting solutions, surfacing reminders, and preventing repeated 
                    mistakes before they happen. When you work, the system checks the memory index for similar context and surfaces 
                    past solutions or warnings.
                  </p>
                </div>
                <div className="memory-border ambient-glow rounded-2xl p-6">
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
                <div className="memory-border ambient-glow rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-white mb-3">Personal Institutional Knowledge</h4>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Beyond per-project context, Memory Engine aggregates lessons, patterns, and pitfalls from all projects 
                    (with your opt-in) to build your personal "institutional knowledge."
                  </p>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>Creative suggestions: "That visual style worked beautifully in your wellness brand"</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>Design warnings: "This layout caused user confusion in your last project"</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>"Did you know?" inspiring creative connections across projects</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>Personal creative playbook that grows with you</span>
                    </div>
                  </div>
                </div>
                
                <div className="memory-border ambient-glow rounded-2xl p-6">
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
          <div className="memory-border ambient-glow rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-6">Why Memory Engine Beats The Competition</h3>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                While Replit, Bolt, and others offer AI assistance, only Javlin has Memory Engine—the difference between 
                starting fresh every time and building on everything you've ever learned.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="dev-mode-border ambient-glow dev rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Code className="w-6 h-6 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-4">Traditional AI Tools</h4>
                </div>
                <div className="space-y-3 text-gray-400 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Start from scratch every conversation</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>No memory of your preferences</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Can't learn from past mistakes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>No cross-project intelligence</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Passive assistance only</p>
                  </div>
                </div>
              </div>
              
              <div className="creative-mode-border ambient-glow creative rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Lightbulb className="w-6 h-6 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-4">Note-Taking Apps</h4>
                </div>
                <div className="space-y-3 text-gray-400 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Passive storage systems</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>You must remember to search</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>No proactive suggestions</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Limited context understanding</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Manual organization required</p>
                  </div>
                </div>
              </div>
              
              <div className="memory-border ambient-glow rounded-2xl p-6 relative">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-purple-400 energy-icon memory" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-4">Javlin's Memory Engine</h4>
                </div>
                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Proactive recall at perfect moments</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Learns your patterns and preferences</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Prevents repeated mistakes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Cross-project pattern recognition</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Active intelligence with user control</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="memory-border rounded-2xl p-8 text-center">
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
              From first workspace to shipped product—see how Jav becomes your indispensable co-founder through 
              the complete builder journey.
            </p>
          </div>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="dev-mode-border ambient-glow dev rounded-3xl p-10">
              <div className="flex flex-col lg:flex-row items-start gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-white/5 border border-blue-400/30 rounded-2xl flex items-center justify-center relative">
                    <span className="text-3xl font-bold text-blue-400">1</span>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full energy-icon dev"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-6">Create Your Workspace</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    Start a new project and Jav immediately begins learning. Every decision, every line of code, 
                    every creative choice gets captured in your personal Memory Engine.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white/5 rounded-xl p-6 border-l-4 border-blue-400">
                      <div className="flex items-start gap-3 mb-3">
                        <Code className="w-5 h-5 text-blue-400 mt-1 energy-icon dev" />
                        <h4 className="font-semibold text-blue-400">Dev Mode Setup</h4>
                      </div>
                      <p className="text-sm text-gray-300">Configure JWT authentication with secure token handling and error boundaries</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6 border-l-4 border-pink-400">
                      <div className="flex items-start gap-3 mb-3">
                        <Lightbulb className="w-5 h-5 text-pink-400 mt-1 energy-icon creative" />
                        <h4 className="font-semibold text-pink-400">Creative Mode Setup</h4>
                      </div>
                      <p className="text-sm text-gray-300">Design a color palette that converts 23% better than industry average</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-400 energy-icon memory" />
                      Memory Engine Activation
                    </h4>
                    <p className="text-gray-300 text-sm">
                      From your first interaction, Jav begins building your unique intelligence profile—learning your 
                      coding patterns, design preferences, and decision-making style.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="creative-mode-border ambient-glow creative rounded-3xl p-10">
              <div className="flex flex-col lg:flex-row items-start gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-white/5 border border-pink-400/30 rounded-2xl flex items-center justify-center relative">
                    <span className="text-3xl font-bold text-pink-400">2</span>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full energy-icon creative"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-6">Build Your Memory</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    As you work, Jav remembers everything—your coding patterns, design preferences, business decisions, 
                    and lessons learned. Every interaction adds to your growing intelligence foundation.
                  </p>
                  
                  <div className="bg-white/5 rounded-xl p-8 mb-6">
                    <h4 className="font-semibold text-pink-400 mb-6 flex items-center gap-2">
                      <Zap className="w-5 h-5 energy-icon creative" />
                      What Jav Learns About You
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                          <span>Preferred coding patterns</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                          <span>Design style preferences</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                          <span>Business decision criteria</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                          <span>Common mistakes to avoid</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                          <span>Successful strategies</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                          <span>Project methodologies</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl p-6 border border-pink-400/20">
                    <h4 className="font-semibold text-white mb-3">Real Learning Example</h4>
                    <p className="text-gray-300 text-sm italic">
                      "I've noticed you prefer Tailwind over custom CSS, always use TypeScript for type safety, 
                      and like to implement dark mode first. I'll suggest these patterns for new projects."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="memory-border ambient-glow rounded-3xl p-10">
              <div className="flex flex-col lg:flex-row items-start gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-white/5 border border-purple-400/30 rounded-2xl flex items-center justify-center relative">
                    <span className="text-3xl font-bold text-purple-400">3</span>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full energy-icon memory"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-6">Experience Proactive Intelligence</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    Now the magic happens. Jav starts anticipating your needs, offering relevant suggestions, 
                    and preventing mistakes before they happen. It's like having a co-founder who never forgets.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-xl p-6 border-l-4 border-purple-400">
                      <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                        <Brain className="w-5 h-5 energy-icon memory" />
                        Proactive Development Example
                      </h4>
                      <p className="text-gray-300 text-sm mb-3">
                        "I noticed you're working on user authentication again. Last time you mentioned JWT tokens 
                        were expiring too quickly. Should I implement the 30-day refresh pattern you preferred?"
                      </p>
                      <div className="text-xs text-purple-300 bg-purple-500/10 rounded px-3 py-1 inline-block">
                        Memory Engine: Preventing repeated authentication issues
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border-l-4 border-purple-400">
                      <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 energy-icon memory" />
                        Proactive Design Example
                      </h4>
                      <p className="text-gray-300 text-sm mb-3">
                        "Based on your previous projects, users respond 40% better to your gradient buttons. 
                        I've prepared three variations using your preferred purple-blue palette."
                      </p>
                      <div className="text-xs text-purple-300 bg-purple-500/10 rounded px-3 py-1 inline-block">
                        Memory Engine: Applying proven design patterns
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="dev-mode-border ambient-glow dev rounded-3xl p-10">
              <div className="flex flex-col lg:flex-row items-start gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-white/5 border border-blue-400/30 rounded-2xl flex items-center justify-center relative">
                    <span className="text-3xl font-bold text-blue-400">4</span>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full energy-icon dev"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-6">Scale Across Projects</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    Your Memory Engine becomes even more powerful as you start new projects. Jav applies lessons 
                    from previous builds, suggests patterns that worked before, and helps you avoid repeating mistakes.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white/5 rounded-xl p-6 border-l-4 border-blue-400">
                      <div className="flex items-start gap-3 mb-3">
                        <Users className="w-5 h-5 text-blue-400 mt-1 energy-icon dev" />
                        <h4 className="font-semibold text-blue-400">Cross-Project Intelligence</h4>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Applies successful patterns from Project A to Project B automatically
                      </p>
                      <div className="text-xs text-blue-300 bg-blue-500/10 rounded px-3 py-1 inline-block">
                        "Using the database schema pattern that reduced queries by 60% in your last project"
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6 border-l-4 border-purple-400">
                      <div className="flex items-start gap-3 mb-3">
                        <Brain className="w-5 h-5 text-purple-400 mt-1 energy-icon memory" />
                        <h4 className="font-semibold text-purple-400">Continuous Learning</h4>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Memory Engine grows stronger with every project, every decision
                      </p>
                      <div className="text-xs text-purple-300 bg-purple-500/10 rounded px-3 py-1 inline-block">
                        "Learning from 847 interactions across 12 projects"
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-3">Enterprise-Level Intelligence</h4>
                    <p className="text-gray-300 text-sm">
                      At this stage, Jav becomes a true co-founder—understanding your business logic, 
                      predicting user needs, and suggesting strategic improvements based on your track record.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-20">
            <div className="memory-border ambient-glow rounded-3xl p-12 inline-block max-w-4xl">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Brain className="w-8 h-8 text-purple-400 energy-icon memory" />
                <h3 className="text-3xl font-bold text-white">The Result</h3>
                <Brain className="w-8 h-8 text-purple-400 energy-icon memory" />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                You're not just using an AI tool—you're growing an AI co-founder that knows your business, 
                understands your style, and helps you build faster than ever before.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-400 mb-2">10x</div>
                  <div className="text-gray-300">Faster Development</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-400 mb-2">90%</div>
                  <div className="text-gray-300">Fewer Repeated Mistakes</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-400 mb-2">∞</div>
                  <div className="text-gray-300">Growing Intelligence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Memory Engine Deep Dive */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="memory-border ambient-glow rounded-3xl p-12">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-6">When Memory Becomes Wisdom</h3>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Memory Engine doesn't just store information—it transforms your experiences into intelligence that grows stronger with every project.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              {/* How MemoryOS Works */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="dev-mode-border ambient-glow dev rounded-2xl p-8 text-center">
                  <h4 className="text-2xl font-bold text-blue-400 mb-4">Capture</h4>
                  <h5 className="text-lg font-semibold text-white mb-6">Every Decision Matters</h5>
                  <div className="space-y-3 text-gray-300 text-sm text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Code solutions and debugging steps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Design decisions and creative choices</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Project lessons and breakthrough moments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Mistakes and what actually worked</span>
                    </div>
                  </div>
                </div>
                
                <div className="memory-border ambient-glow rounded-2xl p-8 text-center">
                  <h4 className="text-2xl font-bold text-purple-400 mb-4">MemoryOS</h4>
                  <h5 className="text-lg font-semibold text-white mb-6">Intelligence That Learns</h5>
                  <div className="space-y-3 text-gray-300 text-sm text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Stores memories as searchable markdown</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Uses context matching to find relevance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>User-controlled memory editing and deletion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Builds personal knowledge patterns</span>
                    </div>
                  </div>
                </div>
                
                <div className="creative-mode-border ambient-glow creative rounded-2xl p-8 text-center">
                  <h4 className="text-2xl font-bold text-pink-400 mb-4">Proactive Recall</h4>
                  <h5 className="text-lg font-semibold text-white mb-6">Right Context, Right Time</h5>
                  <div className="space-y-3 text-gray-300 text-sm text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span>Surfaces past solutions automatically</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span>Warns about repeated mistakes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span>Suggests proven strategies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span>Shows relevant project memories</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real MemoryOS Examples */}
              <div className="space-y-8">
                <div className="dev-mode-border ambient-glow dev rounded-2xl p-8">
                  <h4 className="text-xl font-bold text-white mb-4">Technical Memory in Action</h4>
                  <div className="bg-white/5 rounded-xl p-6">
                    <p className="text-gray-300 mb-4">
                      You solved an OAuth token expiry bug in Project Alpha. Two months later in Project Beta, you hit a similar issue. 
                      MemoryOS surfaces: <span className="text-blue-400 font-semibold">"Remember how you solved token expiry in Project Alpha? Here's what worked last time."</span>
                    </p>
                    <div className="text-xs text-blue-300 bg-blue-500/10 rounded px-3 py-1 inline-block">
                      Context Match: OAuth debugging from Project Alpha memory
                    </div>
                  </div>
                </div>

                <div className="creative-mode-border ambient-glow creative rounded-2xl p-8">
                  <h4 className="text-xl font-bold text-white mb-4">Creative Memory in Action</h4>
                  <div className="bg-white/5 rounded-xl p-6">
                    <p className="text-gray-300 mb-4">
                      MemoryOS remembers that a specific blue-purple gradient worked great for conversions in your last project. 
                      When you're designing again, it suggests: <span className="text-pink-400 font-semibold">"That gradient from Project Alpha converted 23% better than your baseline. Want to try a variation?"</span>
                    </p>
                    <div className="text-xs text-pink-300 bg-pink-500/10 rounded px-3 py-1 inline-block">
                      Design Memory: Successful color palette from past project
                    </div>
                  </div>
                </div>

                <div className="memory-border ambient-glow rounded-2xl p-8">
                  <h4 className="text-xl font-bold text-white mb-4">Project Memory in Action</h4>
                  <div className="bg-white/5 rounded-xl p-6">
                    <p className="text-gray-300 mb-4">
                      You documented a hard lesson about feature scope creep in your project journal. 
                      When planning a new feature, MemoryOS reminds: <span className="text-purple-400 font-semibold">"You noted in Project Beta: 'Adding features without user feedback led to 2 weeks of wasted work.' Consider validation first."</span>
                    </p>
                    <div className="text-xs text-purple-300 bg-purple-500/10 rounded px-3 py-1 inline-block">
                      Lesson Memory: Project planning insights from your own notes
                    </div>
                  </div>
                </div>
              </div>

              {/* The Difference */}
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-400/30">
                  <h4 className="text-2xl font-bold text-white mb-6">This Is What Makes Javlin Different</h4>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Other AI tools offer "AI storage/search." MemoryOS offers <em>proactive recall</em> with real user control. 
                    Your memories are stored as editable markdown files—you can review, edit, and delete anything. 
                    It's the first AI co-founder that remembers your best solutions and warns you about past mistakes.
                  </p>
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
            <div className="bg-white/5 rounded-3xl p-12 border border-white/10 ambient-glow">
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
                              onFocus={(e) => e.target.classList.add('input-awakening')}
                              onBlur={(e) => e.target.classList.remove('input-awakening')}
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
                              onFocus={(e) => e.target.classList.add('input-awakening')}
                              onBlur={(e) => e.target.classList.remove('input-awakening')}
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
                            onFocus={(e) => e.target.classList.add('input-awakening')}
                            onBlur={(e) => e.target.classList.remove('input-awakening')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    ref={founderButtonRef}
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full founder-button mouse-attracted-button text-xl py-6 rounded-2xl transition-all duration-300"
                  >
                    {mutation.isPending ? (
                      <span className="founder-button-text">Joining...</span>
                    ) : (
                      <span className="founder-button-text">Claim Your Founder Spot</span>
                    )}
                    <ArrowRight className="ml-3 w-6 h-6 text-white" />
                  </Button>
                </form>
              </Form>

              {/* CTA Text Above Social Links */}
              <div className="text-center mt-8 pt-6 border-t border-white/10">
                <p className="text-lg text-gray-300 mb-4 font-medium">
                  Follow our journey and get updates
                </p>
                
                {/* Social Links */}
                <div className="flex justify-center space-x-6">
                  <a 
                    href="https://x.com/JavlinAI" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 bg-white/5 rounded-lg px-4 py-2 hover:bg-white/10"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>@JavlinAI</span>
                  </a>
                  <a 
                    href="https://x.com/JavlinDev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 bg-white/5 rounded-lg px-4 py-2 hover:bg-white/10"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>@JavlinDev</span>
                  </a>
                </div>
              </div>
            </div>
          )}
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