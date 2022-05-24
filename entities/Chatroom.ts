export class Chatroom {
    // title: string;
    // chatmessages: Chatmessage[];
    // imageUrl: string;
    // id?: string;

    constructor(public title: string, public messages: message[], public imageUrl: string, public id?: string) {
        // this.id = id;
        // this.title = title;
        // this.chatmessages = chatmessages;
        // this.imageUrl = imageUrl;
    }
}

export class message {
    constructor(private messageId: String, public messageText: String, public messageTimestamp: String, public user: String) {
        this.messageId = messageId;
        this.messageText = messageText;
        this.messageTimestamp = messageTimestamp;
        this.user = user;
    }
}