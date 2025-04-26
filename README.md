# Rozgaar - Job Search Mobile App

A React Native mobile application for browsing and bookmarking job listings, built with Expo for Android and iOS.

## Screenshots

**Job Search Page**  
<img src="https://github.com/user-attachments/assets/75f1b7f5-304e-4fb4-9ee0-e76ce66cf130" width="300">  

**About Job Page**  
<img src="https://github.com/user-attachments/assets/2a5139b0-2327-4475-b5a3-93d207bb7c39" width="300">  

**Bookmark Page**  
<img src="https://github.com/user-attachments/assets/96c4022c-e914-454a-b0e2-aa0328a3ecc7" width="300">

## Features

- **Bottom Navigation**: Switch seamlessly between "Jobs" and "Bookmarks" tabs.
- **Infinite Scroll Jobs Feed**: Dynamically loads job data from the API as you scroll.
- **Job Details**: View detailed information (title, location, salary, phone) when tapping a job card.
- **Bookmarking**: Save jobs to the Bookmarks tab for offline access.
- **Offline Storage**: Bookmarks persist locally using AsyncStorage.
- **State Management**: Handles loading, error, and empty states gracefully.
- **Cross-Platform**: Works on both Android and iOS.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AdiGo22/Rozgaar.git
   cd Rozgaar
   ```
2. **Install dependencies:**

```bash
npm install
# or
yarn install
```
3. **Start the Expo server:**

```bash
npm start
# or
yarn start
```
4. **Run the app:**

5.**Scan the QR code with the Expo Go app (Android/iOS)** 


## Technologies Used
- React Native & Expo SDK (v48+)
- React Navigation (Bottom Tabs, Stack Navigation)
- Nativewind for styling
- AsyncStorage for offline bookmark storage
- Material Community Icons for UI elements


## API Endpoint
Jobs are fetched from:
https://testapi.getlokalapp.com/common/jobs?page=1

## Demo Video
Watch App Demo
https://drive.google.com/file/d/1QhLj-o-8wje2EVUBm0fwjL6iUgDn6nGx/view?usp=sharing

## How to Contribute
- Fork the repository.
- Create a branch: git checkout -b feature/your-feature.
- Commit changes: git commit -m "Add your feature".
- Push to the branch: git push origin feature/your-feature.
- Create a Pull Request.

