import { ArrowRight, Stack } from '../../assets/icons';
import Button from '../ui/button';
import Input from '../ui/input';
import Label from '../ui/label';
import Logo from '../ui/logo';
import styles from './login-form.module.css';

export default function LoginForm() {
  return (
    <section className={styles.section}>
      <div className={styles.pictureWrapper}>
        <picture className={styles.picture}>
          <img className={styles.img} src='/auth-bg.png' alt='Huge product warehouse' />
        </picture>
        <article className={styles.pictureData}>
          <div className={styles.pictureDataContent}>
            <span className={styles.pictureDataIcon}>
              <Stack size={42} />
            </span>
            <h1>Stock Flow</h1>
            <p>The next generation of inventory control. Secure, fast, and engineered for high-performance operations</p>
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
          <form className={styles.loginForm}>
            <Label htmlFor='email-input'>
              Email address
              <Input id='email-input' name='email-input' type='email' placeholder='name@stockflow.com' />
            </Label>

            <Label htmlFor='password-input'>
              Password
              <Input id='password-input' name='password-input' type='password' placeholder='name@stockflow.com' />
            </Label>

            <Button type='submit'>
              <span>Sign In</span>
              <span><ArrowRight /></span>
            </Button>
          </form>

          <footer className={styles.loginFooter}>
            <p className={styles.advice}>Authorized personnel only. Access is monitored and logged.</p>
          </footer>
        </div>
      </article>
    </section>
  )
}
