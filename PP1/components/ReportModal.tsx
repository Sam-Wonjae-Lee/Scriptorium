import React, { useEffect, useState } from "react";
import { showAlert } from "@/components/Alert";
import { ReportType } from "@/utils/types";
import ActionButton from "./ActionButton";

interface ReportModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (reportType: string, description: string) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const [reportType, setReportType] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [reportTypes, setReportTypes] = useState<ReportType[]>([]);

  const handleReportTypeChange = (reportTypeId: string) => {
    setReportType(reportTypeId);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    if (!reportType) {
      showAlert("Please select a report type", "error");
      return;
    }
    onSubmit(reportType, description);
    handleClose();
  };

  const fetchReportTypes = async () => {
    try {
      const response = await fetch("/api/content-monitoring/reports/report");
      const data = await response.json();
      setReportTypes(data.reports);
    } catch (error) {
      console.log(error);
      showAlert("Failed to fetch report types", "error");
    }
  };

  const handleClose = () => {
    setReportType(null);
    setDescription("");
    onHide();
  };

  useEffect(() => {
    fetchReportTypes();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-background-light dark:bg-background-dark border border-text-light dark:border-text-dark rounded-xl p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-text-light dark:text-text-dark">
          Report Issue
        </h2>
        <form>
          <div className="form-group mb-4">
            <label
              htmlFor="reportType"
              className="block mb-1 text-text-light dark:text-text-dark"
            >
              Report Type
            </label>
            <div>
              {reportTypes.map((type) => (
                <div key={type.id} className="mb-2 flex gap-2 items-center">
                  <input
                    type="radio"
                    id={type.id}
                    name="reportType"
                    value={type.id}
                    onChange={() => {
                      handleReportTypeChange(type.id);
                    }}
                    className="peer form-radio text-hot_pink-normal focus:ring-transparent"
                  />
                  <label
                    htmlFor={type.id}
                    className="flex items-center cursor-pointer text-text-light dark:text-text-dark peer-checked:text-hot_pink-normal"
                  >
                    {type.message}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-1 text-text-light dark:text-text-dark"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={handleDescriptionChange}
              className="border bg-element_background-light dark:bg-element_background-dark text-text-light dark:text-text-dark text-sm focus:ring focus:ring-hot_pink-normal border-text-light dark:border-text-dark rounded-md p-2 w-full"
            ></textarea>
          </div>
        </form>
        <div className="flex justify-center gap-2">
          <ActionButton onClick={handleSubmit} text="Submit" size="small" />
          <ActionButton
            onClick={handleClose}
            text="Cancel"
            size="small"
            secondaryButton
          />
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
