import {exec} from 'child_process'

console.log('\n\n\n\n')
console.log('ebashim console log')

exec('pnpm next start', (err, stdout, stderr) => {
  if (err) {
    console.log(`error: ${err.message}`)
    return
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`)
    return
  }
  console.log(`stdout: ${stdout}`)
})