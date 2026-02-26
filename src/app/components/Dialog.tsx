'use client';

import useAppStore from '../../../store';
import LoginDialog from '@/app/components/Login';

const Dialog = () => {
  const { loginDialog, toggleLoginDialog } = useAppStore();

  return <>{loginDialog && <LoginDialog />}</>;
};

export default Dialog;
