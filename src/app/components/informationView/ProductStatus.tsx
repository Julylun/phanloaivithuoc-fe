export enum ProductStatusEnum {
    NORMAL = 'Normal', BROKEN = 'Broken', MISSING = 'Missing', MISSSING_CORNER = 'Missing Corner', BROKEN_MISSING_CORNER = 'Broken Pill, Missing Corner'
}

type ProductStatusProp = {
    status: ProductStatusEnum
}
export default function ProductStatus({status}: ProductStatusProp) {
    return (
        <div className="flex flex-row gap-2 justify-center">
            <p className="text-black font-extrabold">Product Status: </p>
            <p className={`font-extrabold ${(status == ProductStatusEnum.NORMAL) ? 'text-green-600' : (status == ProductStatusEnum.MISSING || status == ProductStatusEnum.MISSSING_CORNER || status == ProductStatusEnum.BROKEN_MISSING_CORNER) ? 'text-yellow-500' : 'text-red-600'}`}>{status}</p>
        </div>
    )
}