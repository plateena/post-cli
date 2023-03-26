import welcome from 'cli-welcome'

const greetings = () => {
    welcome({
        title: 'Welcome to post-cli',
        tagLine: 'by plateena',
        version: '1.0',
        bgColor: '#FF0000',
        bold: true,
        clear: true
  })
}

export default greetings
