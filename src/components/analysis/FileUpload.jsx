import { useState, useCallback } from 'react'
import { Upload, File, X, Check } from 'lucide-react'
import Card from '../ui/Card'

const FileUpload = ({ onFileSelect, acceptedTypes = '.pdf,.docx' }) => {
    const [isDragActive, setIsDragActive] = useState(false)
    const [file, setFile] = useState(null)

    const handleDrag = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragActive(true)
        } else if (e.type === 'dragleave') {
            setIsDragActive(false)
        }
    }, [])

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0]
            handleFile(droppedFile)
        }
    }, [])

    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const handleFile = (selectedFile) => {
        setFile(selectedFile)
        onFileSelect(selectedFile)
    }

    const removeFile = () => {
        setFile(null)
        onFileSelect(null)
    }

    return (
        <Card className={`transition-all duration-200 ${isDragActive ? 'border-primary-500 ring-2 ring-primary-200' : ''}`}>
            {!file ? (
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className="relative"
                >
                    <input
                        type="file"
                        accept={acceptedTypes}
                        onChange={handleChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center py-12">
                        <div className="mx-auto h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                            <Upload className="h-8 w-8 text-primary-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Upload your resume
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Drag and drop your file here, or click to browse
                        </p>
                        <p className="text-sm text-gray-400">
                            Supported formats: PDF, DOCX (Max 5MB)
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <File className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <button
                            onClick={removeFile}
                            className="p-1 hover:bg-red-100 rounded-full transition-colors"
                        >
                            <X className="h-5 w-5 text-red-500" />
                        </button>
                    </div>
                </div>
            )}
        </Card>
    )
}

export default FileUpload