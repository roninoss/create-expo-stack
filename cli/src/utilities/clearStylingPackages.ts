import { CliResults } from '../types';

export default function clearStylingPackages(cliResults: CliResults): CliResults {
  const stylingPackageIndex = cliResults.packages.findIndex((p) => p.type === 'styling');
  if (stylingPackageIndex !== -1) {
    cliResults.packages.splice(stylingPackageIndex, 1);
  }
  return cliResults;
}
