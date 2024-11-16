import { useContext } from "react";
import ActionButton from "../components/ActionButton";
import ThemeProvider, { ThemeContext } from "../context/ThemeContext";
import ThemeSwitcher from "../components/ThemeSwitcher";
import InputField from "../components/InputField";
import React, { useState } from "react";
import { isValidEmail } from "../utils/validation";
import Card from "../components/Card";

const Home = () => {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
};

const HomeContent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Error handling
  const [usernameHasError, setUsernameHasError] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const themeContext = useContext(ThemeContext);

  const handleSignIn = () => {
    // Check errors
    setUsernameHasError(!isValidEmail(username));

    if (username.length == 0) {
      setUsernameError("Username is required");
    }
    if (!isValidEmail(username)) {
      setUsernameError("Invalid email");
    }

    setPasswordHasError(password.length == 0);
    if (password.length == 0) {
      setPasswordError("Password is required");
    }

    if (
      !isValidEmail(username) ||
      username.length == 0 ||
      password.length == 0
    ) {
      return;
    }

    // Sign in
    console.log("Sign in success");
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-background-light dark:bg-background-dark">
      <ThemeSwitcher />
      {/* BUTTON EXAMPLES */}
      <div className="flex">
        <ActionButton
          text="Primary"
          onClick={() => console.log(themeContext?.theme)}
          secondaryButton
          size="small"
        />
        <ActionButton
          text="Primary"
          onClick={() => console.log(themeContext?.theme)}
        />
        <ActionButton
          text="Primary"
          onClick={() => console.log(themeContext?.theme)}
          outlineButton
          size="large"
        />
        <ActionButton
          text="Primary"
          onClick={() => console.log(themeContext?.theme)}
          outlineButton
          secondaryButton
        />
      </div>
      {/* INPUT FIELD WITH ERROR VALIDATION EXAMPLE */}
      <div className="flex-row">
        <div className="w-64">
          <InputField
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            hasError={usernameHasError}
            errorMessage={usernameError}
          />
        </div>
        <div className="w-64">
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            hasError={passwordHasError}
            errorMessage={passwordError}
            secureTextEntry
          />
          <ActionButton text="Sign In" onClick={() => handleSignIn()} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card
          id={1}
          title="Trapping Rainwater"
          author={{ firstName: "John", lastName: "Smith", id: 1 }}
          description="Fastest python solution for trapping rainwater problem in like constant time or something also please upvote this template and fork it yeah"
          tags={[
            { name: "hard", color: "#FF0000", id: 1 },
            { name: "array", color: "#00FF00", id: 2 },
          ]}
          rating={{ upvotes: 10, downvotes: 2 }}
          language="java"
        />
        <Card
          id={1}
          title="Trapping Rainwater"
          author={{ firstName: "John", lastName: "Smith", id: 1 }}
          description="Fastest python solution for trapping rainwater problem"
          tags={[
            { name: "hard", color: "#FF0000", id: 1 },
            { name: "array", color: "#00FF00", id: 2 },
          ]}
          rating={{ upvotes: 11, downvotes: 22 }}
        />
        <Card
          id={1}
          title="Trapping Rainwater"
          author={{ firstName: "John", lastName: "Smith", id: 1 }}
          description="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
          tags={[
            { name: "hard", color: "#FF0000", id: 1 },
            { name: "array", color: "#00FF00", id: 2 },
          ]}
        />
        <Card
          id={1}
          title="Trapping Rainwater"
          author={{ firstName: "John", lastName: "Smith", id: 1 }}
          description="Fastest python solution for trapping rainwater problem"
          tags={[
            { name: "hard", color: "#FF0000", id: 1 },
            { name: "array", color: "#00FF00", id: 2 },
          ]}
          language="python"
        />
      </div>
    </main>
  );
};

export default Home;
