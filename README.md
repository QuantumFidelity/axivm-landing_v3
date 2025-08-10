# Operation Ghost Genesis Landing Site

A high-conversion landing page for Operation Ghost Genesis, featuring a free 14-day AI agent pilot offer. Built with Astro, React islands, and modern web technologies.

## 🚀 Features

- **High-Performance**: Static site with <250KB JS on first load
- **Modern UI**: Dark, sleek design with glass morphism effects
- **Accessible**: Semantic HTML, proper heading hierarchy, reduced motion support
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Open Graph tags, meta descriptions, and structured data

## 🛠 Tech Stack

- **Framework**: Astro (static) with React islands for interactivity
- **Styling**: PicoCSS with custom CSS variables
- **Animations**: 
  - Lottie for 2D animations
  - React Three Fiber for isometric accents
  - Framer Motion for micro-interactions
- **Fonts**: Inter (UI) + JetBrains Mono (tech accents)
- **Deployment**: GitHub Pages via Actions

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/axivm-site.git
cd axivm-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

## 🚀 Deployment

### GitHub Pages Setup

1. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to Pages section
   - Select "GitHub Actions" as the source

2. **Configure Repository Name** (if needed):
   - If your repository is named `username.github.io`, no base path is needed
   - For other names, update `astro.config.mjs`:
   ```javascript
   export default defineConfig({
     integrations: [react()],
     site: 'https://yourusername.github.io',
     base: '/your-repo-name', // Remove this line if using username.github.io
   });
   ```

3. **Push to Main**:
   - The GitHub Action will automatically build and deploy on push to main
   - Your site will be available at `https://yourusername.github.io/your-repo-name`

### Custom Domain (Optional)

1. **Add Custom Domain**:
   - In repository Settings → Pages
   - Enter your custom domain (e.g., `ghostgenesis.com`)
   - Check "Enforce HTTPS"

2. **Update DNS**:
   - Add CNAME record pointing to `yourusername.github.io`
   - Or A records pointing to GitHub Pages IPs

3. **Update Astro Config**:
   ```javascript
   export default defineConfig({
     integrations: [react()],
     site: 'https://ghostgenesis.com', // Your custom domain
     // Remove base path for custom domains
   });
   ```

## 🎨 Customization

### Brand Colors
Update CSS variables in `src/layouts/Layout.astro`:
```css
:root {
  --brand: #5BA8FF;    /* Primary brand color */
  --accent: #FF7A45;   /* Accent color */
  --background: #0a0a0a;
  --surface: #1a1a1a;
  --text: #ffffff;
  --text-muted: #a0a0a0;
}
```

### Content Updates
- **Hero Section**: Update headline and description in `src/pages/index.astro`
- **Value Props**: Modify the three main benefits
- **FAQ**: Add/remove questions as needed
- **Calendly**: Replace placeholder URL with your actual Calendly link

### Animations
- **Lottie**: Replace `/public/animations/tech-waveform.json` with your animation
- **3D Scene**: Modify `src/components/IsometricCanvas.tsx` for custom 3D elements
- **Motion**: Adjust timing and effects in `src/components/MotionReveal.tsx`

## 📊 Performance

- **Lighthouse Score**: Target 95+ on all metrics
- **First Load JS**: <250KB total
- **Lazy Loading**: Heavy animations load only when needed
- **Image Optimization**: WebP format with fallbacks

## ♿ Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Reduced Motion**: All animations respect `prefers-reduced-motion`
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/          # React islands
│   ├── LottieLoop.tsx  # Lottie animation wrapper
│   ├── IsometricCanvas.tsx # 3D scene component
│   └── MotionReveal.tsx # Framer Motion wrapper
├── layouts/
│   └── Layout.astro    # Main layout with styles
└── pages/
    └── index.astro     # Landing page content

public/
├── animations/         # Lottie JSON files
└── favicon.svg        # Site favicon
```

## 📈 Analytics (Optional)

To add Plausible Analytics:

1. Add the script to `src/layouts/Layout.astro`:
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

2. Replace `yourdomain.com` with your actual domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ for Operation Ghost Genesis
