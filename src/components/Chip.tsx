import Chip from '@material-ui/core/Chip';
import { withStyles, Theme } from '@material-ui/core/styles';

const cardStyles = (theme: Theme) => ({
  root: {
    background: theme.palette.primary.dark,
  },
  label: {
    color: theme.palette.primary.contrastText,
  },
});
export default withStyles(cardStyles)(Chip);
