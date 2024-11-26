import NavBar from "@/components/NavBar";
import ReportCard from "@/components/ReportCard";
import { useState } from "react";

interface Report {
    id: number;
    contentId: number; 
    contentType: "blogs" | "comments";
    author: { firstName: string; lastName: string; id: number };  
    reportType: string;   
    reportDescription: string;  
}

const Reports = () => {
    const [filterType, setFilterType] = useState<"blogs" | "comments">("blogs");

    const handleFlag = (id: number) => {
        // Implement logic here
        console.log(`Report ${id} flagged.`);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterType(event.target.value as "blogs" | "comments");
    };

    const reports: Report[] = [
        {
            id: 1,
            contentType: "blogs",
            contentId: 101,
            author: { firstName: "Alice", lastName: "Smith", id: 201 },
            reportType: "Spam",
            reportDescription: "This blog post contains spam links.",
        },
        {
            id: 2,
            contentType: "comments",
            contentId: 202,
            author: { firstName: "Bob", lastName: "Johnson", id: 202 },
            reportType: "Harassment",
            reportDescription: "The comment contains harassing language.",
        },
        {
            id: 3,
            contentType: "blogs",
            contentId: 103,
            author: { firstName: "Carol", lastName: "Williams", id: 203 },
            reportType: "Inappropriate Content",
            reportDescription: "This blog post has inappropriate content.",
        },
        {
            id: 4,
            contentType: "comments",
            contentId: 204,
            author: { firstName: "David", lastName: "Brown", id: 204 },
            reportType: "Offensive Language",
            reportDescription: "The comment contains offensive language.",
        },
    ];

    const filteredReports = reports.filter((report) =>
        filterType === "blogs" ? report.contentType === "blogs" : report.contentType === "comments"
    );

    return (
        <div className="min-h-screen w-full flex flex-col bg-background-light dark:bg-background-dark p-4">
            <NavBar />

            {/* Blogs & Comments Filter Dropdown */}
            <div className="mt-8 mb-6 flex items-start">
                <select
                    id="reportFilter"
                    value={filterType}
                    onChange={handleFilterChange}
                    className="p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                    <option value="blogs">Blogs</option>
                    <option value="comments">Comments</option>
                </select>
            </div>

            {/* Hardcoded reported cards */}
            <div className="space-y-4">
                {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                        <ReportCard
                            key={report.id}
                            id={report.id}
                            contentType={report.contentType}
                            contentId={report.contentId}
                            author={report.author}
                            reportType={report.reportType}
                            reportDescription={report.reportDescription}
                            onFlag={() => handleFlag(report.id)}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No reports available for the selected category.</p>
                )}
            </div>
        </div>
    );
};

export default Reports;