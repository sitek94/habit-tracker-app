import { ReactComponent as ProgressData } from 'svgs/progress-data.svg';

const { default: EmptyState } = require('components/empty-state');

const LandingPage = () => {
  return (
    <div>
      <ProgressData />
    </div>
  );
};

export default LandingPage;
