export const useTelegram = () => {
    return (window as any)?.Telegram?.WebApp ?? {};
};
