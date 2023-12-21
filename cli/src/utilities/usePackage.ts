import { AvailablePackages } from '../types';

export function usePackage(packageName: string, packages: AvailablePackages[]): boolean {
  return packages.find((p) => p.name === packageName) ? true : false;
}
