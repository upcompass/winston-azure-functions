const config = require('./tsconfig.json')

export async function compile(task) {
  await task.source('src/**/index.ts').shell('yarn tsc')
}

export async function build(task) {
  await task.serial(['clean', 'compile'])
}

export async function clean(task) {
  await task.clear('dist')
}

export default async function(task) {
  await task.start('build')
}
