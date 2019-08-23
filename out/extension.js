"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "mdrenumber" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.mdrenumber', () => {
        var editor = vscode.window.activeTextEditor;
        if (editor == null) {
            return;
        }
        var document = editor.document;
        var range = new vscode.Range(0, document.lineAt(0).range.start.character, document.lineCount - 1, document.lineAt(document.lineCount - 1).range.end.character);
        var text = document.getText();
        var lines = text.split('\n');
        var line;
        var replacement;
        var counter = 1;
        var new_lines = [];
        for (line of lines) {
            if (line.search(/^## /) == 0) {
                // reset counter due to section
                counter = 1;
            }
            if (line.search(/^\d+\. .*/) > -1) {
                replacement = counter.toString().concat('. ');
                new_lines.push(line.replace(/^\d+\. /, replacement));
                counter += 1;
            }
            else {
                new_lines.push(line);
            }
            ;
        }
        ;
        var new_text = new_lines.join('\n');
        var edits = [];
        edits.push(new vscode.TextEdit(range, new_text));
        var edit = new vscode.WorkspaceEdit();
        edit.set(editor.document.uri, edits);
        vscode.workspace.applyEdit(edit);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map