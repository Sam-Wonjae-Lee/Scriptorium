import React from "react";
import { useRouter } from "next/router";

interface ReportCardProps {
  id: number;
  contentId: number;  // ID of the reported blog or comment
  contentType: "blogs" | "comments";
  author: { firstName: string; lastName: string; id: number };  // Person who reported
  reportType: string;   // Report message from Reports table
  reportDescription: string;  // Report message from BlogReports or CommentReports table
  onFlag: () => void;  // Flag the reported blog or comment
}

const ReportCard: React.FC<ReportCardProps> = ({
    id,
    contentId,
    contentType,
    author,
    reportType,
    reportDescription,
    onFlag,
}) => {
    const router = useRouter();
    const handleDirect = () => {
        // handle route push logic here
    }

    return (
        <div className="relative rounded p-4 h-40 text-text-light dark:text-text-dark border-2 border-text-light dark:border-text-dark bg-element_background-light dark:bg-element_background-dark flex flex-row justify-between items-center">
            {/* Report Information */}
            <div className="flex flex-row items-center space-x-4">
                <h3 className="text-xl font-semibold">{reportType}</h3>
                <p className="text-sm">{reportDescription}</p>
                <p className="text-xs text-gray-500">
                Reported by: {author.firstName} {author.lastName}
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
                <button
                onClick={handleDirect}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                aria-label="View Reported Content"
                >
                View Content
                </button>
                <button
                onClick={onFlag}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                aria-label="Flag Report"
                >
                    Flag
                </button>
            </div>
        </div>
    );
};

export default ReportCard;