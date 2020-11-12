<template lang="pug">
  v-main
    v-container
      v-sheet(shaped elevation=3).my-4.pa-4
        h1 Privacy Policy
        p Last updated: July 10, 2020
        p We operate https://the-fluffies.net/ (the "Site"). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site.
        p We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.

        v-divider.my-4

        h2 Information Collection And Use
        p While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name or email address ("Personal Information").

        v-divider.my-4

        h2 Cookies
        p Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.
        p Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.

        v-divider.my-4

        h2 Security
        p The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.

        v-divider.my-4

        h2 Log Data
        p Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data").
        p This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages, script errors, chat messages, in-game actions performed by user and other statistics.
        p In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this data.

        v-divider.my-4

        h2 Changes To This Privacy Policy
        p This Privacy Policy is effective as of August 11, 2016 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
        p We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
        p If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.

        v-divider.my-4

        h2 Contact Us
        p2 If you have any questions about this Privacy Policy, please contact us.
</template>

<script>
import i18nHead from '~/assets/ts/i18nHead.ts'

export default {
  head() {
    return i18nHead(this, 'privacy', '/privacypolicy/')
  }
}
</script>
