import { useState, useEffect } from 'react'
import Head from 'next/head'
import { saveSubscription, type SubscriptionData } from '../lib/supabase'

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const subscriptionData: SubscriptionData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone
      }

      await saveSubscription(subscriptionData)
      console.log('Form submitted successfully:', formData)
      setIsSubmitted(true)
    } catch (error: any) {
      console.error('Error submitting form:', error)
      setSubmitError(error.message || 'An error occurred while submitting the form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Wake Up to the Life You've Been Too Tired to Live</title>
        <meta name="description" content="One powerful, soul-grounding meditation to calm your mind, restore your sleep, and remind you who you really are." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          {/* Day to Night Background Transition */}
          <div 
            className="absolute inset-0 transition-all duration-2000 ease-in-out"
            style={{
              background: `linear-gradient(135deg, 
                hsl(${200 - scrollProgress * 80}, ${70 - scrollProgress * 30}%, ${85 - scrollProgress * 70}%) 0%, 
                hsl(${180 - scrollProgress * 60}, ${60 - scrollProgress * 40}%, ${90 - scrollProgress * 80}%) 50%,
                hsl(${220 - scrollProgress * 40}, ${50 - scrollProgress * 30}%, ${80 - scrollProgress * 70}%) 100%)`
            }}
          />
          
          {/* Clouds (visible during day) */}
          <div 
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={`cloud-${i}`}
                className="absolute bg-white/40 rounded-full animate-cloud-drift"
                style={{
                  width: `${60 + i * 20}px`,
                  height: `${30 + i * 10}px`,
                  top: `${10 + i * 15}%`,
                  left: `${10 + i * 15}%`,
                  animationDelay: `${i * 1.2}s`,
                  animationDuration: `${8 + i * 2}s`
                }}
              />
            ))}
          </div>

          {/* Butterflies (visible during day) */}
          <div 
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
          >
            {[...Array(8)].map((_, i) => {
              const animationClass = `animate-butterfly-roam-${(i % 3) + 1}`;
              return (
                <div
                  key={`butterfly-${i}`}
                  className={`absolute text-2xl ${animationClass}`}
                  style={{
                    animationDelay: `${i * 1.5}s`
                  }}
                >
                  🦋
                </div>
              );
            })}
          </div>

          {/* Stars (visible during night) */}
          <div 
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: Math.max(0, scrollProgress - 0.3) }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                style={{
                  top: `${Math.random() * 80}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Fireflies (visible during night) */}
          <div 
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: Math.max(0, scrollProgress - 0.4) }}
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={`firefly-${i}`}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-firefly"
                style={{
                  top: `${30 + Math.random() * 60}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>
        {/* Hero Section */}
        <section className="relative z-10 px-4 py-16 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                style={{ 
                  color: scrollProgress > 0.5 ? '#ffffff' : '#1f2937',
                  textShadow: scrollProgress > 0.5 ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none'
                }}>
              Wake Up to the Life You've Been 
              <span className={scrollProgress > 0.5 ? "text-yellow-300" : "text-blue-600"}> Too Tired to Live</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
               style={{ 
                 color: scrollProgress > 0.5 ? '#e5e7eb' : '#4b5563',
                 textShadow: scrollProgress > 0.5 ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
               }}>
              One powerful, soul-grounding meditation to calm your mind, restore your sleep, and remind you who you really are.
            </p>
          </div>

          {/* Emotional Intro */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                Maybe you've been running on empty for so long, you've forgotten what it feels like to wake up truly rested.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                Maybe you've mastered the art of holding it all together — for everyone else — while quietly feeling like you're coming undone.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed font-medium">
                I know that place. I lived there for 26 years.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                This meditation is more than just words and music — it's an invitation back to yourself. A way to quiet the noise, let your body exhale, and remember that you were never meant to live in survival mode.
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">Release the restless thoughts that keep you awake at night</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">Reset your nervous system so your body feels safe to deeply rest</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">Wake up with clarity, focus, and the energy to lead your life with intention</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">Take the first step toward lasting transformation with my proven mind–body method</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">Delivered instantly — yours to listen to anytime you need peace</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enter your details below to receive <em>The Bear Who Forgot He Was Free</em> — free.
            </h2>
          </div>

          {/* Form Section */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 form-shadow">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Get Your Free Meditation
                </h3>
                <p className="text-lg text-gray-600">
                  Enter your details below to receive instant access to <em>The Bear Who Forgot He Was Free</em> — my guided meditation to calm your mind, restore your rest, and reconnect you with yourself.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-600 text-sm">{submitError}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Send Me the Meditation'
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    Your information is safe with me. I'll only send resources and updates that can help you rest, restore, and lead with clarity.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-lg text-gray-600">
                    Your meditation will be sent to your email shortly. Check your inbox for <em>The Bear Who Forgot He Was Free</em>.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Closing Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg text-center">
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                You don't need another quick tip or "sleep hack."
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed font-medium">
                You need a reset.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                A moment to remember that your body knows how to rest, your mind knows how to be still, and your soul knows the way home.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                <em>The Bear Who Forgot He Was Free</em> is your first step.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                It's my gift to you — because I know what it's like to forget, and I know how life-changing it is to remember.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                Let this be the night you start waking up to your life again.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
