import { motion } from "framer-motion";
import { Search, Trash2, Grid, List, X, Download, MoreVertical, Edit, Share2, Eye, Check, PlusCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import AddDocumentForm from "./AddDocumentForm";
import { Filter, ChevronUp, ChevronDown } from "lucide-react";
import DOCUMENT_DATA from "./DocumentData";



const DocumentsTable = () => {
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [filters, setFilters] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDocuments, setFilteredDocuments] = useState(DOCUMENT_DATA);
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [viewMode, setViewMode] = useState("list");
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewDocument, setPreviewDocument] = useState(null);
    const [renamingDocumentId, setRenamingDocumentId] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [isEditingPreview, setIsEditingPreview] = useState(false);
    const [editedContent, setEditedContent] = useState("");
    const tableRef = useRef(null);

    const handleFilterChange = (e, column) => {
        const value = e.target.value.toLowerCase();
        setFilters({ ...filters, [column]: value });
    };

    const sortedAndFilteredDocs = [...filteredDocuments] // Create a copy to avoid mutating the original data
        .filter(doc =>
            Object.entries(filters).every(([key, value]) =>
                doc[key]?.toString().toLowerCase().includes(value)
            )
        )
        .sort((a, b) => {
            if (!sortConfig.key) return 0;

            const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
            const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

            if (sortConfig.direction === "asc") {
                return aValue > bValue ? 1 : -1;
            } else if (sortConfig.direction === "desc") {
                return aValue < bValue ? 1 : -1;
            }

            return 0; // No sorting when direction is "default"
        });


    const handleSort = (column) => {
        let direction = "asc";

        if (sortConfig.key === column) {
            if (sortConfig.direction === "asc") {
                direction = "desc";
            } else if (sortConfig.direction === "desc") {
                direction = "default";
            }
        }

        setSortConfig({ key: direction === "default" ? null : column, direction });

        let sortedDocs;
        if (direction === "default") {
            sortedDocs = [...DOCUMENT_DATA]; // Reset to original order
        } else {
            sortedDocs = [...filteredDocuments].sort((a, b) => {
                const aValue = a[column]?.toString().toLowerCase() || "";
                const bValue = b[column]?.toString().toLowerCase() || "";

                if (direction === "asc") return aValue > bValue ? 1 : -1;
                if (direction === "desc") return aValue < bValue ? 1 : -1;

                return 0; // Default state
            });
        }

        setFilteredDocuments(sortedDocs);
    };



    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = DOCUMENT_DATA.filter(
            (document) =>
                document.title.toLowerCase().includes(term) ||
                document.category.toLowerCase().includes(term) ||
                document.author.toLowerCase().includes(term)
        );

        setFilteredDocuments(filtered);
    };
    const handleAddDocument = (newDocument) => {
        setFilteredDocuments((prevDocs) => [...prevDocs, newDocument]);
    };


    const handleSelectDocument = (id) => {
        setSelectedDocuments((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((docId) => docId !== id)
                : [...prevSelected, id]
        );
    };

    const handleDeleteSelected = () => {
        const remainingDocuments = filteredDocuments.filter(
            (document) => !selectedDocuments.includes(document.id)
        );
        setFilteredDocuments(remainingDocuments);
        setSelectedDocuments([]);
    };

    const handleRowClick = (document) => {
        setSelectedDocument(document);
    };

    const getStatusClass = (status) => {
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

    const toggleDropdown = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
    };

    const handleDownload = (document) => {
        console.log(`Downloading document: ${document.title}`);
        // Implement download logic here
    };

    const handleRename = (document) => {
        setRenamingDocumentId(document.id);
        setNewTitle(document.title); // Pre-fill with the current title
    };

    const confirmRename = (id) => {
        setFilteredDocuments((prevDocs) =>
            prevDocs.map((doc) =>
                doc.id === id ? { ...doc, title: newTitle } : doc
            )
        );
        setRenamingDocumentId(null);
        setNewTitle("");
    };

    const handleShare = (document) => {
        console.log(`Sharing document: ${document.title}`);
        // Implement share logic here
    };

    const handleDelete = (document) => {
        const remainingDocuments = filteredDocuments.filter(
            (doc) => doc.id !== document.id
        );
        setFilteredDocuments(remainingDocuments);
        setSelectedDocument(null);
        console.log(`Deleted document: ${document.title}`);
    };

    const handleOpenPreview = (document) => {
        console.log("Opening Preview for:", document); // Debugging log
        if (!document || !document.content) {
            console.error("Document content is missing.");
            return;
        }
        setPreviewDocument(document);
        setIsPreviewOpen(true);
        setEditedContent(document.content);
        setIsEditingPreview(false);
    };

    const handleClosePreview = () => {
        console.log("Closing Preview"); // Debugging log
        setIsPreviewOpen(false);
        setPreviewDocument(null);
        setIsEditingPreview(false);
    };

    const handleEditContent = () => {
        setIsEditingPreview(true);
    };

    const handleSaveEdit = () => {
        setIsEditingPreview(false);
        setPreviewDocument((prev) => ({ ...prev, content: editedContent }));
        console.log("Content edited successfully");
    };

    const getIconByFormat = (format) => {
        switch (format.toLowerCase()) {
            case 'pdf':
                return <div className="bg-red-500 text-white rounded-lg p-2 flex items-center justify-center w-12 h-12 mb-2">PDF</div>;
            case 'excel':
                return <div className="bg-green-500 text-white rounded-lg p-2 flex items-center justify-center w-12 h-12 mb-2">XLS</div>;
            case 'word':
                return <div className="bg-blue-500 text-white rounded-lg p-2 flex items-center justify-center w-12 h-12 mb-2">DOC</div>;
            case 'image':
                return <div className="bg-pink-500 text-white rounded-lg p-2 flex items-center justify-center w-12 h-12 mb-2">IMG</div>;
            default:
                return <div className="bg-gray-500 text-white rounded-lg p-2 flex items-center justify-center w-12 h-12 mb-2">FILE</div>;
        }
    };

    // Convert markdown line breaks to JSX line breaks
    const formatContent = (content) => {
        if (!content) return '';

        // Split by line breaks
        const lines = content.split('\n');

        // Process each line
        return lines.map((line, index) => {
            // Handle headers
            if (line.startsWith('# ')) {
                return <h1 key={index} className="text-2xl font-bold mb-4">{line.substring(2)}</h1>;
            } else if (line.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-semibold mb-3">{line.substring(3)}</h2>;
            } else if (line.startsWith('### ')) {
                return <h3 key={index} className="text-lg font-medium mb-2">{line.substring(4)}</h3>;
            }
            // Handle list items
            else if (line.startsWith('- ')) {
                return <li key={index} className="ml-5">{line.substring(2)}</li>;
            } else if (line.match(/^\d+\. /)) {
                return <li key={index} className="ml-5">{line.substring(line.indexOf('. ') + 2)}</li>;
            }
            // Handle empty lines
            else if (line.trim() === '') {
                return <br key={index} />;
            }
            // Regular paragraph
            else {
                return <p key={index} className="mb-2">{line}</p>;
            }
        });
    };

    return (
        <div className="relative flex">
            <motion.div
                className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 flex-1'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                ref={tableRef}
            >
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-xl font-semibold text-gray-100'>Document List</h2>
                    <div className='flex items-center space-x-4'>
                        <div className='relative'>
                            <input
                                type='text'
                                placeholder='Search documents...'
                                className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                onChange={handleSearch}
                                value={searchTerm}
                            />
                            <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                        </div>
                        <PlusCircle
                            className="ml-4 text-green-400 cursor-pointer hover:text-green-300"
                            size={24}
                            onClick={() => setIsAddFormOpen(true)} // ✔️ Correct
                        />
                        <Filter className="text-blue-400 cursor-pointer" size={24} onClick={() => setIsFilterVisible(!isFilterVisible)} />


                        <button
                            className={`p-2 rounded-lg ${viewMode === "list" ? "bg-blue-500" : "bg-gray-700"} text-white`}
                            onClick={() => setViewMode("list")}
                        >
                            <List size={18} />
                        </button>
                        <button
                            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-500" : "bg-gray-700"} text-white`}
                            onClick={() => setViewMode("grid")}
                        >
                            <Grid size={18} />
                        </button>
                    </div>
                </div>

                {viewMode === "list" ? (
                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-700'>
                            <thead className='bg-gray-800'>
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-1/6'>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    const allDocIds = filteredDocuments.map((doc) => doc.id);
                                                    setSelectedDocuments(allDocIds);
                                                } else {
                                                    setSelectedDocuments([]);
                                                }
                                            }}
                                            checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                                        />
                                        {/* Trash Icon for Bulk Delete */}
                                        {selectedDocuments.length > 0 && (
                                            <Trash2
                                                className="inline ml-2 text-red-400 cursor-pointer hover:text-red-300"
                                                size={20}
                                                onClick={handleDeleteSelected}
                                            />
                                        )}
                                    </th>

                                    {/* Other headers */}
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Title</th>
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Category</th>
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Author</th>
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Date</th>
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Status</th>
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Format</th>
                                </tr>
                            </thead>





                            <tbody className='divide-y divide-gray-700'>
                                {filteredDocuments.map((document) => (
                                    <motion.tr
                                        key={document.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => handleRowClick(document)}
                                        className={selectedDocument?.id === document.id ? 'bg-gray-700' : ''}
                                    >
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                            <input
                                                type="checkbox"
                                                checked={selectedDocuments.includes(document.id)}
                                                onChange={() => handleSelectDocument(document.id)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                            {renamingDocumentId === document.id ? (
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        value={newTitle}
                                                        onChange={(e) => setNewTitle(e.target.value)}
                                                        className="bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <button
                                                        className='text-green-400 hover:text-green-300'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            confirmRename(document.id);
                                                        }}
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                    <button
                                                        className='text-red-400 hover:text-red-300'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setRenamingDocumentId(null);
                                                        }}
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                document.title
                                            )}
                                        </td>

                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                            {document.category}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                            {document.author}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                            {document.date}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(document.status)}`}>
                                                {document.status}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                            {document.format}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300 relative'>
                                            <button
                                                className='text-gray-400 hover:text-gray-300'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleDropdown(document.id);
                                                }}
                                            >
                                                <MoreVertical size={18} />
                                            </button>
                                            {dropdownOpen === document.id && (
                                                <div className='absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10'>
                                                    <div className='py-1'>
                                                        <button
                                                            className='w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white flex items-center'
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleOpenPreview(document);
                                                            }}
                                                        >
                                                            <Eye size={16} className='mr-2' /> Open/Preview
                                                        </button>
                                                        <button
                                                            className='w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white flex items-center'
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDownload(document);
                                                            }}
                                                        >
                                                            <Download size={16} className='mr-2' /> Download
                                                        </button>
                                                        <button
                                                            className='w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white flex items-center'
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleRename(document);
                                                            }}
                                                        >
                                                            <Edit size={16} className='mr-2' /> Rename
                                                        </button>
                                                        <button
                                                            className='w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white flex items-center'
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleShare(document);
                                                            }}
                                                        >
                                                            <Share2 size={16} className='mr-2' /> Share
                                                        </button>
                                                        <button
                                                            className='w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600 hover:text-red-300 flex items-center'
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(document);
                                                            }}
                                                        >
                                                            <Trash2 size={16} className='mr-2' /> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {filteredDocuments.map((document) => (
                            <motion.div
                                key={document.id}
                                className='bg-gray-700 p-4 rounded-lg shadow-lg cursor-pointer'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => handleRowClick(document)}
                            >
                                <h3 className='text-lg font-semibold text-gray-100'>{document.title}</h3>
                                <p className='text-sm text-gray-300'>{document.category}</p>
                                <p className='text-sm text-gray-300'>{document.author}</p>
                                <p className='text-sm text-gray-300'>{document.date}</p>
                                <p className='text-sm font-medium'>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(document.status)}`}>
                                        {document.status}
                                    </span>
                                </p>
                                <p className='text-sm text-gray-300'>{document.format}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>

            {selectedDocument && (
                <motion.div
                    className='absolute top-0 right-0 bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-xl rounded-l-3xl pt-10 pb-10 pl-8 pr-8 border-l-4 border-transparent z-20'
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                    style={{ height: tableRef.current ? tableRef.current.clientHeight : 'auto' }}
                >
                    <button
                        className='absolute top-4 right-4 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center'
                        onClick={() => setSelectedDocument(null)}
                    >
                        ×
                    </button>
                    <div className='flex flex-col items-center mb-8'>
                        <div className={`w-20 h-18 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 ${selectedDocument.format === 'PPT' ? 'bg-orange-500' :
                            selectedDocument.format === 'Excel' ? 'bg-green-500' :
                                selectedDocument.format === 'Word' ? 'bg-blue-500' :
                                    selectedDocument.format === 'PDF' ? 'bg-red-500' :
                                        selectedDocument.format === 'Image' ? 'bg-pink-500' : 'bg-gray-500'
                            }`}>
                            {selectedDocument.format.toUpperCase()}
                        </div>
                        <h3 className='text-xl font-bold text-white'>{selectedDocument.title}</h3>
                    </div>
                    <div className='space-y-2 text-gray-300'>
                        <div className='flex items-center gap-20'>
                            <span>Category</span> <strong className='text-white'>{selectedDocument.category}</strong>
                        </div>
                        <div className='flex items-center gap-24'>
                            <span >Format</span> <strong className='text-white'>{selectedDocument.format}</strong>
                        </div>
                        <div className='flex items-center gap-29'>
                            <span >Size</span> <strong className='text-white'>{selectedDocument.size}</strong>
                        </div>
                        <div className='flex items-center gap-12'>
                            <span className='text-white'>Last modified</span> <strong className='text-white'>{selectedDocument.date}</strong>
                        </div>
                    </div>
                </motion.div>
            )}

            {isPreviewOpen && previewDocument && (
                <motion.div
                    className="fixed inset-0 bg-gray-700 bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-gray-900 rounded-xl w-3/5 max-w-3xl max-h-3/4 overflow-hidden flex flex-col shadow-2xl border border-gray-700"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <div className="bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
                            <div className="flex items-center space-x-4">
                                {getIconByFormat(previewDocument.format)}
                                <div>
                                    <h3 className="text-xl font-bold text-white">{previewDocument.title}</h3>
                                    <p className="text-sm text-gray-400">{previewDocument.format} • {previewDocument.size}</p>
                                </div>
                            </div>
                            <button
                                className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-2 rounded-lg"
                                onClick={handleClosePreview}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto p-6 bg-white text-gray-900 min-h-[300px]">
                            {isEditingPreview ? (
                                <textarea
                                    className="w-full p-3 border rounded-md resize-none min-h-[300px]"
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                />
                            ) : (
                                formatContent(previewDocument.content || "No content available.")
                            )}
                        </div>
                        <div className="p-4 bg-gray-800 text-right">
                            {isEditingPreview ? (
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                    onClick={handleSaveEdit}
                                >
                                    Save Changes
                                </button>
                            ) : (
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    onClick={handleEditContent}
                                >
                                    Edit Content
                                </button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
            {isAddFormOpen && (
                <AddDocumentForm
                    onClose={() => setIsAddFormOpen(false)}
                    onAddDocument={handleAddDocument}
                />
            )}


        </div>
    );
}
export default DocumentsTable;