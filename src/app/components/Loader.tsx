import { Oval } from "react-loader-spinner";

export default function Loader({ className }: { className?: string }) {
  return (
    <Oval
      visible={true}
      height="24"
      width="24"
      color="black"
      ariaLabel="oval-loading"
      wrapperClass={className}
    />
  );
}
