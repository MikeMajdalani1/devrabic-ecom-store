import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  onSnapshot,
  addDoc,
  serverTimestamp,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';
import { database, storage } from './firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const auth = getAuth();

export function getFrontendErrorMessage(errorCode) {
  switch (errorCode) {
    case 'Firebase: Error (auth/user-not-found).':
      return 'This email is not registered, please make sure you enter a registered email.';
    case 'Firebase: Error (auth/wrong-password).':
      return 'The password entered is wrong. Please make sure you enter the correct password.';
    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
      return 'The password should be at least 6 characters.';
    case 'Firebase: Error (auth/email-already-in-use).':
      return 'The email address is already in use. Please use a different email.';
    case 'Firebase: Error (auth/invalid-email).':
      return 'Invalid email address. Please enter a valid email.';
    case 'Firebase: Error (auth/weak-password).':
      return 'Weak password. Please choose a stronger password.';
    case 'Firebase: Error (auth/invalid-login-credentials).':
      return 'Incorrect credentials, please make sure you add correct ones.';
    case 'Firebase: Error (auth/operation-not-allowed).':
      return 'This operation is currently not allowed. Please try again later.';
    case 'Firebase: Error (auth/too-many-requests).':
      return 'Too many requests, please try again in some minutes';
    default:
      return 'An error occurred. Please try again.';
  }
}

export const registerUser = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(database, 'users', user.uid), {
      username: username,
      cartProducts: [],
      isAdmin: false,
    });

    return { success: true }; // Indicate success
  } catch (error) {
    return { success: false, error: error.message }; // Indicate failure
  }
};

export const signInUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchUserData = async (user) => {
  try {
    const q = query(
      collection(database, 'users'),
      where('__name__', '==', user?.uid)
    );
    const doc = await getDocs(q);

    const data = doc.docs[0].data();

    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateArrayData = async (product) => {
  const user = auth.currentUser;

  const docRef = doc(database, 'users', user.uid);

  try {
    await updateDoc(docRef, {
      cartProducts: arrayUnion(product),
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteArrayData = async (product) => {
  const user = auth.currentUser;

  const docRef = doc(database, 'users', user.uid);

  try {
    await updateDoc(docRef, {
      cartProducts: arrayRemove(product),
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const setupDBListener = async (user, callback) => {
  const docRef = doc(database, 'users', user.uid);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data['cartProducts']);
    }
  });
};

export const handleImageChange = (event) => {
  const imageFile = event.target.files[0]; // Get the selected image file
  const storageRef = ref(storage, 'images/' + imageFile.name);

  // Upload the image to Firebase Storage
  return uploadBytes(storageRef, imageFile).then((snapshot) => {
    // You can get the download URL to the uploaded image
    return getDownloadURL(snapshot.ref);
  });
};

export const addProduct = async (product) => {
  try {
    const id = uuidv4();
    const productData = {
      ...product,
      id: id,
      createdAt: serverTimestamp(),
    };

    const productRef = doc(database, 'products', id);
    await setDoc(productRef, productData);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchProducts = async () => {
  try {
    const productsRef = collection(database, 'products');
    const querySnapshot = await getDocs(productsRef);

    const data = querySnapshot.docs.map((doc) => doc.data());

    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(database, 'products', productId);
    await deleteDoc(productRef);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
