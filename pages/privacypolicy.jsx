import { useRouter } from 'next/router'
import { FaShieldAlt } from 'react-icons/fa'

import Footer from '@/components/footer'
import Header from '@/components/header'
import Locale from '@/components/locale'
import SiteHead from '@/components/siteHead'
import Title from '@/components/title'
import en from '@/locales/en/pages/privacy'
import ru from '@/locales/ru/pages/privacy'

export default function About() {
  const router = useRouter()

  const t = router.locale === 'ru' ? en : ru

  return (
    <>
      <SiteHead t={t} />
      <Header />

      <main className="page-main">
        <div>
          <FaShieldAlt className="basic-icon" />
          <Title header="Privacy Policy" />
          <p>Last updated: May 27, 2021</p>
        </div>

        <div className="flex-col my-8 div-section">
          <p>
            We operate https://the-fluffies.net/ (the &quot;Site&quot;). This
            page informs you of our policies regarding the collection, use and
            disclosure of Personal Information we receive from users of the
            Site.
          </p>
          <p>
            We use your Personal Information only for providing and improving
            the Site. By using the Site, you agree to the collection and use of
            information in accordance with this policy.
          </p>
        </div>

        <section className="flex-col">
          <h2>Information Collection And Use</h2>
          <p>
            While using our Site, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you. Personally identifiable information may include, but
            is not limited to your name or email address (&quot;Personal
            Information&quot;).
          </p>
        </section>

        <section className="flex-col">
          <h2>Cookies</h2>
          <p>
            Cookies are files with small amount of data, which may include an
            anonymous unique identifier. Cookies are sent to your browser from a
            web site and stored on your computer&apos;s hard drive.
          </p>
          <p>
            Like many sites, we use &quot;cookies&quot; to collect information.
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, if you do not accept cookies,
            you may not be able to use some portions of our Site.
          </p>
        </section>

        <section className="flex-col">
          <h2>Security</h2>
          <p>
            The security of your Personal Information is important to us, but
            remember that no method of transmission over the Internet, or method
            of electronic storage, is 100% secure. While we strive to use
            commercially acceptable means to protect your Personal Information,
            we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="flex-col">
          <h2>Log Data</h2>
          <p>
            Like many site operators, we collect information that your browser
            sends whenever you visit our Site (&quot;Log Data&quot;).
          </p>
          <p>
            This Log Data may include information such as your computer&apos;s
            Internet Protocol (&quot;IP&quot;) address, browser type, browser
            version, the pages of our Site that you visit, the time and date of
            your visit, the time spent on those pages, script errors, chat
            messages, in-game actions performed by user and other statistics.
          </p>
          <p>
            In addition, we may use third party services such as Google
            Analytics that collect, monitor and analyze this data.
          </p>
        </section>

        <section className="flex-col">
          <h2>Changes To This Privacy Policy</h2>
          <p>
            This Privacy Policy is effective as of August 11, 2016 and will
            remain in effect except with respect to any changes in its
            provisions in the future, which will be in effect immediately after
            being posted on this page.
          </p>
          <p>
            We reserve the right to update or change our Privacy Policy at any
            time and you should check this Privacy Policy periodically. Your
            continued use of the Service after we post any modifications to the
            Privacy Policy on this page will constitute your acknowledgment of
            the modifications and your consent to abide and be bound by the
            modified Privacy Policy.
          </p>
          <p>
            If we make any material changes to this Privacy Policy, we will
            notify you either through the email address you have provided us, or
            by placing a prominent notice on our website.
          </p>
        </section>

        <section className="flex-col mb-0">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us.
          </p>
        </section>
      </main>

      <Locale />
      <Footer />
    </>
  )
}
