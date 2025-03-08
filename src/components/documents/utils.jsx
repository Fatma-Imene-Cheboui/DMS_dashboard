// utils.js
export const getStatusClass = (status) => {
    switch (status) {
        case "Completed":
            return "bg-green-800 text-green-100";
        case "Pending":
            return "bg-yellow-800 text-yellow-100";
        case "In Progress":
            return "bg-blue-800 text-blue-100";
        default:
            return "bg-gray-800 text-gray-100";
    }
};

export const getIconByFormat = (format) => {
    switch (format.toLowerCase()) {
        case "pdf":
            return "PDF";
        case "excel":
            return "XLS";
        case "word":
            return "DOC";
        case "image":
            return "IMG";
        default:
            return "FILE";
    }
};
export const STATUS_OPTIONS = ["In Progress", "Pending", "Completed"];

export const CATEGORY_OPTIONS = [
    "Planning",
    "Finance",
    "Meetings",
    "Design",
    "Sales",
    "IT"
];
