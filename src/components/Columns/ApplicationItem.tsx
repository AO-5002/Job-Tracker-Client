import type { Application } from "@/utility/schema/Application";
import exampleLogo from "@/images/googleLogo.png";
import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { GripVertical } from "lucide-react";
import { createPortal } from "react-dom";
import { Eye } from "lucide-react";
import { FilePenLine } from "lucide-react";
import { EditApplication } from "../CRUDButtons/EditApplication";

export default function ApplicationItem(item: Application) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [preview, setPreview] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    return draggable({
      element,
      getInitialData: () => ({
        type: "application",
        applicationData: item,
        currentStatus: item.status,
        applicationId: item.id,
      }),

      onDragStart() {
        setIsDragging(() => true);
      },

      onDrop() {
        setIsDragging(() => false);
        setPreview(null);
      },

      onGenerateDragPreview({ nativeSetDragImage }) {
        setCustomNativeDragPreview({
          nativeSetDragImage,
          render({ container }: any) {
            setPreview(container);
          },
        });
      },
    });
  }, [item]);

  return (
    <div
      className={`w-full bg-white text-black rounded-md p-4 flex flex-col items-center gap-2 transition-all duration-300 ease-in-out ${
        isDragging ? "opacity-50" : ""
      } ${isDragging ? "cursor-grabbing" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        height: isHovered ? "180px" : "72px", // Expand from 80px to 120px
      }}
    >
      {preview && createPortal(<ApplicationPreview item={item} />, preview)}

      <div className="h-auto w-full flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-4">
          <div className="cursor-grab" ref={ref}>
            <GripVertical />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-zinc-400 text-xs font-bold">
              {item.company_name}
            </p>
            <h1 className="text-base">{item.job_title}</h1>
          </div>
        </div>
        <div className="h-10 w-10 flex-shrink-0">
          <img
            src={exampleLogo}
            alt={`${item.company_name} logo`}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div
        className={`mt-1 w-full h-full flex flex-col items-center justify-start gap-4 transition-opacity duration-300 ${
          isHovered ? "opacity-100 delay-150" : "opacity-0"
        }`}
      >
        <div className="w-full h-full flex flex-row items-start justify-around gap-4 text-xs text-zinc-400 font-bold">
          <EditApplication>
            <span className="flex flex-row gap-1 items-center hover:cursor-pointer">
              <FilePenLine height={12} width={12} />
              <p> Edit</p>
            </span>
          </EditApplication>
          <EditApplication>
            <span className="flex flex-row gap-1 items-center hover:cursor-pointer">
              <Eye height={12} width={12} />
              <p> Resume</p>
            </span>
          </EditApplication>
          <EditApplication>
            <span className="flex flex-row gap-1 items-center hover:cursor-pointer">
              <Eye height={12} width={12} />
              <p> Cover Letter</p>
            </span>
          </EditApplication>
        </div>
        <div className="w-full flex flex-col items-start gap-1 text-xs text-zinc-400 ">
          <p>
            <strong>Applied:</strong> {item.application_date ?? "Not Applied"}
          </p>
          <p>
            <strong>Last Updated: </strong>
            {item.updated_at}
          </p>
        </div>
      </div>
    </div>
  );
}

const ApplicationPreview = ({ item }: { item: Application }) => {
  return (
    <div className="w-64 h-auto bg-white text-black rounded-md p-4 shadow-lg border-2 border-blue-400 transform rotate-3">
      <div className="h-auto w-full flex flex-row justify-between items-start">
        <div className="flex flex-col justify-center">
          <p className="text-zinc-400 text-xs font-bold">{item.company_name}</p>
          <h1 className="text-base">{item.job_title}</h1>
        </div>
        <div className="h-10 w-10 flex-shrink-0">
          <img
            src={exampleLogo}
            alt={`${item.company_name} logo`}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
