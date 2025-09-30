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
- **Memory**: 400 MB available space
- **Internet**: Required only for initial download

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
## 🚀 Quick Start

### Build & Install

1. **Build the application:**
   ```bash
   npm run build:mac
   ```

2. **Install the application:**
   - Navigate to the `dist/` folder
   - Open the generated `.dmg` file
   - Drag SnippBoard to your Applications folder

3. **First Launch:**
   - Open SnippBoard from your Applications folder
   - Press `Control + Space` to activate the app
   - Start creating your first snippet!

For detailed installation instructions, see [INSTALLATION.md](INSTALLATION.md).

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

### Troubleshooting

<details>

   <summary> Permission Issues on macOS </summary>

   If you encounter permission errors when trying to open SnippBoard:

1. **"App is from an unidentified developer" error:**
   - Go to `System Preferences` > `Security & Privacy` > `General`
   - Click "Open Anyway" next to the SnippBoard warning
   - Confirm that you want to open the application

2. **App won't open at all:**
   - Right-click on SnippBoard in Applications folder
   - Select "Open" from the context menu
   - Click "Open" when prompted

3. **Still having issues?**
   - Check that you have macOS 10.14 or later
   - Ensure you have sufficient disk space (400 MB minimum)
   - Try restarting your Mac and attempting again
</details>

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
