// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "test" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.quickConsoleLog', function () {
        // The code you place here will be executed every time your command is executed

        const editor = vscode.window.activeTextEditor;
        var copied_text = "";

        try {
            copied_text = editor.document.getText( editor.selection );
        }
        catch ( err ) {
            //
        }

        editor.edit(function (editBuilder) {

            // delete the selection
            editBuilder.delete( editor.selection );


        }).then(function () {

            // insert console log with copied text
            editor.edit(function (editBuilder) {
                editBuilder.insert(editor.selection.start, "console.log( " + copied_text + " );");
            });

        }).then(function () {

            // move the cursor back
             vscode.commands.executeCommand("cursorMove", {
                to      : "left",
                by      : "character",
                value   : 3,
                select  : false
            });

        });

    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;