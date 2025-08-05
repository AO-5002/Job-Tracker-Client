import type { Application } from "@/utility/schema/Application";
import exampleLogo from "@/images/googleLogo.png";
import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { GripVertical } from "lucide-react";
import { createPortal } from "react-dom";
import { FilePenLine } from "lucide-react";
import { EditApplication } from "../CRUDButtons/EditApplication";
import { ViewResume, NoResume } from "../CRUDButtons/ViewResume";
import { ViewCoverLetter, NoCoverLetter } from "../CRUDButtons/ViewCoverLetter";

export default function ApplicationItem(item: Application) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [preview, setPreview] = useState<HTMLElement | null>(null);

  // Add timeout ref for hover delay
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    // Global drag start listener to collapse this item when ANY drag starts
    const handleGlobalDragStart = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setIsHovered(false);
    };

    // Listen for global drag events
    document.addEventListener("dragstart", handleGlobalDragStart);

    const cleanup = draggable({
      element,
      getInitialData: () => ({
        type: "application",
        applicationData: item,
        currentStatus: item.status,
        applicationId: item.id,
      }),

      onDragStart() {
        setIsDragging(() => true);
        // Clear any pending hover expansion when dragging starts
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        setIsHovered(false);
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

    return () => {
      cleanup();
      document.removeEventListener("dragstart", handleGlobalDragStart);
    };
  }, [item]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    // Don't expand if currently dragging
    if (isDragging) return;

    // Set a delay before expanding (500ms)
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    // Clear the timeout if mouse leaves before delay completes
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(false);
  };

  return (
    <div
      className={`w-full bg-white text-black rounded-md p-4 flex flex-col items-center gap-2 transition-all duration-300 ease-in-out ${
        isDragging ? "opacity-50" : ""
      } ${isDragging ? "cursor-grabbing" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        height: isHovered ? "180px" : "72px",
        pointerEvents: isDragging ? "none" : "auto", // Disable pointer events when dragging
        position: "relative",
        zIndex: isHovered ? 10 : 1, // Higher z-index when expanded
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
          <EditApplication data={item}>
            <span className="flex flex-row gap-1 items-center hover:cursor-pointer">
              <FilePenLine height={12} width={12} />
              <p> Edit</p>
            </span>
          </EditApplication>
          {item.resume_url ? <ViewResume /> : <NoResume />}
          {item.resume_url ? <ViewCoverLetter /> : <NoCoverLetter />}
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
