

# Monier Mohamed Monier - Professional Flutter Developer Portfolio

A modern, high-end, responsive portfolio website built with pure semantic **HTML5**, **CSS3**, and **Vanilla JavaScript**. Designed with a glassmorphic aesthetic, subtle gradients, dark/light theme switching, interactive canvas background, 3D card tilts, and smooth animations.

---

## 📁 Project Structure

```text
portfolio/
│
├── index.html              # Main HTML markup with all 9 portfolio sections
│
├── css/
│   └── style.css           # Pure Vanilla CSS design system, dark/light theme, responsiveness
│
├── js/
│   └── script.js           # Pure Vanilla JS (Theme toggle, canvas particles, carousel, validation)
│
├── images/
│   ├── profile.jpg         # Profile photo for hero section (Monier Mohamed Monier)
│   ├── about.jpg           # About section card photo
│   ├── project1.jpg        # Flutter Mobile Application mockup
│   └── project2.jpg        # Flutter Application mockup
│
├── assets/
│   └── Monier-CV.pdf       # Downloadable resume / CV document
│
└── README.md               # Documentation and customization guide
```

---

## 🚀 How to Run Locally

You can run this project with any local HTTP server:

### Option 1: Python 3 (Built-in)
Run the following command in PowerShell / Terminal:
```bash
python -m http.server 8000
```
Then navigate to:
```text
http://localhost:8000
```

### Option 2: VS Code Live Server
1. Open the project folder in VS Code.
2. Right click `index.html`.
3. Click **"Open with Live Server"**.

---

## 🎨 Features & Technologies

* **Pure Vanilla Stack**: Zero frameworks (No React, No Bootstrap, No Tailwind CSS).
* **Dual Theme Engine**: Seamless Dark and Light modes with `localStorage` persistence.
* **Ambient Background**: Lightweight interactive canvas particles and glowing blur elements.
* **Desktop 3D Tilt**: Subtle interactive depth on project cards using mouse coordinates.
* **Testimonials Carousel**: Auto-sliding testimonials slider with pause-on-hover, dots, and manual controls.
* **Form Validation**: Client-side feedback with clear error messaging and submission confirmation.
* **Responsive Architecture**: Fully tested and styled from 320px mobile screens to 1920px+ displays.
* **Accessibility & SEO**: Semantic tags, ARIA attributes, meta descriptions, and Open Graph tags.

---

## 🛠️ How to Customize & Update Information

### 1. How to Replace Images
* **Profile Image**: Replace `images/profile.jpg` with your desired square or portrait photo.
* **About Image**: Replace `images/about.jpg` with your desired photo.
* **Project Screenshots**: Replace `images/project1.jpg` and `images/project2.jpg` with screenshots of your Flutter mobile apps.

### 2. How to Replace CV
* Overwrite or place your PDF file at `assets/Monier-CV.pdf`.
* If you rename the file, update the `href` attribute in `index.html`:
  ```html
  <a href="assets/Monier-CV.pdf" download="Monier-CV.pdf" class="btn btn-primary">
  ```

### 3. How to Update Email & Phone
In `index.html`, search for `MONIER.ALI@EJUST.EDU.EG` and `+201210774013`:
* **Email**:
  ```html
  <a href="mailto:MONIER.ALI@EJUST.EDU.EG">MONIER.ALI@EJUST.EDU.EG</a>
  ```
* **Phone**:
  ```html
  <a href="tel:+201210774013">+201210774013</a>
  ```

### 4. How to Update GitHub & LinkedIn Links
* **LinkedIn**: Search for `www.linkedin.com/in/monier-mohamed` in `index.html` and update the URL.
* **GitHub**: Search for `[YOUR_GITHUB]` in `index.html` and replace with your GitHub profile username:
  ```html
  <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
  ```

### 5. How to Update Project Links
In the `#projects` section of `index.html`, replace the placeholders:
* `[PROJECT_1_LINK]` & `[GITHUB_1_LINK]`
* `[PROJECT_2_LINK]` & `[GITHUB_2_LINK]`

### 6. How to Update Testimonials
In the `#testimonials` section of `index.html`, edit the placeholder text:
```html
<p class="testimonial-quote">"Your real client feedback here."</p>
<h4 class="client-name">Real Client Name</h4>
<p class="client-role">Founder / Product Manager</p>
```

---

## 📄 License
Designed and developed for **Monier Mohamed Monier**. All rights reserved.
