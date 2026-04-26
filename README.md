# Qwen Counter 🧮

A minimal browser extension that shows real-time token count and context usage on [chat.qwen.ai](https://chat.qwen.ai).

## ✨ Features
- Real-time token counting for your entire conversation
- Clean progress bar showing usage against the 1M context limit
- Lightweight & privacy-focused (all processing happens locally)
- Works with Qwen 3.5-Plus, 3.6-Plus, and future versions
- No external API calls or data tracking

## 📦 Installation

### Chrome / Edge / Brave
1. **Download** the extension folder (or clone this repo)
2. Open your browser and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top-right)
4. Click **Load unpacked** and select the extension folder
5. Open `chat.qwen.ai` – the counter appears in the top-right corner

## 🛠️ How It Works
- Scans visible chat messages in the DOM
- Uses a lightweight BPE approximation to estimate token count
- Updates automatically as you type or send messages
- Runs entirely in your browser – zero data leaves your device

## ⚙️ Customization
Want to change the context limit or adjust the tokenizer?
- Edit `src/content/constants.js` to change `CONTEXT_LIMIT`
- Swap `src/vendor/qwen_tokenizer.js` with a more accurate tokenizer if needed

## 📜 License
MIT License – feel free to use, modify, and distribute.

## 💡 Note
Token counting uses a lightweight approximation. For exact counts, Qwen's official BPE tokenizer can be integrated. The extension is designed to be fast, reliable, and unobtrusive.
