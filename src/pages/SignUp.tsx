import { useState } from "react";
import fartazanaLogo from "../assets/jpg/Fartazana-logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import firebase from "firebase";

interface FormData {
  name: string;
  email: string;
  password?: string;
  timestamp?: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password!
      );

      const user = userCredential.user;
      updateProfile(user, { displayName: name });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Algo correu mal ao criar a sua conta. Tente novamente");
    }
  };

  return (
    <div className="sign-up">
      <div className="logo">
        <img src={fartazanaLogo} className="logo--settings" />
      </div>
      <div>
        <div className="padding-top-3 padding-bottom-3 txt-align-center">
          <form onSubmit={onSubmit}>
            <h3>Cria a tua conta!</h3>
            <div>
              <input
                placeholder="Nome"
                type="text"
                id="name"
                onChange={onChange}
              />
            </div>
            <div>
              <input
                placeholder="E-mail"
                type="email"
                id="email"
                onChange={onChange}
              />
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                id="password"
                onChange={onChange}
              />
            </div>
            <div>
              <button type="submit">Criar Conta</button>
            </div>
          </form>
        </div>
      </div>

      <OAuth />

      <div>
        <Link to="/">Voltar à página inicial</Link>
      </div>
    </div>
  );
};

export default SignUp;
