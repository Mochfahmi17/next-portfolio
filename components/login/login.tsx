import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";

const Login = () => {
  return (
    <main>
      <section className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-[3%]">
          <div className="flex h-screen items-center justify-center">
            <Card className="w-sm">
              <CardHeader>
                <CardTitle className="mb-1 text-center text-2xl font-semibold">
                  Login
                </CardTitle>
                <CardDescription className="text-center text-sm text-slate-600">
                  Please enter your email and password to access dashboard page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
