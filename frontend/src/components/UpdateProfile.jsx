
import { useState } from "react";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  age: "",
  gender: "",
  photoUrl: "",
  about: "",
  skill: [],
};

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [skills, setSkills] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const defaultPhoto =
    "https://avatars.githubusercontent.com/u/59255732?v=4";

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitted(false);
  };

  const validate = () => {
    const next = {};

    if (!form.firstName.trim())
      next.firstName = "First name is required";

    if (!form.lastName.trim())
      next.lastName = "Last name is required";

    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      next.email = "Enter a valid email address";
    }

    if (!form.password) {
      next.password = "Password is required";
    } else if (
      form.password.length < 8 ||
      !/[a-z]/.test(form.password) ||
      !/[A-Z]/.test(form.password) ||
      !/[0-9]/.test(form.password) ||
      !/[^A-Za-z0-9]/.test(form.password)
    ) {
      next.password =
        "Use 8+ characters, uppercase, lowercase, number and symbol";
    }

    if (form.age === "") {
      next.age = "Age is required";
    } else if (
      !Number.isInteger(Number(form.age)) ||
      Number(form.age) < 18
    ) {
      next.age = "You must be at least 18";
    }

    if (!form.gender) next.gender = "Please select a gender";

    if (
      form.photoUrl.trim() &&
      !/^https?:\/\/[^\s.]+(\.[^\s.]+)+/i.test(
        form.photoUrl.trim()
      )
    ) {
      next.photoUrl = "Enter a valid photo URL";
    }

    if (form.about.toLowerCase().includes("sex")) {
      next.about = "Please change your about text";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(false);

    if (!validate()) return;

    const userData = {
      ...form,
      email: form.email.trim().toLowerCase(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: Number(form.age),
      photoUrl: form.photoUrl.trim() || defaultPhoto,
      about:
        form.about.trim() ||
        "this is default about of User, not provided by User",
      skill: skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    // Connect your signup API here.
    console.log("Signup data:", userData);
    setSubmitted(true);
  };

  const fieldClass =
    "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "text-sm font-medium text-slate-700";

  const Field = ({ label, name, type = "text", placeholder }) => (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={updateField}
        placeholder={placeholder}
        className={fieldClass}
        autoComplete={
          name === "password"
            ? "new-password"
            : name === "email"
              ? "email"
              : name === "firstName"
                ? "given-name"
                : name === "lastName"
                  ? "family-name"
                  : "off"
        }
        aria-invalid={Boolean(errors[name])}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-600">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-7 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
            U
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Join us today. It only takes a minute.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="font-semibold text-slate-900">
              Personal information
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Fields marked * are required.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="First name"
              name="firstName"
              placeholder="John"
            />
            <Field
              label="Last name"
              name="lastName"
              placeholder="Doe"
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              placeholder="john@example.com"
            />

            <div>
              <label htmlFor="password" className={labelClass}>
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={updateField}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
                  className={`${fieldClass} pr-16`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="age" className={labelClass}>
                Age <span className="text-red-500">*</span>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="18"
                step="1"
                value={form.age}
                onChange={updateField}
                placeholder="18 or above"
                className={fieldClass}
                aria-invalid={Boolean(errors.age)}
              />
              {errors.age && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.age}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="gender" className={labelClass}>
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={updateField}
                className={fieldClass}
                aria-invalid={Boolean(errors.gender)}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">
                  Prefer not to say
                </option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.gender}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="photoUrl" className={labelClass}>
                Profile photo URL
              </label>
              <input
                id="photoUrl"
                name="photoUrl"
                type="url"
                value={form.photoUrl}
                onChange={updateField}
                placeholder="https://example.com/photo.jpg"
                className={fieldClass}
              />
              {errors.photoUrl && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.photoUrl}
                </p>
              )}
              <p className="mt-1 text-xs text-slate-400">
                Optional. A default photo will be used if empty.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="about" className={labelClass}>
                About you
              </label>
              <textarea
                id="about"
                name="about"
                rows={3}
                maxLength={500}
                value={form.about}
                onChange={updateField}
                placeholder="Tell us a little about yourself..."
                className={`${fieldClass} resize-y`}
              />
              {errors.about && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.about}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="skills" className={labelClass}>
                Skills
              </label>
              <input
                id="skills"
                name="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Node.js, MongoDB"
                className={fieldClass}
              />
              <p className="mt-1 text-xs text-slate-400">
                Optional. Separate skills with commas.
              </p>
            </div>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create account
            </button>

            {submitted && (
              <p
                role="status"
                className="mt-4 rounded-lg bg-green-50 p-3 text-center text-sm text-green-700"
              >
                Form validated successfully! Ready to connect to your API.
              </p>
            )}

            <p className="mt-4 text-center text-xs text-slate-400">
              By signing up, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
