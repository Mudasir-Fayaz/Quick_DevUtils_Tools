'use client'


const Container = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {


  return (
    <main className="flex-1 p-4">
       {children}

      </main>
  )
}

export default Container
