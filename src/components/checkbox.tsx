import { styled } from '@mui/material/styles';
import MUIChekbox, { CheckboxProps } from '@mui/material/Checkbox';

import { useTheme } from '../context';

const Icon = styled('span')(({ theme }) => ({
  width: 16,
  height: 16,
  borderRadius: 2,
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

const CheckedIcon = styled(Icon)(({ $colorPrimary = '#292b3f' }) => ({
  backgroundColor: $colorPrimary,
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: `${$colorPrimary}99`,
  },
}));

const IndeterminateIcon = styled(Icon)(({ $colorPrimary }) => ({
  backgroundColor: $colorPrimary,
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cline" +
      " x1='4' y1='8' x2='12' y2='8' stroke='%23fff' stroke-width='2' /%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: `${$colorPrimary}b0`,
  },
}));

export const Checkbox = (props: CheckboxProps) => {
  const { colorPrimary } = useTheme();

  return (
    <MUIChekbox
      sx={{
        padding: 0,
      }}
      color="default"
      indeterminateIcon={<IndeterminateIcon $colorPrimary={colorPrimary} />}
      checkedIcon={<CheckedIcon $colorPrimary={colorPrimary} />}
      icon={<Icon />}
      {...props}
    />
  );
};

export const CheckboxPlaceholder = () => {
  return <span style={{ display: 'inline-flex', width: 16, height: 16 }} />;
};
