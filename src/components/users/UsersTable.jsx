import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Trash2, PlusCircle, ChevronUp, ChevronDown, Filter, ChevronLeft, ChevronRight, MoreVertical, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UsersTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        email: "",
        position: "",
        status: "",
        address: "",
        department: "",
        employee_id: "",
        hire_date: "",
        phone: ""
    });
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // Number of users per page
    const [totalPages, setTotalPages] = useState(1); // Total pages from backend
    const [additionalColumns, setAdditionalColumns] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const allColumns = [
        { key: "address", label: "Address" },
        { key: "department", label: "Department" },
        { key: "employee_id", label: "Employee ID" },
        { key: "hire_date", label: "Hire Date" },
        { key: "phone", label: "Phone" },
    ];

    useEffect(() => {
        fetchUsers();
    }, [currentPage, filters, sortConfig]);

    const fetchUsers = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/api/users",
                [
                    { key: "name", op: "contains", value: filters.name },
                    { key: "email", op: "contains", value: filters.email },
                    { key: "position", op: "contains", value: filters.position },
                    { key: "status", op: "contains", value: filters.status },
                    { key: "address", op: "contains", value: filters.address },
                    { key: "department", op: "contains", value: filters.department },
                    { key: "employee_id", op: "contains", value: filters.employee_id },
                    { key: "hire_date", op: "contains", value: filters.hire_date },
                    { key: "phone", op: "contains", value: filters.phone },
                ],
                {
                    params: {
                        page: currentPage,
                        per_page: usersPerPage,
                        sort_by: sortConfig.key,
                        order: sortConfig.direction === "ascending" ? "asc" : "desc",
                    },
                }
            );
            setFilteredUsers(response.data.data);
            setTotalPages(response.data.pagination.total_pages);
            console.log(`Number of users fetched: ${response.data.data.length}`);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilters({ ...filters, name: term });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.includes(userId)
                ? prevSelectedUsers.filter((id) => id !== userId)
                : [...prevSelectedUsers, userId]
        );
    };

    const handleDeleteSelected = () => {
        const remainingUsers = filteredUsers.filter((user) => !selectedUsers.includes(user.id));
        setFilteredUsers(remainingUsers);
        setSelectedUsers([]);
    };

    const handleAddUser = () => {
        // Add user logic here
        navigate('/add-user');
    };

    const handlePreviewUser = (user) => {
        navigate(`/preview/${user.id}`, { state: { user } });
    };

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key) {
            if (sortConfig.direction === "ascending") {
                direction = "descending";
            } else if (sortConfig.direction === "descending") {
                direction = null;
            }
        }
        setSortConfig({ key, direction });
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
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

    const handleAddColumn = (columnKey) => {
        if (!additionalColumns.includes(columnKey)) {
            setAdditionalColumns([...additionalColumns, columnKey]);
        }
        setShowDropdown(false);
    };

    const availableColumns = allColumns.filter(col => !additionalColumns.includes(col.key));

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Users</h2>
                <div className="flex items-center">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                    <button
                        className="ml-4 text-gray-400 hover:text-gray-300"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={24} />
                    </button>
                    <PlusCircle
                        className="ml-4 text-green-400 cursor-pointer hover:text-green-300"
                        size={24}
                        onClick={handleAddUser}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedUsers(filteredUsers.map((user) => user.id));
                                            } else {
                                                setSelectedUsers([]);
                                            }
                                        }}
                                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                    />
                                    {selectedUsers.length > 0 && (
                                        <Trash2
                                            className="ml-2 text-red-400 cursor-pointer hover:text-red-300"
                                            size={18}
                                            onClick={handleDeleteSelected}
                                        />
                                    )}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                                    Name
                                    {sortConfig.key === "name" && sortConfig.direction === "ascending" ? (
                                        <ChevronUp className="ml-1" size={16} />
                                    ) : sortConfig.key === "name" && sortConfig.direction === "descending" ? (
                                        <ChevronDown className="ml-1" size={16} />
                                    ) : (
                                        <div className="flex flex-col ml-1">
                                            <ChevronUp size={16} style={{ marginBottom: '-4px' }} />
                                            <ChevronDown size={16} style={{ marginTop: '-4px' }} />
                                        </div>
                                    )}
                                </div>
                                {showFilters && (
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Filter by name..."
                                        className="mt-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={filters.name}
                                        onChange={handleFilterChange}
                                    />
                                )}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                <div className="flex items-center cursor-pointer" onClick={() => handleSort("email")}>
                                    Email
                                    {sortConfig.key === "email" && sortConfig.direction === "ascending" ? (
                                        <ChevronUp className="ml-1" size={16} />
                                    ) : sortConfig.key === "email" && sortConfig.direction === "descending" ? (
                                        <ChevronDown className="ml-1" size={16} />
                                    ) : (
                                        <div className="flex flex-col ml-1">
                                            <ChevronUp size={16} style={{ marginBottom: '-4px' }} />
                                            <ChevronDown size={16} style={{ marginTop: '-4px' }} />
                                        </div>
                                    )}
                                </div>
                                {showFilters && (
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Filter by email..."
                                        className="mt-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={filters.email}
                                        onChange={handleFilterChange}
                                    />
                                )}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                <div className="flex items-center cursor-pointer" onClick={() => handleSort("position")}>
                                    Position
                                    {sortConfig.key === "position" && sortConfig.direction === "ascending" ? (
                                        <ChevronUp className="ml-1" size={16} />
                                    ) : sortConfig.key === "position" && sortConfig.direction === "descending" ? (
                                        <ChevronDown className="ml-1" size={16} />
                                    ) : (
                                        <div className="flex flex-col ml-1">
                                            <ChevronUp size={16} style={{ marginBottom: '-4px' }} />
                                            <ChevronDown size={16} style={{ marginTop: '-4px' }} />
                                        </div>
                                    )}
                                </div>
                                {showFilters && (
                                    <input
                                        type="text"
                                        name="position"
                                        placeholder="Filter by position..."
                                        className="mt-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={filters.position}
                                        onChange={handleFilterChange}
                                    />
                                )}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                <div className="flex items-center cursor-pointer" onClick={() => handleSort("status")}>
                                    Status
                                    {sortConfig.key === "status" && sortConfig.direction === "ascending" ? (
                                        <ChevronUp className="ml-1" size={16} />
                                    ) : sortConfig.key === "status" && sortConfig.direction === "descending" ? (
                                        <ChevronDown className="ml-1" size={16} />
                                    ) : (
                                        <div className="flex flex-col ml-1">
                                            <ChevronUp size={16} style={{ marginBottom: '-4px' }} />
                                            <ChevronDown size={16} style={{ marginTop: '-4px' }} />
                                        </div>
                                    )}
                                </div>
                                {showFilters && (
                                    <input
                                        type="text"
                                        name="status"
                                        placeholder="Filter by status..."
                                        className="mt-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={filters.status}
                                        onChange={handleFilterChange}
                                    />
                                )}
                            </th>
                            {additionalColumns.map((col) => (
                                <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    <div className="flex items-center cursor-pointer" onClick={() => handleSort(col)}>
                                        {allColumns.find((column) => column.key === col).label}
                                        {sortConfig.key === col && sortConfig.direction === "ascending" ? (
                                            <ChevronUp className="ml-1" size={16} />
                                        ) : sortConfig.key === col && sortConfig.direction === "descending" ? (
                                            <ChevronDown className="ml-1" size={16} />
                                        ) : (
                                            <div className="flex flex-col ml-1">
                                                <ChevronUp size={16} style={{ marginBottom: '-4px' }} />
                                                <ChevronDown size={16} style={{ marginTop: '-4px' }} />
                                            </div>
                                        )}
                                    </div>
                                    {showFilters && (
                                        <input
                                            type="text"
                                            name={col}
                                            placeholder={`Filter by ${col}...`}
                                            className="mt-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={filters[col]}
                                            onChange={handleFilterChange}
                                        />
                                    )}
                                </th>
                            ))}
                            
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider relative">
                                <MoreVertical className="cursor-pointer" size={16} onClick={() => setShowDropdown(!showDropdown)} />
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
                                        {availableColumns.map((col) => (
                                            <div
                                                key={col.key}
                                                className="block px-4 py-2 text-sm text-white-700 cursor-pointer hover:bg-gray-400 hover:text-white"
                                                onClick={() => handleAddColumn(col.key)}
                                            >
                                                {col.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {filteredUsers.map((user) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() => handleCheckboxChange(user.id)}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                                                {user.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-100">{user.name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-300">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-300">{user.position}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                        {user.status}
                                    </span>
                                </td>
                                {additionalColumns.map((col) => (
                                    <td key={col} className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">{user[col]}</div>
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <Eye className="text-indigo-400 hover:text-indigo-300 cursor-pointer" size={18} onClick={() => handlePreviewUser(user)} />
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft size={24} />
                </button>
                <span className="text-gray-300">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </motion.div>
    );
};

export default UsersTable;