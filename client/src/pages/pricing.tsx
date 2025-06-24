import { CheckCircle, Crown, Download, Star } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181B2B] to-[#232342]">
      {/* Header */}
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-[#5151FF]/10 border border-[#5151FF]/20 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-[#5151FF]">Planned Pricing</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Start free and scale as your memory grows. All plans include data export and privacy controls.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {/* Free Plan */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 relative hover:bg-white/8 transition-all duration-300 hover:shadow-lg hover:shadow-white/5 hover:scale-[1.02] transform group">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <div className="text-4xl font-bold text-white mb-1">$0</div>
                <div className="text-gray-400">per month</div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">2 workspaces</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">100 memories</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Basic AI recall</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Community support</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">100 API credits/month</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Always export your data</span>
                </div>
              </div>

              <div className="text-center py-3 text-gray-400 font-medium border border-white/20 rounded-xl">
                Available at Launch
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-[#5151FF]/20 to-[#6a5cff]/20 rounded-3xl p-8 border border-[#5151FF]/30 relative hover:from-[#5151FF]/25 hover:to-[#6a5cff]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#5151FF]/20 hover:scale-[1.05] transform group glow-card-pro">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#5151FF] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <span className="text-4xl font-bold text-white">$14</span>
                  <div className="text-gray-300">
                    <div className="text-sm">/month</div>
                    <div className="text-xs">or $140/year</div>
                  </div>
                </div>
                <div className="text-gray-400">Everything in Free, plus:</div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#5151FF] mt-0.5 flex-shrink-0" />
                  <span className="text-white">Unlimited workspaces</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#5151FF] mt-0.5 flex-shrink-0" />
                  <span className="text-white">2,000 memories</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#5151FF] mt-0.5 flex-shrink-0" />
                  <span className="text-white">Advanced MemoryOS recall</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#5151FF] mt-0.5 flex-shrink-0" />
                  <span className="text-white">Cross-project suggestions</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#5151FF] mt-0.5 flex-shrink-0" />
                  <span className="text-white">Automated personal playbook</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#5151FF] mt-0.5 flex-shrink-0" />
                  <span className="text-white">10,000 API credits/month</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#5151FF] mt-0.5 flex-shrink-0" />
                  <span className="text-white">Priority support</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-[#5151FF] mt-0.5 flex-shrink-0" />
                  <span className="text-white">Early access to new features</span>
                </div>
              </div>

              <div className="text-center py-3 text-white font-medium bg-[#5151FF]/30 rounded-xl border border-[#5151FF]/40">
                Available at Launch
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 relative hover:bg-white/8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.02] transform group">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <span className="text-4xl font-bold text-white">$22</span>
                  <div className="text-gray-300">
                    <div className="text-sm">/month</div>
                    <div className="text-xs">or $220/year</div>
                  </div>
                </div>
                <div className="text-gray-400">Everything in Pro, plus:</div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Unlimited memories</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Team & collaboration features</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Advanced analytics</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">White-glove onboarding</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Custom integrations</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">100,000 API credits/month</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Crown className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Founder badge & feedback sessions</span>
                </div>
              </div>

              <div className="text-center py-3 text-gray-400 font-medium border border-white/20 rounded-xl">
                Available at Launch
              </div>
            </div>
          </div>

          {/* Founders Special */}
          <div className="bg-gradient-to-r from-[#5151FF]/10 to-[#6a5cff]/10 rounded-3xl p-8 lg:p-12 border border-[#5151FF]/20 text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-[#5151FF]/30 to-[#6a5cff]/30 border border-[#5151FF]/40 rounded-full px-6 py-3 backdrop-blur-sm mb-6">
              <Crown className="w-5 h-5 text-[#5151FF] mr-2" />
              <span className="text-sm font-bold text-white">FOUNDERS' SPECIAL</span>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">Early Access Benefits</h3>
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              First 1,000 signups get <span className="text-[#5151FF] font-bold">30% off Pro or Premium for life</span>, 
              plus an exclusive "Founder" badge and beta access to new features.
            </p>
            
            <div className="flex justify-center items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#5151FF]">847</div>
                <div className="text-sm text-gray-400">Spots taken</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">153</div>
                <div className="text-sm text-gray-400">Spots left</div>
              </div>
            </div>
          </div>

          {/* Data Freedom */}
          <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Download className="w-6 h-6 text-[#5151FF]" />
              <h3 className="text-xl font-semibold text-white">Your Data, Always Yours</h3>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              No matter your plan, you can always export your memories and projects. No lock-in, ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}