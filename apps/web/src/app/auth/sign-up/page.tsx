import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input name="name" type="name" id="name" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Password</Label>
        <Input
          name="password_confirmation"
          type="password"
          id="password_confirmation"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Confirm your password</Label>
        <Input name="password" type="password" id="password" />
      </div>
      <Button type="submit" className="w-full">
        Create account
      </Button>
      <Button variant="link" className="w-full" asChild>
        <Link href="/auth/sign-in">Already registered? Sing in</Link>
      </Button>
      <Separator />
      <Button type="submit" variant="outline" className="w-full">
        <Image src={githubIcon} alt="" className="mr-2 size-4 dark:invert" />
        Sign up with Github
      </Button>
    </form>
  )
}
