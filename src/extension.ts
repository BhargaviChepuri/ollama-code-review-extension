// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as http from 'http';

interface OllamaResponse {
	response: string;
	done: boolean;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "OllamaCodeReview" is now active!');

	// Register the hello world command
	const helloDisposable = vscode.commands.registerCommand('OllamaCodeReview.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from OllamaCodeReview!');
	});

	// Register the review current file command
	const reviewFileDisposable = vscode.commands.registerCommand('OllamaCodeReview.reviewCurrentFile', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found');
			return;
		}

		const document = editor.document;
		const code = document.getText();
		const fileName = document.fileName.split(/[\\/]/).pop() || 'unknown';

		await performCodeReview(code, fileName, 'file');
	});

	// Register the review selection command
	const reviewSelectionDisposable = vscode.commands.registerCommand('OllamaCodeReview.reviewSelection', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found');
			return;
		}

		const selection = editor.selection;
		if (selection.isEmpty) {
			vscode.window.showErrorMessage('No text selected');
			return;
		}

		const code = editor.document.getText(selection);
		const fileName = editor.document.fileName.split(/[\\/]/).pop() || 'unknown';

		await performCodeReview(code, fileName, 'selection');
	});

	// Register the review workspace command
	const reviewWorkspaceDisposable = vscode.commands.registerCommand('OllamaCodeReview.reviewWorkspace', async () => {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders || workspaceFolders.length === 0) {
			vscode.window.showErrorMessage('No workspace folder found');
			return;
		}

		const workspaceFolder = workspaceFolders[0];
		const files = await vscode.workspace.findFiles('**/*.{js,ts,jsx,tsx,py,java,cpp,c,cs,php,rb,go,rs,swift,kt}', '**/node_modules/**');

		if (files.length === 0) {
			vscode.window.showErrorMessage('No code files found in workspace');
			return;
		}

		// For workspace review, we'll review the first few files
		const filesToReview = files.slice(0, 5); // Limit to first 5 files
		let allCode = '';

		for (const file of filesToReview) {
			try {
				const content = await vscode.workspace.fs.readFile(file);
				const text = Buffer.from(content).toString('utf8');
				allCode += `\n\n// File: ${file.fsPath}\n${text}`;
			} catch (error) {
				console.error(`Error reading file ${file.fsPath}:`, error);
			}
		}

		await performCodeReview(allCode, 'workspace', 'workspace');
	});

	// Register a simple test command
	const testOllamaDisposable = vscode.commands.registerCommand('OllamaCodeReview.testOllama', async () => {
		try {
			const response = await callOllamaAPI("Say hello in one sentence.");
			vscode.window.showInformationMessage(`Ollama test successful: ${response.substring(0, 50)}...`);
		} catch (error) {
			vscode.window.showErrorMessage(`Ollama test failed: ${error}`);
		}
	});

	context.subscriptions.push(helloDisposable, reviewFileDisposable, reviewSelectionDisposable, reviewWorkspaceDisposable, testOllamaDisposable);
}

async function performCodeReview(code: string, fileName: string, reviewType: string): Promise<void> {
	try {
		// Show progress
		await vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: `Ollama: Reviewing ${reviewType}...`,
			cancellable: false
		}, async (progress) => {
			progress.report({ increment: 0 });

			// Limit code size to prevent timeout
			const config = vscode.workspace.getConfiguration('ollamaCodeReview');
			const maxCodeLength = config.get<number>('maxCodeLength', 18000);
			let codeToReview = code;
			if (code.length > maxCodeLength) {
				codeToReview = code.substring(0, maxCodeLength) + '\n\n... (code truncated due to length)';
				vscode.window.showWarningMessage(`Code was truncated to ${maxCodeLength} characters for review.`);
			}

			// Create the prompt for code review
			const prompt = createCodeReviewPrompt(codeToReview, fileName, reviewType);

			// Call Ollama API
			const response = await callOllamaAPI(prompt);

			progress.report({ increment: 100 });

			// Display the review results
			await displayCodeReview(response, fileName, reviewType);
		});
	} catch (error) {
		vscode.window.showErrorMessage(`Error during code review: ${error}`);
	}
}

