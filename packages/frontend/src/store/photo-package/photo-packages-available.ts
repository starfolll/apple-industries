import type { TPhotoPackage, TPhotoPackageType } from './photo-package'
import { PhotoPackageLabel, PhotoPackagePrice, PhotoPackageType } from './photo-package'

function createPhotoPackage(type: TPhotoPackageType): TPhotoPackage {
  return {
    id: crypto.randomUUID(),
    type,
    price: PhotoPackagePrice[type],
    label: PhotoPackageLabel[type],
  }
}

export const PhotoPackagesAvailable = Object.freeze([
  createPhotoPackage(PhotoPackageType.print),
  createPhotoPackage(PhotoPackageType.panorama),
  createPhotoPackage(PhotoPackageType.strip),
] satisfies TPhotoPackage[])

export function getRadomPhotoPackage(): TPhotoPackage {
  const randomIndex = Math.floor(Math.random() * PhotoPackagesAvailable.length)
  return PhotoPackagesAvailable[randomIndex]
}

export function getRandomPhotoPackageId(): TPhotoPackage['id'] {
  return getRadomPhotoPackage().id
}
