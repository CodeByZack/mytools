// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require('path');
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log(context.extension);

  console.log(vscode);
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "mytools-zack" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'mytools-zack.helloWorld',
    async (a, b, c) => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user

      let editor = vscode.window.activeTextEditor!;
      let selection = editor.selection;
      let msg = editor.document.getText(selection);
      vscode.window.showInformationMessage(msg);

      vscode.window.showInformationMessage('Hello World from mytools!');
    },
  );


  const dis2 = vscode.languages.registerHoverProvider('json', {
    provideHover: (document, position) => {
		const fileName    = document.fileName;
		const workDir     = path.dirname(fileName);
		const word        = document.getText(document.getWordRangeAtPosition(position));
		// console.log(1, document)
		// console.log(2, position)
		// console.log(3, token)
		console.log(4, '这个就是悬停的文字', word)
		// 支持markdown语法
		return new vscode.Hover(
		`${fileName}：${workDir}: ${word}`);
    },
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(dis2);
}

// this method is called when your extension is deactivated
export function deactivate() {}
