import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const AllClasses = () => {
  const [trainers, setTrainers] = useState([]); // Store trainers (which contains class info)
  const [classes, setClasses] = useState([]); // Store classes info
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const classesPerPage = 6;
  const navigate = useNavigate();

  // Fetch trainers (which includes class data) and classes info
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch trainers
        const trainersResponse = await fetch(
          "https://fitness-tracker-server-side-nine.vercel.app/trainersInfo"
        );
        const trainersData = await trainersResponse.json();
        setTrainers(trainersData);

        // Fetch classes info
        const classesResponse = await fetch(
          "https://fitness-tracker-server-side-nine.vercel.app/classesInfo"
        );
        const classesData = await classesResponse.json();
        setClasses(classesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full" />
      </div>
    );

  // Filter and search classes based on search term
  const filteredClasses = classes.filter((classItem) =>
    (classItem.className || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase())
  );

  // Pagination logic
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = filteredClasses.slice(
    indexOfFirstClass,
    indexOfLastClass
  );
  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Active Haven | All Classes</title>
        </Helmet>
      </div>
      <div className="all-classes-section p-6">
        <h1 className="text-3xl font-bold mb-6">All Classes</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search classes by name"
          className="mb-6 p-2 border rounded-lg w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Display classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentClasses.map((classItem, index) => (
            <div
              key={index}
              className="class-card border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200"
            >
              <h2 className="text-xl font-semibold mb-2">
                {classItem.className}
              </h2>

              <img
                src={classItem.imageUrl}
                alt={classItem.className}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              <p className="text-gray-700 mb-2">
                {classItem.details || "No description available"}
              </p>

              {/* Trainers list under the class */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Trainers:</h3>
                <ul>
                  {trainers
                    .filter(
                      (trainer) => trainer.className === classItem.className
                    )
                    .map((trainer) => (
                      <li
                        key={trainer._id}
                        className="flex items-center mb-2 cursor-pointer hover:text-blue-600"
                        onClick={() =>
                          navigate(`/trainerDetails/${trainer._id}`)
                        }
                      >
                        <img
                          src={trainer.profileImage}
                          alt={trainer.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <span>{trainer.name}</span>
                      </li>
                    ))}
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
    </>
  );
};

export default AllClasses;
