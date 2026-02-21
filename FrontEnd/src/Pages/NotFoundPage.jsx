import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <h1 className="text-9xl font-black text-primary mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-base-content/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Use Link instead of Navigate */}
          <Link to="/" className="btn btn-primary gap-2 px-2 py-1">
            <FaHome />
            Go Home
          </Link>

          {/* Add the Go Back button */}
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline gap-2 px-2 py-1"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
