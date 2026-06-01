import { type ChangeEvent, type SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeSlash, Stack } from '../../assets/icons';
import Button from '../ui/button';
import Input from '../ui/input';
import Label from '../ui/label';
import Logo from '../ui/logo';
import styles from './login-form.module.css';

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    emailError: false,
    passwordError: false,
    globalError: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({
      ...prev,
      [`${name}Error`]: false,
      globalError: '',
    }));
  };

  const handleLogin = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || formData.email !== 'admin@stockflow.com') {
      setFormErrors((prev) => ({ ...prev, globalError: 'Type a valid email', emailError: true }));
      return;
    }

    if (!formData.password || formData.password !== 'admin123') {
      setFormErrors((prev) => ({
        ...prev,
        globalError: 'Type a valid password',
        passwordError: true,
      }));
      return;
    }

    navigate('/dashboard');
  };

  return (
    <section className={styles.section}>
      <div className={styles.pictureWrapper}>
        <picture className={styles.picture}>
          <img
            className={styles.img}
            src='/auth-bg.png'
            alt='Huge product warehouse'
          />
        </picture>
        <article className={styles.pictureData}>
          <div className={styles.pictureDataContent}>
            <span className={styles.pictureDataIcon}>
              <Stack size={42} />
            </span>
            <h1>Stock Flow</h1>
            <p>
              The next generation of inventory control. Secure, fast, and engineered for
              high-performance operations
            </p>
          </div>
        </article>
      </div>
      <article className={styles.loginArticle}>
        <div className={styles.loginArticleContent}>
          <header className={styles.loginHeader}>
            <Logo />
            <h1>Welcome back</h1>
            <p>Please enter your credentiales to access the dashboard</p>
          </header>
          <form
            className={styles.loginForm}
            onSubmit={(e) => handleLogin(e)}
          >
            <Label htmlFor='email-input'>
              Email address
              <Input
                id='email-input'
                name='email'
                type='email'
                placeholder='name@stockflow.com'
                value={formData.email}
                onChange={(e) => handleInputChange(e)}
                error={formErrors.emailError}
              />
            </Label>

            <div className={styles.passwordInputWrapper}>
              <Label htmlFor='password-input'>
                Password
                <Input
                  id='password-input'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  maxLength={16}
                  value={formData.password}
                  onChange={handleInputChange}
                  error={formErrors.passwordError}
                />
              </Label>
              <button
                type='button'
                className={styles.passwordToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye /> : <EyeSlash />}
              </button>
            </div>

            <span className={styles.error}>{formErrors.globalError}</span>

            <Button type='submit'>
              <span>Sign In</span>
              <span>
                <ArrowRight />
              </span>
            </Button>
          </form>

          <footer className={styles.loginFooter}>
            <p className={styles.advice}>
              Authorized personnel only. Access is monitored and logged.
            </p>
          </footer>
        </div>
      </article>
    </section>
  );
}
