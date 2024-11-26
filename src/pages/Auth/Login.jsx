import { Alert, Box, Button, Input, Typography } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "src/assets/styles/login.css";
import { auth, firestore } from "src/services/firebase-config";

export default function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("m.stivenmarroquin@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const [state, setState] = useState({
    type: null,
    open: false,
    message: "",
  });

  const [errors, setErrors] = useState({ email: false, password: false });

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSignIn = async () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      setErrors({
        email: !validateEmail(email),
        password: !validatePassword(password),
      });
      setState({
        open: true,
        type: "danger",
        message:
          "Por favor, ingrese un correo válido y una contraseña de al menos 8 caracteres.",
      });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      const token = await user.getIdToken();
      localStorage.setItem("token-sena", token);
      localStorage.setItem("user", auth.currentUser.uid);
      navigate("/dashboard");
    } catch (error) {
      let errorMessage = "No se ha podido iniciar sesión: ";
      if (error.code === "auth/missing-password") {
        errorMessage += "la contraseña es incorrecta";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage += "credenciales inválidas";
      } else {
        errorMessage += "el correo es incorrecto";
      }

      setState({
        open: true,
        type: "danger",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      setErrors({
        email: !validateEmail(email),
        password: !validatePassword(password),
      });
      setState({
        open: true,
        type: "danger",
        message:
          "Por favor, ingrese un correo válido y una contraseña de al menos 8 caracteres.",
      });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await addDoc(collection(firestore, "Users"), {
        uid: user.uid,
        email: email,
        name: name,
        timestamp: new Date(),
      });

      const token = await user.getIdToken();
      localStorage.setItem("token-sena", token);
      localStorage.setItem("user", auth.currentUser.uid);

      // navigate("/dashboard");
      alert("Usuario registrado exitosamente");
    } catch (error) {
      alert("Error al registrar usuario: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="body">
      {!isMobile ? (
        <div
          className={`container ${
            isRightPanelActive ? "right-panel-active" : ""
          }`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form action="#">
              <Box
                sx={{
                  py: 2,
                  display: "grid",
                  gap: 2,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <h1>Crear Cuenta</h1>
                <Input
                  type="text"
                  id="name"
                  placeholder="Nombre"
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Nombre"
                />
                <Input
                  error={errors.email}
                  type="email"
                  id="email"
                  placeholder="Correo"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Correo"
                />
                <Input
                  error={errors.password}
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Contraseña"
                />
                <Button
                  disabled={loading || !email || !password}
                  loading={loading}
                  onClick={handleRegister}
                  size="md"
                  color="primary"
                  variant="outlined"
                >
                  Inscribirse
                </Button>
              </Box>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#">
              <Box
                sx={{
                  py: 2,
                  display: "grid",
                  gap: 2,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <h1>Iniciar sesión</h1>
                <Input
                  error={errors.email}
                  type="email"
                  placeholder="Correo"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Correo"
                />
                <Input
                  error={errors.password}
                  type="password"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Contraseña"
                />
                <a href="#">¿Olvidaste tu contraseña?</a>
                <Button
                  disabled={loading || !email || !password}
                  loading={loading}
                  onClick={handleSignIn}
                  size="md"
                  color="primary"
                  variant="outlined"
                >
                  Iniciar sesión
                </Button>
              </Box>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>¡Bienvenido de nuevo!</h1>
                <Typography variant="h6">
                  Para mantenerse conectado con nosotros, inicie sesión con su
                  información personal.
                </Typography>
                <Button
                  onClick={handleSignInClick}
                  size="md"
                  variant="outlined"
                  color="neutral"
                >
                  Iniciar sesión
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hola, amigo!</h1>
                <Typography variant="h6">
                  Introduce tus datos personales y comienza tu viaje con
                  nosotros.
                </Typography>
                <Button
                  onClick={handleSignUpClick}
                  size="md"
                  variant="outlined"
                  color="neutral"
                >
                  Inscribirse
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Mostrar el formulario de acuerdo al panel activo */}
          {isRightPanelActive ? (
            <div className="form-container sign-up-container">
              <form>
                <Box
                  sx={{
                    py: 2,
                    display: "grid",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <h1>Crear Cuenta</h1>
                  <Input
                    type="text"
                    placeholder="Nombre"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    error={errors.email}
                    type="email"
                    placeholder="Correo"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    error={errors.password}
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    disabled={loading || !email || !password}
                    loading={loading}
                    onClick={handleRegister}
                  >
                    Inscribirse
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => setIsRightPanelActive(false)}
                  >
                    Ya tengo una cuenta
                  </Button>
                </Box>
              </form>
            </div>
          ) : (
            <div className="form-container sign-in-container">
              <form>
                <Box
                  sx={{
                    py: 2,
                    display: "grid",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <h1>Iniciar sesión</h1>
                  <Input
                    error={errors.email}
                    type="email"
                    placeholder="Correo"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    error={errors.password}
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <a href="#">¿Olvidaste tu contraseña?</a>
                  <Button
                    disabled={loading || !email || !password}
                    loading={loading}
                    onClick={handleSignIn}
                  >
                    Iniciar sesión
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => setIsRightPanelActive(true)}
                  >
                    Crear una cuenta
                  </Button>
                </Box>
              </form>
            </div>
          )}
        </>
      )}

      {state.message && (
        <Alert color="danger" variant="soft">
          {state.message}
        </Alert>
      )}
    </div>
  );
}
