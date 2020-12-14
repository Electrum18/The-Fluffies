<template lang="pug">
  v-main
    v-container
      v-sheet(shaped elevation=3).my-4.pa-4
        h1 Terms of Service ("Terms")
        p Last updated: July 10, 2020
        p Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the https://the-fluffies.net/ website (the "Service") operated by us.
        p Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
        p By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.

        v-divider.my-4

        h2 Termination
        p We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        p All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.

        v-divider.my-4

        h2 Links To Other Web Sites
        p Our Service may contain links to third­party web sites or services that are not owned or controlled by us.
        p We have no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
        p We strongly advise you to read the terms and conditions and privacy policies of any third­party web sites or services that you visit.

        v-divider.my-4

        h2 User submitted content
        p Our Service may contain content submited by other users of the service.
        p We have no control over, and assumes no responsibility for any content published by other users. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content.
        p We strongly advise you to read the terms and conditions and privacy policies of any third­party web sites or services that you visit.

        v-divider.my-4

        h2 Governing Law
        p These Terms shall be governed and construed in accordance with the laws of EU, without regard to its conflict of law provisions.
        p Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.

        v-divider.my-4

        h2 Changes
        p We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 5 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        p By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.

        v-divider.my-4

        h2 Contact Us
        p If you have any questions about these Terms, please contact us.
</template>

<script>
import i18nHead from '~/assets/ts/i18nHead.ts'
import schemaOrg from '~/assets/ts/schema-org.ts'
import { linkNormalize } from '~/assets/ts/link-normalize.ts'

export default {
  head() {
    const { messages, locale } = this.$i18n
    const { htmlAttrs, meta, link } = this.$nuxtI18nSeo()
    const { title, newMeta } = i18nHead(messages[locale], 'terms')

    return {
      htmlAttrs,
      title,
      meta: [...newMeta, ...meta],
      link: linkNormalize(link),
      script: [schemaOrg(messages[locale], 'terms', '/termsofservice/')],
      __dangerouslyDisableSanitizers: ['script']
    }
  }
}
</script>
