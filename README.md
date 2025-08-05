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
