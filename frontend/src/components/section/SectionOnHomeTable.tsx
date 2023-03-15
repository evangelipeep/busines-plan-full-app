import { GridElement } from './../GridElement'

export const SectionOnHomeTable = () => {
  return (
    <section className="bg-my-green py-[10vh]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center font-bold text-2xl pb-[5vh]">
          Проект можно разработать в любой отрасли
        </h1>

        <ul className="grid gap-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
          <GridElement
            text="Бизнес-план в сфере красоты"
            img="./../images/img-1.png"
          />
          <GridElement
            text="Бизнес-план в сфере
            швейной матерской"
            img="./../images/img-2.png"
          />
          <GridElement
            text="Бизнес-план в сфере 
            ремонта компьютеров"
            img="./../images/img-3.png"
          />
          <GridElement
            text="Бизнес-план в сфере фотоуслуг"
            img="./../images/img-4.png"
          />
          <GridElement
            text="Бизнес-план в сфере СТО"
            img="./../images/img-5.png"
          />
          <GridElement
            text="Бизнес-план в сфере 
            общественного питания"
            img="./../images/img-6.png"
          />
          <GridElement
            text="Бизнес-план в сфере обучения"
            img="./../images/img-7.png"
          />
          <GridElement text="И много других сфер" img="./../images/img-8.png" />
        </ul>
      </div>
    </section>
  )
}
