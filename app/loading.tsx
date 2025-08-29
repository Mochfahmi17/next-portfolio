import LoaderCircle from "@/components/loader-circle";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="h-8 w-8">
        <LoaderCircle />
      </div>
    </div>
  );
}
