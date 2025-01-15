import { useState } from "react";

const NewsletterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  // Form validation and submission logic
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!name || !email) {
      setError("Both fields are required.");
      return;
    }

    // Email validation using regex
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // If all is good, simulate successful submission
    setError("");
    setIsSubscribed(true);
    // Add actual subscription logic here (e.g., submit to an API or Firebase)
    console.log("Subscribed:", { name, email });
  };

  return (
    <div className="max-w-lg mx-auto p-8 border rounded-lg shadow-lg bg-white my-8">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Subscribe to Our Newsletter
      </h2>
      {isSubscribed ? (
        <div className="text-center text-green-600">
          <p>Thank you for subscribing! We'll keep you updated.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            >
              Subscribe Now
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewsletterForm;
