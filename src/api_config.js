// export const apiUrl = "https://api.fayidaacademy.com";
const isServer = typeof window === 'undefined';
export const apiUrl = isServer ? 'https://api.fayidaacademy.com' : '/api';

export const localUrl = "https://admin.fayidaacademy.com";
// export const localUrl = "http://localhost:3000";

export const adminId = "47b789e0-409f-43c5-9c21-d7a0df1dcd01";
export const subAdminId = "2507060f-4698-41af-b958-4eacebeea3ad";
