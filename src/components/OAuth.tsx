import { ReactComponent as GoogleIcon } from "../assets/svg/googleIcon.svg";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ReactComponent as FacebookIcon } from "../assets/svg/facebookIcon.svg";
const OAuth = () => {
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
          account: "Consumer",
        });
      }
      navigate("/area");
    } catch (error) {
      toast.error("Não foi possivel fazer log in a partir do Google.");
    }
  };

  const onFacebookClick = async () => {
    try {
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/area");
    } catch (error) {
      toast.error("Não foi possivel fazer log in a partir do Facebook");
    }
  };
  return (
    <div className="oath--sign-in txt-align-center padding-top-3 padding-bottom-3">
      <h3>Ou inicia sessão com:</h3>
      <FacebookIcon
        onClick={onFacebookClick}
        className="sign-in--icon padding-right-3 padding-top-3 pointer"
        fill="#4267B2"
      />

      <GoogleIcon
        className="sign-in--icon padding-top 3 pointer"
        onClick={onGoogleClick}
      />
    </div>
  );
};

export default OAuth;
