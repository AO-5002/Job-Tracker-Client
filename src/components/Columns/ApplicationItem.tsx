import type { Application } from "@/utility/schema/Application";
import exampleLogo from "@/images/googleLogo.png";
import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";

import { createPortal } from "react-dom";

export default function ApplicationItem(item: Application) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
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
        currentStatus: item.status, // Current status for easy access
        applicationId: item.id, // ID for the API call
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
      ref={ref}
      className={`w-full h-auto bg-white text-black rounded-md p-4 flex flex-col items-center gap-2 cursor-grab ${
        isDragging ? "opacity-50" : ""
      } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
    >
      {preview && createPortal(<ApplicationPreview item={item} />, preview)}
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
