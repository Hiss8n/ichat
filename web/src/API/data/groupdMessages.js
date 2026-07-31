export const groupMessages = {
  g1: [
    {
      _id: "m1",
      senderId: "u2",
      text: "Hello everyone 👋",
      type: "text",
      createdAt: "2026-07-25T08:30:00Z",
      status: "read"
    },
    {
      _id: "m2",
      senderId: "system",
      text: "User u3 added u2 to the group",
      type: "system",
      createdAt: "2026-07-25T08:31:00Z"
    },
    {
      _id: "m3",
      senderId: "u3",
      text: "Welcome to the React group!",
      type: "text",
      createdAt: "2026-07-25T08:32:00Z",
      status: "read",
      reactions: [
        { emoji: "❤️", count: 2, users: ["u2", "u1"] }
      ]
    },
    {
      _id: "m4",
      senderId: "u2",
      text: "Has anyone tried React 19 server components in production yet?",
      type: "text",
      createdAt: "2026-07-25T08:45:00Z",
      status: "read",
      replyTo: {
        _id: "m3",
        senderId: "u3",
        text: "Welcome to the React group!"
      }
    }
  ],

  g2: [
    {
      _id: "m5",
      senderId: "u6",
      text: "Meeting starts in 10 minutes.",
      type: "text",
      createdAt: "2026-07-25T10:15:00Z",
      status: "delivered",
      reactions: [
        { emoji: "👍", count: 3, users: ["u1", "u4", "u5"] }
      ]
    },
    {
      _id: "m6",
      senderId: "u4",
      text: "Here is the agenda document for today's sync.",
      type: "media",
      createdAt: "2026-07-25T10:18:00Z",
      status: "delivered",
      attachments: [
        {
          attachmentId: "att_1",
          fileType: "image",
          url: "https://example.com/files/agenda.png",
          fileName: "sprint-agenda.png",
          fileSize: "1.2 MB"
        }
      ]
    }
  ],

  g3: [
    {
      _id: "m7",
      senderId: "u5",
      text: "Who's watching the match?",
      type: "text",
      createdAt: "2026-07-25T11:00:00Z",
      status: "read"
    },
    {
      _id: "m8",
      senderId: "u9",
      text: "I think Arsenal will win!",
      type: "text",
      createdAt: "2026-07-25T11:30:00Z",
      status: "read",
      reactions: [
        { emoji: "🔥", count: 1, users: ["u5"] }
      ]
    }
  ]
};