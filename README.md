# Ollama Code Review Extension

An AI-powered code review extension for VS Code that uses Ollama to provide intelligent code analysis and suggestions.

## Features

- **Multi-language Support**: Review code in Java, JavaScript, TypeScript, Python, C++, C#, PHP, Ruby, Go, Rust, Swift, Kotlin, and more
- **Context-Aware Reviews**: Language-specific analysis and best practices
- **Multiple Review Modes**:
  - Review current file
  - Review selected code
  - Review entire workspace
- **Customizable Settings**: Configure Ollama model, server, and review parameters
- **Right-click Integration**: Quick access from editor and explorer context menus

## Prerequisites

1. **Install Ollama**: Download and install from [https://ollama.ai](https://ollama.ai)
2. **Download a Code Model**: Run `ollama pull codellama:7b-instruct` (or your preferred model)
3. **Start Ollama Server**: Run `ollama serve` in a terminal

## Installation

1. Clone or download this extension
2. Open the folder in VS Code
3. Press `F5` to run the extension in development mode
4. Or package it with `vsce package` to create a `.vsix` file

## Usage

### Commands

- **Ollama: Review Current File** - Review the currently open file
- **Ollama: Review Selection** - Review selected code (right-click in editor)
- **Ollama: Review Workspace** - Review multiple files in the workspace
- **Ollama: Test Connection** - Test Ollama connection

### Context Menu

- **Right-click in editor** → "Ollama: Review Selection" (when text is selected)
- **Right-click in explorer** → "Ollama: Review Current File"

## Configuration

Open VS Code settings and search for "Ollama Code Review" to customize:

- **Model**: The Ollama model to use (default: `codellama:7b-instruct`)
- **Host**: Ollama server host (default: `localhost`)
- **Port**: Ollama server port (default: `11434`)
- **Max Code Length**: Maximum code length for review (default: `18000`)
- **Timeout**: Request timeout in milliseconds (default: `3000000`)

## Supported Languages

The extension automatically detects file extensions and provides language-specific analysis:

- **Java** (.java) - OOP principles, Java best practices
- **JavaScript** (.js) - ES6+ features, modern JS patterns
- **TypeScript** (.ts) - Type safety, modern TS patterns
- **Python** (.py) - PEP 8, Python-specific patterns
- **C++** (.cpp, .cc, .cxx) - Memory management, modern C++ features
- **C** (.c) - Memory management, C-specific patterns
- **C#** (.cs) - .NET patterns, C#-specific features
- **PHP** (.php) - Modern PHP features, PHP-specific patterns
- **Ruby** (.rb) - Ruby conventions, Ruby-specific patterns
- **Go** (.go) - Go conventions, Go-specific patterns
- **Rust** (.rs) - Memory safety, Rust-specific patterns
- **Swift** (.swift) - iOS/macOS patterns, Swift-specific features
- **Kotlin** (.kt) - Android patterns, Kotlin-specific features

## Troubleshooting

### Common Issues

1. **"Ollama is not running"**
   - Start Ollama with `ollama serve`
   - Check if Ollama is installed correctly

2. **"Model not found"**
   - Download the model: `ollama pull codellama:7b-instruct`
   - Or change the model in settings

3. **"Request timed out"**
   - Increase timeout in settings
   - Reduce max code length
   - Try a smaller model

4. **"No active editor found"**
   - Open a code file before running the command

### Testing Connection

Use the "Ollama: Test Connection" command to verify Ollama is working properly.

## Development

### Building

```bash
npm install
npm run compile
```

### Running in Development

1. Open the project in VS Code
2. Press `F5` to start the Extension Development Host
3. Test the extension in the new window

### Packaging

```bash
npm install -g @vscode/vsce
vsce package
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Check the troubleshooting section above
- Ensure Ollama is properly installed and running

## How Others Can Add This Extension

### Method 1: Install from GitHub Release (Easiest)

1. **Go to the GitHub repository**: [https://github.com/bchepuri/ollama-code-review-extension](https://github.com/bchepuri/ollama-code-review-extension)
2. **Click "Releases"** on the right side of the page
3. **Download the latest .vsix file** (e.g., `ollama-code-review-0.0.1.vsix`)
4. **Install in VS Code**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Click the "..." menu (three dots) → "Install from VSIX..."
   - Select the downloaded .vsix file
   - Click "Install"

### Method 2: Clone and Run (For Developers)

```bash
# Clone the repository
git clone https://github.com/bchepuri/ollama-code-review-extension.git

# Navigate to the folder
cd ollama-code-review-extension

# Install dependencies
npm install

# Open in VS Code
code .

# Press F5 to run in development mode
```

### Method 3: Command Line Installation

```bash
# Download the .vsix file first, then:
code --install-extension ollama-code-review-0.0.1.vsix
```

## How to Use the Extension

### Getting Started

1. **Install Ollama** (if not already installed):
   ```bash
   # Download from https://ollama.ai
   # Or use package manager for your OS
   ```

2. **Download a code model**:
   ```bash
   ollama pull codellama:7b-instruct
   ```

3. **Start Ollama server**:
   ```bash
   ollama serve
   ```

4. **Install the extension** (using one of the methods above)

5. **Open a code file** in VS Code

#### **Customizing Settings**
1. **Open VS Code Settings** (Ctrl+,)
2. **Search for "Ollama Code Review"**
3. **Customize**:
   - **Model**: Change to different Ollama models
   - **Host/Port**: Connect to remote Ollama servers
   - **Timeout**: Adjust request timeouts
   - **Max Code Length**: Set maximum code size for review

#### **Using Different Models**
```bash
# Download different models
ollama pull llama2
ollama pull codellama:13b-instruct
ollama pull deepseek-coder

# Then change the model in VS Code settings
```

#### **Remote Ollama Server**
If you have Ollama running on another machine:
1. **Update settings** in VS Code
2. **Change Host** to your server IP
3. **Change Port** if different (default: 11434)

### Best Practices

#### **For Code Reviews**
1. **Review small sections** at a time for better focus
2. **Use workspace review** for architectural feedback
3. **Combine with manual review** for best results
4. **Apply suggestions** gradually and test changes

#### **For Different Languages**
- **JavaScript/TypeScript**: Focus on ES6+ features and modern patterns
- **Python**: Emphasize PEP 8 and Pythonic code
- **Java**: Look for OOP principles and Java conventions
- **C++**: Check memory management and modern C++ features

#### **For Teams**
1. **Share the extension** with your team
2. **Set up consistent Ollama models** across team
3. **Use for code review meetings**
4. **Integrate into development workflow**

### Troubleshooting Common Issues

#### **Extension Not Working**
1. **Check if Ollama is running**: `curl http://localhost:11434/api/tags`
2. **Verify model is downloaded**: `ollama list`
3. **Test connection**: Use "Ollama: Test Connection" command
4. **Check VS Code console** for error messages

#### **Slow Responses**
1. **Reduce code length** in settings
2. **Use a smaller model** (7B instead of 13B)
3. **Increase timeout** in settings
4. **Close other applications** to free up resources

#### **No Commands Available**
1. **Restart VS Code** after installation
2. **Check if extension is enabled** in Extensions panel
3. **Try reloading window**: Ctrl+Shift+P → "Developer: Reload Window"

### Integration with Development Workflow

#### **Pre-commit Reviews**
1. **Review code** before committing
2. **Fix issues** suggested by AI
3. **Commit improved code**

#### **Code Review Meetings**
1. **Use extension** during review sessions
2. **Share AI feedback** with team
3. **Discuss suggestions** together

#### **Learning New Languages**
1. **Review code** in unfamiliar languages
2. **Learn best practices** from AI feedback
3. **Improve coding skills** over time

#### **From GitHub Release (Current Option)**
For Users:
Go to your GitHub: https://github.com/bchepuri/ollama-code-review-extension
Click "Releases" on the right
Download the .vsix file
Install in VS Code:
Open VS Code
Go to Extensions (Ctrl+Shift+X)
Click "..." menu → "Install from VSIX..."
Select the downloaded file
Method 3: Command Line Installation
For Users:
# Download the .vsix file first, then:
code --install-extension ollama-code-review-0.0.1.vsix
