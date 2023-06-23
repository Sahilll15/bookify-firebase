import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  addDoc,
  collection,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

export const FirebaseContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyC7zzdoSV5MRgfRbOWTdM3X04hFLc5X2jw",
  authDomain: "bookify-f8b3a.firebaseapp.com",
  projectId: "bookify-f8b3a",
  storageBucket: "bookify-f8b3a.appspot.com",
  messagingSenderId: "52177417529",
  appId: "1:52177417529:web:ecb3d1e84da3c3254924e8",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  const logout=()=>{
    signOut(auth).then(()=>toast.info('Logged Out')).catch((err)=>
    alert(`Error Logging out ${err}`)
    )
  };





  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        console.log("user is not logged in");
      }
    });
  }, []);

  const signupUserWithEmailandPassword = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("User Created Successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.error(errorMessage);
      });
  };

  const loginwithPasswordAndUsername = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("User Login Successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.error(errorMessage);
      });
  };

  const singInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const isLoggedin = user ? true : false;

  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const handleCreateNewListing = async (name, isbn, price, cover) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);
    return await addDoc(collection(firestore, "books"), {
      name: name,
      isbn: isbn,
      price: price,
      imageUrl: uploadResult.metadata.fullPath,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    })
      .then(() => {
        toast.success("Book Added Successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.error(errorMessage);
      });
  };

  const listAllBooks = async () => {
    return getDocs(collection(firestore, "books"));
  };

  //get book by id
  const getBookById = async (id) => {
    const docref = doc(firestore, "books", id);
    const result = await getDoc(docref);
    return result;
  };

  const placeOrder = async (bookId, qty, name) => {
    const collectionref = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionref, {
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    })
      .then(() => {
        toast.success(`order placed for ${name} for ${qty} books `);
      })
      .catch(() => {
        toast.error("something went wrong");
      });

    console.log(result);
    return result;
  };

  const getOrders = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userId", "==", userId));

    const result = await getDocs(q);

    return result;
  };

  const BookOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    console.log(result);

    return result;
  };

  
  return (
    <FirebaseContext.Provider
      value={{
        logout,
        BookOrders,
        getOrders,
        placeOrder,
        getBookById,
        signupUserWithEmailandPassword,
        getImageUrl,
        listAllBooks,
        loginwithPasswordAndUsername,
        singInWithGoogle,
        isLoggedin,
        handleCreateNewListing,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
