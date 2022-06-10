import React, { useEffect, useState } from "react";
import ContainerSignup from "../global/ContainerSignup";
import { motion } from "framer-motion";
import { Formik, useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithEmail,
  userDetail,
} from "../../features/auth-state/auth-slice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db, facebookProvider } from "../../Firebase/Firebase";
import { async } from "@firebase/util";
import { doc, getDoc, setDoc } from "firebase/firestore";

function SingUp() {
  const pic = ["pic", "pic2", "pic3", "pic4"];
  const [showSignUp, setShowSignUp] = useState(true);
  const [photo, setPhoto] = useState("pic");
  // const [btn, setBtn] = useState();
  const [afficherPass, setAfficherPass] = useState(false);
  const [afficherPass2, setAfficherPass2] = useState(false);
  const dispatch = useDispatch();

  // using formik in the form to make validating easier
  const formikSignUp = useFormik({
    initialValues: {
      emailS: "",
      name: "",
      passwordS: "",
      userName: "",
    },
    validationSchema: Yup.object({
      emailS: Yup.string().email("Enter valide email").required("required"),
      passwordS: Yup.string().min(8, "Must enter 8 characters or more"),
      name: Yup.string().required("required"),
      userName: Yup.string().required("required"),
    }),
    onSubmit: async (values) => {
      await createUserWithEmailAndPassword(
        auth,
        values.emailS,
        values.passwordS
      ).then((res) => {
        updateProfile(auth.currentUser, {
          displayName: { userName: values.userName, name: values.name },
        })
          .then(async () => {
            const user = res.user;
            const docRef = await getDoc(doc(db, "users", user.uid));
            if (!docRef.exists()) {
              await setDoc(doc(db, "users", user.uid), {
                userName: user.displayName,
                email: user.email,
                name: user.displayName,
                followers: [],
                followed: [],
                profileDescription: "",
                searches: [],
                profileImage: user.photoURL || "",
              });
            }
          })
          .then(() => {
            dispatch(loginWithEmail({ user2: res.user, authenticated: !!res }));
          });
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Enter valide email").required("required"),
      password: Yup.string().min(8, "Must enter 8 characters or more"),
    }),
    onSubmit: async (values) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log("user", user);
          // console.log("userCredential", userCredential);
          dispatch(
            loginWithEmail({ user2: user, authenticated: !!userCredential })
          );
          // console.log(!!res);
          // ...
        })
        .catch((error) => {
          console.log(error.message);
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });
    },
  });
  const facebookSign = async () => {
    await signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);
      
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;
        const docRef = await getDoc(doc(db, "users", user.uid));
        if (!docRef.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            userName: user.displayName,
            email: user.email,
            name: user.displayName,
            followers: [],
            followed: [],
            profileDescription: "",
            searches: [],
            profileImage: user.photoURL || "",
          });
        }

        dispatch(loginWithEmail({ user2: user, authenticated: !!result }));
      })
      .catch((error) => {
        console.log(error.message);
        // ...
      });
  };
  useEffect(() => {
    const interv = setInterval(() => {
      setPhoto(pic[Math.floor(Math.random() * 4)]);
    }, 6000);
    return () => {
      clearInterval(interv);
    };
  }, []);

  return (
    // here its the signUp page
    <ContainerSignup>
      <div className="h-screen overflow-hidden">
        <main className="flex   justify-center items-start w-full h-full pt-16">
          <div className="hidden md:w-1/2 md:block ">
            <div className="relative">
              <img
                src={require("../../assets/signupAssets/mockup.png")}
                alt=""
                className="h-[30rem] w-max absolute top-0"
              />
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 6 }}
                src={require(`../../assets/signupAssets/${photo}.png`)}
                alt=""
                className="absolute top-4 h-[26rem] w-[11.35rem] right-10"
              />
            </div>
          </div>
          {/* to set what component we should see .either the signup compo or the sign in compo  */}
          {showSignUp ? (
            // this is the sign in
            <div>
              <div className="signUPBox">
                <img src={require("../../assets/logo.png")} alt="" />
                <form onSubmit={formik.handleSubmit} className="w-full">
                  <div className="mt-6 mb-1">
                    <input
                      id="email"
                      type="text"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      className="w-full outline-none border border-gray-200 text-[12px] text-gray-500 bg-body py-1 px-2 placeholder:text-[8px]"
                      placeholder="Num ,Telephone, nom utilisateur ou E mail"
                      onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-[8px]  text-red-500 text-left">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      type={afficherPass ? "text" : "password"}
                      placeholder="Mot de passe"
                      className="w-full outline-none border border-gray-200 text-[12px] text-gray-500 bg-body py-1 px-2 placeholder:text-[8px]"
                      onChange={formik.handleChange}
                    />
                    <p
                      className="absolute top-[5px] font-medium  cursor-pointer right-2 text-[10px] "
                      onClick={() => {
                        setAfficherPass((prev) => !prev);
                      }}
                    >
                      {!afficherPass ? "show" : "hide"}
                    </p>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-xs  text-red-500 text-left">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                  <button
                    disabled={
                      formik.values.email.length === 0 ||
                      formik.values.password.length === 0 ||
                      formik.errors.email ||
                      formik.errors.password
                    }
                    type="submit"
                    className={`w-full py-1 ${
                      formik.values.email.length === 0 ||
                      formik.values.password.length === 0 ||
                      formik.errors.email ||
                      formik.errors.password
                        ? "bg-[#b2dffc]"
                        : "bg-[#0873bb]"
                    } text-white text-[10px] my-3 `}
                  >
                    Se connecter
                  </button>
                </form>
                <div className="w-full flex items-center justify-between">
                  <hr className="w-1/3 bg-gray-500 " />
                  <span className="text-[9px] font-bold text-gray-400">OU</span>
                  <hr className="w-1/3 bg-gray-500" />
                </div>
                <div>
                  <a
                    className="flex text-[10px] text-[#003C63] cursor-pointer hover:text-[#40aef2] font-medium mt-4"
                    onClick={() => {
                      facebookSign();
                    }}
                  >
                    <img
                      className="h-4 w-4 mr-1"
                      src={require("../../assets/icons/facebookIcon.png")}
                      alt=""
                    />
                    <p>se connecter avec facebook</p>
                  </a>
                </div>
              </div>
              <div className="mt-8 max-w-7xl  flex  items-center border border-primary  bg-white py-3 px-4  ">
                <p className="text-[11px] text-global font-medium">
                  Vous n’avez pas de compte ?
                  <span
                    onClick={() => {
                      setShowSignUp(false);
                    }}
                    className="text-[#266c98] font-medium cursor-pointer ml-1 hover:text-[#3b93ca] focus:text-[#3b93ca] "
                  >
                    inscriver-vous?
                  </span>
                </p>
              </div>
            </div>
          ) : (
            // and this is the singUp compo
            <div>
              <div className="signUPBox">
                <img src={require("../../assets/logo.png")} alt="" />
                <form onSubmit={formikSignUp.handleSubmit} className="w-full">
                  <div className="mt-6 mb-1">
                    <input
                      id="emailS"
                      type="text"
                      value={formikSignUp.values.emailS}
                      onBlur={formikSignUp.handleBlur}
                      className="w-full outline-none border border-gray-200 text-[12px] text-gray-500 bg-body py-1 px-2 placeholder:text-[8px]"
                      placeholder="Num ,Telephone, nom utilisateur ou E mail"
                      onChange={formikSignUp.handleChange}
                    />
                    {formikSignUp.touched.emailS &&
                      formikSignUp.errors.emailS && (
                        <p className="text-[8px]  text-red-500 text-left">
                          {formikSignUp.errors.emailS}
                        </p>
                      )}
                  </div>
                  <div className=" mb-1">
                    <input
                      id="name"
                      type="text"
                      value={formikSignUp.values.name}
                      onBlur={formikSignUp.handleBlur}
                      className="w-full outline-none border border-gray-200 text-[12px] text-gray-500 bg-body py-1 px-2 placeholder:text-[8px]"
                      placeholder="Name"
                      onChange={formikSignUp.handleChange}
                    />
                    {formikSignUp.touched.name && formikSignUp.errors.name && (
                      <p className="text-[8px]  text-red-500 text-left">
                        {formikSignUp.errors.name}
                      </p>
                    )}
                  </div>
                  <div className="mb-1">
                    <input
                      id="userName"
                      type="text"
                      value={formikSignUp.values.userName}
                      onBlur={formikSignUp.handleBlur}
                      className="w-full outline-none border border-gray-200 text-[12px] text-gray-500 bg-body py-1 px-2 placeholder:text-[8px]"
                      placeholder="UserName"
                      onChange={formikSignUp.handleChange}
                    />
                    {formikSignUp.touched.userName &&
                      formikSignUp.errors.userName && (
                        <p className="text-[8px]  text-red-500 text-left">
                          {formikSignUp.errors.userName}
                        </p>
                      )}
                  </div>

                  <div className="relative">
                    <input
                      id="passwordS"
                      value={formikSignUp.values.passwordS}
                      onBlur={formikSignUp.handleBlur}
                      type={afficherPass2 ? "text" : "password"}
                      placeholder="Mot de passe"
                      className="w-full outline-none border border-gray-200 text-[12px] text-gray-500 bg-body py-1 px-2 placeholder:text-[8px]"
                      onChange={formikSignUp.handleChange}
                    />
                    <p
                      className="absolute top-[5px] font-medium  cursor-pointer right-2 text-[10px] "
                      onClick={() => {
                        setAfficherPass2((prev) => !prev);
                      }}
                    >
                      {!afficherPass2 ? "show" : "hide"}
                    </p>
                    {formikSignUp.touched.passwordS &&
                      formikSignUp.errors.passwordS && (
                        <p className="text-[8px]  text-red-500 text-left">
                          {formikSignUp.errors.passwordS}
                        </p>
                      )}
                  </div>
                  <button
                    disabled={
                      formikSignUp.values.emailS.length === 0 ||
                      formikSignUp.values.passwordS.length === 0 ||
                      formikSignUp.errors.emailS ||
                      formikSignUp.errors.passwordS
                    }
                    type="submit"
                    className={`w-full py-1 ${
                      formikSignUp.values.emailS.length === 0 ||
                      formikSignUp.values.passwordS.length === 0 ||
                      formikSignUp.errors.emailS ||
                      formikSignUp.errors.passwordS
                        ? "bg-[#b2dffc]"
                        : "bg-[#0873bb]"
                    } text-white text-[10px] my-3 `}
                  >
                    S'inscrire
                  </button>
                </form>
                <div className="w-full flex items-center justify-between">
                  <hr className="w-1/3 bg-gray-500 " />
                  <span className="text-[9px] font-bold text-gray-400">OU</span>
                  <hr className="w-1/3 bg-gray-500" />
                </div>
                <div>
                  <a className="flex text-[10px] text-[#003C63] cursor-pointer hover:text-[#40aef2] font-medium mt-4">
                    <img
                      className="h-4 w-4 mr-1"
                      src={require("../../assets/icons/facebookIcon.png")}
                      alt=""
                    />
                    <p>se connecter avec facebook</p>
                  </a>
                </div>
              </div>
              <div className="mt-8 max-w-7xl  flex  items-center border border-primary  bg-white py-3 px-4  ">
                <p className="text-[11px] text-global font-medium">
                  Vous avez un compte ?
                  <span
                    onClick={() => {
                      setShowSignUp(true);
                    }}
                    className="text-[#266c98] font-medium cursor-pointer ml-1 hover:text-[#3b93ca] focus:text-[#3b93ca] "
                  >
                    Connecter-vous
                  </span>
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </ContainerSignup>
  );
}

export default SingUp;
