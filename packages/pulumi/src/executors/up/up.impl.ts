import { buildCommand } from '@nx-extend/core'
import { ExecutorContext } from '@nx/devkit'
import { execSync } from 'child_process'
import { which } from 'shelljs'

export interface UpOptions {
  stack?: string
}

export default async function createExecutor(
  options: UpOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  if (!which('pulumi')) {
    throw new Error('pulumi is not installed!')
  }

  const { sourceRoot } = context.workspace.projects[context.projectName]

  execSync(
    buildCommand(['pulumi up', options.stack && `--stack=${options.stack}`]),
    {
      cwd: sourceRoot,
      stdio: 'inherit'
    }
  )

  return Promise.resolve({ success: true })
}
