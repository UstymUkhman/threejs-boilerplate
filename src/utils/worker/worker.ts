import {
  SizeParams,
  OffscreenParams,
  PlaygroundManager
} from '@/utils/worker/offscreen';

import type { EventData } from '@/utils/worker/offscreen/EventsManager';

export const worker: Worker = self as never;

const parseMessage = (event: string, data?: unknown) => {
  switch (event) {
    case 'transfer':
      return PlaygroundManager.takeControl(data as OffscreenParams);

    case 'setEventTarget':
      return PlaygroundManager.setEventTarget(data as EventData);

    case 'handleEvent':
      return PlaygroundManager.handleEvent(data as EventData);

    case 'resize':
      return PlaygroundManager.resize(data as SizeParams);
  }

  return undefined;
};

worker.onmessage = message => {
  const { event, params } = message.data;
  const response = parseMessage(event, params);

  worker.postMessage({
    name: event,
    response
  });
};

worker.onerror = error => console.error(error);
