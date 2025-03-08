import { useState } from "react";
import { User } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import SettingSection from "../settings/SettingSection";
import ProfileImage from './ProfileImage';

const ProfileInfo = ({ user, isEditModeDefault = false }) => {
    const [isEditMode, setIsEditMode] = useState(isEditModeDefault);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [position, setPosition] = useState(user?.position || '');
    const [department, setDepartment] = useState(user?.department || '');
    const [status, setStatus] = useState(user?.status || '');
    const [hireDate, setHireDate] = useState(user?.hire_date || new Date().toISOString().split('T')[0]);
    const [employeeId, setEmployeeId] = useState(user?.employee_id || '');
    const [address, setAddress] = useState(user?.address || '');
    const [profileImage, setProfileImage] = useState(user?.profileImage || 'https://randomuser.me/api/portraits/men/3.jpg');

    const navigate = useNavigate();

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const handleSave = () => {
        // Implement save functionality here
        console.log('Saved:', { name, email, phone, position, department, status, hireDate, employeeId, address });
        setIsEditMode(false);
    };

    const handleAdd = () => {
        // Implement add functionality here
        console.log('Added:', { name, email, phone, position, department, status, hireDate, employeeId, address });
    };

    const handleCancel = () => {
        navigate('/users'); // Navigate to the users page or any other route
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-800 text-green-100";
            case "Inactive":
                return "bg-gray-500 text-gray-100";
            case "Probation":
                return "bg-yellow-800 text-yellow-100";
            case "Contract":
                return "bg-blue-800 text-blue-100";
            case "Remote":
                return "bg-purple-800 text-purple-100";
            case "On Leave":
                return "bg-orange-800 text-orange-100";
            default:
                return "bg-red-800 text-red-100";
        }
    };

    const samplePositions = [
        "Software Engineer", "Senior Software Engineer", "Lead Developer", "Full Stack Developer",
        "Product Manager", "Senior Product Manager", "Product Owner", "Product Director",
        "UX Designer", "UI/UX Designer", "Senior Designer", "Design Lead",
        "Data Analyst", "Data Scientist", "Data Engineer", "Analytics Lead"
    ];

    const sampleDepartments = [
        "LLC", "and Sons", "Ltd", "PLC", "Group", "Inc"
    ];

    return (
        <SettingSection icon={User} title={"Profile Information"} isEditMode={isEditMode}>
            <ProfileImage src={profileImage} name={name} />
            <div className='flex flex-col sm:flex-row items-center mb-6'>
                <div className='w-full px-2 mb-4 sm:mb-0'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='name'>
                        Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        readOnly={!isEditMode}
                    />
                </div>
            </div>
            <div className='flex flex-col sm:flex-row items-center mb-6'>
                <div className='w-full sm:w-1/2 px-2 mb-4 sm:mb-0'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='email'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={!isEditMode}
                    />
                </div>
                <div className='w-full sm:w-1/2 px-2'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='phone'>
                        Phone Number
                    </label>
                    <input
                        type='tel'
                        id='phone'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        readOnly={!isEditMode}
                    />
                </div>
            </div>
            <div className='flex flex-col sm:flex-row items-center mb-6'>
                <div className='w-full sm:w-1/2 px-2 mb-4 sm:mb-0'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='position'>
                        Position
                    </label>
                    {isEditMode ? (
                        <select
                            id='position'
                            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        >
                            {samplePositions.map((pos) => (
                                <option key={pos} value={pos}>{pos}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type='text'
                            id='position'
                            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={position}
                            readOnly
                        />
                    )}
                </div>
                <div className='w-full sm:w-1/2 px-2'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='department'>
                        Department
                    </label>
                    {isEditMode ? (
                        <select
                            id='department'
                            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            {sampleDepartments.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type='text'
                            id='department'
                            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={department}
                            readOnly
                        />
                    )}
                </div>
            </div>
            <div className='flex flex-col sm:flex-row items-center mb-6'>
                <div className='w-full sm:w-1/2 px-2  mb-4 sm:mb-0'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='status'>
                        Status
                    </label>
                    {isEditMode ? (
                        <select
                            id='status'
                            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Active" className="bg-green-800 text-green-100">Active</option>
                            <option value="Inactive" className="bg-gray-500 text-gray-100">Inactive</option>
                            <option value="Probation" className="bg-yellow-800 text-yellow-100">Probation</option>
                            <option value="Contract" className="bg-blue-800 text-blue-100">Contract</option>
                            <option value="Remote" className="bg-purple-800 text-purple-100">Remote</option>
                            <option value="On Leave" className="bg-orange-800 text-orange-100">On Leave</option>
                        </select>
                    ) : (
                        <span className={`px-4 py-3 inline-flex text-sm leading-5 font-semibold rounded-lg ${getStatusColor(status)}`}>
                            {status}
                        </span>
                    )}
                </div>
                <div className='w-full sm:w-1/2 px-2'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='hireDate'>
                        Hire Date
                    </label>
                    <input
                        type='date'
                        id='hireDate'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={hireDate}
                        onChange={(e) => setHireDate(e.target.value)}
                        readOnly={!isEditMode}
                    />
                </div>
            </div>
            <div className='flex flex-col sm:flex-row items-center mb-6'>
                <div className='w-full sm:w-1/2 px-2 mb-4 sm:mb-0'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='employeeId'>
                        Employee ID
                    </label>
                    <input
                        type='text'
                        id='employeeId'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        readOnly={!isEditMode}
                    />
                </div>
                <div className='w-full sm:w-1/2 px-2'>
                    <label className='block text-gray-400 text-sm font-bold mb-2' htmlFor='address'>
                        Address
                    </label>
                    <input
                        type='text'
                        id='address'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        readOnly={!isEditMode}
                    />
                </div>
            </div>

            <div className='flex justify-center space-x-4'>
                {isEditModeDefault ? (
                    <>
                        <button
                            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl transition duration-200 w-full sm:w-auto'
                            onClick={handleAdd}
                        >
                            Add User
                        </button>
                        <button
                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl transition duration-200 w-full sm:w-auto'
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl transition duration-200 w-full sm:w-auto'
                            onClick={toggleEditMode}
                        >
                            {isEditMode ? 'Cancel' : 'Edit'}
                        </button>
                        {isEditMode && (
                            <button
                                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl transition duration-200 w-full sm:w-auto'
                                onClick={handleSave}
                            >
                                Save updates
                            </button>
                        )}
                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl transition duration-200 w-full sm:w-auto'>
                            Delete Profile
                        </button>
                    </>
                )}
            </div>
        </SettingSection>
    );
};

export default ProfileInfo;