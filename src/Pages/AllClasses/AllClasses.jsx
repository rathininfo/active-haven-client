import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllClasses = () => {
  const [classes, setClasses] = useState([]); // State to store all classes
  const [trainers, setTrainers] = useState([]); // State to store trainers
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const classesPerPage = 6; // Classes per page
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5000/classesInfo");
      const data = await response.json();
      setClasses(data); // Set the fetched classes data
      setLoading(false);
    };
    fetchClasses();
  }, []);

  // Fetch trainers from API
  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5000/trainersInfo");
      const data = await response.json();
      setTrainers(data); // Set the fetched trainers data
      setLoading(false);
    };
    fetchTrainers();
  }, []);

  if (loading) return <p>Loading classes...</p>;

  // Calculate the classes to display for the current page
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);

  // Handle page navigation
  const totalPages = Math.ceil(classes.length / classesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to dynamically assign trainers to classes based on the class index
  const getTrainersForClass = (index) => {
    const trainerCountPerClass = [
      5, // First class gets 5 trainers
      3, // Second class gets 3 trainers
      2, // Third class gets 2 trainers
      4, // Fourth class gets 4 trainers
      1, // Sixth class gets 1 trainer
      2, // Default is 2 trainers for other classes
    ];
    return trainerCountPerClass[index] || 2; // Default to 2 trainers for all other classes
  };

  // Function to get unique trainers for each class
  const getUniqueTrainersForClass = (index) => {
    const trainersPerClass = [];
    const trainerCount = getTrainersForClass(index);

    // Use modulo to loop over trainers if there aren't enough to fill
    for (let i = 0; i < trainerCount; i++) {
      trainersPerClass.push(
        trainers[(index * trainerCount + i) % trainers.length]
      );
    }

    return trainersPerClass;
  };

  return (
    <div className="all-classes-section p-6">
      <h1 className="text-3xl font-bold mb-6">All Classes</h1>

      {/* Display classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClasses.map((classItem, index) => (
          <div
            key={classItem._id} // Use _id to ensure uniqueness
            className="class-card border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200"
          >
            <h2 className="text-xl font-semibold mb-2">
              {classItem.className}
            </h2>
            <p className="text-gray-700 mb-2">{classItem.description}</p>
            <p className="text-gray-500 mb-4">{classItem.details}</p>

            {/* Trainers list */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Trainers:</h3>
              <ul>
                {/* Dynamically show unique trainers for each class */}
                {trainers && trainers.length > 0 ? (
                  getUniqueTrainersForClass(index).map((trainer) => (
                    <li
                      key={trainer._id} // Ensure unique key for each trainer
                      className="flex items-center mb-2 cursor-pointer hover:text-blue-600"
                      onClick={() => navigate(`/trainerDetails/${trainer._id}`)}
                    >
                      <img
                        src={trainer.profileImage} // Replace with your trainer image logic
                        alt={trainer.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span>{trainer.name}</span>
                    </li>
                  ))
                ) : (
                  <p>No trainers available for this class.</p>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination mt-6 flex justify-center space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllClasses;
