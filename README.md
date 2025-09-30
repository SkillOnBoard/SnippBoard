# SnippBoard

> The best partner to save all your favorite code snippets.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Platform](https://img.shields.io/badge/Platform-macOS-lightgrey.svg)](https://www.apple.com/macos/)

SnippBoard is a powerful desktop application designed to help developers organize, store, and quickly access their code snippets. Built with Electron and modern web technologies, it provides an intuitive interface for managing your coding snippets efficiently.

## ✨ Features

- 📝 **Easy Snippet Management** - Create, edit, and organize your code snippets
- 🏷️ **Label System** - Categorize snippets with custom labels
- 🔍 **Powerful Search** - Find snippets quickly with advanced search capabilities
- ⌨️ **Keyboard Shortcuts** - Access snippets with `Control + Space`
- 🎨 **Modern UI** - Clean and intuitive user interface
- 💾 **Local Storage** - Your data stays on your machine
- 🌍 **Multi-language Support** - Available in multiple languages

## 📋 Requirements

- **Operating System**: macOS 10.14 or later
- **Memory**: 100 MB available space
- **Internet**: Required only for initial download

## 🚀 Quick Start

### Download & Install

1. Download the latest release from [GitHub Releases](https://github.com/SkillOnBoard/SnippBoardPublic/releases)
2. Follow the detailed installation guide in [INSTALLATION.md](INSTALLATION.md)

### First Launch

1. Open SnippBoard from your Applications folder
2. Press `Control + Space` to activate the app
3. Start creating your first snippet!

## 🛠 Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/SkillOnBoard/SnippBoard.git
cd SnippBoard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Build for macOS
npm run build:mac
```

### Testing

```bash
# Run tests
npm test
```

## 📁 Project Structure

```
SnippBoard/
├── src/
│   ├── main/           # Electron main process
│   ├── renderer/       # React frontend
│   └── preload/        # Preload scripts
├── build/              # Build configuration
├── dist/               # Distribution files
└── resources/          # App resources
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🧑‍💻 Contributors

- [@camimaya21](https://github.com/camimaya21)
- [@jorgeregidor](https://github.com/jorgeregidor)
- [@RubenMZ](https://github.com/RubenMZ)
- [@pablosentis]() - Figma Design

🔗 If you contributed and are not listed here, feel free to open a PR!

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

See the [NOTICE](NOTICE) file for attribution and third-party notices.

## 🐛 Issues & Support

- **Bug Reports**: [Open an issue](https://github.com/SkillOnBoard/SnippBoard/issues)
- **Feature Requests**: [Start a discussion](https://github.com/SkillOnBoard/SnippBoard/discussions)
- **Questions**: Check our [FAQ](https://github.com/SkillOnBoard/SnippBoard/discussions/categories/q-a)

## 📚 Documentation

- [Installation Guide](INSTALLATION.md) - Detailed installation instructions
- [User Guide](docs/USER_GUIDE.md) - How to use SnippBoard (coming soon)
- [Developer Guide](docs/DEVELOPER_GUIDE.md) - Contributing guidelines (coming soon)

---

Made with ❤️ by the SnippBoard team
