type CertificateCardSkeletonProps = {
  column: number;
};

const CertificateCardSkeleton = ({ column }: CertificateCardSkeletonProps) => {
  return (
    <>
      {Array(column)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="w-full">
            <div className="h-[200px] w-full animate-pulse rounded bg-gray-200 shadow-md"></div>
          </div>
        ))}
    </>
  );
};

export default CertificateCardSkeleton;
