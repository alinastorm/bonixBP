


export class ЭлектроннаяПочта {
    private receivedEmails: { sender: string, receiver: string, data: any }[]
    private sentEmails: { sender: string, receiver: string, data: any }[]

    /** Отправить электронное письмо receiveEmail*/
    отправитьЭлектронноеПисьмо(email: { sender: string, receiver: string, data: any }) {
        this.sentEmails.push(email)
    }
    /** Получить электронное письмо sendEmail*/
    получитьЭлектронноеПисьмо() {
        return this.receivedEmails
    }
}
