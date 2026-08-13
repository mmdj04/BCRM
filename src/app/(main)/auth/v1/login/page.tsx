import { LoginForm } from "../../_components/login-form";
import { GoogleButton } from "../../_components/social-auth/google-button";
import { AuthV1Shell } from "../_components/auth-v1-shell";

export default function LoginV1() {
  return (
    <AuthV1Shell mode="login">
      <LoginForm />
      <GoogleButton className="w-full" variant="outline" />
    </AuthV1Shell>
  );
}
