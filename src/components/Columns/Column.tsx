import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import ApplicationList from "./ApplicationList";
import { useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateApplication } from "@/utility/api/ApplicationAPI";
import {
  type Application,
  type ApplicationUpdate,
  type StatusEnumType,
} from "@/utility/schema/Application";
import AddApplication from "../CRUDButtons/AddApplication";

interface DataProps {
  name: StatusEnumType; // match enum values
  id: number;
}

export default function Column({ name }: DataProps) {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({
      sourceData,
      destinationStatus,
    }: {
      sourceData: Application | undefined;
      destinationStatus: StatusEnumType;
    }) => {
      const token = await getAccessTokenSilently();
      const sourceId = sourceData?.id;
      const sourceStatus = sourceData?.status;

      if (sourceStatus !== destinationStatus && sourceId) {
        const newStatusDataObject: ApplicationUpdate = {
          status: destinationStatus,
        };

        await updateApplication(token, sourceId, newStatusDataObject);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = columnRef.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      getData: () => ({
        type: "column",
        status: name,
      }),
      onDrop({ source, self }) {
        const targetStatus = self.data.status as StatusEnumType;
        const applicationSource = source.data.applicationData as
          | Application
          | undefined;

        updateStatus({
          sourceData: applicationSource,
          destinationStatus: targetStatus,
        });
      },
    });
  }, [name, updateStatus]);

  return (
    <div
      ref={columnRef}
      className={`bg-zinc-800 text-white h-full p-4 shadow-lg rounded-lg flex flex-col items-center gap-4`}
    >
      <span className="flex flex-row justify-between w-full border-b items-center py-2">
        <h1 className="text-lg font-light w-full">{name}</h1>
        <AddApplication status={name} />
      </span>
      <ApplicationList status={name} />
    </div>
  );
}
