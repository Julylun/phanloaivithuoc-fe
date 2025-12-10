export enum ProductStatusEnum {
  NO_RESULT = -1,
  NORMAL = 0,
  BROKEN = 1,
  MISSING = 2,
  MISSSING_CORNER = 3,
  BROKEN_MISSING_CORNER = 4,
  BROKEN_MISSING_PILL = 5,
}

export const getProductStatusLabel = (status: ProductStatusEnum): string =>
  ({
    [-1]: "No Result",
    [0]: "Normal",
    [1]: "Broken",
    [2]: "Missing Pill",
    [3]: "Missing Corner",
    [4]: "Broken Pill, Missing Corner",
    [5]: "Broken Pill, Missing Pill",
  })[status] ?? "Unknown";

type ProductStatusProp = {
  status: ProductStatusEnum;
};
export default function ProductStatus({ status }: ProductStatusProp) {
  return (
    <div className="flex flex-row gap-2 justify-center">
      <p className="text-black font-extrabold">Product Status: </p>
      <p
        className={`font-extrabold ${status == ProductStatusEnum.NORMAL ? "text-green-600" : status == ProductStatusEnum.MISSING || status == ProductStatusEnum.MISSSING_CORNER || status == ProductStatusEnum.BROKEN_MISSING_CORNER || status == ProductStatusEnum.NO_RESULT ? "text-yellow-500" : "text-red-600"}`}
      >
        {getProductStatusLabel(status)}
      </p>
    </div>
  );
}
