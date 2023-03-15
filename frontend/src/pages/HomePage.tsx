import { SectionOnHome } from '../components/section/SectionOnHome'
import { SectionOnHomeDescription } from '../components/section/SectionOnHomeDescription'
import { SectionOnHomeTable } from '../components/section/SectionOnHomeTable'

export const HomePage = () => {
  return (
    <>
      <SectionOnHome />
      <SectionOnHomeDescription />
      <SectionOnHomeTable />
    </>
  )
}
