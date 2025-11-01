// React Native Firebase is initialized via native config files
// (GoogleService-Info.plist for iOS, google-services.json for Android)
// No need to initialize here - just export the firestore instance

import firestore from '@react-native-firebase/firestore';

export const db = firestore();

