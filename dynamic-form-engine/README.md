# Dynamic Form Application (Angular)

A scalable Angular application that dynamically generates forms based on configuration objects.

This project demonstrates a configuration-driven approach to building flexible and maintainable UI forms, commonly used in enterprise-level applications.

---

## 🚀 Live Demo / Repository

- 🔗 GitHub Repository: https://github.com/SEU_USUARIO/SEU_REPO
- (Optional) Live Demo: https://SEU-DEMO.com

---

## 🧰 Tech Stack

- Angular
- TypeScript
- RxJS
- SCSS
- Reactive Forms

---

## ✨ Features

- Dynamic form rendering based on configuration
- Conditional display logic for fields
- Modular and reusable form components
- Reactive Forms with validation support
- Scalable architecture for enterprise use cases

---

## 🧠 Problem Statement

In large-scale applications, forms often become tightly coupled to UI code, making them difficult to maintain and extend.

This project solves that by introducing a configuration-driven system where forms are fully defined through structured data instead of hardcoded templates.

---

## 📦 Example Configuration

```ts
const formConfig = [
  {
    type: 'text',
    label: 'Name',
    key: 'name',
    required: true
  },
  {
    type: 'email',
    label: 'Email',
    key: 'email',
    required: true
  }
];
```
## 🏗️ Architecture Overview
src/app
 ├── components
 │    └── dynamic-form
 ├── models
 ├── services
 ├── pages

## ▶️ Getting Started
    npm install
    ng serve

### Then open:
http://localhost:4200

## 🎯 Engineering Focus

This project was designed with emphasis on:

Clean and scalable Angular architecture
Separation between configuration and UI rendering
Component reusability
Reactive programming with RxJS
Maintainability and real-world applicability

## 📈 Future Improvements
Advanced validation engine driven by schema
Drag-and-drop form builder
Backend-driven form definitions
State persistence and autosave
UI/UX enhancements

## 👩‍💻 About Me

Frontend Developer specializing in Angular and modern web applications, focused on scalable architecture and clean code practices.

Currently based in the Netherlands and open to opportunities in Europe and remote roles.

## 📫 Contact
LinkedIn: https://www.linkedin.com/in/jessica-p-constantino/
Email: jessica.p.constantino@gmail.com
