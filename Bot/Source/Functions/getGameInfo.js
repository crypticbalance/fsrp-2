export function getGameInfo() {
    const res = fetch("https://api.erlc.gg/v2/server?Players=true&Staff=true&JoinLogs=true&Queue=true&KillLogs=true&CommandLogs=true&ModCalls=true&EmergencyCalls=true&Vehicles=true", {
        method: "GET",
        headers: {
            "server-key": 'vaUXDJQaGeegaeDGEeaR-SZEgxsDzMNGbxDyrdwADHSOIFfIUPiLHilIbncAc'
        }
    });

    const data = res.json()

    return data;
}