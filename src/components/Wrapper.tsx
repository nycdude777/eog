import * as React from 'react';
import {useAppStyles} from '../appStyles';

const Wrapper: React.FC = ({ children }) => {
  const {classes} = useAppStyles();
  return <div className={ classes.wrapper }>{children}</div>;
};

export default Wrapper;
