import { CliResults } from '../types';

export default function clearNavigationPackages(cliResults: CliResults): CliResults {
  const stylingPackageIndex = cliResults.packages.findIndex((p) => p.type === 'navigation');
  if (stylingPackageIndex !== -1) {
    cliResults.packages.splice(stylingPackageIndex, 1);
  }
  return cliResults;
}
