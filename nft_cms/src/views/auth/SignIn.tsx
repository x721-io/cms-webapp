import InputField from "../../components/fields/InputField";


export default function SignIn() {
  return (
    <div className='m-0 p-0 flex justify-center items-center'
    style={{ backgroundColor: '#c9d6ff', background: 'linear-gradient(to right, #e2e2e2, #c9d6ff)', height: '100vh' }}>
      {/* Sign in section */}
      <div className="bg-white rounded-3xl shadow-md w-full max-w-full flex-col items-center xl:max-w-[420px] p-8">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-3 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simple.com"
          id="email"
          type="text"
        />
        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
        />
        <button 
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          style={{background: 'linear-gradient(to right, #5c6bc0, #512da8)'}}>
          Sign In
        </button>
      </div>
    </div>
  );
}
