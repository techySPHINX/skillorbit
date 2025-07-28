class WebSocketService {
  static socket: WebSocket | null = null;
  static messageCallbacks: Function[] = [];

  static connect() {
    if (this.socket) {
      console.log("WebSocket is already connected.");
      return;
    }

    this.socket = new WebSocket("ws://localhost:8000/ws");

    this.socket.onopen = () => {
      console.log("WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      this.messageCallbacks.forEach((callback) => callback(event.data));
    };

    this.socket.onclose = () => {
      console.log("WebSocket closed");
      this.socket = null;
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  static disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  static onMessage(callback: Function) {
    this.messageCallbacks.push(callback);
  }

  static removeMessageCallback(callback: Function) {
    this.messageCallbacks = this.messageCallbacks.filter(
      (cb) => cb !== callback
    );
  }
}

export { WebSocketService };
