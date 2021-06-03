const About = {
  meta: {
    title: 'About Us and Our History of Pony Creator 🍊 - The Fluffies',
    description:
      'Description about pony editor and us, history of development and ' +
      'creation, reasons for using 3D graphics, editor authors and technologies ' +
      'used in the editor 🔨',
  },

  header: 'About us and our history | of editor creation',
  description:
    'The story of how the project was born and developed the difficulties ' +
    'passed and the description of the project itself',

  conception: {
    h2: 'Conception',
    text:
      'The idea of creating a project appeared in the summer of 2018 as ' +
      'the possibility of easy accessibility to creating pony characters ' +
      'directly from the browser using modern technologies without ' +
      'downloading and installing requirements',
    text2:
      'At the same time, achieving great convenience and many options for ' +
      'tools for interacting with the character',
  },

  motivation: {
    h2: 'Motivation',
    text:
      'Observing the trend in the popularity of Pony Creator and SFM, ' +
      'there was a decision to come up with an editor and attract users ' +
      'with an alternative option and design in order to improve the ' +
      'content and the editor itself for creating it, I did not like the ' +
      'current state of this content and its consumption',
  },

  technologies: {
    h2: 'Technologies',
    text:
      'The editor uses Next.js to work as a Docker-based microservice, and ' +
      'also includes other programs written in Node.js, Three.js is used ' +
      'for rendering 3D, and Socket.io is used to contact the browser with ' +
      'the server',
    sub: 'constantly finding new solutions',
  },

  history: {
    h2: 'History of the project',
    text:
      "How we found the ideal style and how the editor's appearance changed " +
      'over time from the choice of solutions with the description of ' +
      'versions',
  },

  version: 'version',

  versions: [
    'The first implementation of the idea of the editor in the ' +
      'browser already with the ability to rotate the character by ' +
      'imitating the change of perspective using the vector ' +
      'interpolation method, this version was very unoptimized due to ' +
      'the combination of jQuery and SVG',

    'The successful implementation of the editor based on updating ' +
      'the first code, taking into account the shortcomings of the ' +
      'previous one, is faster, but also contains a number of problems, ' +
      'is based on Vue and Nuxt and for drawing vectors: Canvas',

    'The current version with a complete overhaul of technologies, ' +
      'the project is now in 3D with ease of development and its ' +
      'support, the emergence of many ideas due to the ease of their ' +
      'implementation',
  ],

  team: {
    h2: 'Our team',
    text: 'Main persons who support the project',
  },

  members: [
    {
      nickname: 'Electrum18',
      rank: 'Project author | Programmer | DevOps',
    },
    {
      nickname: 'LightingZap',
      rank: 'Hosting',
    },
  ],

  helping: {
    h2: 'Want to help us?',
    text: 'Anyone can develop a project and even become a part of our team!',
    button: 'Go to the support page',
  },
}

export default About
