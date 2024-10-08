import { styled } from '@mui/material/styles';
import MUIRadio, { RadioProps } from '@mui/material/Radio';

import { useTheme } from '../context';

const Icon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
    ...theme.applyStyles('dark', {
      backgroundColor: '#30404d',
    }),
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
    ...theme.applyStyles('dark', {
      background: 'rgba(57,75,89,.5)',
    }),
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
    backgroundColor: '#394b59',
  }),
}));

const CheckedIcon = styled(Icon)(({ $colorPrimary }) => ({
  backgroundColor: $colorPrimary,
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: `${$colorPrimary}b0`,
  },
}));

export const Radio = (props: RadioProps) => {
  const { colorPrimary } = useTheme();

  return (
    <MUIRadio
      sx={{ padding: 0 }}
      color="default"
      checkedIcon={<CheckedIcon $colorPrimary={colorPrimary} />}
      icon={<Icon />}
      {...props}
    />
  );
};
