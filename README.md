# AsuransiAstraBuanaTest - Pokedex

A React Native application for browsing Pokemon with search, filter, detail, and compare the pokemon.

## Features

### 🏠 Home Screen

- **Browse Pokemon**: View a list of pokemon
- **Filter**: Can filter by Move, Type, and Color
- **Infinite Scroll**: Load more pokemon as you scroll
- **Pull to Refresh**: Refresh the pokemon list with a pull gesture

### 🔎 Search Screen

- **Search Pokemon**: Search pokemon by name or id

### 📋 Detail Screen

- **Pokemon Information**: View detailed information about a selected pokemon including:
  - Pokemon id, name, type, and avatar
  - Stat and basic information
  - Evolution Chain

### 📋 Compare Screen

- **Compare**: Compare pokemon for more then two
- **Compare Result**: View information about Hp, Attack, Defense, Special Attack, Special Defense, and Speed

## Tech Stack

- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **Redux Toolkit**: State management
- **React Navigation**: Navigation between screens
- **React Native Modalize**: Create BottomSheet

## Prerequisites

- Node.js (v18 or higher)
- npm or Yarn
- React Native development environment set up
- For iOS: macOS with Xcode installed
- For Android: Android Studio with emulator or physical device

## Installation

1. Clone the repository:

```sh
git clone <repository-url>
cd OgyoTest
```

2. Install dependencies:

```sh
# Using npm
npm install

# OR using Yarn
yarn install
```

3. For iOS, install CocoaPods dependencies:

```sh
cd ios
pod install
cd ..
```

## Running the Application

### Step 1: Start Metro

First, start the Metro bundler:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Run the app

With Metro running, open a new terminal and run:

#### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### iOS

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

## Testing

Run the test suite with coverage:

```sh
# Using npm
npm test

# OR using Yarn
yarn test
```

Run tests in watch mode:

```sh
# Using npm
npm test -- --watch

# OR using Yarn
yarn test --watch
```

## Project Structure

```
Pokedex/
├── src/
│   ├── assets/        # Asset image
│   ├── components/        # Reusable components
│   ├── pages/           # Page components
│   │   ├── home/         # Home screen and components
│   │   ├── detail/       # Detail screen
│   │   └── compare/      # Compare screen
│   │   └── search/      # Search screen
│   ├── navigation/        # Navigation configuration
│   ├── services/         # API services
│   ├── store/            # Redux store configuration
│   │   ├── slices/       # Redux slices
│   │   └── thunks/        # Redux toolkit
│   │   └── listener/        # Redux toolkit
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── themes/           # Theme configuration
├── __tests__/            # Test files
├── ios/                  # iOS native code
├── android/              # Android native code
└── package.json          # Project dependencies
```

## API Integration

The app integrates with the Pokedex API to fetch:

- Pokemon list
- Pokemon by id or name
- Move of pokemon
- Type of pokemon
- Color of pokemon

## Key Features Implementation

### State Management

- Uses Redux Toolkit for predictable state management
- Separate slices for pokemon, compare

### Performance Optimizations

- Infinite scrolling with pagination
- Debounced search input
- Lazy loading of images