function createCodeReviewPrompt(code: string, fileName: string, reviewType: string): string {
	// Detect language from file extension
	const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
	let languageSpecificPrompt = '';

	switch (fileExtension) {
		case 'java':
			languageSpecificPrompt = 'Focus on Java best practices, OOP principles, and Java-specific patterns.';
			break;
		case 'js':
		case 'javascript':
			languageSpecificPrompt = 'Focus on JavaScript best practices, ES6+ features, and modern JS patterns.';
			break;
		case 'ts':
		case 'typescript':
			languageSpecificPrompt = 'Focus on TypeScript best practices, type safety, and modern TS patterns.';
			break;
		case 'py':
		case 'python':
			languageSpecificPrompt = 'Focus on Python best practices, PEP 8, and Python-specific patterns.';
			break;
		case 'cpp':
		case 'cc':
		case 'cxx':
			languageSpecificPrompt = 'Focus on C++ best practices, memory management, and modern C++ features.';
			break;
		case 'c':
			languageSpecificPrompt = 'Focus on C best practices, memory management, and C-specific patterns.';
			break;
		case 'cs':
			languageSpecificPrompt = 'Focus on C# best practices, .NET patterns, and C#-specific features.';
			break;
		case 'php':
			languageSpecificPrompt = 'Focus on PHP best practices, modern PHP features, and PHP-specific patterns.';
			break;
		case 'rb':
		case 'ruby':
			languageSpecificPrompt = 'Focus on Ruby best practices, Ruby conventions, and Ruby-specific patterns.';
			break;
		case 'go':
			languageSpecificPrompt = 'Focus on Go best practices, Go conventions, and Go-specific patterns.';
			break;
		case 'rs':
		case 'rust':
			languageSpecificPrompt = 'Focus on Rust best practices, memory safety, and Rust-specific patterns.';
			break;
		case 'swift':
			languageSpecificPrompt = 'Focus on Swift best practices, iOS/macOS patterns, and Swift-specific features.';
			break;
		case 'kt':
		case 'kotlin':
			languageSpecificPrompt = 'Focus on Kotlin best practices, Android patterns, and Kotlin-specific features.';
			break;
		default:
			languageSpecificPrompt = 'Focus on general programming best practices and code quality.';
	}

	return `Review this ${reviewType} code and provide feedback:

File: ${fileName} (${fileExtension.toUpperCase()})
Code:
\`\`\`
${code}
\`\`\`

${languageSpecificPrompt}

Provide a brief review covering:
- Code quality and readability
- Potential issues or bugs
- Suggestions for improvement
- What's done well

Keep the response concise and focused.`;
}

async function callOllamaAPI(prompt: string): Promise<string> {
	return new Promise((resolve, reject) => {
		// Get configuration settings
		const config = vscode.workspace.getConfiguration('ollamaCodeReview');
		const model = config.get<string>('model', 'codellama:7b-instruct');
		const host = config.get<string>('host', 'localhost');
		const port = config.get<number>('port', 11434);
		const timeout = config.get<number>('timeout', 3000000);

		const postData = JSON.stringify({
			model: model,
			prompt: prompt,
			stream: false
		});

		const options = {
			hostname: host,
			port: port,
			path: '/api/generate',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(postData)
			},
			timeout: timeout
		};

		const req = http.request(options, (res) => {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				try {
					const response: OllamaResponse = JSON.parse(data);
					resolve(response.response);
				} catch (error) {
					reject(new Error(`Failed to parse Ollama response: ${error}. Response: ${data}`));
				}
			});
		});

		req.on('error', (error: any) => {
			if (error.code === 'ECONNREFUSED') {
				reject(new Error(`Ollama is not running. Please start Ollama with 'ollama serve' in a terminal.`));
			} else if (error.code === 'ENOTFOUND') {
				reject(new Error(`Cannot connect to Ollama at localhost:11434. Make sure Ollama is installed and running.`));
			} else {
				reject(new Error(`Ollama API request failed: ${error.message}. Make sure Ollama is running on localhost:11434`));
			}
		});

		req.on('timeout', () => {
			req.destroy();
			reject(new Error('Ollama API request timed out. The model might be loading or the request is too large.'));
		});

		req.write(postData);
		req.end();
	});
}

async function displayCodeReview(review: string, fileName: string, reviewType: string): Promise<void> {
	// Create a new document to display the review
	const document = await vscode.workspace.openTextDocument({
		content: `# Ollama Code Review: ${fileName} (${reviewType})

${review}

---
*Generated by Ollama Code Review Extension*`,
		language: 'markdown'
	});

	// Show the review in a new editor
	await vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);

	// Also show a notification
	vscode.window.showInformationMessage(`Code review completed for ${fileName}! Check the new tab for detailed results.`);
}

// This method is called when your extension is deactivated
export function deactivate() { }
