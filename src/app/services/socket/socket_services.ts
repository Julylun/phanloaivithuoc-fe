export default class Socket {
    static socket: WebSocket | undefined 

    static getInstance = (): WebSocket | undefined => {
        if (this.socket) return this.socket
        else {
            return undefined
        }
    }

    static initSocket = (endpoint: string) => {
        this.socket = new WebSocket(endpoint)
        return this.socket
    }
}