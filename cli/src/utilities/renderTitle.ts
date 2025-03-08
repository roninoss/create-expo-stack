import figlet from 'figlet';
import gradient from 'gradient-string';

import { TITLE_TEXT } from '../constants';
import { Toolbox } from 'gluegun/build/types/domain/toolbox';

// expo stack orange gradient
const theme = {
  orange: '#f97316',
  between: 'f2940f',
  yellow: '#eab308'
};

// // rn new blue gradient
// const rnNewTheme = {
//   blue: '#3b82f6',
//   between: '#2563eb',
//   indigo: '#4f46e5'
// };

export async function renderTitle(toolbox: Toolbox) {
  // const isRnNew = process.argv[1]?.includes('rn-new');
  const cesGradient = gradient(Object.values(theme));

  const {
    print: { error }
  } = toolbox;

  await figlet.text(
    TITLE_TEXT,
    {
      font: 'Standard',
      horizontalLayout: 'fitted',
      verticalLayout: 'fitted',
      width: 45,
      whitespaceBreak: true
    },
    (err, data) => {
      if (err) {
        error('Something went wrong...');
        return;
      }

      console.log(cesGradient.multiline(data));
    }
  );

  // TODO: this is hacky, figure out a way to do this better
  // set timeout for 1 second so that the title can render before the CLI runs
  await new Promise((resolve) => setTimeout(resolve, 200));
}
