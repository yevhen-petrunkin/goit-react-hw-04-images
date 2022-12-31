import { ThreeCircles } from 'react-loader-spinner';

export const Loader = () => (
  <div style={{ display: 'block', margin: '0 auto' }}>
    <ThreeCircles
      height="60"
      width="60"
      color="#3f51b5"
      visible={true}
      ariaLabel="three-circles-rotating"
    />
  </div>
);
