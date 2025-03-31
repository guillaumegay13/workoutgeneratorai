import Image from "next/image";

// Stats for the counter section
const stats = {
  workoutsGenerated: 761235,
  happyCustomers: 9635,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl text-gray-700 mb-4">
            Create the perfect fitness routine with your personal workout coach
          </h2>
          <h1 className="text-5xl sm:text-6xl font-bold mb-10">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI-powered</span>
            <span className="text-gray-800"> workout generator</span>
          </h1>

          {/* Workout examples */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div>
              <Image
                src="/workout-examples/cardio.png"
                alt="Cardio workout"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
            <div>
              <Image
                src="/workout-examples/strength.png"
                alt="Strength training"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
            <div>
              <Image
                src="/workout-examples/hiit.png"
                alt="HIIT workout"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
            <div>
              <Image
                src="/workout-examples/yoga.png"
                alt="Yoga workout"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Description text */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-700 mb-12">
            If you have fitness goals but can't find the right workout plan, let our AI generate
            personalized routines for you within seconds. Create the perfect workout based on what you
            need, and get unlimited fitness options.
          </p>

          {/* CTA Button */}
          <a
            href="/onboarding/auth"
            className="inline-block px-10 py-4 text-xl font-medium text-white rounded-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 shadow-lg transition-all duration-300"
          >
            Try for free <span className="ml-2">→</span>
          </a>

          {/* Testimonial avatars and rating */}
          <div className="flex flex-col items-center justify-center mt-8 space-y-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((id) => (
                <div key={id} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden -ml-0.5" style={{ zIndex: 5 - id }}>
                  <Image
                    src={`https://placehold.co/100x100/e2e8f0/1e293b?text=User${id}`}
                    alt={`User ${id}`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-500 ml-2">Join {stats.happyCustomers.toLocaleString()} happy customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold">
            <span className="text-blue-500">{stats.workoutsGenerated.toLocaleString()}</span> workouts already generated for
          </h2>
          <h2 className="text-5xl md:text-6xl font-bold mt-2 text-green-500">
            {stats.happyCustomers.toLocaleString()} happy customers.
          </h2>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto text-center">
          <p>© {new Date().getFullYear()} AI Workout Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
