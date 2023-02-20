import { CgSpinner } from "react-icons/cg";
export function Loading() {
    return (
        <div className="flex h-full items-center justify-center text-2xl text-blue-500">
            <CgSpinner className="animate-spin" />
        </div>
    );
}
