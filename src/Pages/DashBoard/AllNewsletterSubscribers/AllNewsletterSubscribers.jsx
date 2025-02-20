import React, { useEffect, useState } from "react";

const AllNewsletterSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch subscriber data
    const fetchSubscribers = async () => {
      try {
        const response = await fetch(
          "https://fitness-tracker-server-side-nine.vercel.app/subscriber"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subscribers.");
        }

        const data = await response.json();
        setSubscribers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">
        All Newsletter Subscribers
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">
                Subscribed At
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber, index) => (
              <tr key={subscriber.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {subscriber.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {subscriber.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(subscriber.subscribedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllNewsletterSubscribers;
