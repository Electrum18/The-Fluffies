import { useRouter } from 'next/router'
import { FaUserCheck } from 'react-icons/fa'

import Footer from '@/components/footer'
import Header from '@/components/header'
import Locale from '@/components/locale'
import SiteHead from '@/components/siteHead'
import Title from '@/components/title'
import en from '@/locales/en/pages/terms'
import ru from '@/locales/ru/pages/terms'

export default function About() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <>
      <SiteHead t={t} />
      <Header />

      <main className="page-main">
        <div>
          <FaUserCheck className="basic-icon" />
          <Title header="Terms of Service" />
          <p>Last updated: May 27, 2021</p>
        </div>

        <div section className="flex-col my-8 div-section">
          <p>
            Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms
            of Service&quot;) carefully before using the
            https://the-fluffies.net/ website (the &quot;Service&quot;) operated
            by us.
          </p>
          <p>
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users and others who access or use the Service.
          </p>
          <p>
            By accessing or using the Service you agree to be bound by these
            Terms. If you disagree with any part of the terms then you may not
            access the Service.
          </p>
        </div>

        <section section className="flex-col">
          <h2>Termination</h2>
          <p>
            We may terminate or suspend access to our Service immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms.
          </p>
          <p>
            All provisions of the Terms which by their nature should survive
            termination shall survive termination, including, without
            limitation, ownership provisions, warranty disclaimers, indemnity
            and limitations of liability.
          </p>
        </section>

        <section section className="flex-col">
          <h2>Links To Other Web Sites</h2>
          <p>
            Our Service may contain links to third­party web sites or services
            that are not owned or controlled by us.
          </p>
          <p>
            We have no control over, and assumes no responsibility for, the
            content, privacy policies, or practices of any third party web sites
            or services. You further acknowledge and agree that we shall not be
            responsible or liable, directly or indirectly, for any damage or
            loss caused or alleged to be caused by or in connection with use of
            or reliance on any such content, goods or services available on or
            through any such web sites or services.
          </p>
          <p>
            We strongly advise you to read the terms and conditions and privacy
            policies of any third­party web sites or services that you visit.
          </p>
        </section>

        <section section className="flex-col">
          <h2>User submitted content</h2>
          <p>
            Our Service may contain content submited by other users of the
            service.
          </p>
          <p>
            We have no control over, and assumes no responsibility for any
            content published by other users. You further acknowledge and agree
            that we shall not be responsible or liable, directly or indirectly,
            for any damage or loss caused or alleged to be caused by or in
            connection with use of or reliance on any such content.
          </p>
          <p>
            We strongly advise you to read the terms and conditions and privacy
            policies of any third­party web sites or services that you visit.
          </p>
        </section>

        <section section className="flex-col">
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of EU, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect. These
            Terms constitute the entire agreement between us regarding our
            Service, and supersede and replace any prior agreements we might
            have between us regarding the Service.
          </p>
        </section>

        <section section className="flex-col">
          <h2>Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 5 days notice prior to any new terms taking effect.
            What constitutes a material change will be determined at our sole
            discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, please stop using the Service.
          </p>
        </section>

        <section section className="flex-col mb-0">
          <h2>Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us.</p>
        </section>
      </main>

      <Locale />
      <Footer />
    </>
  )
}
