const firebaseConfig = {
            apiKey: "AIzaSyDhspS0BOua1F-Ly7gZ--7Yy0eUlOuTH04",
            authDomain: "fg-ikk.firebaseapp.com",
            projectId: "fg-ikk",
            storageBucket: "fg-ikk.firebasestorage.app",
            messagingSenderId: "969707272149",
            appId: "1:969707272149:web:fd089239f89fbe7da8af5c",
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // Initialize Firestore
        const db = firebase.firestore();