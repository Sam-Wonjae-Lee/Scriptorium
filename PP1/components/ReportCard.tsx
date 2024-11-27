import React from "react";
import { useRouter } from "next/router";
import ActionButton from "./ActionButton";

interface ReportCardProps {
  contentId: number;
  contentType: "blog" | "comment";
  author: { firstName: string; lastName: string; id: number };
  content: string;
  numReports: number;
  blogId?: number;
}

const ReportCard: React.FC<ReportCardProps> = ({
  contentId,
  contentType,
  author,
  content,
  numReports,
  blogId,
}) => {
  const router = useRouter();
  const handleDirect = () => {
    router.push(`report/${contentType}/${contentId}`);
  };

  return (
    <div className="relative rounded p-4 h-auto md:h-40 text-text-light dark:text-text-dark border-2 border-text-light dark:border-text-dark bg-element_background-light dark:bg-element_background-dark flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
      {/* Report Information */}
      <div className="flex flex-col items-start space-y-2">
        <h3
          className="text-lg md:text-xl font-semibold hover:underline cursor-pointer"
          onClick={() =>
            router.push(`/blogs/${contentType === "blog" ? contentId : blogId}`)
          }
        >
          {content}
        </h3>
        <p className="text-xs ">
          Posted by:{" "}
          <span
            className="hover:underline cursor-pointer"
            onClick={() => router.push(`/profile/${author.id}`)}
          >
            {author.firstName} {author.lastName}
          </span>
        </p>
        <p className="text-xs font-bold ">Number of Reports: {numReports}</p>
      </div>

      {/* Action Buttons */}
      <ActionButton
        text="View Content"
        onClick={handleDirect}
        outlineButton
        size="medium"
      />
    </div>
  );
};

export default ReportCard;
