import { Eye } from "lucide-react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

function ViewResume() {
  return (
    <Button variant="outline">
      <span className="flex flex-row gap-1 items-center hover:cursor-pointer">
        <Eye height={12} width={12} />
        <p>Resume</p>
      </span>
    </Button>
  );
}

const NoResume = () => {
  return (
    <Button variant="outline">
      <span className="flex flex-row gap-1 items-center hover:cursor-pointer">
        <Plus height={12} width={12} />
        <p>Resume</p>
      </span>
    </Button>
  );
};

export { ViewResume, NoResume };
