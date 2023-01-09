export interface MainSectionLayoutProps {
  title: string
  children: any
}

const MainSectionLayout = ({
  title = 'Test',
  children,
}: MainSectionLayoutProps) => {

  return (
    <main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1>{title}</h1>
      </div>

      <div>{children}</div>
    </main>
  )
}

export default MainSectionLayout
