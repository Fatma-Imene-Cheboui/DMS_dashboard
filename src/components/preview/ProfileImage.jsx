const ProfileImage = ({ src, name }) => {
    return (
        <div className='flex flex-col items-center mb-6'>
            <div className='h-20 w-20 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold mb-4 text-3xl'>
                {name.charAt(0)}
            </div>
            <button className='bg-[#6366f1] hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto '>
                Upload 
            </button>
        </div>
    );
};

export default ProfileImage;