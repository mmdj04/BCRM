import { RegisterForm } from "../../_components/register-form";
import { GoogleButton } from "../../_components/social-auth/google-button";
import { AuthV1Shell } from "../_components/auth-v1-shell";

export default function RegisterV1() {
  return (
    <AuthV1Shell mode="register">
      <RegisterForm />
      <GoogleButton className="w-full" variant="outline" />
    </AuthV1Shell>
  );
}
