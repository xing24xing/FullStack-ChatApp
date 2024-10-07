export const USER_API = "http://localhost:8080/api/v1/user"
export const MSG_API = "http://localhost:8080/api/v1/message"
export const BASE_URL = "http://localhost:8080"
// utils/playNotificationSound.js
export const playNotificationSound = () => {
    const audio = new Audio('/ding.mp3');
    audio.play().catch((error) => console.error("Audio play error:", error));
};
