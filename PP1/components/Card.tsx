import React from "react";

interface CardProps {
  id: number;
  title: string;
  author: { firstName: string; lastName: string; id: number };
  description: string;
  tags: { name: string; color: string; id: number }[];
  rating?: { upvotes: number; downvotes: number };
  language?: string;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  author,
  description,
  tags,
  rating,
  language,
}) => {
  const truncateDescription = (desc: string) => {
    const cutoffLength = language ? 100 : 250;
    return desc.length > cutoffLength
      ? desc.substring(0, cutoffLength) + "..."
      : desc;
  };

  const getForkIcon = () => {
    return (
      <svg
        viewBox="0 -0.5 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-text-light dark:text-text-dark"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.5 5C5.5 3.89543 6.39543 3 7.5 3C8.60457 3 9.5 3.89543 9.5 5C9.5 6.10457 8.60457 7 7.5 7C6.96957 7 6.46086 6.78929 6.08579 6.41421C5.71071 6.03914 5.5 5.53043 5.5 5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.5 5C15.5 3.89543 16.3954 3 17.5 3C18.6046 3 19.5 3.89543 19.5 5C19.5 6.10457 18.6046 7 17.5 7C16.3954 7 15.5 6.10457 15.5 5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.5 19C10.5 17.8954 11.3954 17 12.5 17C13.6046 17 14.5 17.8954 14.5 19C14.5 20.1046 13.6046 21 12.5 21C11.9696 21 11.4609 20.7893 11.0858 20.4142C10.7107 20.0391 10.5 19.5304 10.5 19Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.25002 7C8.25002 6.58579 7.91423 6.25 7.50002 6.25C7.08581 6.25 6.75002 6.58579 6.75002 7H8.25002ZM7.50002 10.03L8.25002 10.0331V10.03H7.50002ZM7.95302 11.479L8.57182 11.0552L8.56771 11.0493L7.95302 11.479ZM9.78602 12.454L9.78043 13.204H9.78602V12.454ZM15.214 12.454V13.204C15.2216 13.204 15.2291 13.2039 15.2366 13.2037L15.214 12.454ZM17.5 10.03H16.75C16.75 10.0371 16.7501 10.0442 16.7503 10.0513L17.5 10.03ZM18.25 7C18.25 6.58579 17.9142 6.25 17.5 6.25C17.0858 6.25 16.75 6.58579 16.75 7H18.25ZM11.75 17C11.75 17.4142 12.0858 17.75 12.5 17.75C12.9142 17.75 13.25 17.4142 13.25 17H11.75ZM13.25 12.455C13.25 12.0408 12.9142 11.705 12.5 11.705C12.0858 11.705 11.75 12.0408 11.75 12.455H13.25ZM6.75002 7V10.03H8.25002V7H6.75002ZM6.75003 10.0269C6.74727 10.6999 6.95276 11.3572 7.33833 11.9087L8.56771 11.0493C8.3595 10.7514 8.24852 10.3965 8.25001 10.0331L6.75003 10.0269ZM7.33425 11.9028C7.8876 12.7107 8.80124 13.1967 9.78043 13.204L9.79161 11.704C9.30333 11.7004 8.84773 11.458 8.57179 11.0552L7.33425 11.9028ZM9.78602 13.204H15.214V11.704H9.78602V13.204ZM15.2366 13.2037C16.9503 13.152 18.2985 11.7224 18.2497 10.0087L16.7503 10.0513C16.7756 10.938 16.078 11.6776 15.1914 11.7043L15.2366 13.2037ZM18.25 10.03V7H16.75V10.03H18.25ZM13.25 17V12.455H11.75V17H13.25Z"
          fill="currentColor"
        />
      </svg>
    );
  };

  const getDownvoteIcon = () => {
    return (
      <svg
        fill="currentColor"
        className="text-text-light dark:text-text-dark"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z" />
      </svg>
    );
  };

  const getUpvoteIcon = () => {
    return (
      <svg
        fill="currentColor"
        className="text-text-light dark:text-text-dark"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
      </svg>
    );
  };

  const renderCodeTemplateSection = () => {
    if (!language) return null;
    return (
      <div className="flex justify-between">
        <span>{language}</span>
        <button
          className="border flex gap-1 p-1 rounded border-text-light dark:border-text-dark"
          // TODO: Implement fork template functionality
          onClick={() => console.log("Fork template " + id)}
        >
          <div className="w-6 h-6">{getForkIcon()}</div>
          <span>Fork template</span>
        </button>
      </div>
    );
  };

  const renderRatingSection = () => {
    return (
      <div className="flex gap-2 absolute bottom-2 right-2">
        <div className="flex items-center gap-1">
          <div
            className="h-5 w-5 cursor-pointer"
            onClick={() => {
              console.log("Upvote");
            }}
          >
            {getUpvoteIcon()}
          </div>
          <span>{rating?.upvotes}</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="h-5 w-5 cursor-pointer"
            onClick={() => {
              console.log("Downvote");
            }}
          >
            {getDownvoteIcon()}
          </div>
          <span>{rating?.downvotes}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative rounded p-2 h-56 max-w-96 text-text-light dark:text-text-dark border-2 border-text-light dark:border-text-dark bg-element_background-light dark:bg-element_background-dark">
      {language && renderCodeTemplateSection()}
      <h2 className="text-xl mb-2">{title}</h2>
      <h3 className="text-xs mb-2">
        {/* TODO change this link to a like to the profile page of this user */}
        by{" "}
        <span
          className="cursor-pointer"
          onClick={() => {
            console.log("Search for user id " + author.id);
          }}
        >
          {author.firstName} {author.lastName}
        </span>
      </h3>
      <div className="flex gap-1 mb-2">
        {tags.map((tag, index) => (
          <div
            key={tag.id}
            onClick={() => console.log(`Search for ${tag.name}, id: ${tag.id}`)}
            className="px-2 py-1 rounded-full flex items-center justify-center cursor-pointer bg-background_secondary-light dark:bg-background_secondary-dark"
          >
            <span className="uppercase text-xs" style={{ color: tag.color }}>
              {tag.name}
            </span>
          </div>
        ))}
      </div>
      <p className="text-sm">{truncateDescription(description)}</p>
      {rating && renderRatingSection()}
    </div>
  );
};

export default Card;
