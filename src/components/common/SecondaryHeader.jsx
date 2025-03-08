import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SecondaryHeader = ({ title }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
            			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>

            <div className="flex items-center">
                <ArrowLeft
                    className="text-gray-400 hover:text-gray-300 cursor-pointer"
                    size={24}
                    onClick={handleBack}
                />
                <h2 className="text-xl font-semibold text-gray-100 ml-4">{title}</h2>
            </div>
            </div>
        </header>
    );
};

export default SecondaryHeader;