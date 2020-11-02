import { ReactComponent as UnderConstruction } from 'svgs/under-construction.svg'

const { default: EmptyState } = require('components/empty-state')


const LandingPage = () => {
  return (
    <EmptyState 
      image={<UnderConstruction />}
      title="Habit Tracker App"
      description="Work in progress... in the meantime I recommend that you keep track of your habits in a journal :D"
    />
  )
}

export default LandingPage;