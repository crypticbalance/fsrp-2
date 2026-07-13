import axios from "axios";

export async function getRobloxUsername(userId) {
    if (!userId) return null;

    try {
        const { data } = await axios.get(
            `https://users.roblox.com/v1/users/${userId}`,
            {
                timeout: 5000,
                validateStatus: status => status === 200
            }
        );

        return data.name ?? null;
    } catch {
        return null;
    }
}