import { Eye } from "lucide-react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

function ViewCoverLetter() {
  return (
    <Button variant="outline">
      <span className="flex flex-row gap-1 items-center hover:cursor-pointer">
        <Eye height={12} width={12} />
        <p>Cover Letter</p>
      </span>
    </Button>
  );
}

const NoCoverLetter = () => {
  return (
    <Button variant="outline">
      <span className="flex flex-row gap-1 items-center hover:cursor-pointer">
        <Plus height={12} width={12} />
        <p>Cover Letter</p>
      </span>
    </Button>
  );
};

export { ViewCoverLetter, NoCoverLetter };
