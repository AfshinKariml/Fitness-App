# Fitness App

## Overview
A comprehensive fitness tracking application built with Angular, featuring workout management, progress tracking, and user authentication. Try the [live demo](https://fitness-ggxdyz1ix-afshinkarimls-projects.vercel.app/).

## Features
- User authentication and profile management
- Workout tracking and progress monitoring
- Real-time statistics and achievements
- Responsive design for all devices
- Progressive Web App (PWA) capabilities
- Multi-language support including Jalali calendar integration

## Tech Stack
### Core Technologies
- Angular 15.2.0
- Firebase 9.6.1
- Angular Material 15.2.9
- Three.js 0.173.0
- RxJS 7.8.0

### Additional Libraries
- @angular/flex-layout for responsive layouts
- @angular/fire for Firebase integration
- jalali-moment for Persian calendar support
- @angular/service-worker for PWA functionality

## Prerequisites
- Node.js (Latest LTS version recommended)
- Angular CLI 15.2.11
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd fitness-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Navigate to `http://localhost:4200` in your browser

## Build Configuration

### Development Build
```bash
ng build --configuration=development
```
Features:
- Source maps enabled
- No optimization
- No service worker

### Production Build
```bash
ng build --configuration=production
```
Features:
- Full optimization
- Service worker enabled
- Output hashing for cache busting
- Bundle size limits:
  - Initial: 4MB max
  - Component styles: 15KB max

## Project Structure
```
fitness-app/
├── src/
│   ├── app/
│   ├── assets/
│   └── manifest.webmanifest
├── angular.json        # Angular workspace configuration
└── package.json       # Project dependencies and scripts
```

## Available Scripts
- `npm start`: Start development server
- `npm run build`: Build the application
- `npm run watch`: Build with watch mode
- `npm test`: Run unit tests

## Testing
- Unit tests using Karma and Jasmine
- Chrome launcher configured for test execution
- Coverage reporting enabled

## PWA Support
The application includes Progressive Web App features:
- Service worker for offline functionality
- Web manifest for installability
- Asset caching
- Note: Service worker is only enabled in production builds

## Browser Compatibility
- Modern evergreen browsers
- PWA features require service worker support

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## License
This project is licensed under the MIT License.

## Acknowledgments
- Angular team for the excellent framework
- Firebase team for backend services
- Three.js community for 3D visualization capabilities