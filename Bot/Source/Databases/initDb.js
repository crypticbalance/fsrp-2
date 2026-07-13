import Database from "better-sqlite3";

export const verificationDb = new Database('./Bot/Source/Databases/verifications.sqlite3');
verificationDb.prepare(`
    CREATE TABLE IF NOT EXISTS verifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        discordId TEXT NOT NULL,
        robloxId TEXT NOT NULL
    )
`).run();
export const addUser = (discordId, robloxId) => {
    verificationDb.prepare(`
        INSERT INTO verifications (discordId, robloxId)
        VALUES (?, ?)
    `).run(discordId, robloxId);
};
export const getDiscordFromRobloxId = (robloxId) => {
    return verificationDb.prepare(`
        SELECT * FROM verifications
        WHERE robloxId = ?
    `).get(robloxId);
};
export const removeVerification = (discordId) => {
    return verificationDb.prepare(`
        DELETE FROM verifications
        WHERE discordId = ?
    `).run(discordId);
};
export const getVerificationByDiscord = (discordId) => {
    return verificationDb.prepare(`
        SELECT * FROM verifications
        WHERE discordId = ?
    `).get(discordId);
};

export const ticketsDb = new Database('./Bot/Source/Databases/tickets.sqlite3');
ticketsDb.prepare(`
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        openedAt INTEGER NOT NULL,
        openedBy TEXT NOT NULL, 
        type TEXT NOT NULL, 
        inquiry TEXT NOT NULL,
        channelId TEXT NOT NULL, 
        claimedBy TEXT, 
        claimedAt INTEGER, 
        responseTime INTEGER,
        closedAt INTEGER, 
        closedBy TEXT,
        messageCount INTEGER, 
        transcriptURL TEXT, 
        rating INTEGER 
    )
`).run();
export const openTicket = (openedBy, type, inquiry, channelId) => {
    return ticketsDb.prepare(`
        INSERT INTO tickets (openedAt, openedBy, type, inquiry, channelId)
        VALUES (?, ?, ?, ?, ?)
    `).run(
        Math.round(Date.now() / 1000),
        openedBy,
        type,
        inquiry,
        channelId
    );
};
export const claimTicket = (channelId, claimedBy) => {
    ticketsDb.prepare(`
        UPDATE tickets
        SET claimedBy = ?, claimedAt = ?, responseTime = ?
        WHERE channelId = ?
    `).run(
        claimedBy,
        Math.floor(Date.now() / 1000),
        Math.floor(Date.now() / 1000) - ticketsDb.prepare(`
            SELECT openedAt FROM tickets WHERE channelId = ?
        `).get(channelId).openedAt,
        channelId
    );
};
export const unclaimTicket = (channelId) => {
    ticketsDb.prepare(`
        UPDATE tickets
        SET claimedBy = NULL, claimedAt = NULL, responseTime = NULL
        WHERE channelId = ?
    `).run(channelId);
};
export const getTicket = (channelId) => {
    return ticketsDb.prepare(`
        SELECT * FROM tickets
        WHERE channelId = ?
    `).get(channelId);
};
export const getAllTickets = () => {
    return ticketsDb.prepare(`
        SELECT * FROM tickets
    `).all();
};
export const closeTicket = (channelId, closedBy, messageCount, transcriptURL) => {
    const ticket = getTicket(channelId);

    const responseTime = ticket.claimedAt
        ? Date.now() - ticket.openedAt
        : null;

    return ticketsDb.prepare(`
        UPDATE tickets
        SET 
            closedAt = ?,
            closedBy = ?,
            messageCount = ?,
            transcriptURL = ?,
            responseTime = ?
        WHERE channelId = ?
    `).run(
        Date.now() / 1000,
        closedBy,
        messageCount,
        transcriptURL,
        responseTime,
        channelId
    );
};

export const sessionsDb = new Database('./Bot/Source/Databases/sessions.sqlite3');
sessionsDb.prepare(`
    CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        messageId TEXT NOT NULL,
        requiredVotes INTEGER NOT NULL,
        createdAt INTEGER NOT NULL,
        votes TEXT DEFAULT '[]'
    )
`).run();

export const hostSession = (messageId, user, requiredVotes) => {
    return sessionsDb.prepare(`
        INSERT INTO sessions (messageId, requiredVotes, createdAt)
        VALUES (?, ?, ?)
    `).run(
        messageId,
        requiredVotes,
        Math.floor(Date.now() / 1000)
    );
}

function dropTable(db, table) {
    db.prepare(`
        DROP TABLE IF EXISTS ${table}
    `).run();
}