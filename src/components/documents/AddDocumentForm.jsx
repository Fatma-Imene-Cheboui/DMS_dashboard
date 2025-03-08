import { motion } from "framer-motion";
import { X, Upload } from "lucide-react";
import { STATUS_OPTIONS, CATEGORY_OPTIONS } from "./utils"; 
import { useState } from "react";

const AddDocumentForm = ({ onClose, onAddDocument }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Completed");
    const [category, setCategory] = useState("Planning"); 
    const [format, setFormat] = useState("PDF");
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const fileSize = uploadedFile ? (uploadedFile.size / 1024 / 1024).toFixed(2) + " MB" : "Unknown Size";
    
        onAddDocument({
            id: Date.now(),
            title,
            author,
            category,  // Added category here
            status,
            format,
            size: fileSize,
            date: new Date().toISOString().split('T')[0],
            content: uploadedFile ? uploadedFile.name : "New Document Content",
        });
    
        onClose();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUploadedFile(file);
    };

    return (
        <motion.div 
            className="fixed inset-0 bg-gray-800 bg-opacity-90 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div className="bg-gray-900 rounded-xl w-full max-w-lg p-8 space-y-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl text-white font-bold">Add New Document</h3>
                    <button className="text-white" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title Field */}
                    <div>
                        <label className="block text-gray-300 font-medium mb-1">Title</label>
                        <input
                            type="text"
                            placeholder="Enter document title"
                            className="w-full p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Author Field */}
                    <div>
                        <label className="block text-gray-300 font-medium mb-1">Author</label>
                        <input
                            type="text"
                            placeholder="Enter author name"
                            className="w-full p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>

                    {/* Category Field */}
                    <div>
                        <label className="block text-gray-300 font-medium mb-1">Category</label>
                        <select
                            className="w-full p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {CATEGORY_OPTIONS.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Field */}
                    <div>
                        <label className="block text-gray-300 font-medium mb-1">Status</label>
                        <select
                            className="w-full p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-gray-300 font-medium mb-1">Upload File</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center"
                            >
                                <Upload size={18} className="mr-2" />
                                {uploadedFile ? uploadedFile.name : "Choose File"}
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-3 rounded-lg w-full text-lg"
                    >
                        Add Document
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddDocumentForm;
