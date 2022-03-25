import path = require('path');
import * as vscode from 'vscode';
import { json2ts } from './json2ts';
import { translate } from './translate';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'mytools-zack.json2ts',
    async () => {
      let editor = vscode.window.activeTextEditor!;
      const languageId = editor.document.languageId;
      let selection = editor.selection;
      let msg = editor.document.getText(selection);
      // 根据languageId来把不同语言下的json表达为正常的json字符串。
      // json 直接就是 json字符串
      // js 使用Function获得json对象，再stringify
      // ts 不考虑特殊情况，视为js处理 TODO 处理特殊情况

      switch (languageId) {
        case 'javascript':
        case 'javascriptreact':
          const test = Function('"use strict";return (' + msg + ')')();
          const str = JSON.stringify(test);
          msg = str;
          break;
        case 'typescript':
        case 'typescriptreact':
          const test2 = Function('"use strict";return (' + msg + ')')();
          const str2 = JSON.stringify(test2);
          msg = str2;
          break;
        case 'json':
        default:
      }
      const interfaceStr = json2ts(msg);
      if (!interfaceStr) {
        vscode.window.showInformationMessage('出错了！');
        return;
      }
      editor.edit((v) => {
        v.replace(selection, interfaceStr);
      });
    },
  );
  const disposable2 = vscode.commands.registerCommand(
    'mytools-zack.translate',
    async () => {
      let editor = vscode.window.activeTextEditor!;
      const document = editor.document;
      const selection = editor.selection;
      const selectTxt = document.getText(selection);
      const translateResult = await translate(selectTxt);
      editor.edit((v) => {
        v.replace(selection, translateResult);
      });
    },
  );

  const disposable3 = vscode.languages.registerHoverProvider(
    ['typescript', 'json', 'javascript'],
    {
      provideHover: async (document, position) => {
        const word = document.getText(
          document.getWordRangeAtPosition(position),
        );
        const translateResult = await translate(word);
        return new vscode.Hover(`${word} : \`${translateResult}\``);
      },
    },
  );


  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
  context.subscriptions.push(disposable3);
}

export function deactivate() {}
