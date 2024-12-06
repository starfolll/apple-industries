export const PhotoPackageType = Object.freeze({
  print: 'print',
  panorama: 'panorama',
  strip: 'strip',
} as const)
export type TPhotoPackageType = keyof typeof PhotoPackageType

export const PhotoPackagePrice = Object.freeze({
  [PhotoPackageType.print]: 5,
  [PhotoPackageType.panorama]: 7,
  [PhotoPackageType.strip]: 5,
} as const satisfies Record<TPhotoPackageType, number>)

export const PhotoPackageLabel = Object.freeze({
  [PhotoPackageType.print]: '(4x6 photo)',
  [PhotoPackageType.panorama]: '(6x12 prints)',
  [PhotoPackageType.strip]: '(two 2x6 photo strips)',
} as const satisfies Record<TPhotoPackageType, string>)

export type TPhotoPackage = {
  id: string

  type: keyof typeof PhotoPackageType

  price: number
  label: string
}
