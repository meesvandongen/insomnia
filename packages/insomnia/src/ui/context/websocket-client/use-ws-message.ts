import { useEffect, useState } from 'react';

import { WebsocketEvent } from '../../../main/network/websocket';

// this hook is only for development purpose
export function useWSMessage(requestId: string): WebsocketEvent | null {
  const [message, setMessage] = useState<WebsocketEvent | null>(null);

  useEffect(() => {
    const unsubscribe = window.main.webSocketConnection.event.subscribe(
      { requestId },
      (incomingEvent: WebsocketEvent[]) => {
        setMessage(incomingEvent[incomingEvent.length - 1]);

        window.requestAnimationFrame(
          window.main.webSocketConnection.event.clearToSend);
      }
    );

    window.main.webSocketConnection.event.clearToSend();

    return unsubscribe;
  }, [requestId]);

  return message;
}
