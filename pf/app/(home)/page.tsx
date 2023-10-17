import { UserAuthForm } from '@/components/user-auth-form'

export default async function HomePage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 ">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-5xl lg:text-5xl">
            Severstal Delivery Analysis Platform
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            This resource requires sign-on to access.
          </p>
          <UserAuthForm />
        </div>
      </section>
    </>
  )
}
