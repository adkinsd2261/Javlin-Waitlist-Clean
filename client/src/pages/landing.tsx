import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  Brain, 
  Zap, 
  Shield, 
  Link, 
  CheckCircle, 
  Download, 
  ShieldCheck,
  Crown,
  Users,
  Clock,
  Star,
  Lock,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WaitlistForm from "@/components/waitlist-form";
import Logo from "@/components/logo";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Landing() {
  const { data: stats } = useQuery({
    queryKey: ["/api/waitlist/stats"],
  });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </button>
              <Button className="waitlist-button">
                <span className="waitlist-button-text">Join Waitlist</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div 
              className="text-center lg:text-left"
              initial="initial"
              animate="animate"
              variants={staggerChildren}
            >
              {/* Founders' Special Badge */}
              <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
                <Star className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-sm font-medium text-purple-400">
                  First 1,000 signups get 30% off for life!
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                The AI <span className="gradient-text-flow">Co-founder</span> That <span className="highlight-word memory">Never Forgets</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-8 max-w-2xl">
                Meet Javlin.ai - the first AI that <span className="highlight-word memory">remembers</span> your best solutions, <span className="highlight-word dev">warns</span> you about past mistakes, and <span className="highlight-word creative">grows smarter</span> with every project. Never repeat yourself again.
              </motion.p>
              
              {/* Waitlist Form */}
              <motion.div variants={fadeInUp}>
                <WaitlistForm 
                  source="hero"
                  className="max-w-md mx-auto lg:mx-0 mb-8"
                  showStats={true}
                />
              </motion.div>
              
              <motion.p variants={fadeInUp} className="text-sm text-gray-400 flex items-center justify-center lg:justify-start">
                <Lock className="w-4 h-4 mr-2" />
                Your data stays yours. Export anytime, on any plan.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600" 
                  alt="Modern AI technology workspace" 
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl"></div>
                
                {/* Floating UI elements */}
                <motion.div 
                  className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-md rounded-lg p-3 border border-slate-600"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">MemoryOS Active</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-md rounded-lg p-4 border border-slate-600 max-w-xs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="text-xs text-gray-300">
                    <Zap className="w-3 h-3 text-purple-400 mr-1 inline" />
                    "Remember when you solved this in Project Alpha?"
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold mb-6">
              Tired of <span className="text-red-400">Losing Context</span> and <span className="text-red-400">Repeating Mistakes?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-300 mb-12">
              Traditional AI tools forget what you've learned. They can't warn you about pitfalls you've already faced, 
              or remind you of solutions that worked brilliantly two projects ago.
            </motion.p>
            
            <motion.div variants={staggerChildren} className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-red-400" />,
                  title: "Context Loss",
                  description: "Every new project starts from scratch, losing valuable lessons learned"
                },
                {
                  icon: <ExternalLink className="w-8 h-8 text-red-400" />,
                  title: "Repeated Mistakes", 
                  description: "Fall into the same traps without warnings from your past experience"
                },
                {
                  icon: <Link className="w-8 h-8 text-red-400" />,
                  title: "Fragmented Workflow",
                  description: "Jump between tools with no shared context or learning"
                }
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp} className="text-center">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-red-400">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MemoryOS Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold mb-6">
              Meet <span className="text-gradient-javlin">MemoryOS</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 max-w-3xl mx-auto">
              The brain behind Javlin.ai that learns from your decisions, remembers your solutions, 
              and proactively surfaces insights when you need them most.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Creative development process in modern workspace" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
            
            <motion.div 
              className="space-y-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              {[
                {
                  icon: <Brain className="text-white" />,
                  title: "Proactive Recall",
                  description: "MemoryOS doesn't wait for you to ask. It surfaces relevant solutions and warnings automatically as you work."
                },
                {
                  icon: <Link className="text-white" />,
                  title: "Cross-Project Intelligence",
                  description: "Learn from every project. Solutions from Project Alpha automatically help with Project Beta when context matches."
                },
                {
                  icon: <Shield className="text-white" />,
                  title: "Full User Control",
                  description: "Review, edit, and delete any memory. Your knowledge stays transparent, auditable, and completely under your control."
                }
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeInUp} className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-javlin rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Magic Moment Showcase */}
          <motion.div 
            className="gradient-dark rounded-2xl p-8 lg:p-12 border border-slate-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">The Magic Moment</h3>
              <p className="text-gray-300">Here's how Javlin.ai transforms your workflow:</p>
            </div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  step: "1",
                  title: "Two Months Ago",
                  description: "You solve an OAuth bug in Project Alpha. MemoryOS saves the solution automatically.",
                  color: "blue"
                },
                {
                  step: "2", 
                  title: "Today",
                  description: "Working on Project Beta, you hit a similar OAuth issue. Javlin.ai immediately surfaces your past solution.",
                  color: "purple"
                },
                {
                  step: "3",
                  title: "Hours Saved", 
                  description: "Instead of debugging for hours, you apply the working solution and move on. Your co-founder just saved your day.",
                  color: "green"
                }
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp} className="text-center">
                  <div className={`w-16 h-16 bg-${item.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className={`text-2xl font-bold text-${item.color}-400`}>{item.step}</span>
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-purple-500/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="font-medium text-purple-400">Javlin AI</span>
              </div>
              <p className="text-gray-300">
                "Remember how you solved token expiry in Project Alpha? Here's what worked last time: 
                <span className="text-purple-400"> jwt.verify() with refresh token rotation</span>. 
                Want me to apply this pattern?"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12">
              Built for the Next Generation of Founders
            </motion.h2>
            
            <motion.div variants={staggerChildren} className="grid md:grid-cols-2 gap-8">
              {[
                {
                  image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                  quote: "Finally, an AI that doesn't forget what I taught it yesterday. It's like having a co-founder who actually remembers our lessons learned.",
                  name: "Sarah Chen",
                  title: "Solo Founder, TechFlow"
                },
                {
                  image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", 
                  quote: "The proactive warnings saved me from repeating a scaling mistake that cost me weeks in my last startup. This is game-changing.",
                  name: "Marcus Rodriguez",
                  title: "Indie Hacker, DevLabs"
                }
              ].map((testimonial, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-slate-800/50 border-slate-600">
                    <CardContent className="p-6">
                      <img 
                        src={testimonial.image}
                        alt={`${testimonial.name} testimonial`}
                        className="rounded-lg w-full h-48 object-cover mb-4"
                      />
                      <blockquote className="text-gray-300 mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="text-sm">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-gray-400">{testimonial.title}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 max-w-3xl mx-auto">
              Start free, upgrade when you're ready. Always export your data, no matter your plan.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Free Plan */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-800 border-slate-600 h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Free</h3>
                    <div className="text-3xl font-bold mb-1">$0</div>
                    <div className="text-gray-400 text-sm">per month</div>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {[
                      "2 workspaces",
                      "100 memories", 
                      "Basic AI recall",
                      "Community support",
                      "100 API credits/month"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full bg-slate-600 hover:bg-slate-500">
                    Get Started Free
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pro Plan */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500 h-full relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-javlin">
                  Most Popular
                </Badge>
                
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Pro</h3>
                    <div className="text-3xl font-bold mb-1">$14</div>
                    <div className="text-gray-400 text-sm">per month</div>
                    <div className="text-xs text-purple-400 mt-1">or $140/year</div>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {[
                      "Unlimited workspaces",
                      "2,000 memories",
                      "Advanced MemoryOS recall", 
                      "Cross-project suggestions",
                      "10,000 API credits/month",
                      "Priority support"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full gradient-javlin hover:opacity-90">
                    Start Pro Trial
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Premium Plan */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-800 border-slate-600 h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Premium</h3>
                    <div className="text-3xl font-bold mb-1">$22</div>
                    <div className="text-gray-400 text-sm">per month</div>
                    <div className="text-xs text-gray-400 mt-1">or $220/year</div>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {[
                      "Everything in Pro",
                      "Unlimited memories",
                      "Team collaboration",
                      "Advanced analytics", 
                      "100,000 API credits/month",
                      "White-glove support"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full bg-slate-600 hover:bg-slate-500">
                    Start Premium
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Founders' Special Callout */}
          <motion.div 
            className="mt-12 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-500/20 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Crown className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-bold text-purple-400">Founders' Special</h3>
              <Crown className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-lg mb-4">
              First 1,000 signups get <span className="font-bold text-purple-400">30% off Pro or Premium for life</span>
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Plus exclusive "Founder" badge and beta access to new features
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-purple-400" />
                <span>{stats ? Math.max(0, 1000 - stats.totalSignups) : 1000} spots remaining</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Limited time offer</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 gradient-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Never Repeat Yourself Again?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-8">
              Join the waitlist and be among the first to experience the AI co-founder that actually remembers.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Team of diverse startup founders working together" 
                className="rounded-xl shadow-2xl w-full max-w-2xl mx-auto"
              />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <WaitlistForm 
                source="final-cta"
                className="max-w-md mx-auto mb-8"
                buttonText="Join Waitlist"
              />
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400"
            >
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="w-4 h-4 text-blue-400" />
                <span>Export your data anytime</span>
              </div>
              <div className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Privacy-first approach</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <Logo className="mb-4" />
              <p className="text-gray-400 mb-4 max-w-md">
                The AI co-founder that remembers your best solutions, warns you about past mistakes, 
                and grows smarter with every project.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">MemoryOS</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Javlin.ai. All rights reserved. Your data stays yours.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
