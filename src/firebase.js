import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCF170TEysEutewgp_4-4BskJ727a2-waw',
  authDomain: 'you-tube-project-clone.firebaseapp.com',
  projectId: 'you-tube-project-clone',
  storageBucket: 'you-tube-project-clone.appspot.com',
  messagingSenderId: '761981421032',
  appId: '1:761981421032:web:0707b5b13a1334f5ad905d',
}

firebase.initializeApp(firebaseConfig)

export default firebase.auth()
