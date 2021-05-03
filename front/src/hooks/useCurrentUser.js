import { useRecoilValue } from 'recoil';

export function useCurrentUser() {
  const currentUserId = useRecoilValue(currentUserState); // グローバルステートからcurrentUserを取り出す
  const isAuthChecking = currentUser === undefined; // ログイン情報を取得中かどうか

  return {
    currentUser,
    isAuthChecking
  };
}