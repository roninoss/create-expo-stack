import figlet from 'figlet';
import gradient from 'gradient-string';

import { TITLE_TEXT } from '../constants';
import { Toolbox } from 'gluegun/build/types/domain/toolbox';

// expo stack orange gradient
const expoStackTheme = {
  orange: '#f97316',
  between: 'f2940f',
  yellow: '#eab308'
};

export async function renderTitle(toolbox: Toolbox) {
  const cesGradient = gradient(Object.values(expoStackTheme));

  const {
    print: { error }
  } = toolbox;

  await figlet.text(
    TITLE_TEXT,
    {
      font: 'Standard',
      horizontalLayout: 'fitted',
      verticalLayout: 'fitted',
      width: 40,
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
