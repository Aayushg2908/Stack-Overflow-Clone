import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="mt-20 w-full flex items-center justify-center animate-spin">
      <Loader2 className="w-20 h-20" />
    </div>
  )
}

export default Loading;
