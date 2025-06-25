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
      {/* Header - Hero Section */}
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
            The first AI co-founder that <span className="text-purple-400 font-semibold">remembers</span> your best solutions, <span className="text-blue-400 font-semibold">warns</span> you about past mistakes, 
            and <span className="text-pink-400 font-semibold">grows smarter</span> with every project—so you never repeat yourself again.
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

      {/* Meet Jav */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Meet Jav: Your AI Co-founder</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Unlike traditional AI that forgets everything, Jav Assistant powered by Memory Engine builds on your past solutions. 
              From OAuth debugging to design breakthroughs—your knowledge becomes institutional memory.
            </p>
          </div>

          {/* Creative & Dev Modes */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Creative Mode */}
            <div className="creative-mode-border ambient-glow creative rounded-3xl p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-pink-400 energy-icon creative" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Creative Mode</h3>
                <p className="text-gray-300 text-lg">For ideation, design, and strategic thinking</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-pink-400 mb-3">Design & UI/UX</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Create wireframes, design systems, and user interfaces. Jav helps refine your visual concepts 
                    and suggests improvements based on UX best practices.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-pink-400 mb-3">Strategic Planning</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Plan product roadmaps, feature prioritization, and business strategy. 
                    Jav helps you think through complex decisions and their implications.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-pink-400 mb-3">Content & Copy</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Write compelling copy, documentation, and marketing materials. 
                    Jav adapts to your brand voice and messaging style.
                  </p>
                </div>
              </div>
            </div>

            {/* Dev Mode */}
            <div className="dev-mode-border ambient-glow dev rounded-3xl p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code className="w-8 h-8 text-blue-400 energy-icon dev" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Dev Mode</h3>
                <p className="text-gray-300 text-lg">For coding, debugging, and technical implementation</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-blue-400 mb-3">Full-Stack Development</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Build complete applications from frontend to backend. Jav writes clean, maintainable code 
                    in any language and follows your preferred patterns.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-blue-400 mb-3">Debugging & Optimization</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Identify and fix bugs, optimize performance, and improve code quality. 
                    Jav analyzes your codebase and suggests targeted improvements.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-blue-400 mb-3">Architecture & Systems</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Design scalable architectures, database schemas, and system integrations. 
                    Jav helps you make informed technical decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Jav Assists You */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="group w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <MessageCircle className="w-12 h-12 text-green-400 energy-icon dev" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">How Jav Assists You</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Jav works seamlessly across all aspects of your work, providing intelligent assistance 
              that adapts to your style and learns from your preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="space-y-3 text-center">
              <Shield className="w-8 h-8 text-purple-400 mx-auto energy-icon memory" />
              <h5 className="text-lg font-semibold text-white">Context Preservation</h5>
              <p className="text-gray-300 text-sm">
                Switch between creative and technical work without losing context. Your insights inform all decisions.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <Zap className="w-8 h-8 text-blue-400 mx-auto energy-icon dev" />
              <h5 className="text-lg font-semibold text-white">Seamless Workflow</h5>
              <p className="text-gray-300 text-sm">
                Move fluidly between ideation and implementation. No need to explain context when switching modes.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <Brain className="w-8 h-8 text-pink-400 mx-auto energy-icon creative" />
              <h5 className="text-lg font-semibold text-white">Holistic Understanding</h5>
              <p className="text-gray-300 text-sm">
                Jav understands both the creative vision and technical constraints, ensuring aligned solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Journey with Javlin */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="group w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <ArrowRight className="w-12 h-12 text-blue-400 energy-icon dev" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Your Journey with Javlin</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From your first workspace creation to building institutional knowledge—here's how Javlin transforms your development process step by step.
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
                  <h3 className="text-3xl font-bold text-white mb-6">Create Your First Workspace</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    Start by setting up your first project workspace in Javlin. Whether you're building an app, designing a system, or solving complex problems, 
                    Jav is ready to work alongside you from day one.
                  </p>
                  
                  <div className="bg-white/5 rounded-xl p-8 mb-6">
                    <h4 className="font-semibold text-blue-400 mb-6 flex items-center gap-2">
                      <Code className="w-5 h-5 energy-icon dev" />
                      What You Can Do Immediately
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Code in any language with intelligent assistance</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Design interfaces with creative feedback</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Plan features and architecture</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Debug issues with contextual help</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-3">First Session Example</h4>
                    <p className="text-gray-300 text-sm italic">
                      <span className="text-blue-400">"Let's build a React component for user authentication. I'll help you set up the form validation 
                      and suggest best practices for secure token handling."</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="creative-border ambient-glow creative rounded-3xl p-10">
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
                    As you work, <span className="text-purple-400 font-semibold">Memory Engine</span> remembers everything—your coding patterns, design preferences, business decisions, 
                    and lessons learned. Every interaction adds to your growing <span className="text-purple-400 font-medium">institutional knowledge</span>.
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
                      <span className="text-pink-400">"I've noticed you prefer Tailwind over custom CSS, always use TypeScript for type safety, 
                      and like to implement dark mode first. I'll suggest these patterns for new projects."</span>
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
                    and preventing mistakes before they happen. It's like having a <span className="text-purple-400 font-semibold">co-founder who never forgets</span>.
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
                    Your <span className="text-purple-400 font-semibold">Memory Engine</span> becomes even more powerful as you start new projects. Jav applies lessons 
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
        </div>
      </section>

      {/* The Memory Engine Advantage */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="group w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Brain className="w-12 h-12 text-purple-400 energy-icon memory" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">The Memory Engine Advantage</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              While competitors offer "AI storage/search," only Javlin has Memory Engine—proactive recall with real user control. 
              The difference between starting fresh every time and building on everything you've learned.
            </p>
          </div>

          <div className="memory-border ambient-glow rounded-3xl p-12">
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
                      Every memory is user-auditable. Review, edit, and delete memories stored as <span className="text-purple-400 font-medium">searchable markdown files</span>. 
                      All additions and updates require your validation—Memory Engine learns with you, not from you.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white mb-8">Cross-Project Intelligence</h3>
                <div className="space-y-6">
                  <div className="memory-border ambient-glow rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-3">Complete Context Preservation</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Every creative decision, code solution, and breakthrough moment is captured in <span className="text-purple-400 font-medium">Memory Engine</span>. Switch between modes without losing your train of thought or valuable insights.
                    </p>
                  </div>
                  <div className="memory-border ambient-glow rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-3">Personal Institutional Knowledge</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Beyond per-project context, Memory Engine aggregates lessons, patterns, and pitfalls from all projects 
                      (with your opt-in) to build your personal "institutional knowledge" that grows with every project.
                    </p>
                  </div>
                  <div className="memory-border ambient-glow rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-3">Privacy-First Architecture</h4>
                    <p className="text-gray-300 leading-relaxed">
                      All cross-project learning is opt-in and privacy-focused by default. Your data always belongs to you, 
                      with transparent memory management and full export capabilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Competition Comparison */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="dev-mode-border ambient-glow dev rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Code className="w-6 h-6 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-4">Traditional AI</h4>
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
                  <h4 className="text-lg font-bold text-white mb-4">Storage Tools</h4>
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
                    <p>No learning from patterns</p>
                  </div>
                </div>
              </div>

              <div className="memory-border ambient-glow rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-purple-400 energy-icon memory" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-4">Javlin Memory Engine</h4>
                </div>
                <div className="space-y-3 text-purple-300 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Proactive recall of past solutions</p>
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
                    <p>Cross-project intelligence</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>User-controlled memory system</p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Difference */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-400/30 ambient-glow">
                <h4 className="text-2xl font-bold text-white mb-6">This Is What Makes Javlin Different</h4>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Other AI tools offer "AI storage/search." <span className="text-purple-400 font-semibold">Memory Engine</span> offers <span className="text-blue-400 font-semibold">proactive recall</span> with real user control. 
                  Your memories are stored as <span className="text-purple-400 font-medium">editable markdown files</span>—you can review, edit, and delete anything. 
                  It's the first <span className="text-purple-400 font-semibold">AI co-founder</span> that remembers your best solutions and warns you about past mistakes.
                </p>
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
                  Welcome to the future of AI co-founding. We'll notify you when Javlin is ready.
                </p>
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-400/20">
                  <p className="text-lg text-purple-300 font-semibold mb-2">Founder Special: 30% off for life</p>
                  <p className="text-gray-300 text-sm">
                    As an early supporter, you'll get lifetime access to Javlin at 30% off our standard pricing.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <h3 className="text-4xl font-bold text-white">Join the Waitlist</h3>
                <p className="text-xl text-gray-300">
                  Be among the first to experience the AI co-founder that never forgets your best solutions.
                </p>
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-400/20">
                  <p className="text-lg text-purple-300 font-semibold mb-2">Founder Special: 30% off for life</p>
                  <p className="text-gray-300 text-sm">
                    Early supporters get lifetime access to Javlin at 30% off our standard pricing.
                  </p>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
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
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="you@company.com" 
                              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
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
                        <FormLabel className="text-white">What are you building? (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your current project or what you're hoping to build with Javlin..."
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none"
                            rows={4}
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
                    className="w-full waitlist-button mouse-attracted-button text-lg py-6 rounded-2xl transition-all duration-300"
                  >
                    {mutation.isPending ? (
                      "Joining..."
                    ) : (
                      <>
                        <span className="waitlist-button-text">Reserve My Founder Spot</span>
                        <ArrowRight className="ml-3 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
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