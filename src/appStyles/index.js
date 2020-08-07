import { makeStyles } from '@material-ui/core/styles';

//add more if needed
import containers from './containers';
import flex from './flex';
import spacing from './spacing';

export const useAppStyles = () => {

  const classes = makeStyles({ ...containers, ...flex, ...spacing })();

  /**
  * Returns a concatenated string of encoded class names.
  * @param {*} spaceSeparated - A space separated string of classnames to encode.
  * */
  const classify = (spaceSeparated) => {
    return spaceSeparated.split(' ').map(name => classes[name]).join(' ');
  };
  
  /** * why do this...^  because: 
   * 
   *   this:  
   *           className={`${classes.grow} ${classes.together}`} 
   * 
   *   is a lot harder to type than this:
   * 
   *           className={classify('grow together')} 
   */ 

   return {
    classes,
    classify,
  }

};



